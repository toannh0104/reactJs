import React from 'react';
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

        var jsonData = [];        
        if(labelObjs.length > 0)  {
          for (var j = 0; j < lists.length; j++) {
            var _data = {};
            _data["Lists"] = lists[j].name;
            for (var i = 0; i < labelObjs.length; i++) {   
                var currentLabel = labelObjs[i].name;            
                var __currentLabelCount = 0;
                for (var k = 0; k < cards.length; k++) {
                    if (cards[k].idList === lists[j].id) {
                      var __labels = cards[k].labels;
                      var __currentLabel = currentLabel;

                      __labels.forEach(function(label){
                        if(label.name === __currentLabel){
                          __currentLabelCount++;
                        }
                      })
                    }
                }
                _data[currentLabel] = __currentLabelCount;                
                continue;
              }
            jsonData.push(_data);
          }
        }                      

        var report = {
            dataSourceType: "json",
            data: jsonData,            
            //licenseKey: "Z544-5U1SI3-3D1H-2J22-0U37-4L2A-0M41-3F"
            
            //licenseKey: "J9QU8-606W5-2R6X5-0G7YZ-VFTKI-XOT1R"
            licenseKey: "Z511-1Q1HCX-0H10-3F11-1I1F-0G2T-071C-1B1G-0T"
        };

        // if (window.flexmonsterView == null) {
           if(window.currentInstancePivot === undefined){
            window.currentInstancePivot = flexmonster.embedPivotComponent("flexmonster/", "pivotContainer", "100%", "500", report, true);
           }else{
            window.currentInstancePivot.setReport(report);
            window.currentInstancePivot.refresh();
           }
        //     window.flexmonsterView = document.getElementById("pivot-container"); // store HTML
        // } else {
        //     $("pivot-container").append($(window.flexmonsterView)); // restore HTML
        //     //setPivotReport();
        // }

        return (
            <div className="board1"></div>
        )
    }

});

export default List;
