$(document).ready(function() {

	/**
	 * Manage Langages
	 **/
	//return prefered langage
	var language;
	if (navigator.browserLanguage)
		language = navigator.browserLanguage;
	else
		language = navigator.language;
	switch (language) {
		case "fr":
			break;
		default:
			language="en";
	}

	// Change langage
	document.webL10n.setLanguage(language);
	language = language.substr(0,1).toUpperCase()+language.substr(1);
	$('#language-text').text(language);

	$('#menu-language a').on('click', function() {
		language = $(this).text();
		$('#language-text').text(language);
		document.webL10n.setLanguage(language);
	});

	// Animation for scrolling
	$('.scrollTo').on('click', function() { // Au clic sur un élément
		var page = $(this).attr('href'); // Page cible
		var speed = 750; // Durée de l'animation (en ms)
		$('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
		return false;
	});

	/**
	 * Listen to scroll to change header opacity class
	 */
	function checkScroll(){
	    var startY = $('.navbar').height() * 2; //The point where the navbar changes in px

	    if($(window).scrollTop() <= startY){
	        $('.navbar').addClass("navbar-transparent");
			    $('.navbar').removeClass("navbar-default");
	    }else{
	        $('.navbar').addClass("navbar-default");
	        $('.navbar').removeClass("navbar-transparent");
	    }
	}

	if($('.navbar').length > 0){
	    $(window).on("scroll load resize", function(){
	        checkScroll();
	    });
	}

});
