import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';

function mapStateToProps(state) {
	console.log("Reduxstagram render");
  return {
    boards: state.trello.boards,
    lists: state.trello.lists,
    cards: state.trello.cards,
    loggin: state.trello.login
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
