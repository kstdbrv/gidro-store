$(document).ready(function () {

  $('.icon-menu').click(function (event) {
    $('.icon-menu,.menu-mobile__list').toggleClass('active');
    $('body').toggleClass('lock');
  });
  
});