(function(){app.controller("WithdrawHistoryController",function($scope,$stateParams,$http){var ctrl;return ctrl=this,$scope.predicate="-id",this.currency=$stateParams.currency,this.account=Account.findBy("currency",this.currency),this.withdraws=this.account.withdraws().slice(0,3),this.newRecord=function(withdraw){return"submitting"===withdraw.aasm_state?!0:!1},this.noWithdraw=function(){return 0===this.withdraws.length},this.refresh=function(){return ctrl.withdraws=ctrl.account.withdraws().slice(0,3),$scope.$apply()},this.canCancel=function(state){return["submitting","submitted","accepted"].indexOf(state)>-1},this.cancelWithdraw=function(withdraw){var withdraw_channel;return withdraw_channel=WithdrawChannel.findBy("currency",withdraw.currency),$http["delete"]("/withdraws/"+withdraw_channel.resource_name+"/"+withdraw.id).error(function(responseText){return $.publish("flash",{message:responseText})})},(this.event=function(){return Withdraw.bind("create update destroy",function(){return ctrl.refresh()})})()})}).call(this);