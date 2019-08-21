<?php

/**
 * @file
 * Any code related to menus.
 */

use Drupal\Core\Link;

/**
 * Implements theme_menu_local_tasks().
 */
function duo_foundation_menu_local_tasks(&$variables) {
  $output = '';

  if (!empty($variables['primary'])) {
    $variables['primary']['#prefix'] = '<h2 class="visually-hidden">' . t('Primary tabs') . '</h2>';
    $variables['primary']['#prefix'] .= '<div class="button-group">';
    $variables['primary']['#suffix'] = '</div>';
    $output .= drupal_render($variables['primary']);
  }
  if (!empty($variables['secondary'])) {
    $variables['secondary']['#prefix'] = '<h2 class="visually-hidden">' . t('Secondary tabs') . '</h2>';
    $variables['secondary']['#prefix'] .= '<div class="button-group">';
    $variables['secondary']['#suffix'] = '</div>';
    $output .= drupal_render($variables['secondary']);
  }

  return $output;
}

/**
 * Implements theme_menu_local_task().
 */
function duo_foundation_menu_local_task(&$variables) {
  $link = $variables['element']['#link'];
  $link_text = [
    '#markup' => $link['title'],
  ];

  if (!empty($variables['element']['#active'])) {
    // Add text to indicate active tab for non-visual users.
    $link_text['#suffix'] = '<span class="visually-hidden">' . t('(active tab)') . '</span>';
  }

  $state = !empty($variables['element']['#active']) ? 'active' : 'secondary';
  $link['url']->setOption('attributes', ['class' => ['button', $state]]);

  $a_tag = Link::fromTextAndUrl($link_text, $link['url'])->toString();

  return $a_tag;
}

/**
 * Implements theme_preprocess_menu__off_canvas().
 *
 * Adds the appropriate submenu class to off canvas menus.
 */
function duo_foundation_preprocess_menu__off_canvas(&$variables) {
  $blocks = \Drupal::service('block.repository')->getVisibleBlocksPerRegion();
  foreach (['left', 'right'] as $direction) {
    if (!empty($blocks[$direction . '_off_canvas'])) {
      foreach ($blocks[$direction . '_off_canvas'] as $block) {
        $plugin = $block->getPlugin();
        if ($plugin->getBaseId() == 'system_menu_block') {
          $menu_name = str_replace('-', '_', $plugin->getDerivativeId());
          if ($variables['theme_hook_original'] == 'menu__' . $menu_name) {
            $variables['attributes']['class'][] = $direction . '-submenu';
            break;
          }
        }
      }
    }
  }
}
