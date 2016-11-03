import React from 'react';

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
        var report = {
            dataSourceType: "json",
            data: jsonData,
            reportcomplete: function() {
                pivot.off("reporteportcomplete");
                pivotTableReportComplete = true;
                console.log("Google chart");
                //createGoogleChart();
              },
            //22//licenseKey: "Z56F-1H3CW5-541N-786H-0U6K-4W2V-2U5I-2A2Y-6U5B-0078-4M14-3Y4F"
            licenseKey: "Z7MC-XCFB6V-5C0B1D-6K6Y2N"
        };



var pivot = $("#pivotContainer").flexmonster({
  report: {
    dataSource: {
      dataSourceType: "json",
      data: jsonData
    },
  },
  slice: {
      rows: [
        {uniqueName: "Category"}
      ],
      columns: [
        {uniqueName: "[Measures]"}
      ],
      measures: [
        {uniqueName: "Price"},
        {uniqueName: "Quantity"},
        {uniqueName: "Discount"}
      ]
    },
    options: {
      viewType: "grid",
      configuratorActive: false,
      grid: {
        type: "compact",
        showHeaders: false
      }
    }
    ,
  height: 221,
  toolbar: true,
  componentFolder: "https://s3.amazonaws.com/flexmonster/2.3/",
  reportcomplete: function() {
    pivot.off("reportcomplete");
    pivotTableReportComplete = true;
    createGoogleChart();
  }
});

var pivotTableReportComplete = false;
var googleChartsLoaded = false;

google.charts.load('current', {'packages':['corechart','sankey']});
google.charts.setOnLoadCallback(onGoogleChartsLoaded);
function onGoogleChartsLoaded() {
  googleChartsLoaded = true;
  if (pivotTableReportComplete) {
    createGoogleChart();
  }
}

function createGoogleChart() {
  if (googleChartsLoaded) {
  
    pivot.googlecharts.getData({}, 
                           drawChart, 
                           drawChart
                          );
                          
    pivot.googlecharts.getData(
      {
        slice: {
          rows: [{uniqueName: "Region"}],
          columns: [{uniqueName: "Category"}, {uniqueName: "[Measures]"}],
          measures: [{uniqueName: "Price"}],
          expandAll: true
        }
      }, 
      drawSankeyChart, 
      drawSankeyChart
    );
    }           
}

function drawChart(_data) {
  var data = google.visualization.arrayToDataTable(_data.data);
      var options = {
        title: 'Speed Tests Results',
        chartArea: {width: '50%'},
        hAxis: {
          title: 'Parses / sec',
          minValue: 0
        },
        vAxis: {
          title: 'JSON source x iterations'
        },
        isStacked: true
      };
      
  var chart = new google.visualization.BarChart(document.getElementById('googlechart'));
  chart.draw(data, options);
}



console.log(pivot);


function drawSankeyChart(_data) {
 
}
    
        return (
            <div className="board1"></div>
        )
    }

});

export default List;
