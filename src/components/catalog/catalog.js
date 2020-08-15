$(document).ready(function () {
  
  $('.filter-style').styler();

  $('.form-filter__title-drop, .form-filter__extra').on('click', function () {

    $(this).toggleClass('form-filter__title-drop_active');
    $(this).next().slideToggle(200);
  });

  $(".js-range-slider").ionRangeSlider({
    type: "double",
  });

});