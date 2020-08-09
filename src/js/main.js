//GLOBAL SCRIPT FOR TABS
$(document).ready(function () {
  
  $('.tab').on('click', function(e){

    e.preventDefault();
    $('.tab').removeClass('tab_active');
    $('.tabs-content').removeClass('tabs-content_active');

    $(this).addClass('tab_active');
    $($(this).attr('href')).addClass('tabs-content_active');
  });
});
//