
var interval;
var inProgress = false;

// Redirect project
var $_GET=[];
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(a,name,value){$_GET[name]=value;});
var project = $_GET['project'];
if (project != null && project.toLowerCase() == "keepassdx") {
    window.location.replace("https://www.keepassdx.com/contribution.html");
}

$(document).ready(function() {
    /**
    * Manage Langages
    **/
    var _ = document.webL10n.get;

    //return prefered langage
    var language="en";
    if (navigator.browserLanguage)
        language = navigator.browserLanguage;
    else
        language = navigator.language;
    if(language.toLowerCase().includes("fr"))
        language = "fr";
    else
        language = "en";

    // Change langage
    document.webL10n.setLanguage(language);
    $('html').attr('lang', language);
    language = language.substr(0,1).toUpperCase()+language.substr(1);
    $('#language-text').text(language);

    $('#menu-language a').on('click', function() {
        language = $(this).text();
        $('#language-text').text(language);
        $('html').attr('lang', language.substr(0,1).toLowerCase()+language.substr(1));
        document.webL10n.setLanguage(language);
    });

    // Tabs Table
    var hideColumn = function(tabTh) {
        if(!tabTh.hasClass('col-active')) {
            $.each($('.tab-col'), function(keyTab, nodeTab) {
                    $($(nodeTab).data('col')).addClass('col-hidden');
                    $(nodeTab).removeClass('col-active');
            });

            initHiddenClick();

            $(tabTh.data('col')).removeClass('col-hidden');
            tabTh.addClass('col-active');
        }
    }

    // For each click on hidden element
    var initHiddenClick = function() {
        $('.col-hidden').bind('click.kunzisoftEvent', function() {
            var dataColumn = $(this).data('col');
            var tab = $('.tab-col').filter('[data-col="'+dataColumn+'"]');
            hideColumn(tab);
        });
    }

    if($( window ).width() < 600) {
        // Init hidden elements
        $.each($('.tab-col'), function(keyTab, nodeTab) {
                if(!$(this).hasClass('col-active')) {
                        $($(this).data('col')).addClass('col-hidden');
                }
        });

        // For each click on tab
        $('.tab-col').bind('click.kunzisoftEvent', function() {
                hideColumn($(this));
        });

        initHiddenClick();
    } else {
        $('.col-hidden').unbind('click.kunzisoftEvent');
        $('.col-hidden').removeClass('col-hidden');
        $('.tab-col').unbind('click.kunzisoftEvent');
    }
    
    // Select formula
    var checkFormula = function(formula) {
    	console.log(formula);
    	var radioFormula = $('input:radio[name=formula]')
    	radioFormula.removeAttr("checked");
    	radioFormula.filter('[value="'+formula+'"]').attr('checked', true);
    }

    $('.col-1').on('click', function() {
    	checkFormula('libre');
    });
    $('.col-2').on('click', function() {
    	checkFormula('open');
    });
    $('.col-3').on('click', function() {
    	checkFormula('pro');
    });

    // Color projects
    $('.project').css('background', function( index ) {
        if($(this).data('color-gradient') != undefined) {
                return 'linear-gradient('+$(this).data('color')+', '+$(this).data('color-gradient')+')';
        } else
        return $(this).data('color');
    });

    // Animation for scrolling
    $('.scrollTo').on('click', function() { // Au clic sur un élément
        var page = $(this).attr('href'); // Page cible
        var speed = 750; // Durée de l'animation (en ms)
        $('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
        return false;
    });

    // Swipe carousel
    $("#projects-carousel").carousel()

    // Send quote mail
    $('.quote-email').on('click', function() {
    var formula = $('input:radio[name=formula]:checked').val();
        $(location).attr('href', 'mailto:'+$(this).attr('data-email')+'?subject='
            + encodeURIComponent(_('emailSubject', { formula: formula }))
            + "&body="
            + encodeURIComponent(_('emailBody'))
        );
    });

    var visibleNavbar = function() {
        $('.navbar').removeClass("navbar-transparent");
        $('.navbar').addClass("navbar-default");
    }

    var transparentNavbar = function() {
        $('.navbar').addClass("navbar-transparent");
        $('.navbar').removeClass("navbar-default");
    }

    /**
    * Listen to scroll to change header opacity class
    */
    function checkScroll() {
        var startY = $('.navbar').height() * 2; //The point where the navbar changes in px
        if($('.navbar-toggle').attr('aria-expanded') == "true") {
            visibleNavbar();
        } else if($(window).scrollTop() <= startY){
            transparentNavbar();
        } else{
            visibleNavbar();
        }
    }

    $('.navbar-toggle').on("click", function(){
        if($('.navbar-toggle').attr('aria-expanded') == "true") {
            transparentNavbar();
        } else {
            visibleNavbar();
        }
    });

    if($('.navbar').length > 0){
        $(window).on("scroll load resize", function(){
                        checkScroll();
        });
    }
});
