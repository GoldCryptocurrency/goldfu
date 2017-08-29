(function(){window.GlobalData=flight.component(function(){return this.refreshDocumentTitle=function(event,data){var brand,market,price,symbol;return symbol=gon.currencies[gon.market.bid.currency].symbol,price=data.last,market=[gon.market.ask.currency,gon.market.bid.currency].join("/").toUpperCase(),brand="Peatio Exchange",document.title=""+symbol+price+" "+market+" - "+brand},this.refreshDepth=function(data){var asks,asks_sum,bids,bids_sum,la,lb,mid,offset,_ref;return asks=[],bids=[],_ref=[0,0],bids_sum=_ref[0],asks_sum=_ref[1],_.each(data.asks,function(_arg){var price,volume;return price=_arg[0],volume=_arg[1],0===asks.length||price<100*_.last(asks)[0]?asks.push([parseFloat(price),asks_sum+=parseFloat(volume)]):void 0}),_.each(data.bids,function(_arg){var price,volume;return price=_arg[0],volume=_arg[1],0===bids.length||price>_.last(bids)[0]/100?bids.push([parseFloat(price),bids_sum+=parseFloat(volume)]):void 0}),la=_.last(asks),lb=_.last(bids),la&&lb?(mid=(_.first(bids)[0]+_.first(asks)[0])/2,offset=Math.min.apply(Math,[Math.max(.1*mid,1),.8*(mid-lb[0]),.8*(la[0]-mid)])):null==la&&lb?(mid=_.first(bids)[0],offset=Math.min.apply(Math,[Math.max(.1*mid,1),.8*(mid-lb[0])])):la&&null==lb&&(mid=_.first(asks)[0],offset=Math.min.apply(Math,[Math.max(.1*mid,1),.8*(la[0]-mid)])),this.trigger("market::depth::response",{asks:asks,bids:bids,high:mid+offset,low:mid-offset})},this.refreshTicker=function(data){var buy,last,last_buy,last_last,last_sell,market,sell,ticker,tickers;if(!this.last_tickers){for(market in data)ticker=data[market],data[market].buy_trend=data[market].sell_trend=data[market].last_trend=!0;this.last_tickers=data}return tickers=function(){var _results;_results=[];for(market in data)ticker=data[market],buy=parseFloat(ticker.buy),sell=parseFloat(ticker.sell),last=parseFloat(ticker.last),last_buy=parseFloat(this.last_tickers[market].buy),last_sell=parseFloat(this.last_tickers[market].sell),last_last=parseFloat(this.last_tickers[market].last),buy!==last_buy?data[market].buy_trend=ticker.buy_trend=buy>last_buy:ticker.buy_trend=this.last_tickers[market].buy_trend,sell!==last_sell?data[market].sell_trend=ticker.sell_trend=sell>last_sell:ticker.sell_trend=this.last_tickers[market].sell_trend,last!==last_last?data[market].last_trend=ticker.last_trend=last>last_last:ticker.last_trend=this.last_tickers[market].last_trend,market===gon.market.id&&this.trigger("market::ticker",ticker),_results.push({market:market,data:ticker});return _results}.call(this),this.trigger("market::tickers",{tickers:tickers,raw:data}),this.last_tickers=data},this.after("initialize",function(){var global_channel,market_channel;return this.on(document,"market::ticker",this.refreshDocumentTitle),global_channel=this.attr.pusher.subscribe("market-global"),market_channel=this.attr.pusher.subscribe("market-"+gon.market.id+"-global"),global_channel.bind("tickers",function(_this){return function(data){return _this.refreshTicker(data)}}(this)),market_channel.bind("update",function(_this){return function(data){return gon.asks=data.asks,gon.bids=data.bids,_this.trigger("market::order_book::update",{asks:data.asks,bids:data.bids}),_this.refreshDepth({asks:data.asks,bids:data.bids})}}(this)),market_channel.bind("trades",function(_this){return function(data){return _this.trigger("market::trades",{trades:data.trades})}}(this)),gon.ticker&&this.trigger("market::ticker",gon.ticker),gon.tickers&&this.refreshTicker(gon.tickers),gon.asks&&gon.bids&&(this.trigger("market::order_book::update",{asks:gon.asks,bids:gon.bids}),this.refreshDepth({asks:gon.asks,bids:gon.bids})),gon.trades?this.trigger("market::trades",{trades:gon.trades.reverse()}):void 0})})}).call(this);