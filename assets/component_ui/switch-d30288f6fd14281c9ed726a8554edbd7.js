(function(){this.SwitchUI=flight.component(function(){return this.attributes({"switch":"li > a"}),this.getX=function(){return Cookies.get(this.name())?Cookies.get(this.name()):this.setX(this.defaultX())},this.setX=function(x){return Cookies.set(this.name(),x),x},this.name=function(){return this.$node.attr("id")},this.defaultX=function(){return this.$node.data("x")},this.init=function(){return this.$node.find("[data-x="+this.getX()+"]").click()},this.after("initialize",function(){return this.on(this.select("switch"),"click",function(_this){return function(e){var x;return _this.select("switch").removeClass("active"),$(e.currentTarget).addClass("active"),x=$(e.currentTarget).data("x"),_this.setX(x),_this.trigger("switch::"+_this.name(),{x:x})}}(this)),this.on(document,"switch::"+this.name()+"::init",this.init),this.init()})})}).call(this);