!function(b){b.fn.slideto=function(a){return a=b.extend({slide_duration:"slow",highlight_duration:3e3,highlight:!0,highlight_color:"#FFFF99"},a),this.each(function(){obj=b(this),b("body").animate({scrollTop:obj.offset().top},a.slide_duration,function(){a.highlight&&b.ui.version&&obj.effect("highlight",{color:a.highlight_color},a.highlight_duration)})})}}(jQuery);