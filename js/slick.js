/**
 * @file
 * Slick slider settings.
 *
 */
(function ($, Drupal) {

  /**
   * Trigger slick for slideshow components.
   */
  Drupal.behaviors.runSlick = {
    attach: function (context, settings) {

      // Find all slideshows on page...
      $(".slideshow").each(function (index) {

        var totalSlides = $(this).find(".slick-hero .slide").length;

        $(this).find(".slick-hero").slick(
          {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: true,
            fade: true
          }
        );
        //  Slick navigation 
        $(this).find(".slick-hero-nav-thumbnails").slick({
          slidesToShow: totalSlides,
          slidesToScroll: 1,
          asNavFor: $(this).find(".slick-hero"),
          dots: false,
          focusOnSelect: true
        });
      });
    }
  };

})(jQuery, Drupal);
