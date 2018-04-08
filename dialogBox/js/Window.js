window.DialogBox=(function(){
 //三部曲
	//构造函数
	var WindowAlert=function(){
		this.cfg={
			content:"内容",
			btnCancle:null,
			btnSure:null,
			title:'标题',
			sure:'wooo'
		}
	}
	//定义方法
	WindowAlert.prototype={
		alert:function(cfg){
			var CFG=$.extend(this.cfg,cfg);			
			var boundingBox=$('<div class="weui_mask"><div class="weui_dialog">'
			+'<div class="weui_dialog_hd"><strong class="weui_dialog_title">'
			+CFG.title
			+'</strong></div>'
			+'<div class="weui_dialog_bd">'
			+CFG.content
			+'</div>'
			+'<div class="weui_dialog_ft">'
//			+'<input type="button" value="确定" />'		
			+'<a href="javascript:;" id="alert_sure" class="weui_btn_dialog primary">'
			+CFG.sure
			+'</a>'
			+'</div></div><div>');
			boundingBox.appendTo('body');
            btnSure=boundingBox.find('#alert_sure')
			btnSure.click(function(){
				CFG.btnSure&&CFG.btnSure();
				boundingBox.remove();
			})

//			boundingBox.css({
//				width:CFG.width+'px',
//				height:CFG.height+'px',
//				left:(CFG.x||(window.innerWidth-CFG.width)/2)+'px',
//				top:(CFG.y||(window.innerHeight-CFG.height)/2)+'px',
//			})
		},
		confirm:function(cfg){
			var CFG=$.extend(this.cfg,cfg);			
			var boundingBox=$('<div class="weui_mask"><div class="weui_dialog">'
			+'<div class="weui_dialog_hd"><strong class="weui_dialog_title">'
			+CFG.title
			+'</strong></div>'
			+'<div class="weui_dialog_bd">'
			+CFG.title
			+'</div>'
			+'<div class="weui_dialog_ft">'
//			+'<input type="button" value="确定" />'
			+'<a href="javascript:;" id="confirm_cancle" class="weui_btn_dialog default">'
			+'取消'
			+'</a>'
			+'<a href="javascript:;" id="confirm_sure" class="weui_btn_dialog primary">'
			+'确定'
			+'</a>'
			+'</div></div><div>');
			boundingBox.appendTo('body');
            btnSure=boundingBox.find('#confirm_sure')
            btnCancle=boundingBox.find('#confirm_cancle')

			btnSure.click(function(){
				CFG.btnSure&&CFG.btnSure();
				boundingBox.remove();
			})
	         btnCancle.click(function(){
				CFG.btnCancle&&CFG.btnCancle();
				boundingBox.remove();
			})
//			boundingBox.css({
//				width:CFG.width+'px',
//				height:CFG.height+'px',
//				left:(CFG.x||(window.innerWidth-CFG.width)/2)+'px',
//				top:(CFG.y||(window.innerHeight-CFG.height)/2)+'px',
//			})
		},
		prompt:function(cfg){
				var CFG=$.extend(this.cfg,cfg);			
			var boundingBox=$('<div class="weui_mask"><div class="weui_dialog">'
			+'<div class="weui_dialog_hd"><strong class="weui_dialog_title">'
			+CFG.title
			+'</strong></div>'
			+'<div class="weui_dialog_bd">'
			+CFG.title
			+CFG.template
			+'</div>'
			+'<div class="weui_dialog_ft">'
//			+'<input type="button" value="确定" />'
			+'<a href="javascript:;" id="prompt_cancle" class="weui_btn_dialog default">'
			+'取消'
			+'</a>'
			+'<a href="javascript:;" id="prompt_sure" class="weui_btn_dialog primary">'
			+'确定'
			+'</a>'
			+'</div></div><div>');
			boundingBox.appendTo('body');
            btnSure=boundingBox.find('#prompt_sure')
            btnCancle=boundingBox.find('#prompt_cancle')

			btnSure.click(function(){
				CFG.btnSure&&CFG.btnSure();
				boundingBox.remove();
			})
	         btnCancle.click(function(){
				CFG.btnCancle&&CFG.btnCancle();
				boundingBox.remove();
			})
//			boundingBox.css({
//				width:CFG.width+'px',
//				height:CFG.height+'px',
//				left:(CFG.x||(window.innerWidth-CFG.width)/2)+'px',
//				top:(CFG.y||(window.innerHeight-CFG.height)/2)+'px',
//			})
		}
	}	
	return WindowAlert;
})()
   

	

