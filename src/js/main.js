//GLOBAL SCRIPT FOR TABS
$(document).ready(function () {
  
  $('.tab').on('click', function(e){
    e.preventDefault();

    $($(this).siblings()).removeClass('tab_active');
    $($(this).parent().parent().siblings().find('div')).removeClass('tabs-content_active');

    $(this).addClass('tab_active');
    $($(this).attr('href')).addClass('tabs-content_active');

    $('.product-slider').slick('setPosition');
  });
});
//