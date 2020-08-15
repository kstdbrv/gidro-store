$(document).ready(function () {
  
  $('.filter-style').styler();

  $('.form-filter__title-drop, .form-filter__extra').on('click', function () {

    $(this).toggleClass('form-filter__title-drop_active');
    $(this).next().slideToggle(200);
  });

  $('.filter-btn__grid').on('click', function () {

    $(this).addClass('filter-btn__button_active');
    $('.filter-btn__line').removeClass('filter-btn__button_active');
    $('.product-item__wrapper').removeClass('product-item__wrapper_list');
  });

  $('.filter-btn__line').on('click', function () {

    $(this).addClass('filter-btn__button_active');
    $('.filter-btn__grid').removeClass('filter-btn__button_active');
    $('.product-item__wrapper').addClass('product-item__wrapper_list');
  });

  $('.filter-items__btn').on('click', function () {

    $('.filter-items__btn').removeClass('filter-items__btn_active');
    $(this).addClass('filter-items__btn_active');
  });


  $(".js-range-slider").ionRangeSlider({
    type: "double",
  });

});