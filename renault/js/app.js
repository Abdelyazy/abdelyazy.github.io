// mask
jQuery(function($){
  $("#phone").mask("+7 (999) 999-9999");
});

// Sorting
$('.sorting').on('click', 'li', function() {
  $('.model__item')
    .addClass('hide')
    .filter(`.${this.dataset.f}`)
    .removeClass('hide');
});


$('.sorting').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', '.sorting__item', function() {
    $buttonGroup.find('.active').removeClass('active');
    $(this).addClass('active');
  });
});

// headerBurger
$(document).ready(function () {
  $('.header__burger').click(function(event) {
    $('.header__burger').toggleClass('active');
    $('.navigation__list').toggleClass('active');
    $('body').toggleClass('active');
 });
});


// carColor
$(document).ready(function() {
$('.car__color-item').click(function(event) {
  $('.car__color-item').removeClass('active');
  $(this).toggleClass('active');
});

$('.car__color-inner').on('click', '[data-image]', function() {
  $('.car__img-list img').attr('src', this.dataset.image);
});
});



// packagingModal
$(document).ready(function() {
  $('.packaging__name').on('click', function(){
    $('.packaging__modal-price').removeClass('active');
    $(this)
      .closest('.packaging__item')
      .find('.packaging__modal-info')
      // .toggleClass('active');
      .toggleClass('active');
});
$('.new__price').on('click', function(){
  $('.packaging__modal-info').removeClass('active');
  $(this)
    .closest('.packaging__item')
    .find('.packaging__modal-price')
    // .toggleClass('active');
    .toggleClass('active');
});
});

// popup
//  popup
$(document).ready(function() {
  $('.call__btn').click(function(event) {
     $('.popup').toggleClass('active')
     $('body').css({"overflow": "hidden"})
  });
  $('.cross').click(function(event) {
     $('.popup').removeClass('active')
     $('body').css({"overflow": "auto"})
  });
});




