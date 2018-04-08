window.Alert = (function() {
	function Alert() {
		this.cfg = {
            title:'',
            content: '结果是成功的',
            status: 'success',
		}
	}
	Alert.prototype = {
		alert: function(cfg) {
			var CFG = $.extend(this.cfg, cfg);			
			var alert = $('<div id="myAlert" class="alert alert-'
			+CFG.status
			+'">'
			+'<a href="#" class="close" data-dismiss="alert">&times;</a>'
			+'<strong>'
			+CFG.title
			+'</strong>&nbsp;&nbsp;&nbsp;&nbsp;'
			+CFG.content
		    +'</div>');		 
			alert.appendTo('body');       
		}
	}
	return Alert;
})();
