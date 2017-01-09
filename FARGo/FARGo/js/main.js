$(document).ready(function () {
    html = "<div class=\"footer1Div\">"
         + "<p> Hi! My name is Pedro Barros and I've developed this website as a self-tought project."
         + " The goal was to explore and get acquainted with HTML, CSS, and JavaScript (jQuery) tecnhologies, while manipulating RSS feeds (in XML).</p>"
         + "</div>"
         + "<div class=\"footer2Div\">"
         + "<p>During a collegue course, me and a collegue of mine developed an ASP.NET project similar to this one."
         + " However, in order to explore new tools (for me, anyway), I decided to implement parts of that project, and the result was <b>FARGo</b>.</p>"
         + "</div>"
         + "<div class=\"footer2Div\">"
         + "<p><b>FARGo</b> intends to be a funnier way to reed RSS feeds. For me, someone whom likes pop culture news, especially everything concerning cinema, this website represents a much engageding alternative to all plain and boring rss feed readers out there."
         + "</p>"
         + "</div>"
         + "<div class=\"footer2Div\">"
         + "<p>Long story short, building this website allowed me to make good use of my downtime by developing new skills.</p>"
         + "</div>"
         + "<div class=\"footer3Div\">"
         + "<p>Pedro Barros | Last Update: Decembre 2016</p></div>";

    $("#footer").append(html);
});

(function ($) {
	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

   })

	/*----------------------------------------------------*/
	/*	Sticky Navigation
	------------------------------------------------------*/
   $(window).on('scroll', function() {

		var y = $(window).scrollTop(),
		    topBar = $('header');
     
	   if (y > 1) {
	      topBar.addClass('sticky');
	   }
      else {
         topBar.removeClass('sticky');
      }
    
	});

   /*----------------------------------------------------*/
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------*/
	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");	

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');			

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		}, 

		offset: '25%'

	});

	/*----------------------------------------------------*/
  	/* Smooth Scrolling
  	------------------------------------------------------*/
  	$('.smoothscroll').on('click', function (e) {
	 	
	 	e.preventDefault();

   	var target = this.hash,
    	$target = $(target);

    	$('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });

  	});
})(jQuery);