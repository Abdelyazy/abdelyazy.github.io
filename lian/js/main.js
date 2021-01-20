

// Slider
$('.sl').slick({
   // autoplay: true, 
   dots: true,
   infinite: true,
   speed: 300,
   slidesToShow: 1,
   centerMode: true,
   variableWidth: true
});

// animation
AOS.init();

$(document).ready(function() {
	$('.header__burger').click(function(event) {
		$('.header__burger, .nav__list').toggleClass('active')
		$('.body').toggleClass('lock');
	});
});

