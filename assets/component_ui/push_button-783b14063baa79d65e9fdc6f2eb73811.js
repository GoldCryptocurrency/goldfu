(function(){this.PushButton=flight.component(function(){return this.attributes({buttons:".type-toggle button"}),this.setActiveButton=function(event){return this.select("buttons").removeClass("active"),$(event.target).closest("button").addClass("active")},this.after("initialize",function(){return this.on(this.select("buttons"),"click",this.setActiveButton)})})}).call(this);