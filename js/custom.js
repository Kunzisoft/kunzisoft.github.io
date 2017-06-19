function sendMail() {
    var link = "mailto:me@example.com"
             + "?cc=myCCaddress@example.com"
             + "&subject=" + escape("This is my subject")
             + "&body=" + escape(document.getElementById('myText').value)
    ;
    window.location.href = link;
}

$(document).ready(function() {

	/**
	 * Manage Langages
	 **/
  var _ = document.webL10n.get;

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

	// Send quote mail
	$('.quote-email').on('click', function() {
    var formula = $('input:radio[name=formula]:checked').val();
		$(location).attr('href', 'mailto:'+$(this).attr('data-email')+'?subject='
                             + encodeURIComponent(_('emailSubject', { formula: formula }))
                             + "&body="
                             + encodeURIComponent(_('emailBody'))
                           );
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

var canvasDots = function() {
    var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d'),
        colorDot = '#fff',
        color = '#fff';
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 80;
    canvas.style.display = 'block';
    ctx.fillStyle = colorDot;
    ctx.lineWidth = .1;
    ctx.strokeStyle = color;

    var mousePosition = {
        x: 30 * canvas.width / 100,
        y: 30 * canvas.height / 100
    };

    var dots = {
        nb: 600,
        distance: 60,
        d_radius: 100,
        array: []
    };

    function Dot(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = -.1 + Math.random();
        this.vy = -.1 + Math.random();

        this.radius = Math.random();
    }

    Dot.prototype = {
        create: function(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
        },

        animate: function(){
            for(i = 0; i < dots.nb; i++){

                var dot = dots.array[i];

                if(dot.y < 0 || dot.y > canvas.height){
                    dot.vx = dot.vx;
                    dot.vy = - dot.vy;
                }
                else if(dot.x < 0 || dot.x > canvas.width){
                    dot.vx = - dot.vx;
                    dot.vy = dot.vy;
                }
                dot.x += dot.vx;
                dot.y += dot.vy;
            }
        },

        line: function(){
            for(i = 0; i < dots.nb; i++){
                for(j = 0; j < dots.nb; j++){
                    i_dot = dots.array[i];
                    j_dot = dots.array[j];

                    if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
                        if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
                            ctx.beginPath();
                            ctx.moveTo(i_dot.x, i_dot.y);
                            ctx.lineTo(j_dot.x, j_dot.y);
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                }
            }
        }
    };

    function createDots(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(i = 0; i < dots.nb; i++){
            dots.array.push(new Dot());
            dot = dots.array[i];

            dot.create();
        }

        dot.line();
        dot.animate();
    }

    window.onmousemove = function(parameter) {
        mousePosition.x = parameter.pageX;
        mousePosition.y = parameter.pageY;
    }

    mousePosition.x = window.innerWidth / 2;
    mousePosition.y = window.innerHeight / 2;

    setInterval(createDots, 1000/30);
};

window.onload = function() {
    canvasDots();
};
