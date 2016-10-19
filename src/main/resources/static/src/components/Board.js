import React from 'react';
import List from './List';

const Board = React.createClass({   

    getInitialState: function() {
        return {
            isShowList: false
        };
      },    

     handleClick(boardId) {
        console.log("board click");
        this.setState({
            isShowList: true,
            currentBoard: boardId
        }) 
        console.log(this.state);   
        this.render();    
      },

    render() {
        console.log("Render Boards")
        $("#cards").remove();
            return (
                <div className="boards board" >
                <h2>BOARS LIST</h2>
                <table id="board" className="table table-bordered table-striped table-hover" >
                <tbody>
                    <tr className="head text-center" >
                        <td width="250">ID</td>
                        <td>NAME</td>
                    </tr>
                    { this.props.boards.map((board, i) =>
                        <tr>
                            <td>{board.id}</td>
                            <td><a onClick={this.handleClick.bind(null, board.id)} > {board.name} </a></td>
                        </tr>                      
                        
                    )}
                </tbody>
                </table>
                {this.state.isShowList ? <List boardId={this.state.currentBoard} /> : null}
                </div>

            )       
    }
});

export default Board;