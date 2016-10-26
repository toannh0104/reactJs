import React from 'react';
import List from './List2';
import {fetchLists } from '../actions/actionCreators';
const Board = React.createClass({

    loadData(boardId){
            console.log(boardId);
            var fetchedList = fetchLists(boardId);
            console.log("fetchedList");            
    },

    render() {
        var boards = this.props.boards;
        var lists = this.props.lists;
         //$("#pivotContainer").empty();
        return (
            <div className="warrper" >
                <div className="board">
                    <h3>Boards</h3>
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