function randomColor () {
  var colors = [
    {
      main: '#F76AB6',
      comp: '#6AF7AB'
    },{
      main: '#F5C4EC',
      comp: '#C4F5CD'
    },{
      main: '#FF6691',
      comp: '#FAC975'
    },{
      main: '#F76AB6',
      comp: '#F7BC6A'
    }
  ];
  return colors[ Math.round(Math.random() * (colors.length - 1)) ];  
};

var myColor = randomColor();

$('.title').css('color', myColor.main);
$('.page-title').css('color', myColor.comp);
$('.menu-link').css('background', myColor.comp);
$('.work-skills li').css('background', myColor.comp);
$('.fa-star, .fa-star-half-o, .fa-star-o').css('color', myColor.comp);
$('input').css('border-color', myColor.comp);
$('.skills-inner a').css('color', myColor.main);
$('#blog a').css('color', myColor.comp);
$('#blog span').css('color', myColor.main);
