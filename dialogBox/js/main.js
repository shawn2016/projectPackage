
	var DialogBox=new DialogBox();
	//alert
	$("#alert").click(function(){
DialogBox.alert({
	content:"sssssssssss",
	title:'标题',
	sure:'我知道了',
	sureF:function(){
		console.log('true');
	},
});
	})
	//确认框
	$("#confirm").click(function(){
	DialogBox.confirm({
	content:"sssssssssss",
	title:'标题',
	sure:'我知道了',
	btnSure:function(){
		console.log('sure');
	},
	btnCancle:function(){
		console.log('cancle');
	},
});	
	})
	//输入框
		$("#prompt").click(function(){
	DialogBox.prompt({
	content:"sssssssssss",
	title:'标题',
	sure:'我知道了',
	template: '<input type="text" id="promptinput" class="prompt-input">',
	btnSure:function(){

		console.log($('#promptinput').val());

	},
	btnCancle:function(){
		console.log('cancle');
	},

});	
	})

	
