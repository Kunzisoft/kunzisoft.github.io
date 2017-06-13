$(document).ready(function() {

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
});
