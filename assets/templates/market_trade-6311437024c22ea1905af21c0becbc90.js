(function(){this.JST||(this.JST={}),this.JST["templates/market_trade"]=function(__obj){__obj||(__obj={});var __safe,__out=[],__sanitize=function(value){return value&&value.ecoSafe?value:"undefined"!=typeof value&&null!=value?__escape(value):""},__objSafe=__obj.safe,__escape=__obj.escape;return __safe=__obj.safe=function(value){if(value&&value.ecoSafe)return value;("undefined"==typeof value||null==value)&&(value="");var result=new String(value);return result.ecoSafe=!0,result},__escape||(__escape=__obj.escape=function(value){return(""+value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){var trend;trend=formatter.trend(this.type),__out.push("\n\n<tr id='market-trade-"),__out.push(__sanitize(this.tid)),__out.push("' class='"),__out.push(__sanitize(this.classes)),__out.push('\'>\n  <td class="time text-left col-xs-5"><div>\n    '),__out.push(formatter.trade_time(this.date)),__out.push("\n  </div></td>\n  <td class=\"my text-left col-xs-1\"><div>\n    <i class='fa fa-star'></i>\n  </div></td>\n  <td class='price text-right col-xs-5 "),__out.push(__sanitize(trend)),__out.push("'><div>\n    "),__out.push(formatter.mask_fixed_price(this.price)),__out.push("\n  </div></td>\n  <td class='volume text-right col-xs-5' title='"),__out.push(__sanitize(formatter.fix_bid(this.price*this.amount))),__out.push("'><div>\n    "),__out.push(formatter.mask_fixed_volume(this.amount)),__out.push("\n  </div></td>\n</tr>\n")}).call(this)}.call(__obj),__obj.safe=__objSafe,__obj.escape=__escape,__out.join("")}}).call(this);