import React from 'react';
import {fetchLists, fetchCards} from '../actions/actionCreators';

const List = React.createClass({

    render() {
        console.log("Render List")
        $("#pivotContainer").empty();
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
            licenseKey: "Z511-1Q1HCX-0H10-3F11-1I1F-0G2T-071C-1B1G-0T"
        };
        
        flexmonster.embedPivotComponent("flexmonster/", "pivotContainer", "100%", "500", report, true);

        return (
            <div className="board1">
            
            <h1/>
            </div>
        )
    }

});

$(document).ready(function(){
    //load current state
    var currentBookmarks = localStorage.getItem("bookmarks_chart").split(",")
    var bookmarksElement = $("#fm-tab-bookmarks");
    if (bookmarksElement.length === 0) {
        $("#fm-tab-fields").after('' +
            '<li id="fm-tab-bookmarks" style=" float: right; ">' +
            '<a href="javascript:void(0)"><span>bookmarks</span></a>' +
            '<div class="fm-dropdown fm-shadow-container" style="display: none;">' +
            '<ul class="fm-dropdown-content"> ' +
            '</ul>' +
            '</div>' +
            '</li>');
    }

    currentBookmarks.forEach(function(bookmark){
        $("#mt-tab-bookmarks ul li:last").append('' +
            '<li class="fm-tab-bookmarks-item">' +
            '<span>'+bookmark+'</span>' +
            '<a href="javascript:removeTrelloBookmark(\''+bookmark+'\')">' +
            '<i class="glyphicon glyphicon-remove" style="padding-top: 10px;padding-right: 10px;float: right;"></i></a></li> '
        );
    })


})


export default List;
