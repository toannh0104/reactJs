import React from 'react';
import Card from './Card';
import {Pie} from 'react-chartjs-2';

const List = React.createClass({

	 getInitialState: function() {
      console.log("Init state list") 
        return {
            isShowCard: false,
            items: [],
            cards: []
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
    var self = this;   
    
    var lists = items.map(function(item){
      return item.name;
    })

    for(var j= 0; j < items.length; j++){      
      Trello.get("boards/"+this.props.boardId+"/cards", function (response) {
        self.state.cards = response
      });
    }


    var _labels = [];
    var _data = [];
    var backgroundColor;
    var cards = this.state.cards;
    
    for(var kk=0; kk < items.length -1 ; kk++){
        for (var k = 0; k < cards.length -1; k++){
          _labels[kk] = items[kk].name;
          if(cards[k].idList === items[kk].id){           
             _data[kk] = (_data[kk] === undefined) ? 1: _data[kk]+ 1;          
            continue;
          }
        }
    }


    //var labels = this.state.cards.
    

    var data = {
      labels:_labels,
      datasets: [{
        data: _data,        
        backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ]
      }]
    };

    return (
      <div className="list" >
      <hr/>
       <h3>LISTS</h3>
       <Pie data={data} height={300} />
        <table id="lists" className="table table-bordered table-striped table-hover" >
        <tbody>
        <tr>
          <td width="250">ID</td>
          <td>NAME</td>
        </tr>
          { items.map((list, i) =>
          <tr key={i}>
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
