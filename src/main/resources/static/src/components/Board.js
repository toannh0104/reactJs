import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';

const Board = React.createClass({   

    getInitialState: function() {        
        return {
            isShowList: false
        };
      },    

     handleClick(boardId) {
        console.log("board")
        this.setState({
            isShowList: true,
            currentBoard: boardId
        }) 
        console.log(this.state);       
        ReactDOM.render(<List boardId={boardId}/>, document.getElementById("lists"));
      },

    render() {
        console.log("Render Boards")
        $("#cards").remove();
            return (            
                <div className="board">
                    <h2>BOARS LIST</h2>
                    <table id="board" className="table table-bordered table-striped table-hover" >
                    <tbody>
                        <tr className="head text-center" >
                            <td width="250">ID</td>
                            <td>NAME</td>
                        </tr>
                        { this.props.boards.map((board, i) =>
                            <tr key={i} >
                                <td>{board.id}</td>
                                <td><a onClick={this.handleClick.bind(null, board.id)} > {board.name} </a></td>
                            </tr> 
                        )}
                    </tbody>
                    </table>
                </div>    

            )       
    }
});

export default Board;