$(function(){
	setTimeout(function(){
		$('.flash').fadeOut();
	}, 2000);
	$(window).on('scroll', function(){
		$('.flash').fadeOut();
	});
});