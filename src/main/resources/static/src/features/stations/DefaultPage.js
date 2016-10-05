import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';
import memobind from 'memobind';

import AutoComplete from 'material-ui/AutoComplete';
import SelectFiled from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const dateDays = [
    'Weekday',
    'Saturday',
    'Sunday'
];
const dataSourceConfig = {
    text: 'stop_name',
    value: 'stop_name'
}

export class DefaultPage extends Component {
  static propTypes = {
    stations: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  constructor(props){
      super(props);
      this.state = {
          departure:'',
          arrival:'',
          date:''
      }
  }
  componentWillMount(){
      this.props.actions.fetchInitialData();
  }

  // handle function
  handleDateChange(event, index, date){
      this.setState({
          date
      });
  }
  
  handleDepartureChange(value){
    this.setState({
        departure: value.stop_name
    });
  }
  handleArrivalChange(value){
    this.setState({
        arrival: value.stop_name
    });
  }
  validateForm (){
      const hasError = !this.state.arrival.trim()||!this.state.departure.trim()||!this.state.date.trim();
      return !hasError;
  }

  handleSubmit(evt){
      evt.preventDefault();
      if(!this.validateForm()) return;
      this.props.actions.fetchSearchData(this.state.departure, this.state.arrival, this.state.date);
  }

  renderLoading(){
      return (
          <div>loading</div>
      );
  }
  render() {
    const { fetchInitialPending, fetchInitialDataError, fetchSearchResultPending, searchResultError  } = this.props.stations;
    if(fetchInitialPending||!this.props.stations.initialData) {
        return this.renderLoading();
    }
    return (
      <div className="stations-default-page">
            <Card>
                <CardTitle title="Transport Scheme"/>
                <CardActions>
                    <form className="searchForm" onSubmit={this.handleSubmit.bind(this)}>
                            <AutoComplete
                                floatingLabelText = "Departure Stop" 
                                filter = {AutoComplete.fuzzyFilter}
                                dataSource = {this.props.stations.initialData.stopList}
                                dataSourceConfig = {dataSourceConfig}
                                onNewRequest = {this.handleDepartureChange.bind(this)} 
                                fullWidth={true}
                            />
                            <AutoComplete
                                floatingLabelText = "Arrival Stop" 
                                dataSource = {this.props.stations.initialData.stopList}
                                dataSourceConfig = {dataSourceConfig}
                                filter = {AutoComplete.fuzzyFilter}
                                onNewRequest = {memobind(this,'handleArrivalChange')}
                                fullWidth={true}
                            />

                            <SelectFiled
                                className="SelectField"
                                value={this.state.date}
                                onChange={this.handleDateChange.bind(this)}
                                floatingLabelText="Choose A Day"
                                fullWidth={true}
                                >
                                {
                                    dateDays.map(item =>(
                                        <MenuItem key={item} value={item} primaryText={item} />
                                    ))
                                }   
                            </SelectFiled>
                            <RaisedButton  primary={true} type="submit" disabled={fetchInitialPending||!this.validateForm()}  label={fetchInitialPending?"Searching":"Search"} />
                    </form>

                </CardActions>
                {
                    this.props.stations.searchResultData && this.props.stations.searchResultData.length>0 && 
                        <CardText>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHeaderColumn>Departure </TableHeaderColumn>
                                        <TableHeaderColumn>Arrival </TableHeaderColumn>
                                        <TableHeaderColumn>Duration </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        this.props.stations.searchResultData.map(item => (
                                            <TableRow key={item.id}>
                                                <TableRowColumn>{item.departure_time}</TableRowColumn>
                                                <TableRowColumn>{item.arrival_time}</TableRowColumn>
                                                <TableRowColumn>{item.duration}</TableRowColumn>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </CardText>
                }
            </Card>

            {this.props.stations.searchResultData && this.props.stations.searchResultData.length==0 &&
                <div>no more data!</div>
             }
            
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    stations: state.stations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
