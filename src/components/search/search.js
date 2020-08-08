$(document).ready(function () {
  
  $('.tabs-search__item').on('click', function(e){

    e.preventDefault();
    $('.tabs-search__item').removeClass('tabs-search__item_active');
    $('.box-search__item').removeClass('box-search__item_active');

    $(this).addClass('tabs-search__item_active');
    $($(this).attr('href')).addClass('box-search__item_active');
  });
}); 