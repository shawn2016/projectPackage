/* 代码整理：懒人之家 www.lanrenzhijia.com */

$(function(){   
	$('.pic').hover(function(){
		var $height = $(this).find('div').height();
		     $height = $height/2 - $height;
		$(this).find('div').stop().animate({top:$height});	
	},function(){
		$(this).find('div').stop().animate({top:"0"});
	});
});