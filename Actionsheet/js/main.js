window.Actionsheet = (function() {
	function Actionsheet() {
		this.cfg = {
            titleText:'',
            cancelText: '取消',
            destructiveText: '',
            buttons: [
                        { text: '<b>按钮1</b>' },
                        { text: 'Mov2e' }
                      ],
		}
	}
	Actionsheet.prototype = {
		showActionsheet: function(cfg) {
			var CFG = $.extend(this.cfg, cfg);
			var buttons=CFG.buttons;
			var muiview=$('#contentButton');
			var buttonsOne='';
			//标题
			if(CFG.titleText!=''){
			  CFG.titleText='<li class="mui-table-view-cell mui-table-view-cell-title"><a href="#">'
			+ CFG.titleText
			+ '</a></li>';
			}	
			//删除
			if(CFG.destructiveText!=''){
			  CFG.destructiveText='<li class="mui-table-view-cell mui-table-view-cell-delete"><a href="#">'
			+ CFG.destructiveText
			+ '</a></li>';
			}	
			for (var i=0;i<buttons.length;i++) {
			buttonsOne='<li class="mui-table-view-cell"><a href="#">'
			+ buttons[i].text
			+ '</a></li>'+buttonsOne;				
			}
			var actionsheet = $('<div class="mui-content" id="showactionsheet">' 
			+ '<div class="mui-content-padded">' 
			+ '<div id="picture" class="mui-popover mui-popover-action mui-popover-bottom">' 
			+ '<ul class="mui-table-view" id="contentButton">' 
		    + CFG.titleText
		    + buttonsOne
			+ CFG.destructiveText
			+ '</ul><ul class="mui-table-view">' 
			+ '<li class="mui-table-view-cell">' 
			+ '<a href="#"><b>'
			+ CFG.cancelText
			+ '</b></a></li></ul></div></div></div>');
			actionsheet.appendTo('body');
            btnSure=actionsheet.find('.mui-table-view-cell');            
			btnSure.click(function(){
			CFG.btnSure&&CFG.btnSure($(this).index());
			})
		},
		hideActionsheet: function() {
			$("#showactionsheet").remove();
		}
	}
	return Actionsheet;
})();
