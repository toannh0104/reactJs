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

var UserRole = React.createClass({

  loadFromServer(pageSize) {
    follow(client, root, [
      {rel: 'managers', params: {size: pageSize}}]
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
      return employeeCollection.entity._embedded.managers.map(employee =>
          client({
            method: 'GET',
            path: employee._links.self.href
          })
      );
    }).then(employeePromises => {
      return when.all(employeePromises);
    }).done(managers => {
      this.setState({
        page: this.page,
        managers: managers,
        attributes: Object.keys(this.schema.properties),
        pageSize: pageSize,
        links: this.links
      });
    });
  },

  onCreate(newEmployee) {
    follow(client, root, ['managers']).done(response => {
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

      return employeeCollection.entity._embedded.managers.map(employee =>
          client({
            method: 'GET',
            path: employee._links.self.href
          })
      );
    }).then(employeePromises => {
      return when.all(employeePromises);
    }).done(managers => {
      this.setState({
        page: this.page,
        managers: managers,
        attributes: Object.keys(this.schema.properties),
        pageSize: this.state.pageSize,
        links: this.links
      });
    });
  },
  getInitialState: function () {
    return ({page: {}, managers: [], attributes: [], pageSize: 5, links: {}});
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

        if (!_path.startsWith("http")) {
          _path = "/api/staffs/" + _path;
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

    console.log(this.state.managers);
    var managers = [];
    if (this.state.managers.length > 0) {
      managers = this.state.managers.map(function (manager) {
        var _emp = {};
        _emp["id"] = manager.entity._links.self.href;
        _emp["name"] = manager.entity.name;
        _emp["roles"] = manager.entity.roles;
        return _emp;
      });
    } else {
      //loadFromServer(self.stage.pageSize);
    }
    function formatID(cell, row) {
      return cell.substring(cell.lastIndexOf("/") + 1);
    }

    function listRole(cell, row) {
      return <ModalDialog data={row.id.substring(row.id.lastIndexOf("/") + 1)} dataName={row.name} dataId={row.id} />
    }

    return (
        <div id="page-wrapper">
          <BootstrapTable data={managers} striped={true} hover={true} selectRow={selectRowProp}
                          cellEdit={cellEditProp} multiColumnSearch={true} exportCSV={true}
                          deleteRow={true} search={true} columnFilter={false} options={options}>
            <TableHeaderColumn dataField="id" width="30px" dataFormat={formatID} dataAlign="center"
                               isKey={true}>ID</TableHeaderColumn>
            <TableHeaderColumn dataField="name" dataAlign="center" width="200px" > Name</TableHeaderColumn>
            <TableHeaderColumn dataField="roles" dataAlign="center" width="500px" > Role</TableHeaderColumn>
            <TableHeaderColumn dataField="description" dataAlign="center" editable={false} dataFormat={listRole}>
              Actions
            </TableHeaderColumn>
          </BootstrapTable>


        </div>
    )
  }
});

window.deleteObs = function (id) {
  if (!confirm("Are u sure to delete this observation?")) {
    return;
  }
  var uri = "/api/observations/" + id;
  $.ajax({
    url: uri,
    type: "DELETE",
    success: function (data, textStatus, xhr) {
      console.log(data);
    },
    complete: function (xhr, textStatus) {
      if (xhr.status === 403) {
        alert(xhr.responseJSON.message);
      }
    }
  }).then(function (data) {
    $(".row-" + id).remove();
  });
}

