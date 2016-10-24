import React from 'react';
import {Pie, Line, HorizontalBar} from 'react-chartjs-2';

import {fetchLists, fetchCards} from '../actions/actionCreators';

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

const List = React.createClass({

    render() {
        console.log("Render List")
        var datasets = [];
        var _yLabels = [];
        var labels = [];
        var labelsData = [];
        var dataCandidateRemaning = [];
        var lists  = this.props.lists;
        var cards  = this.props.cards;
        var locations = this.props.locations;
        var indexLabel = 0;
        for(var i=0; i < lists.length ; i++){
            for (var k = 0; k < cards.length; k++){
                var __labels = cards[k].labels;
                __labels.forEach(function (l, index) {
                    if(labels.indexOf(l.name) === -1 && locations.indexOf(l.name) === -1 ){
                        labels.push(l.name);
                        labelsData.push(l.name)
                    }else{
                        labelsData[l.name] = labelsData[index] === undefined ? 1 : labelsData[index] + 1;
                    }
                })
                _yLabels[i] = lists[i].name;
                if(cards[k].idList === lists[i].id){
                    dataCandidateRemaning[i] = (dataCandidateRemaning[i] === undefined) ? 1: dataCandidateRemaning[i] + 1;
                    continue;
                }
            }
        }
        console.log(labels);
        datasets.push({label: "Candidate remaining", color: "rgba(75,192,192,1)", hoverColor: "'rgba(220,220,220,1)", data: dataCandidateRemaning})
        labels.forEach(function (lblName, _index) {
            datasets.push({
                label: lblName,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: dataCandidateRemaning//[5, 3, 2, 4, 1, 1, 0]
            })
        })
        console.log(datasets);
        var dataLine = {
            labels: _yLabels,
            datasets: datasets
        };

        return (
            <div className="board1">

                <div className="list">
                    <h3>Root List</h3>
                    <Line data={dataLine}/>
                </div>

                {/*
                 <div className="list" >
                 <h3>Root List</h3>
                 <HorizontalBar dataCandidateRemaning={dataHBar} />
                 </div>
                 <div className="list" >
                 <Pie dataCandidateRemaning={dataPie} />
                 </div>
                 */}
            </div>
        )
    }

});

export default List;
