/**
 * @file
 * Placeholder file for custom sub-theme behaviors.
 *
 */
(function ($, Drupal) {

  /**
   * Use this behavior as a template for custom Javascript.
   */
  Drupal.behaviors.exampleBehavior = {
    attach: function (context, settings) {
      //alert("I'm alive!");
    }
  };

  /**
   * Some things do not need to be wrapped in a behavior.
   */
  $(document).ready(function() {

    // Load Foundation scripts.
    $(document).foundation();

    // Remove our flash-of-unstyled-content marker once the foundation script
    // has run.
    $('html').removeClass('fouc-js');

    // Hide the header as the user scrolls down and then show it again as the
    // user scrolls up.
    headerUpDown();

  });

  // This function initializes behavior which will hide the header as the user
  // scrolls down the page, and then show the header again as the user scrolls
  // back up.
  function headerUpDown() {
    var $header = $('.header');
    var $window = $(window);
    var headerHeight = $header.outerHeight();
    var lastScrollTop = $window.scrollTop();
    var delta = 5;

    $('body:not(.path-frontpage) .main-wrapper').css('padding-top', headerHeight);
    $header.addClass('header--fixed');

    if (lastScrollTop > 0){
      $header.addClass('header--down');
    }

    $window.on('scroll', Foundation.util.throttle(function(e){
      var st = $(this).scrollTop();

      // Make sure they scroll more than delta
      if (Math.abs(lastScrollTop - st) <= delta)
          return;
      
      // If they scrolled down and are past the header, add class .header--up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > headerHeight){
        // Scroll Down
        $header.removeClass('header--down').addClass('header--up').css('top', -1 * headerHeight);
      } else {
        // Scroll Up
        // If the user scrolls all the way to the top (or past it, in which case
        // st is less than zero), remove the header--down class and fix the
        // header in place.
        if (st <= 0) {
          $header.removeClass('header--up').removeClass('header--down').css('top', 0);
        }
        // If did not scroll past the document (possible on mac)...
        else if (st + $window.height() < $(document).height()) {
          $header.removeClass('header--up').addClass('header--down').css('top', 0);
        }
      }
      
      lastScrollTop = st;
    }, 250));
  }

})(jQuery, Drupal);
