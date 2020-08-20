$(document).ready(function () {

  $('.info-footer__title, .links-footer__title').on('click', function () {

    $(this).toggleClass('active');
    $(this).next().slideToggle(200);
  });

});