import React from 'react';
import DatePicker from 'react-datepicker'
var DateTimeField = require('react-bootstrap-datetimepicker');
import $ from 'jquery';
const ObservationRecordEditAction = "EDIT";
const ObservationRecord = React.createClass({

  getInitialState: function () {
    return ({observation: []});
  },

  componentDidMount: function () {
    this.fetchObservationById();
  },

  fetchObservationById: function () {
    var url = "/api/observations";
    var currentAction = $("#currentAction").val();

    if (ObservationRecordEditAction == currentAction) {
      var currentActionData = $("#currentActionData").val();
      url += "/"+ currentActionData;
    }else {
      return;
    }
    this.serverRequest = $.get(url, function (result) {
      this.setState({
        observation: result
      });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.serverRequest.abort();
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var staffID = $("#observationForm input[name=inputStaffID]").val();
    var inputCourseName = $("#observationForm input[name=inputCourseName]").val();
    var inputProgramme = $("#observationForm input[name=inputProgramme]").val();

    if(staffID === '' || inputCourseName === '' || inputProgramme === ''){
      alert("Input data invalidate.")
      return;
    }
    var inputDate = $("#observationForm input[name=inputDate]").val();
    var inputNote = $("#observationForm input[name=inputNote]").val();

    var Observation = {staffID: staffID, courseName: inputCourseName, programme:inputProgramme, date: inputDate, note: inputNote};
    var url = "/api/observations";
    var type = "POST";
    if (ObservationRecordEditAction == currentAction) {
      var currentActionData = $("#currentActionData").val();
      url += "/"+ currentActionData;
      type = "PUT"
    }

    $.ajax({
      url: url,
      type: type,
      dataType: "json",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(Observation),
      success: function (data, textStatus, xhr) {
        console.log(data);
      },
      complete: function (xhr, textStatus) {
        if (xhr.status === 403) {
          alert(xhr.responseJSON.message);
        }
      }
    }).then(function(data) {
      console.log(data);
      alert("The new observation record has been created!.")
      $("#observationForm input[name=inputStaffID]").val('');
      $("#observationForm input[name=inputCourseName]").val('');
      $("#observationForm input[name=inputProgramme]").val('');
      $("#observationForm input[name=inputNote]").val('');
    });
  },
  render: function () {
    var staffId = this.state.observation.staffID;
    var courseName = this.state.observation.courseName;
    var programme = this.state.observation.programme;
    var note = this.state.observation.note;
    return (
        <div id="page-wrapper">
          <div className="panel panel-default">
            <div className="panel-heading">Add/Edit observation record</div>
            <div className="panel-body">
              <form className="form-horizontal" id="observationForm" >

                <div className="form-group">
                  <div className="col-xs-2">
                    <label htmlFor="inputStaffID" className="control-label">Staff ID (<abbr
                        title="required">*</abbr>) </label>
                  </div>
                  <div className="col-xs-4">
                    <input name="inputStaffID" disabled="disabled" className="form-control" id="inputStaffID" value={staffId}
                           placeholder="Staff ID"/>
                  </div>
                  <div className="col-xs-2">
                    <ModalStaff />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-xs-2">
                    <label htmlFor="inputCourseName" className="control-label">Course Name</label>
                  </div>
                  <div className="col-xs-4">
                    <input name="inputCourseName" id="inputCourseName" className="form-control" value={courseName}
                           placeholder="Course name"/>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-xs-2">
                    <label htmlFor="inputProgramme" className="control-label">Programme</label>
                  </div>
                  <div className="col-xs-4">
                    <input name="inputProgramme" id="inputProgramme" className="form-control" value={programme}
                           placeholder="Programme"/>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-xs-2">
                    <label htmlFor="inputDate" className="control-label">Date (<abbr
                        title="required">*</abbr>) </label>
                  </div>
                  <div className="col-xs-3">
                    <DateTimeField id="inputDate" className="inputDate" inputFormat="YYYY/MM/DD"  />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-xs-2">
                    <label htmlFor="inputNote" className="control-label">Note</label>
                  </div>
                  <div className="col-xs-4">
                    <textarea name="inputNote" id="inputNote" className="form-control"
                              placeholder="Note...">{note}</textarea>
                  </div>
                </div>


                <div className="form-group">
                  <div className="col-xs-offset-2 col-xs-10">
                    <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
})


var ModalStaff = React.createClass({
  getInitialState: function () {
    return {
      loading: "Loading...",
      staffs: []
    };
  },
  componentDidMount: function () {
    this.fetchStaffs();
  },

  fetchStaffs: function () {
    this.serverRequest = $.get("/api/staffs", function (result) {
      this.setState({
        staffs: result._embedded.staffs
      });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.serverRequest.abort();
  },

  render: function () {
    var rows = "";
    if(this.state.staffs.length > 0){
      rows += '<table class="table table-striped tblStaaff">';
      rows += '<thead>';
      rows += '<tr>';
      rows += '<th>ID</th>';
      rows += '<th>First Name</th>';
      rows += '<th>Last Name</th>';
      rows += '<th>UserName</th>';
      rows += '</tr>';
      rows += '</thead>';
      rows += '<tbody>';
      this.state.staffs.map(function (staff) {
        var id = staff._links.self.href;
        id = id.substring(id.lastIndexOf("/") + 1);
        rows += "<tr>";
        rows += " <td>" + id + "</td>";
        rows += " <td>" + staff.firstName + "</td>";
        rows += " <td>" + staff.lastName + "</td>";
        rows += " <td>" + staff.username + "</td>";
        rows += "</tr>";
      });
      rows += '</tbody>';
      rows += '</table>';
    }else {
      rows += 'No records found';
    }

    function createMarkup() {
      return {__html: rows};
    };

    $(document).ready(function(){
      $('.tblStaaff > tbody > tr').click(function() {
        var selectedID = $(this).find("td:first-child").html();
        $(this).closest("#modalStaff").find(".close").trigger("click")
        $("input[name=inputStaffID]").val(selectedID);
      });
    });

    return (
        <div>
          <a href="#" className="btn btn-default" data-toggle="modal" data-target="#modalStaff">...</a>
          <div className="modal fade" id="modalStaff" role="dialog">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">List of staff</h4>
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
export default ObservationRecord;
