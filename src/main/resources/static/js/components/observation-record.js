import React from 'react';
import DatePicker from 'react-datepicker'
var DateTimeField = require('react-bootstrap-datetimepicker');

const ObservationRecord = React.createClass({
  render: function () {
    return (
        <div id="page-wrapper">
          <div className="panel panel-default">
            <div className="panel-heading">Add/Edit observation record</div>
            <div className="panel-body">
              <form className="form-horizontal">

                <div className="form-group">
                  <div className="col-xs-2">
                    <label htmlFor="inputStaffID" className="control-label">Staff ID (<abbr
                        title="required">*</abbr>) </label>
                  </div>
                  <div className="col-xs-4">
                    <input name="inputStaffID" disabled="disabled" className="form-control" id="inputStaffID"
                           placeholder="Staff ID"/>
                  </div>
                  <div className="col-xs-2">
                    <a href="#" className="btn btn-default">...</a>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-xs-2">
                    <label htmlFor="inputCourseName" className="control-label">Course Name</label>
                  </div>
                  <div className="col-xs-4">
                    <input name="inputCourseName" id="inputCourseName" className="form-control"
                           placeholder="Course name"/>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-xs-2">
                    <label htmlFor="inputCourseName" className="control-label">Programme</label>
                  </div>
                  <div className="col-xs-4">
                    <input name="inputCourseName" id="inputCourseName" className="form-control"
                           placeholder="Programme"/>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-xs-2">
                    <label htmlFor="inputDate" className="control-label">Date (<abbr
                        title="required">*</abbr>) </label>
                  </div>
                  <div className="col-xs-3">
                    <DateTimeField id="inputDate" className="inputDate" inputFormat="YYYY/MM/DD"/>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-xs-2">
                    <label htmlFor="inputCourseName" className="control-label">Note</label>
                  </div>
                  <div className="col-xs-4" >
                    <textarea name="inputCourseName" id="inputCourseName" className="form-control" placeholder="Note..." />
                  </div>
                </div>


                <div className="form-group">
                  <div className="col-xs-offset-2 col-xs-10">
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
})

export default ObservationRecord;
