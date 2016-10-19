import React from 'react';
import Card from './Card';

const List = React.createClass({

	 getInitialState: function() {
      console.log("Init state list") 
        return {
            isShowCard: false,
            items: []
        };
      },    

     loadList(boardId) {
      var self = this;
        Trello.get("boards/"+this.props.boardId+"/lists?fields=name,idList,url", function (response) {
          self.state.items= response          
         });          
      },  

       handleClick(listId) {
        console.log("clicked");
        this.setState({
            isShowCard: true,
            currentList: listId
        }) 
        console.log(this.state);       
        
      },

  render() {
   	console.log("Render List")          
    this.loadList(this.props.boardId);
    var items = this.state.items;
    return (
      <div className="list" >
      <hr/>
       <h3>LISTS</h3>
        <table id="lists" className="table table-bordered table-striped table-hover" >
        <tbody>
        <tr>
          <td width="250">ID</td>
          <td>NAME</td>
        </tr>
          { items.map((list, i) =>
          <tr>
              <td>{list.id}</td>
              <td><a onClick={this.handleClick.bind(null, list.id)} >{list.name}</a></td>
          </tr>)}
        </tbody>
        </table>

        {this.state.isShowCard ? <Card listId={this.state.currentList} /> : null}
      </div>
      )
  }

});

export default List;
