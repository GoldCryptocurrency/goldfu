(function(){app.service("accountService",["$filter","$gon",function($filter,$gon){return{filterBy:function(filter){return $filter("filter")($gon.accounts,filter)},findBy:function(filter){var result;return result=this.filterBy(filter),result.length?result[0]:null}}}])}).call(this);