import React from 'react';

const Card = React.createClass({

  getInitialState: function() {
      return {
          items: []
      };
    },    


  loadCard(listId) {
      var self = this;      
        Trello.get("lists/"+this.props.listId+"/cards", function (response) {
          self.state.items= response          
         });          
      },  


  render() {
    this.loadCard(this.props.listId);
    var items = this.state.items;
    return(
   	<div className="cards" >
      <hr/>
      <h3>CARDS</h3>
        <table id="cards" className="table table-bordered table-striped table-hover" >
        <tbody>
        <tr>
          <td width="250">ID</td>
          <td>NAME</td>
        </tr>
          { items.map((card, i) =>
          <tr>
              <td>{card.id}</td>
              <td>{card.name}</td>
          </tr>)}
        </tbody>
        </table>
      </div>
      )
  }

});

export default Card;
