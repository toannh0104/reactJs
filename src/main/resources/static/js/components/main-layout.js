import React, {PropTypes, Component} from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

$(document).ready(function(){
  $(".userloged").html($('#_userloged').html());
  $(".side-nav li").each(function(index){
    //$(".active").removeClass("active");
    $(this).on("click", function(){
      $(".side-nav .active").removeClass("active");
      $(this).addClass("active");
    });
  })

});

var MainLayout = React.createClass({

  componentWillMount: function () {
  },

  omponentWillUnmount: function () {
  },

  getInitialState: function () {
    return {
      uiElementsCollapsed: true,
      chartsElementsCollapsed: true,
      multiLevelDropdownCollapsed: true,
      thirdLevelDropdownCollapsed: true,
      samplePagesCollapsed: true
    };
  },

  render: function () {
    return (
        <div id="wrapper">
          <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">Administrator</a>
            </div>
            <ul className="nav navbar-right top-nav">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-envelope"></i> <b
                    className="caret"></b></a>
                <ul className="dropdown-menu message-dropdown">
                  <li className="message-preview">
                    <a href="#">
                      <div className="media">
                                    <span className="pull-left">
                                        <img className="media-object" src="http://placehold.it/50x50" alt=""/>
                                    </span>
                        <div className="media-body">
                          <h5 className="media-heading userloged"  ><strong>Loading....</strong>
                          </h5>
                          <p className="small text-muted"><i className="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                          <p>Lorem ipsum dolor sit amet, consectetur...</p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="message-preview">
                    <a href="#">
                      <div className="media">
                                    <span className="pull-left">
                                        <img className="media-object" src="http://placehold.it/50x50" alt=""/>
                                    </span>
                        <div className="media-body">
                          <h5 className="media-heading userloged"><strong>Loading....</strong>
                          </h5>
                          <p className="small text-muted"><i className="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                          <p>Lorem ipsum dolor sit amet, consectetur...</p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="message-preview">
                    <a href="#">
                      <div className="media">
                                    <span className="pull-left">
                                        <img className="media-object" src="http://placehold.it/50x50" alt=""/>
                                    </span>
                        <div className="media-body">
                          <h5 className="media-heading userloged"><strong>Loading....</strong>
                          </h5>
                          <p className="small text-muted"><i className="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                          <p>Lorem ipsum dolor sit amet, consectetur...</p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="message-footer">
                    <a href="#">Read All New Messages</a>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-bell"></i> <b
                    className="caret"></b></a>
                <ul className="dropdown-menu alert-dropdown">
                  <li>
                    <a href="#">Alert Name <span className="label label-default">Alert Badge</span></a>
                  </li>
                  <li>
                    <a href="#">Alert Name <span className="label label-primary">Alert Badge</span></a>
                  </li>
                  <li>
                    <a href="#">Alert Name <span className="label label-success">Alert Badge</span></a>
                  </li>
                  <li>
                    <a href="#">Alert Name <span className="label label-info">Alert Badge</span></a>
                  </li>
                  <li>
                    <a href="#">Alert Name <span className="label label-warning">Alert Badge</span></a>
                  </li>
                  <li>
                    <a href="#">Alert Name <span className="label label-danger">Alert Badge</span></a>
                  </li>
                  <li className="divider"></li>
                  <li>
                    <a href="#">View All</a>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user userloged "></i> Loading....
                  <b className="caret"></b></a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="#"><i className="fa fa-fw fa-user"></i> Profile</a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-fw fa-envelope"></i> Inbox</a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-fw fa-gear"></i> Settings</a>
                  </li>
                  <li className="divider"></li>
                  <li>
                    <a href="/logout"><i className="fa fa-fw fa-power-off"></i> Log Out</a>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="collapse navbar-collapse navbar-ex1-collapse">
              <ul className="nav navbar-nav side-nav">
                <li className="active dashboard">
                  <a href="/" activeClassName="active"><i className="fa fa-fw fa-dashboard"></i> Dashboard</a>
                </li>
                <li className="user" >
                  <a href="/users"><i className="fa fa-fw fa-user"></i> User </a>
                  {/*<Link to="/users"><i className="fa fa-fw fa-user"></i> User </Link>*/}
                </li>
                {/*<li>*/}
                  {/*<a href="tables.html"><i className="fa fa-fw fa-table"></i> Role </a>*/}
                {/*</li>*/}
                {/*<li>*/}
                  {/*<a href="forms.html"><i className="fa fa-fw fa-edit"></i> Forms</a>*/}
                {/*</li>*/}
                {/*<li>*/}
                  {/*<a href="bootstrap-elements.html"><i className="fa fa-fw fa-desktop"></i> Bootstrap Elements</a>*/}
                {/*</li>*/}
                <li>
                  <a href="/observations"><i className="fa fa-fw fa-wrench"></i> Observation Records</a>
                </li>
                <li>
                  <a href="javascript:;" data-toggle="collapse" data-target="#demo"><i
                      className="fa fa-fw fa-arrows-v"></i> Permissions <i className="fa fa-fw fa-caret-down"></i></a>
                  <ul id="demo" className="expanded">
                    <li className="group" >
                      <a href="#">Groups</a>
                    </li>
                    <li className="role" >
                      <a href="/roles">Role</a>
                    </li>
                    <li className="permission" >
                      <a href="#">Permission</a>
                    </li>
                  </ul>
                </li>
                {/*<li>*/}
                  {/*<a href="blank-page.html"><i className="fa fa-fw fa-file"></i> Blank Page</a>*/}
                {/*</li>*/}
                {/*<li>*/}
                  {/*<a href="index-rtl.html"><i className="fa fa-fw fa-dashboard"></i> RTL Dashboard</a>*/}
                {/*</li>*/}
              </ul>
            </div>
          </nav>
          <main>
            {this.props.children}
          </main>
        </div>
    );
  }

});

export default MainLayout;