var ModalDialog = React.createClass({

  getInitialState: function () {
    return ({data: 0, userRoles: [], dataName:'', userRolesData: []});
  },

  loadFromServer1: function (pageSize) {
    console.log(pageSize);
  },

  componentDidMount: function () {
    this.fetchObservationByStaff();
  },

  fetchObservationByStaff: function () {
    this.serverRequest = $.get("/api/userRoles/search/findRoleByStaffId?staffId=" + this.props.data, function (result) {
      this.setState({
        userRoles: result._embedded.userRoles
      });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.serverRequest.abort();
  },

  render: function () {
    // this.fetchObservationByStaff();
    var id = this.props.data;
    window.roleDName = this.props.dataName;
    window.roleDId = this.props.dataId;
    var rows = "";
    var userRolesData=[];
    if (this.state.userRoles.length > 0) {
      // userRolesData = this.state.userRoles.map(function (userRole) {
      //   var _userRolesData={};
      //   _userRolesData["general"] = userRole.general;
      //   _userRolesData["qualityAssurance"] = userRole.qualityAssurance;
      //   _userRolesData["addObservation"] = userRole.addObservation;
      //   _userRolesData["systemAdministration"] = userRole.systemAdministration;
      //   var id = userRole._links.self.href;
      //   id = id.substring(id.lastIndexOf("/") + 1);
      //   _userRolesData["id"] = id;
      //   return _userRolesData;
      // });

      rows += '<table class="table table-striped">';
      rows += '<thead>';
      rows += '<tr>';
      rows += '<th>View</th>';
      rows += '<th>Edit</th>';
      rows += '<th>Add</th>';
      rows += '<th>Admin</th>';
      rows += '<th>Action</th>';
      rows += '</tr>';
      rows += '</thead>';
      rows += '<tbody>';
      this.state.userRoles.map(function (userRole) {
        var id = userRole._links.self.href;
        id = id.substring(id.lastIndexOf("/") + 1);
        rows += "<tr class='row-" + id + "' >";
        rows += " <td> <input type='checkbox' onchange='javascript:doChangeRole(\""+id+"\", \"general\")' " + isChecked(userRole.general) + " /></td>";
        rows += " <td> <input type='checkbox' onchange='javascript:doChangeRole(\""+id+"\", \"qualityAssurance\")' " + isChecked(userRole.qualityAssurance) + " /></td>";
        rows += " <td> <input type='checkbox' onchange='javascript:doChangeRole(\""+id+"\", \"addObservation\")' " + isChecked(userRole.addObservation) + " /></td>";
        rows += " <td> <input type='checkbox' onchange='javascript:doChangeRole(\""+id+"\", \"systemAdministration\")' " + isChecked(userRole.systemAdministration) + "/></td>";
        rows += " <td><a href='#'> Remove </a></td>";
        rows += "</tr>";
      });
      rows += '</tbody>';
      rows += '</table>';
    } else {
      rows += 'No records found';
    }

    function isChecked(value) {
      if(value === true){
        return "checked";
      }
      return "";
    }

    function createMarkup() {
      return {__html: rows};
    };

    return (
        <div>

          <a type="button" data-toggle="modal"
             data-target={this.props.data === null ? '#modal' : '#modal-' + this.props.data} className="btn btn-link">
            <i className="glyphicon glyphicon-list-alt"></i> Permission
          </a>
          <a type="button" data-toggle="modal" className="btn btn-link">
            <i className="glyphicon glyphicon-remove"></i> Delete
          </a>

          <div className="modal fade" id={this.props.data === null ? 'modal' : 'modal-' + this.props.data}
               role="dialog">
            <div className="modal-dialog modal-sl">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Permissions of {this.props.dataName}</h4>
                </div>
                <div className="modal-body" dangerouslySetInnerHTML={createMarkup()} >
                  {/*<BootstrapTable data={this.state.userRoles} striped={true} hover={true} >*/}
                    {/*<TableHeaderColumn dataField="id" width="30px" columnClassName="hide" dataAlign="center" isKey={true}>ID</TableHeaderColumn>*/}
                    {/*<TableHeaderColumn dataField="general" dataAlign="center" > View</TableHeaderColumn>*/}
                    {/*<TableHeaderColumn dataField="qualityAssurance" dataAlign="center" > Update</TableHeaderColumn>*/}
                    {/*<TableHeaderColumn dataField="addObservation" dataAlign="center" > Add</TableHeaderColumn>*/}
                    {/*<TableHeaderColumn dataField="systemAdministration" dataAlign="center" > Admin</TableHeaderColumn>*/}
                  {/*</BootstrapTable>*/}
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

window.doChangeRole = function(staffId, type){
  var uri = "/api/userRoles/"+staffId;

  var currentRole={};
  $.ajax({
    url: uri,
    async: false,
    type: "GET",
    success: function (data, textStatus, xhr) {
      console.log(data);
      currentRole.staffId = data.staffId;
      currentRole.general = data.general;
      currentRole.qualityAssurance = data.qualityAssurance;
      currentRole.addObservation = data.addObservation;
      currentRole.systemAdministration = data.systemAdministration;
    },
    complete: function (xhr, textStatus) {
      if (xhr.status === 403) {
        alert(xhr.responseJSON.message);
      }
    }
  });

  //update
  currentRole[type] = !currentRole[type];
  console.log(currentRole);
  $.ajax({
    url: uri,
    type: "PUT",
    data: JSON.stringify(currentRole),
    headers: {'Content-Type': 'application/json'},
    success: function (data, textStatus, xhr) {
      console.log(data);
    },
    complete: function (xhr, textStatus) {
      if (xhr.status === 403) {
        alert(xhr.responseJSON.message);
      }
    }
  });

}


export default UserRole;
