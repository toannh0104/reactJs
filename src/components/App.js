import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';

function mapStateToProps(state) {
  return {
    boards: state.trello.boards,
    lists: state.trello.lists,
    cards: state.trello.cards,
    loggin: state.trello.login,
    locations: ["Vietnam", "Hanoi", "Bali","Bandung","Bahasa","Jakarta","Yogyakarta"],
    streams: ["CRM", "WFE", "PHP", "MOBI", "SP", ".NET", "Java", "CATA", "RUBY", "PYTH", "C++"]
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
