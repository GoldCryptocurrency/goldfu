(function(){var Notifier,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}};Notifier=function(){function Notifier(){this["switch"]=__bind(this["switch"],this),this.checkOrRequirePermission=__bind(this.checkOrRequirePermission,this),window.Notification||this.removeSwitch(),this.getState(),this.checkOrRequirePermission(),$('input[name="notification-checkbox"]').bootstrapSwitch({labelText:gon.i18n["switch"].notification,state:this.switchOn(),onSwitchChange:this["switch"]})}return Notifier.prototype.checkOrRequirePermission=function(){if(this.switchOn()){if("default"===Notification.permission)return this.requestPermission(this.checkOrRequirePermission);if("denied"===Notification.permission)return this.setStatus(!1),this.removeSwitch()}},Notifier.prototype.removeSwitch=function(){return $(".desktop-real-notification").remove()},Notifier.prototype.setState=function(status){return this.enableNotification=status,Cookies.set("notification",status,30)},Notifier.prototype.getState=function(){return this.enableNotification=Cookies.get("notification")},Notifier.prototype.requestPermission=function(callback){return Notification.requestPermission(callback)},Notifier.prototype["switch"]=function(event,state){return state?(this.setState(!0),this.checkOrRequirePermission()):this.setState(!1)},Notifier.prototype.switchOn=function(){return"true"===this.getState()?!0:!1},Notifier.prototype.notify=function(title,content,logo){var popup;return null==logo&&(logo="/peatio-notification-logo.png"),this.enableNotification===!0||"true"===this.enableNotification?(popup=window.Notification?new Notification(title,{body:content,onclick:onclick,icon:logo}):window.webkitNotifications.createNotification(avatar,title,content),setTimeout(function(){return function(){return popup.close()}}(this),8e3)):void 0},Notifier}(),window.Notifier=Notifier}).call(this);