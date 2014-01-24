$(document).ready(function () {
    $(".accordian h3").click(function () {


   $(".accordian ul ul").slideUp();

        
    if (!$(this).next().is(":visible")) {
     $(this).next().slideDown();
        }
    })
})


