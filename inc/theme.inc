<?php

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 *
 * Provide region based menu suggestions.
 * https://www.drupal.org/forum/support/theme-development/2017-07-13/extra-template-name-suggestions-for-main-menus-based-on#comment-12627124
 */
function duo_foundation_theme_suggestions_menu_alter(&$suggestions, array $variables) {
  if (isset($variables['attributes']['data-region'])) {
    if (in_array($variables['attributes']['data-region'], array('right_off_canvas', 'left_off_canvas'))) {
      $suggestions[] = 'menu__off_canvas';
    }
    else {
      $suggestions[] = 'menu__' . $variables['attributes']['region'];  
    }
  }
}
