(function(){var COLOR,COLOR_OFF,COLOR_ON,DATETIME_LABEL_FORMAT,DATETIME_LABEL_FORMAT_FOR_TOOLTIP,INDICATOR,RANGE_DEFAULT;"zh-CN"===gon.local&&(DATETIME_LABEL_FORMAT_FOR_TOOLTIP={millisecond:["%m月%e日, %H:%M:%S.%L","%m月%e日, %H:%M:%S.%L","-%H:%M:%S.%L"],second:["%m月%e日, %H:%M:%S","%m月%e日, %H:%M:%S","-%H:%M:%S"],minute:["%m月%e日, %H:%M","%m月%e日, %H:%M","-%H:%M"],hour:["%m月%e日, %H:%M","%m月%e日, %H:%M","-%H:%M"],day:["%m月%e日, %H:%M","%m月%e日, %H:%M","-%H:%M"],week:["%Y年%m月%e日","%Y年%m月%e日","-%m月%e日"],month:["%Y年%m月","%Y年%m月","-%m"],year:["%Y","%Y","-%Y"]}),DATETIME_LABEL_FORMAT={second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%m-%d",week:"%m-%d",month:"%Y-%m",year:"%Y"},RANGE_DEFAULT={fill:"none",stroke:"none","stroke-width":0,r:8,style:{color:"#333"},states:{hover:{fill:"#000",style:{color:"#ccc"}},select:{fill:"#000",style:{color:"#eee"}}}},COLOR_ON={candlestick:{color:"#990f0f",upColor:"#000000",lineColor:"#cc1414",upLineColor:"#49c043"},close:{color:null}},COLOR_OFF={candlestick:{color:"invalid",upColor:"invalid",lineColor:"invalid",upLineColor:"invalid"},close:{color:"invalid"}},COLOR={candlestick:_.extend({},COLOR_OFF.candlestick),close:_.extend({},COLOR_OFF.close)},INDICATOR={MA:!1,EMA:!1},this.CandlestickUI=flight.component(function(){return this.mask=function(){return this.$node.find(".mask").show()},this.unmask=function(){return this.$node.find(".mask").hide()},this.request=function(){return this.mask()},this.init=function(event,data){var _ref;return this.running=!0,null!=(_ref=this.$node.find("#candlestick_chart").highcharts())&&_ref.destroy(),this.initHighStock(data),this.trigger("market::candlestick::created",data)},this.switchType=function(event,data){var chart,colors,key,s,type,val,_i,_len,_ref;for(key in COLOR)val=COLOR[key],_.extend(COLOR[key],COLOR_OFF[key]);if(_.extend(COLOR[data.x],COLOR_ON[data.x]),chart=this.$node.find("#candlestick_chart").highcharts()){for(type in COLOR)for(colors=COLOR[type],_ref=chart.series,_i=0,_len=_ref.length;_len>_i;_i++)s=_ref[_i],null==s.userOptions.algorithm&&s.userOptions.id===type&&s.update(colors,!1);return this.trigger("switch::main_indicator_switch::init")}},this.switchMainIndicator=function(event,data){var chart,indicator,key,s,val,visible,_i,_j,_len,_len1,_ref,_ref1;for(key in INDICATOR)val=INDICATOR[key],INDICATOR[key]=!1;if(INDICATOR[data.x]=!0,chart=this.$node.find("#candlestick_chart").highcharts()){for(_ref=chart.series,_i=0,_len=_ref.length;_len>_i;_i++)s=_ref[_i],"close"===s.userOptions.linkedTo&&s.setVisible(!0,!1);for(indicator in INDICATOR)for(visible=INDICATOR[indicator],_ref1=chart.series,_j=0,_len1=_ref1.length;_len1>_j;_j++)s=_ref1[_j],null!=s.userOptions.algorithm&&s.userOptions.algorithm===indicator&&s.setVisible(visible,!1);return chart.redraw()}},this.default_range=function(unit){return 6e4*unit*100},this.initHighStock=function(data){var component,dataGrouping,range,timeUnits,title,tooltipTemplate,unit;return component=this,range=this.default_range(data.minutes),unit=$("[data-unit="+data.minutes+"]").text(),title=""+gon.market.base_unit.toUpperCase()+"/"+gon.market.quote_unit.toUpperCase()+" - "+unit,timeUnits={millisecond:1,second:1e3,minute:6e4,hour:36e5,day:864e5,week:6048e5,month:26784e5,year:31556952e3},dataGrouping={enabled:!1},tooltipTemplate=JST["templates/tooltip"],DATETIME_LABEL_FORMAT_FOR_TOOLTIP&&(dataGrouping.dateTimeLabelFormats=DATETIME_LABEL_FORMAT_FOR_TOOLTIP),this.$node.find("#candlestick_chart").highcharts("StockChart",{chart:{events:{load:function(_this){return function(){return _this.unmask()}}(this)},animation:!0,marginTop:95,backgroundColor:"rgba(0,0,0, 0.0)"},credits:{enabled:!1},tooltip:{crosshairs:[{width:.5,dashStyle:"solid",color:"#777"},!1],valueDecimals:gon.market.bid.fixed,borderWidth:0,backgroundColor:"rgba(0,0,0,0)",borderRadius:2,shadow:!1,shared:!0,positioner:function(w,h,point){var chart_h,chart_w,grid_h,x,y;return chart_w=$(this.chart.renderTo).width(),chart_h=$(this.chart.renderTo).height(),grid_h=Math.min(20,Math.ceil(chart_h/10)),x=Math.max(10,point.plotX-w-20),y=Math.max(0,Math.floor(point.plotY/grid_h)*grid_h-20),{x:x,y:y}},useHTML:!0,formatter:function(){var chart,dateFormat,dateTimeLabelFormats,fun,index,k,key,series,v;chart=this.points[0].series.chart,series=this.points[0].series,index=this.points[0].point.index,key=this.points[0].key;for(k in timeUnits)if(v=timeUnits[k],v>=series.xAxis.closestPointRange||v<=timeUnits.day&&key%v>0){dateFormat=dateTimeLabelFormats=series.options.dataGrouping.dateTimeLabelFormats[k][0],title=Highcharts.dateFormat(dateFormat,key);break}return fun=function(h,s){return h[s.options.id]=s.data[index],h},tooltipTemplate({title:title,indicator:INDICATOR,format:function(v,fixed){return null==fixed&&(fixed=3),Highcharts.numberFormat(v,fixed)},points:_.reduce(chart.series,fun,{})})}},plotOptions:{candlestick:{turboThreshold:0,followPointer:!0,color:"#990f0f",upColor:"#000000",lineColor:"#cc1414",upLineColor:"#49c043",dataGrouping:dataGrouping},column:{turboThreshold:0,dataGrouping:dataGrouping},trendline:{lineWidth:1},histogram:{lineWidth:1,tooltip:{pointFormat:"<li><span style='color: {series.color};'>{series.name}: <b>{point.y}</b></span></li>"}}},scrollbar:{buttonArrowColor:"#333",barBackgroundColor:"#202020",buttonBackgroundColor:"#202020",trackBackgroundColor:"#202020",barBorderColor:"#2a2a2a",buttonBorderColor:"#2a2a2a",trackBorderColor:"#2a2a2a"},rangeSelector:{enabled:!1},navigator:{maskFill:"rgba(32, 32, 32, 0.6)",outlineColor:"#333",outlineWidth:1,xAxis:{dateTimeLabelFormats:DATETIME_LABEL_FORMAT}},xAxis:{type:"datetime",dateTimeLabelFormats:DATETIME_LABEL_FORMAT,lineColor:"#333",tickColor:"#333",tickWidth:2,range:range,events:{afterSetExtremes:function(e){return"navigator"===e.trigger&&"navigator-drag"===e.triggerOp&&component.liveRange(this.chart)&&!component.running?component.trigger("switch::range_switch::init"):void 0}}},yAxis:[{labels:{enabled:!0,align:"right",x:2,y:3,zIndex:-7},gridLineColor:"#222",gridLineDashStyle:"ShortDot",top:"0%",height:"70%",lineColor:"#fff",minRange:gon.ticker.last?parseFloat(gon.ticker.last)/25:null},{labels:{enabled:!1},top:"70%",gridLineColor:"#000",height:"15%"},{labels:{enabled:!1},top:"85%",gridLineColor:"#000",height:"15%"}],series:[_.extend({id:"candlestick",name:gon.i18n.chart.candlestick,type:"candlestick",data:data.candlestick,showInLegend:!1},COLOR.candlestick),_.extend({id:"close",type:"spline",data:data.close,showInLegend:!1,marker:{radius:0}},COLOR.close),{id:"volume",name:gon.i18n.chart.volume,yAxis:1,type:"column",data:data.volume,color:"#777",showInLegend:!1},{id:"ma5",name:"MA5",linkedTo:"close",showInLegend:!0,type:"trendline",algorithm:"MA",periods:5,color:"#7c9aaa",visible:INDICATOR.MA,marker:{radius:0}},{id:"ma10",name:"MA10",linkedTo:"close",showInLegend:!0,type:"trendline",algorithm:"MA",periods:10,color:"#be8f53",visible:INDICATOR.MA,marker:{radius:0}},{id:"ema7",name:"EMA7",linkedTo:"close",showInLegend:!0,type:"trendline",algorithm:"EMA",periods:7,color:"#7c9aaa",visible:INDICATOR.EMA,marker:{radius:0}},{id:"ema30",name:"EMA30",linkedTo:"close",showInLegend:!0,type:"trendline",algorithm:"EMA",periods:30,color:"#be8f53",visible:INDICATOR.EMA,marker:{radius:0}},{id:"macd",name:"MACD",linkedTo:"close",yAxis:2,showInLegend:!0,type:"trendline",algorithm:"MACD",color:"#7c9aaa",marker:{radius:0}},{id:"sig",name:"SIG",linkedTo:"close",yAxis:2,showInLegend:!0,type:"trendline",algorithm:"signalLine",color:"#be8f53",marker:{radius:0}},{id:"hist",name:"HIST",linkedTo:"close",yAxis:2,showInLegend:!0,type:"histogram",color:"#990f0f"}]})},this.formatPointArray=function(point){return{x:point[0],open:point[1],high:point[2],low:point[3],close:point[4]}},this.createPointOnSeries=function(chart,i,px,point){return chart.series[i].addPoint(point,!0,!0)},this.createPoint=function(chart,data,i){return this.createPointOnSeries(chart,0,data.candlestick[i][0],data.candlestick[i]),this.createPointOnSeries(chart,1,data.close[i][0],data.close[i]),this.createPointOnSeries(chart,2,data.volume[i].x,data.volume[i]),chart.redraw(!0)},this.updatePointOnSeries=function(chart,i,px,point){var last;return chart.series[i].points?(last=chart.series[i].points[chart.series[i].points.length-1],px===last.x?last.update(point,!1):console.log("Error update on series "+i+": px="+px+" lastx="+last.x)):void 0},this.updatePoint=function(chart,data,i){return this.updatePointOnSeries(chart,0,data.candlestick[i][0],this.formatPointArray(data.candlestick[i])),this.updatePointOnSeries(chart,1,data.close[i][0],data.close[i][1]),this.updatePointOnSeries(chart,2,data.volume[i].x,data.volume[i]),chart.redraw(!0)},this.process=function(chart,data){var current,current_point,i,_i,_ref,_results;for(_results=[],i=_i=0,_ref=data.candlestick.length-1;_ref>=0?_ref>=_i:_i>=_ref;i=_ref>=0?++_i:--_i)current=chart.series[0].points.length-1,current_point=chart.series[0].points[current],data.candlestick[i][0]>current_point.x?_results.push(this.createPoint(chart,data,i)):_results.push(this.updatePoint(chart,data,i));return _results},this.updateByTrades=function(event,data){var chart;return chart=this.$node.find("#candlestick_chart").highcharts(),this.liveRange(chart)?this.process(chart,data):this.running=!1},this.liveRange=function(chart){var p1,p2;return p1=chart.series[0].points[chart.series[0].points.length-1].x,p2=chart.series[10].points[chart.series[10].points.length-1].x,p1===p2},this.after("initialize",function(){return this.on(document,"market::candlestick::request",this.request),this.on(document,"market::candlestick::response",this.init),this.on(document,"market::candlestick::trades",this.updateByTrades),this.on(document,"switch::main_indicator_switch",this.switchMainIndicator),this.on(document,"switch::type_switch",this.switchType)})})}).call(this);