import React from 'react';
import List from './List';
import {fetchLists } from '../actions/actionCreators';
import store from '../store';
const Board = React.createClass({

    loadData(boardId){
            console.log(boardId);
            var fetchedList = fetchLists(boardId);
            console.log("fetchedList");            
    },

    render() {
        console.log(store);
        console.log("Render Boards")
        
        var boards = this.props.boards;
        var lists = this.props.lists;
        return (
            <div className="warrper" >
                <div className="board">
                    <h2>List of Boards</h2>
                    <table className="table table-hover" style={{width:300}} >
                        <tbody>                        
                            { boards.map((board, i) =>
                                <tr key={i}>
                                  <td className="info" key={i}>
                                      <a onClick={this.loadData.bind(null, board.id) } > {board.name} </a>
                                  </td>
                                </tr>
                            )}                        
                        </tbody>
                    </table>   
                </div>
                <div className="list" >
                    {lists.length > 0 ? (
                        <div>
                            {/* lists.map((list, i) =>
                                <div key={i}>                                  
                                    <a > {list.name} </a>                                  
                                </div>
                            )*/}
                            <List {...this.props} />
                        </div>

                        ) : null }
                </div>
            </div>    
        )
    }
});

export default Board;