(function(){window.sfx_warning=function(){return window.sfx("warning")},window.sfx_success=function(){return window.sfx("success")},window.sfx=function(kind){var s;return s=$("#"+kind+"-fx")[0],"false"!==Cookies.get("sound")&&s.play?(s.pause(),s.currentTime=0,s.play()):void 0}}).call(this);