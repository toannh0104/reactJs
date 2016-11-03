import React from 'react';
import List from './List';
import {fetchLists } from '../actions/actionCreators';
const Board = React.createClass({

    getInitialState(){
        return{
            currentBoardId: -1
        }
    },

    loadData(boardId){
            var fetchedList = fetchLists(boardId);
            this.state.currentBoardId = boardId;
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
                                      <a id={board.id} onClick={this.loadData.bind(null, board.id) } > {board.name} </a>
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
                            <List boardId={this.state.currentBoardId} {...this.props} />
                        </div>

                        ) : null }
                </div>
            </div>    
        )
    }
});

export default Board;