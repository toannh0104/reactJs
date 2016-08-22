define(function (require) {
    'use strict';

    var React = require('react');
    var when = require('when');
    var client = require('../../client');
    var follow = require('../../follow');

    var stompClient = require('../../websocket-listener');

    var root = '/api';

    var Staff = React.createClass({
        loadFromServer: function (pageSize) {
            follow(client, root, [
                {rel: 'employees', params: {size: pageSize}}]
            ).then(employeeCollection => {
                return client({
                    method: 'GET',
                    path: employeeCollection.entity._links.profile.href,
                    headers: {'Accept': 'application/schema+json'}
                }).then(schema => {
                    // tag::json-schema-filter[]
                    /**
                     * Filter unneeded JSON Schema properties, like uri references and
                     * subtypes ($ref).
                     */
                    Object.keys(schema.entity.properties).forEach(function (property) {
                        if (schema.entity.properties[property].hasOwnProperty('format') &&
                            schema.entity.properties[property].format === 'uri') {
                            delete schema.entity.properties[property];
                        }
                        if (schema.entity.properties[property].hasOwnProperty('$ref')) {
                            delete schema.entity.properties[property];
                        }
                    });

                    this.schema = schema.entity;
                    this.links = employeeCollection.entity._links;
                    return employeeCollection;
                    // end::json-schema-filter[]
                });
            }).then(employeeCollection => {
                this.page = employeeCollection.entity.page;
                return employeeCollection.entity._embedded.employees.map(employee =>
                    client({
                        method: 'GET',
                        path: employee._links.self.href
                    })
                );
            }).then(employeePromises => {
                return when.all(employeePromises);
            }).done(employees => {
                this.setState({
                    page: this.page,
                    employees: employees,
                    attributes: Object.keys(this.schema.properties),
                    pageSize: pageSize,
                    links: this.links
                });
            });
        },
        // tag::on-create[]
        onCreate: function (newEmployee) {
            follow(client, root, ['employees']).done(response => {
                client({
                    method: 'POST',
                    path: response.entity._links.self.href,
                    entity: newEmployee,
                    headers: {'Content-Type': 'application/json'}
                })
            })
        },
        // end::on-create[]
        // tag::on-update[]
        onUpdate: function (employee, updatedEmployee) {
            client({
                method: 'PUT',
                path: employee.entity._links.self.href,
                entity: updatedEmployee,
                headers: {
                    'Content-Type': 'application/json',
                    'If-Match': employee.headers.Etag
                }
            }).done(response => {
                /* Let the websocket handler update the state */
            }, response => {
                if (response.status.code === 403) {
                    alert('ACCESS DENIED: You are not authorized to update ' +
                        employee.entity._links.self.href);
                }
                if (response.status.code === 412) {
                    alert('DENIED: Unable to update ' + employee.entity._links.self.href +
                        '. Your copy is stale.');
                }
            });
        },
        // end::on-update[]
        // tag::on-delete[]
        onDelete: function (employee) {
            if(confirm("Are u sure to delete?")) {
                client({method: 'DELETE', path: employee.entity._links.self.href}
                ).done(response => {/* let the websocket handle updating the UI */
                    },
                    response => {
                        if (response.status.code === 403) {
                            alert('ACCESS DENIED: You are not authorized to delete ' +
                                employee.entity._links.self.href);
                        }
                    });
            }
        },
        // end::on-delete[]
        onNavigate: function (navUri) {
            client({
                method: 'GET',
                path: navUri
            }).then(employeeCollection => {
                this.links = employeeCollection.entity._links;
                this.page = employeeCollection.entity.page;

                return employeeCollection.entity._embedded.employees.map(employee =>
                    client({
                        method: 'GET',
                        path: employee._links.self.href
                    })
                );
            }).then(employeePromises => {
                return when.all(employeePromises);
            }).done(employees => {
                this.setState({
                    page: this.page,
                    employees: employees,
                    attributes: Object.keys(this.schema.properties),
                    pageSize: this.state.pageSize,
                    links: this.links
                });
            });
        },
        updatePageSize: function (pageSize) {
            if (pageSize !== this.state.pageSize) {
                this.loadFromServer(pageSize);
            }
        },
        // tag::websocket-handlers[]
        refreshAndGoToLastPage: function (message) {
            follow(client, root, [{
                rel: 'employees',
                params: {size: this.state.pageSize}
            }]).done(response => {
                //this.onNavigate(response.entity._links.last.href);
                this.refreshCurrentPage(message);
            })
        },

        refreshCurrentPage: function (message) {
            follow(client, root, [{
                rel: 'employees',
                params: {
                    size: this.state.pageSize,
                    page: this.state.page.number
                }
            }]).then(employeeCollection => {
                this.links = employeeCollection.entity._links;
                this.page = employeeCollection.entity.page;

                return employeeCollection.entity._embedded.employees.map(employee => {
                    return client({
                        method: 'GET',
                        path: employee._links.self.href
                    })
                });
            }).then(employeePromises => {
                return when.all(employeePromises);
            }).then(employees => {
                this.setState({
                    page: this.page,
                    employees: employees,
                    attributes: Object.keys(this.schema.properties),
                    pageSize: this.state.pageSize,
                    links: this.links
                });
            });
        },
        // end::websocket-handlers[]
        getInitialState: function () {
            return ({page: {}, employees: [], attributes: [], pageSize: 5, links: {}});
        },
        // tag::register-handlers[]
        componentDidMount: function () {
            this.loadFromServer(this.state.pageSize);
            stompClient.register([
                {route: '/topic/newEmployee', callback: this.refreshAndGoToLastPage},
                {route: '/topic/updateEmployee', callback: this.refreshCurrentPage},
                {route: '/topic/deleteEmployee', callback: this.refreshCurrentPage}
            ]);
        },
        render: function () {

          var self = this;
          function onAfterSaveCell(row, cellName, cellValue){
            console.log("Save cell '"+cellName+"' with value '"+cellValue+"'");
            console.log("Thw whole row :");
            console.log(row);
            var newEmployee = row;
            var _path = row.id;
            if(_path !== undefined) {
              newEmployee["id"] = row.id.substring(row.id.lastIndexOf("/") + 1);
              client({
                method: 'PUT',
                path: _path,
                entity: newEmployee,
                headers: {'Content-Type': 'application/json'}
              })
            }else {
              alert("Dont have permission");
              return;
            }
          }

          function onAfterTableComplete(){
            console.log('Table render complete.');
          }

          function onAfterDeleteRow(rowKeys){
            console.log("onAfterDeleteRow");
            console.log(rowKeys);
            var _path = rowKeys.pop();
            client({
              method: 'DELETE',
              path: _path
            })
          }

          function onAfterInsertRow(row){
            console.log("onAfterInsertRow");
            console.log(row);
          }

          function priceFormatter(cell, row){
            return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
          }
          function onRowSelect(row, isSelected){
            console.log(row);
            console.log("selected: " + isSelected)
          }

          function onSelectAll(isSelected, currentDisplayAndSelectedData){
            console.log("is select all: " + isSelected);
            console.log("Current select and display data: ");
            console.log(currentDisplayAndSelectedData);
          }

          var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            // hideSelectColumn: true, //you can hide select column, if you enable clickToSelect
            selected: [], //default selection on table
            bgColor: "rgb(238, 193, 213)",
            onSelect: onRowSelect,
            onSelectAll: onSelectAll
          };

          var cellEditProp = {
            mode: "click",
            blurToSave: true,
            afterSaveCell: onAfterSaveCell
          };

          var options = {
            // page: 3,
            // sizePerPage: 5,
            // sizePerPageList: [5,10,15,20],
            // paginationSize: 6,
            sortName: "name",  //default sort column name
            sortOrder: "desc",  //default sort order
            afterTableComplete: onAfterTableComplete, // A hook for after table render complete.
            afterDeleteRow: onAfterDeleteRow,  // A hook for after droping rows.
            afterInsertRow: onAfterInsertRow   // A hook for after insert rows
          };

          console.log(this.state.employees);
          var employees = [];
          if(this.state.employees.length >0 ){
            employees = this.state.employees.map(function(employee){
              var _emp = {};
              _emp["id"] = employee.entity._links.self.href;
              _emp["firstName"] = employee.entity.firstName;
              _emp["lastName"] = employee.entity.lastName;
              _emp["description"] = employee.entity.description;
              _emp["discount"] = employee.entity.discount;
              return _emp;
            });
          }

            return (
                <div>
                  <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
                  <BootstrapTable data={employees} striped={true} hover={true} pagination={true} selectRow={selectRowProp} cellEdit={cellEditProp}
                                  insertRow={false} deleteRow={true} search={true} columnFilter={false} options={options}>
                    <TableHeaderColumn dataField="id" dataAlign="center" dataSort={true} isKey={true} >ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="firstName" width="200px" dataSort={true}>First Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="lastName" width="100px" editable={true}>Last Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" editable={true}> Description </TableHeaderColumn>
                  </BootstrapTable>


                  <DemoButton/>
                </div>
            )
        }
    })

    var CreateDialog = React.createClass({
        handleSubmit: function (e) {
            e.preventDefault();
            var newEmployee = {};
            this.props.attributes.forEach(attribute => {
                newEmployee[attribute] = React.findDOMNode(this.refs[attribute]).value.trim();
            });
            this.props.onCreate(newEmployee);
            this.props.attributes.forEach(attribute => {
                React.findDOMNode(this.refs[attribute]).value = ''; // clear out the dialog's inputs
            });
            window.location = "#";
        },
        render: function () {
            var inputs = this.props.attributes.map(attribute =>
                <p key={attribute}>
                    <input type="text" placeholder={attribute} ref={attribute} className="field"/>
                </p>
            );
            return (
                <div>
                    <a href="#createEmployee" className="btn btn-primary" >Create</a>

                    <div id="createEmployee" className="modalDialog">
                        <div>
                            <a href="#" title="Close" className="close">X</a>
                            <h2>Create new employee</h2>
                            <form>
                                {inputs}
                                <button onClick={this.handleSubmit}>Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    })

    var UpdateDialog = React.createClass({

        handleSubmit: function (e) {
            e.preventDefault();
            var updatedEmployee = {};
            this.props.attributes.forEach(attribute => {
                updatedEmployee[attribute] = React.findDOMNode(this.refs[attribute]).value.trim();
            });
            this.props.onUpdate(this.props.employee, updatedEmployee);
            window.location = "#";
        },

        render: function () {
            var inputs = this.props.attributes.map(attribute =>
                <p key={this.props.employee.entity[attribute]}>
                    <input type="text" placeholder={attribute}
                           defaultValue={this.props.employee.entity[attribute]}
                           ref={attribute} className="field"/>
                </p>
            );

            var dialogId = "updateEmployee-" + this.props.employee.entity._links.self.href;

            return (
                <div>
                    <a href={"#" + dialogId}>Edit</a>

                    <div id={dialogId} className="modalDialog">
                        <div>
                            <a href="#" title="Close" className="close">X</a>

                            <h2>Update an employee</h2>

                            <form>
                                {inputs}
                                <button onClick={this.handleSubmit}>Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }

    });

    var EmployeeList = React.createClass({
        handleInput: function (e) {
            e.preventDefault();
            var pageSize = React.findDOMNode(this.refs.pageSize).value;
            if (/^[0-9]+$/.test(pageSize)) {
                this.props.updatePageSize(pageSize);
            } else {
                React.findDOMNode(this.refs.pageSize).value = pageSize.substring(0, pageSize.length - 1);
            }
        },
        handleNavFirst: function (e) {
            e.preventDefault();
            this.props.onNavigate(this.props.links.first.href);
        },
        handleNavPrev: function (e) {
            e.preventDefault();
            this.props.onNavigate(this.props.links.prev.href);
        },
        handleNavNext: function (e) {
            e.preventDefault();
            this.props.onNavigate(this.props.links.next.href);
        },
        handleNavLast: function (e) {
            e.preventDefault();
            this.props.onNavigate(this.props.links.last.href);
        },
        render: function () {
            var pageInfo = this.props.page.hasOwnProperty("number") ?
                <h3>Employees - Page {this.props.page.number + 1} of {this.props.page.totalPages}</h3> : null;

            var employees = this.props.employees.map(employee =>
                <Employee key={employee.entity._links.self.href}
                          employee={employee}
                          attributes={this.props.attributes}
                          onUpdate={this.props.onUpdate}
                          onDelete={this.props.onDelete}/>
            );

            var navLinks = [];
            if ("first" in this.props.links) {
                navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
            }
            if ("prev" in this.props.links) {
                navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
            }
            if ("next" in this.props.links) {
                navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
            }
            if ("last" in this.props.links) {
                navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
            }

            return (
                <div>
                    {pageInfo}
                    <table className="table-hover">
                        <tr className="text-center" >
                            <th >First Name</th>
                            <th >Last Name</th>
                            <th >Description</th>
                            <th >Manager</th>
                            <th colSpan="2"  >Action</th>
                        </tr>
                        {employees}
                    </table>
                    <div>
                        {navLinks}
                    </div>
                </div>
            )
        }
    });


    // end::employee[]


    // const buttonsInstance = (
    //     <ButtonToolbar>
    //         {/* Standard button */}
    //         <Button>Default</Button>
    //
    //         {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
    //         <Button bsStyle="primary">Primary</Button>
    //
    //         {/* Indicates a successful or positive action */}
    //         <Button bsStyle="success">Success</Button>
    //
    //         {/* Contextual button for informational alert messages */}
    //         <Button bsStyle="info">Info</Button>
    //
    //         {/* Indicates caution should be taken with this action */}
    //         <Button bsStyle="warning">Warning</Button>
    //
    //         {/* Indicates a dangerous or potentially negative action */}
    //         <Button bsStyle="danger">Danger</Button>
    //
    //         {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
    //         <Button bsStyle="link">Link</Button>
    //     </ButtonToolbar>
    // );
    //
    // ReactDOM.render(buttonsInstance, document.getElementById('react'));
});