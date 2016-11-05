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
        var labels = [];  
        var lists = this.props.lists;
        var cards = this.props.cards;
        var locations = this.props.locations;
        var streams = this.props.streams;
        var locationNames = Object.keys(locations).map(key => locations[key].name);
        var jsonData = [];

        for(var i = 0; i < lists.length; i++){
            for(var j = 0; j < cards.length; j++){
                if(cards[j].idList === lists[i].id){
                    var _entry={};
                    var _title = cards[j].name.split("/");
                    var _labels = cards[j].labels;
                    _entry.list = lists[i].name;                    
                    _entry.title    = _title[0];
                    _entry.job      = _title[1];
                    _entry.labels   = [];
                    _entry.streams  = "UNKNOWN";                   
                    _entry.location = "UNKNOWN";
                    _labels.forEach(function(label){
                        if(locations.indexOf(label.name.trim()) !== -1){
                            _entry.location = label.name;
                        }
                        _entry.labels.push(label.name);

                    })
                    _entry.labels = _entry.labels.toString();
                    if(_entry.job !== undefined){
                        _entry.job.split(" ").forEach(function(job){
                            if(streams.indexOf(job.trim()) !== -1){
                                _entry.streams = job;
                                _labels.forEach(function(label){
                                    if(label.name === job){
                                        _entry.color = label.color;
                                    }
                                })
                            }
                        })
                    }
                    jsonData.push(_entry);
                }
                
            }
        }
        console.log(jsonData);
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
          flexmonster.setReport(report);
        }

        if (window.currentInstancePivot == null) { 
          window.currentInstancePivot = flexmonster.embedPivotComponent(
            "flexmonster/", "pivotContainer", "100%", "500", report, true);
        } else {
          $("pivot-container").append($(window.currentInstancePivot)); 
            flexmonster.setReport(report);
        }
        flexmonster.load("init.xml");
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
