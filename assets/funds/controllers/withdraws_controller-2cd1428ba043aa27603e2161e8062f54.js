(function(){app.controller("WithdrawsController",["$scope","$stateParams","$http","$gon","fundSourceService","ngDialog",function($scope,$stateParams,$http,$gon,fundSourceService,ngDialog){var currency,current_user,defaultFundSource,fund_sources,_selectedFundSourceId,_selectedFundSourceIdInList;return _selectedFundSourceId=null,_selectedFundSourceIdInList=function(list){var fs,_i,_len;for(_i=0,_len=list.length;_len>_i;_i++)if(fs=list[_i],fs.id===_selectedFundSourceId)return!0;return!1},$scope.currency=currency=$stateParams.currency,$scope.current_user=current_user=$gon.current_user,$scope.name=current_user.name,$scope.account=Account.findBy("currency",$scope.currency),$scope.balance=$scope.account.balance,$scope.withdraw_channel=WithdrawChannel.findBy("currency",$scope.currency),$scope.selected_fund_source=function(newId){return angular.isDefined(newId)?_selectedFundSourceId=newId:_selectedFundSourceId},$scope.fund_sources=function(){var fund_sources;return fund_sources=fundSourceService.filterBy({currency:currency}),_selectedFundSourceId&&_selectedFundSourceIdInList(fund_sources)||fund_sources.length&&$scope.selected_fund_source(fund_sources[0].id),fund_sources},defaultFundSource=fundSourceService.defaultFundSource({currency:currency}),defaultFundSource?_selectedFundSourceId=defaultFundSource.id:(fund_sources=$scope.fund_sources(),fund_sources.length&&(_selectedFundSourceId=fund_sources[0].id)),$scope.$watch(function(){return fundSourceService.defaultFundSource({currency:currency})},function(defaultFundSource){return defaultFundSource?$scope.selected_fund_source(defaultFundSource.id):void 0}),this.withdraw={},this.createWithdraw=function(currency){var account,data,otp,type,withdraw_channel;return withdraw_channel=WithdrawChannel.findBy("currency",currency),account=withdraw_channel.account(),data={withdraw:{member_id:current_user.id,currency:currency,sum:this.withdraw.sum,fund_source:_selectedFundSourceId}},(current_user.app_activated||current_user.sms_activated)&&(type=$(".two_factor_auth_type").val(),otp=$("#two_factor_otp").val(),data.two_factor={type:type,otp:otp},data.captcha=$("#captcha").val(),data.captcha_key=$("#captcha_key").val()),$(".form-submit > input").attr("disabled","disabled"),$http.post("/withdraws/"+withdraw_channel.resource_name,data).error(function(responseText){return $.publish("flash",{message:responseText})})["finally"](function(_this){return function(){return _this.withdraw={},$(".form-submit > input").removeAttr("disabled"),$.publish("withdraw:form:submitted")}}(this))},this.withdrawAll=function(){return this.withdraw.sum=Number($scope.account.balance)},$scope.openFundSourceManagerPanel=function(){var className,template;return $scope.currency===$gon.fiat_currency?(template="/templates/fund_sources/bank.html",className="ngdialog-theme-default custom-width"):(template="/templates/fund_sources/coin.html",className="ngdialog-theme-default custom-width coin"),ngDialog.open({template:template,controller:"FundSourcesController",className:className,data:{currency:$scope.currency}})},$scope.sms_and_app_activated=function(){return current_user.app_activated&&current_user.sms_activated},$scope.only_app_activated=function(){return current_user.app_activated&&!current_user.sms_activated},$scope.only_sms_activated=function(){return current_user.sms_activated&&!current_user.app_activated},$scope.$watch(function(){return $scope.currency},function(){return setTimeout(function(){return $.publish("two_factor_init")},100)})}])}).call(this);