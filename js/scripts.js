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
    
  });

})(jQuery, Drupal);
