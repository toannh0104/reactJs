let staticCacheName = 'transport-static-v1';

self.addEventListener('install', function (event) {
  event.waitUntil(
      caches.open(staticCacheName).then(function (cache) {
        return cache.addAll(
            [
              '/',              
              '/static/main.bundle.js'
            ]
        );
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request.clone()).then(function (response) {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          var responseCache = response.clone();
          caches.open(staticCacheName).then(function (cache) {
              if("HEAD" !== event.request.method){
                  cache.put(event.request, responseCache);
              }
          });
          return response;
        });
      })
  );
});

























<config> <dataSource type="csv"> <filename>/flexmonster/data/data.csv</filename> </dataSource> <defaultSlice> <axes> <axis name="rows"> <hierarchy sort="asc"> <dimensionName>Country</dimensionName> <hierarchyName>Country</hierarchyName> </hierarchy> <hierarchy> <dimensionName>[Measures]</dimensionName> <hierarchyName>[Measures]</hierarchyName> </hierarchy> </axis> <axis name="columns"> <hierarchy sort="asc"> <dimensionName>Color</dimensionName> <hierarchyName>Color</hierarchyName> </hierarchy> </axis> <axis name="pages"/> </axes> <measures> <measure aggregation="sum" active="true">Price</measure> <measure aggregation="sum" active="true">Discount</measure> </measures> </defaultSlice> <params> <param name="configuratorActive">true</param> <param name="configuratorButton">true</param> <param name="configuratorMatchHeight">false</param> <param name="viewType">grid</param> <param name="zoom">1</param> <param name="gridTitle"></param> <param name="chartTitle"></param> <param name="showFilter">true</param> <param name="showFilterInCharts">true</param> <param name="showAggregations">true</param> <param name="showHierarchyCaptions">true</param> <param name="showMemberProperties">false</param> <param name="memberProperties"></param> <param name="chartOneLevel">false</param> <param name="chartAutoRange">false</param> <param name="chartReversedAxes">false</param> <param name="chartMultipleMeasures">false</param> <param name="showHeaders">true</param> <param name="showReportFiltersArea">true</param> <param name="editing">false</param> <param name="drillThrough">true</param> <param name="showDrillThroughConfigurator">true</param> <param name="sorting">on</param> <param name="fitGridlines">false</param> <param name="expandAll">false</param> <param name="drillAll">false</param> <param name="showTotals">true</param> <param name="showFiltersExcel">false</param> <param name="showHierarchies">true</param> <param name="showGrandTotals">on</param> <param name="datePattern">dd/MM/yyyy</param> <param name="dateTimePattern">dd/MM/yyyy HH:mm:ss</param> <param name="showChartsWarning">true</param> <param name="showChartOneMeasureSelection">true</param> <param name="showChartMeasures">true</param> <param name="showChartLegendButton">false</param> <param name="saveAllFormats">false</param> <param name="defaultHierarchySortName">asc</param> <param name="ignoreQuotedLineBreaks">true</param> <param name="highlightUpdates">true</param> <param name="classicView">false</param> <param name="flatView">false</param> <param name="useOlapFormatting">false</param> <param name="showDefaultSlice">true</param> <param name="showEmptyData">false</param> <param name="showAllChartLabels">false</param> <param name="showCalculatedValuesButton">true</param> <param name="showOutdatedDataAlert">false</param> <param name="chartType" pieDataIndex="0" labelsHierarchy="" position="bottom" activeMeasure="">bar</param> <param name="localSettingsUrl"></param> </params> <conditions> <condition measure="[Measures].[Discount]"><![CDATA[if(AND(#value > 2000, #value < 4000), 'trueStyle')]]><trueStyle><![CDATA[{"backgroundColor":"#ff9966","color":"#ffffff","fontFamily":"Tahoma","fontSize":13}]]></trueStyle> <falseStyle><![CDATA[{}]]></falseStyle> </condition> </conditions> </config>