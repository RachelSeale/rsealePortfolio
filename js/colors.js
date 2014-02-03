function randomColor () {
  var colors = [
    {
      main: '#F76AB6',
      comp: '#6AF7AB'
    },{
      main: '#6AA5F7',
      comp: '#F7BC6A'
    },{
      main: '#F5C4EC',
      comp: '#C4F5CD'
    },{
      main: '#FF6691',
      comp: '#7762FC'
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
