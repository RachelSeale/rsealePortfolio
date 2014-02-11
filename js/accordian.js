$(document).ready(function () {
    $(".skills-accordian h3").click(function () {


   $(".skills-accordian ul .skills-inner").slideUp();

        
    if (!$(this).next().is(":visible")) {
     $(this).next().slideDown();
        }
    })
})


