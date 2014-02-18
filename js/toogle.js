$(document).ready(function(){
	$(".minus").hide();
	$('.acord-header').click(function(){
		$(this).find(".plus , .minus").toggle();
	});
    
    /*$('.acord-header').click(function(){
		$(".show_hide").show();
	    $(".slidingDiv").hide();
	});*/

});