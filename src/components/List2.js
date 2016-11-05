import React from 'react';
import {fetchLists, fetchCards} from '../actions/actionCreators';

window.loadPreviosSession = function(){
    if(flexmonster === undefined) return;
    var localBookmark = localStorage.getItem("bookmarks_chart");
    if (localBookmark !== undefined && localBookmark !== null) {
        var currentBookmarks = localStorage.getItem("bookmarks_chart").split(",")
        for(var i=currentBookmarks.length-1; i > 0; i--){
            var bookmark = currentBookmarks[i];
            if (bookmark !== undefined && bookmark.trim() !== '') {
                flexmonster.load(bookmark);
                break;
            }
        }
    }
}

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
        var streams = this.props.streams;
        var locationNames = Object.keys(locations).map(key => locations[key].name);
        var jsonData = [];

    //listId, Title, Stream, labels, date, location
        for(var i = 0; i < lists.length; i++){
            
            for(var j = 0; j < cards.length; j++){
                if(cards[j].idList === lists[i].id){
                    var _entry={};
                    var _title = cards[j].name.split("/");
                    var _labels = cards[j].labels;
                    _entry.list = lists[i].name;                    
                    _entry.title    = _title[0];
                    _entry.job      = _title[1];
                    //_entry.labels   = [];
                    _entry.streams  = "UNKNOWN";                   
                    _entry.location = "UNKNOWN";
                    _labels.forEach(function(label){
                        if(locations.indexOf(label.name.trim()) !== -1){
                            _entry.location = label.name;
                        }
                    //    _entry.labels.push(label.name);
                    })
                    if(_entry.job !== undefined){
                        _entry.job.split(" ").forEach(function(job){
                            if(streams.indexOf(job.trim()) !== -1){
                                _entry.streams = job;
                            }
                        })
                    }
                    jsonData.push(_entry);
                }
                
            }
        }
        console.log(JSON.stringify(jsonData));
        /*
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
        */
        var report = {
            dataSourceType: "json",
            data: jsonData,            
            jsPivotCreationCompleteHandler: "pivotCreationCompleteHandler",
            //licenseKey: "Z544-5U1SI3-3D1H-2J22-0U37-4L2A-0M41-3F"
            
            licenseKey: "Z53G-1T1WC3-1V1M-0L12-2M0A-1233-1I0Y-2Y2Q-1903-322S-0T2C-1I"
            //licenseKey: "Z511-1Q1HCX-0H10-3F11-1I1F-0G2T-071C-1B1G-0T"
            //licenseKey: "Z54J-2U3JG4-3X1G-0F58-0L21-4L2C-2J4H-3803-4W2T-0H58-2H1B-5226-1S1W-5C1A-2852-0P2N-5000-364S"

        };

        function pivotCreationCompleteHandler() {
          window.loadPreviosSession();
        }

        if (window.currentInstancePivot == null) { 
          window.currentInstancePivot = flexmonster.embedPivotComponent(
            "flexmonster/", "pivotContainer", "100%", "500", report, true);
        } else {
          $("pivot-container").append($(window.currentInstancePivot)); 
            flexmonster.setReport(report);
        
        }



/*
        if(typeof pivot === "undefined" || window.currentInstancePivot === undefined || window.currentInstancePivot === "undefined"){
            window.currentInstancePivot = flexmonster.embedPivotComponent("flexmonster/", "pivotContainer", "100%", "500", report, true);
            
        }else{
            window.currentInstancePivot.setReport(report);
            //console.log(pivot);
            window.currentInstancePivot.refresh();
        }
           */
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
