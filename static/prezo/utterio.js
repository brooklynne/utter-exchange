/**
 * utterio.js
 *
 * utterio.js is a lightweight transition effect helper for impress.js.
 *
 * Fact: Capybaras are the world's largest rodent and are closely related
 * to beavers.  They will eat your funiture if you don't watch them closely.
 *
 * Copyright 2013 GeekCEO, Inc. (@kordless)
 *
 * Released under the MIT and GPL Licenses.
 *
 * ------------------------------------------------
 *  author:  Kord Campbell
 *  version: 0.0.1
 *  url:     http://github.com/utterio/
 */
/* 
Native FullScreen JavaScript API
-------------
Assumes Mozilla naming conventions instead of W3C for now
*/

// utterio stuff
var utterio = (function () {

  // simple left to right, 90 flip per slide, last slide forward center 
  function linearflip (numslides) {
    var mathbits = [];
  	var xstep = 1500;
  	var rxstep = 50;
    
    // first numslides-1 slides
  	for (var i=0; i<numslides-1; i++) {
      mathbits.push({
        'data-x': (i*xstep).toString(),
        'data-y': "0",
        'data-z': "0",
        'data-rotate-x': (i*rxstep).toString(),
        'data-rotate-y': "0",
        'data-rotate-z': "0",
        'data-scale': "1",
      });
    }

    // last slide centered, slightly forward
  	var xhalfway = (xstep*numslides-1)/2-800;
  	var rxhalfway = (rxstep*numslides-1)/2;
    mathbits.push({
      'data-x': (xhalfway).toString(),
      'data-y': "0",
      'data-z': "0",
      'data-rotate-x': (rxhalfway).toString(),
      'data-rotate-y': "0",
      'data-rotate-z': "0",
      'data-scale': "4",
    });
    
    return mathbits;
  }

  // twisty drill layout
  function drillntwist (numslides) {
    var mathbits = [];
    var xstep = 90;
    var zstep = 1000;
    var rzstep = 180;
    
    // first numslides-1 slides
    for (var i=0; i<numslides; i++) {
      mathbits.push({
        'data-x': (i*zstep).toString(),
        'data-y': "0",
        'data-z': (i*zstep).toString(),
        'data-rotate-x': "0",
        'data-rotate-y': "0",
        'data-rotate-z': (i*rzstep).toString(),
        'data-scale': "2",
      });
    }

    return mathbits;
  }

  // public methods
  return {
    start: function (params) {
      var effect = params.effect;

      // find all our slides
      var slides = [];
      $("#prezo>div").each(function () {
        slides.push(this);
      });

      // run algos on the slides
      var mathbits = [];
      switch(effect) {
      	case 'linearflip':
      	  mathbits = linearflip(slides.length);
      	  break;
        case 'drillntwist':
          mathbits = drillntwist(slides.length);
          break;
      	default:
      	  mathbits = linearflip(slides.length);
      }

      // apply attrs from algo to slides for impress to do it's stuff
      $.each(slides, function(i, el) {
      	$(el).attr('id', 'slide-'+i);
      	$(el).attr('class', 'step');
      	for(var attr in mathbits[i]) {
      	  $(el).attr(attr, mathbits[i][attr]);
      	}
      });

      // fire up impress and show our content
      impress().init();
      $('body').show();

      // if we're not framed, show controls with fullscreen button
      if (getParameterByName('framed') != 'true') {
        $('.framed').show();
        $("#controls").slideDown("fast");
      }
     
      // keyboard functions
      $(document).keyup(function(e) {
        if (e.keyCode == 27) { 
          if ($("#controls").is(":hidden")) {
            $("#controls").slideDown("fast");
          } else {
            $("#controls").slideUp("fast");
          }
        }
        if (e.keyCode == 70) {
          if ($(document).fullScreen() == false) {
            $(document).fullScreen(true);
          } else {
            $(document).fullScreen(false);           
          }
        }
        if (e.keyCode == 83) {
          var url = window.location.pathname+window.location.search;
          window.location.href = url;
        }
        if (e.keyCode == 67) {
          if ($("#controls").is(":hidden")) {
            $("#controls").slideDown("fast");
          } else {
            $("#controls").slideUp("fast");
          }
        }
        if (e.keyCode == 66) {
          if ($("#controls").is(":hidden")) {
            $("#controls").slideDown("fast");
            $(document).fullScreen(false);
          } else {
            $("#controls").slideUp("fast");
            $(document).fullScreen(true);
          }
        }
      });

      var e = jQuery.Event("keyup");
      // buttons translated to keypress
      $("#fullscreen").click(function() {    
        e.keyCode = 70;
        $("body").trigger(e);
      });
      $("#start").click(function() {    
        e.keyCode = 83;
        $("body").trigger(e);
      });
      $("#prev").click(function() {    
        impress().prev();
      });
      $("#next").click(function() {    
        impress().next();
      });
      $("#close").click(function() {    
        if ($("#controls").is(":hidden")) {
          $("#controls").slideDown("fast");
        } else {
          $("#controls").slideUp("fast");
        }
      });
    }
  };

})(jQuery, document);

/*
 jquery.fullscreen 1.1.4
 https://github.com/kayahr/jquery-fullscreen-plugin
 Copyright (C) 2012 Klaus Reimer <k@ailis.de>
 Licensed under the MIT license
 (See http://www.opensource.org/licenses/mit-license)
*/
function d(b){var c,a;if(!this.length)return this;c=this[0];c.ownerDocument?a=c.ownerDocument:(a=c,c=a.documentElement);if(null==b){if(!a.cancelFullScreen&&!a.webkitCancelFullScreen&&!a.mozCancelFullScreen)return null;b=!!a.fullScreen||!!a.webkitIsFullScreen||!!a.mozFullScreen;return!b?b:a.fullScreenElement||a.webkitCurrentFullScreenElement||a.mozFullScreenElement||b}b?(b=c.requestFullScreen||c.webkitRequestFullScreen||c.mozRequestFullScreen)&&(Element.ALLOW_KEYBOARD_INPUT?b.call(c,Element.ALLOW_KEYBOARD_INPUT):
b.call(c)):(b=a.cancelFullScreen||a.webkitCancelFullScreen||a.mozCancelFullScreen)&&b.call(a);return this}jQuery.fn.fullScreen=d;jQuery.fn.toggleFullScreen=function(){return d.call(this,!d.call(this))};var e,f,g;e=document;e.webkitCancelFullScreen?(f="webkitfullscreenchange",g="webkitfullscreenerror"):e.mozCancelFullScreen?(f="mozfullscreenchange",g="mozfullscreenerror"):(f="fullscreenchange",g="fullscreenerror");jQuery(document).bind(f,function(){jQuery(document).trigger(new jQuery.Event("fullscreenchange"))});
jQuery(document).bind(g,function(){jQuery(document).trigger(new jQuery.Event("fullscreenerror"))});

/* parameter parser */
function getParameterByName(name){name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");var regexS = "[\\?&]" + name + "=([^&#]*)";var regex = new RegExp(regexS);var results = regex.exec(window.location.search);if(results == null)return "";else return decodeURIComponent(results[1].replace(/\+/g, " "));}











