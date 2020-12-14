AOS.init();
jQuery(function($){
   $("#phone").mask("+7 (999) 999-99-99");
   $("#phone1").mask("+7 (999) 999-99-99");
});

$(document).ready(function(){
   $("#feedback").removeClass("default");
   $(window).scroll(function(){
      if ($(this).scrollTop() > 320) {
         $("#feedback").addClass("default").fadeIn('fast');
      } else {
         $("#feedback").removeClass("default").fadeIn('fast');
      };
   });
   $(window).scroll(function(){
      if ($(this).scrollTop() > 900) {
         $("#feedback").addClass("out").fadeIn('fast');
      } else {
         $("#feedback").removeClass("out").fadeIn('fast');
      };
   });
});

   

