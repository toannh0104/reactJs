import React from 'react';
import {Link} from 'react-router';
const ReactDOM = require('react-dom');
const when = require('when');
const client = require('../../client');
const follow = require('../../follow');
const stompClient = require('../../websocket-listener');
const root = '/api';
window.ReactDOM = ReactDOM;
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

var UserList = React.createClass({

  loadFromServer(pageSize) {
    follow(client, root, [
      {rel: 'staffs', params: {size: pageSize}}]
    ).then(employeeCollection => {
      return client({
        method: 'GET',
        path: employeeCollection.entity._links.profile.href,
        headers: {'Accept': 'application/schema+json'}
      }).then(schema => {
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
      });
    }).then(employeeCollection => {
      this.page = employeeCollection.entity.page;
      return employeeCollection.entity._embedded.staffs.map(employee =>
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

  onCreate(newEmployee) {
    follow(client, root, ['employees']).done(response => {
      client({
        method: 'POST',
        path: response.entity._links.self.href,
        entity: newEmployee,
        headers: {'Content-Type': 'application/json'}
      })
    })
  },

  onUpdate(employee, updatedEmployee) {
    client({
      method: 'PUT',
      path: employee.entity._links.self.href,
      entity: updatedEmployee,
      headers: {
        'Content-Type': 'application/json',
        'If-Match': employee.headers.Etag
      }
    }).done(response => {
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

  onDelete(employee) {
    client({method: 'DELETE', path: employee.entity._links.self.href}
    ).done(response => {/* let the websocket handle updating the UI */
        },
        response => {
          if (response.status.code === 403) {
            alert('ACCESS DENIED: You are not authorized to delete ' +
                employee.entity._links.self.href);
          }
        });
  },

  onNavigate(navUri) {
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
  getInitialState: function () {
    return ({page: {}, employees: [], attributes: [], pageSize: 5, links: {}});
  },
  componentDidMount() {
    this.loadFromServer(this.state.pageSize);
    stompClient.register([
      {route: '/topic/newEmployee', callback: this.refreshAndGoToLastPage},
      {route: '/topic/updateEmployee', callback: this.refreshCurrentPage},
      {route: '/topic/deleteEmployee', callback: this.refreshCurrentPage}
    ]);
  },

  render: function () {

    var self = this;

    function onAfterSaveCell(row, cellName, cellValue) {
      console.log("Save cell '" + cellName + "' with value '" + cellValue + "'");
      console.log("Thw whole row :");
      console.log(row);
      var newEmployee = row;
      var _path = row.id;
      if (_path !== undefined) {

        if(!_path.startsWith("http")){
          _path="/api/staffs/"+_path;
        }

        newEmployee["id"] = row.id.substring(row.id.lastIndexOf("/") + 1);
        client({
          method: 'PUT',
          path: _path,
          entity: newEmployee,
          headers: {'Content-Type': 'application/json'}
        })
      } else {
        alert("Dont have permission");
        return;
      }
    }

    function onAfterTableComplete() {
      console.log('Table render complete.');
    }

    function onAfterDeleteRow(rowKeys) {
      console.log("onAfterDeleteRow");
      console.log(rowKeys);
      var _path = rowKeys.pop();
      client({
        method: 'DELETE',
        path: _path
      })
    }

    function onAfterInsertRow(row) {
      console.log("onAfterInsertRow");
      console.log(row);
    }

    function priceFormatter(cell, row) {
      return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
    }

    function onRowSelect(row, isSelected) {
      console.log(row);
      console.log("selected: " + isSelected)
    }

    function onSelectAll(isSelected, currentDisplayAndSelectedData) {
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
    if (this.state.employees.length > 0) {
      employees = this.state.employees.map(function (employee) {
        var _emp = {};
        _emp["id"] = employee.entity._links.self.href;
        _emp["firstName"] = employee.entity.firstName;
        _emp["lastName"] = employee.entity.lastName;
        _emp["description"] = employee.entity.description;
        _emp["discount"] = employee.entity.discount;
        return _emp;
      });
    } else {
      //loadFromServer(self.stage.pageSize);
    }
    function formatID(cell, row) {
      return cell.substring(cell.lastIndexOf("/") + 1);
    }

    function listObservation(cell, row) {
      return <ModalDialog data={row.id.substring(row.id.lastIndexOf("/") + 1)} dataName={row.firstName}/>
    }

    return (
        <div id="page-wrapper">
          <BootstrapTable data={employees} striped={true} hover={true} selectRow={selectRowProp}
                          cellEdit={cellEditProp} multiColumnSearch={true} exportCSV={true}
                          deleteRow={true} search={true} columnFilter={false} options={options}>
            <TableHeaderColumn dataField="id" width="30px" dataFormat={formatID} dataAlign="center"
                               isKey={true}>ID</TableHeaderColumn>
            <TableHeaderColumn dataField="firstName" dataAlign="center" width="200px" editable={true} dataSort={true}>First
              Name</TableHeaderColumn>
            <TableHeaderColumn dataField="lastName" dataAlign="center" width="100px" editable={true} dataSort={true}>Last
              Name</TableHeaderColumn>
            <TableHeaderColumn dataField="manager" dataAlign="center" width="100px">Manager</TableHeaderColumn>
            <TableHeaderColumn dataField="description" dataAlign="center" editable={false} dataFormat={listObservation}>
              Actions
            </TableHeaderColumn>
          </BootstrapTable>


        </div>
    )
  }
});

window.deleteObs = function(id){
  if(!confirm("Are u sure to delete this observation?")){
    return;
  }
  var uri = "/api/observations/"+id;
  $.ajax({
    url: uri,
    type: "DELETE",
  }).then(function(data) {
    $(".row-"+id).remove();
  });
}

var ModalDialog = React.createClass({

  getInitialState: function () {
    return ({data: 0, observations: []});
  },

  loadFromServer1: function (pageSize) {
    console.log(pageSize);
  },

  componentDidMount: function () {
    this.fetchObservationByStaff();
  },

  fetchObservationByStaff: function () {
    this.serverRequest = $.get("/api/observations/search/findByStaffID?staffID=" + this.props.data, function (result) {
      this.setState({
        observations: result._embedded.observations
      });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.serverRequest.abort();
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var newEmployee = {};
    this.props.attributes.forEach(attribute => {
      newEmployee[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
    });
    this.props.onCreate(newEmployee);
    this.props.attributes.forEach(attribute => {
      ReactDOM.findDOMNode(this.refs[attribute]).value = ''; // clear out the dialog's inputs
    });
    window.location = "#";
  },

  render: function () {
    // this.fetchObservationByStaff();
    var id = this.props.data;
    var rows = "";
    if (this.state.observations.length > 0) {
      rows += '<table class="table table-striped">';
      rows += '<thead>';
      rows += '<tr>';
      rows += '<th>Course Name</th>';
      rows += '<th>Level</th>';
      rows += '<th>Programme</th>';
      rows += '<th>Action</th>';
      rows += '</tr>';
      rows += '</thead>';
      rows += '<tbody>';
      this.state.observations.map(function (observation) {
        var id = observation._links.self.href;
        id = id.substring(id.lastIndexOf("/") + 1);
        rows += "<tr class='row-"+id+"' >";
        rows += " <td>" + observation.courseName + "</td>";
        rows += " <td>" + observation.courseLevel + "</td>";
        rows += " <td>" + observation.programme + "</td>";
        rows += " <td><a href='#'>Details</a> / <a href='javascript:deleteObs("+ id +")'> Delete </a></td>";
        rows += "</tr>";
      });
      rows += '</tbody>';
      rows += '</table>';
    } else {
      rows += 'No records found';
    }

    function createMarkup() {
      return {__html: rows};
    };
    return (
        <div>

          <a type="button" data-toggle="modal"
             data-target={this.props.data === null ? '#modal' : '#modal-' + this.props.data} className="btn btn-link">
            <i className="glyphicon glyphicon-list-alt"></i> Observation
          </a>
          <a type="button" data-toggle="modal" className="btn btn-link">
            <i className="glyphicon glyphicon-remove"></i> Delete
          </a>

          <div className="modal fade" id={this.props.data === null ? 'modal' : 'modal-' + this.props.data}
               role="dialog">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Observations record of {this.props.dataName}</h4>
                </div>
                <div className="modal-body" dangerouslySetInnerHTML={createMarkup()}>

                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>

            </div>
          </div>
        </div>
    )
  }
})


var CreateDialog = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var newEmployee = {};
    this.props.attributes.forEach(attribute => {
      newEmployee[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
    });
    this.props.onCreate(newEmployee);
    this.props.attributes.forEach(attribute => {
      ReactDOM.findDOMNode(this.refs[attribute]).value = ''; // clear out the dialog's inputs
    });
    window.location = "#";
  },
  render: function () {
    return (
        <div>
          <a href="#createEmployee" className="btn btn-primary">Create</a>

          <div id="createEmployee" className="modalDialog">
            <div>
              <a href="#" title="Close" className="close">X</a>
              <h2>Create new employee</h2>
              <form>
                <p >
                  <input type="text" className="field"/>
                </p>
                <button onClick={this.handleSubmit}>Create</button>
              </form>
            </div>
          </div>
        </div>
    )
  }
})
export default UserList;
