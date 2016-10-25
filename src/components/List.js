import React from 'react';
import {Pie, Line, HorizontalBar} from 'react-chartjs-2';

import {fetchLists, fetchCards} from '../actions/actionCreators';

const List = React.createClass({

    render() {
        console.log("Render List")
        var datasets = [];
        var _yLabels = [];
        var labels = [];
        var labelObjs = [];
        var dataCandidateRemaning = [];
        var lists = this.props.lists;
        var cards = this.props.cards;
        var locations = this.props.locations;
        var locationNames = Object.keys(locations).map(key => locations[key].name);
        var indexLabel = 0;
        var streams = [];
        for (var i = 0; i < lists.length; i++) {
            var labelOnList = 0;
            for (var k = 0; k < cards.length; k++) {
                _yLabels[i] = lists[i].name;
                if (cards[k].idList === lists[i].id) {
                    var __labels = cards[k].labels;

                    __labels.forEach(function (l, index) {
                        if (labels.indexOf(l.name) === -1) {
                            labels.push(l.name);
                            labelObjs.push({name: l.name, color: l.color, data: []});
                        }
                    })
                    
                    if (cards[k].idList === lists[i].id) {
                        dataCandidateRemaning[i] = (dataCandidateRemaning[i] === undefined) ? 1 : dataCandidateRemaning[i] + 1;
                        //continue;
                    }
                }
            }
        }
        console.log("------------" + labelObjs.length);
        for (var i = 0; i < labelObjs.length; i++) {      
          for (var j = 0; j < lists.length; j++) {
            var __currentLabelCount = 0;
            for (var k = 0; k < cards.length; k++) {
                if (cards[k].idList === lists[j].id) {
                  var __labels = cards[k].labels;
                  var __currentLabel = labelObjs[i].name;

                  __labels.forEach(function(label){
                    if(label.name === __currentLabel){
                      __currentLabelCount++;
                    }
                  })
                }
            }
            labelObjs[i].data.push(__currentLabelCount);
            console.log("update arr");
            continue;
          }

        }

        console.log("------------");
        console.log(labelObjs);
        datasets.push({
            label: "Candidates",
            color: "rgba(75,192,192,1)",
            hoverColor: "'rgba(220,220,220,1)",
            data: dataCandidateRemaning
        })
        labelObjs.forEach(function (label, _index) {
            datasets.push({
              hidden:true,
                label: label.name,
                fill: false,
                lineTension: 0.1,
                backgroundColor: label.color,
                borderColor: label.color,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: label.color,
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: label.color,
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: label.data//[5, 3, 2, 4, 1, 1, 0]
            })
        })
        console.log(datasets);
        var dataLine = {
            labels: _yLabels,
            datasets: datasets
        };
        var chartOptions = {

            title: {
                display: true,
                text: 'Dardboard'
            }
        }




const dataHBar = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const dataPie = {
    labels: [
        'Red',
        'Green',
        'Yellow'
    ],
    datasets: [{
        data: [300, 50, 100],
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

console.log("___________________");
console.log(dataLine)
        return (
            <div className="board1">
            
            <h1/>

<table>
    { 
      _yLabels.map((label, i) =>
        <tr key={i}>
          <td>{label}</td>

          {
            datasets.map((ds, j) =>
            <td>
              {ds.label}
            </td>

          )}
          
        </tr>)
    }
</table>
{/*
                <div className="list">
                    <h3>Root List</h3>
                    <Line data={dataLine} options={chartOptions} height="150"/>
                </div>
                 <div className="list" >
                 <HorizontalBar data={dataLine} />
                 </div>
*/}
               
                
                 
                 
            </div>
        )
    }

});

export default List;
