$(document).ready(function () {
    $(".skills-accordian .acord-header").click(function () {


   $(".skills-accordian ul .skills-inner").slideUp();

        
    if (!$(this).next().is(":visible")) {
     $(this).next().slideDown();
        }
    })
})


