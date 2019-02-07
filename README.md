# Duo Foundation

A custom starter theme for Drupal 8 that incorporates a component library and living style guide, and is based on Foundation 6.5.3.

## Foundation

Refer to the Foundation docs to see all the various classes, mixins, etc. that are available to you:

https://foundation.zurb.com/sites/docs/

The following styles are included by default:

* [Global styles](https://foundation.zurb.com/sites/docs/global.html) - font sizing, colors
* [Form styles](https://foundation.zurb.com/sites/docs/forms.html)
* [Typography](https://foundation.zurb.com/sites/docs/typography-base.html) (headings, paragraphs, links, lists, blockquotes, code, horizontal lines)
* [XY flexbox grid](https://foundation.zurb.com/sites/docs/xy-grid.html)
* [Buttons](https://foundation.zurb.com/sites/docs/button.html), [button groups](https://foundation.zurb.com/sites/docs/button-group.html) and [close buttons](https://foundation.zurb.com/sites/docs/close-button.html)
* [Labels](https://foundation.zurb.com/sites/docs/label.html)
* [Tables](https://foundation.zurb.com/sites/docs/table.html)
* [Pagination](https://foundation.zurb.com/sites/docs/pagination.html)
* [Accordions](https://foundation.zurb.com/sites/docs/accordion.html)
* [Tabs](https://foundation.zurb.com/sites/docs/tabs.html)
* [Menus and menu icons](https://foundation.zurb.com/sites/docs/menu.html)
* [Drilldown](https://foundation.zurb.com/sites/docs/drilldown-menu.html) and [dropdown](https://foundation.zurb.com/sites/docs/dropdown-menu.html) menus
* [Off canvas](https://foundation.zurb.com/sites/docs/off-canvas.html) navigation and title bar
* [Top bar](https://foundation.zurb.com/sites/docs/top-bar.html)
* [Float](https://foundation.zurb.com/sites/docs/float-classes.html), [flexbox](https://foundation.zurb.com/sites/docs/flexbox-utilities.html) and [visibility](https://foundation.zurb.com/sites/docs/visibility.html) classes

The following JavaScript libraries are included globally (on all pages) by default:

* Foundation core
* Drilldown
* Dropdown
* Offcanvas

### Add or remove Foundation styles

Include or exclude styles by commenting or uncommenting the Foundation includes in scss/styles.scss

### Add or remove Foundation JavaScript libraries

All Foundation libraries are defined in duo_foundation.libraries.yml. Include them as needed in template files or globally. For example, to include the accordion library in a template file for an accordion component, add the following to the template file:

`{{ attach_library('duo_foundation/foundation.accordion') }}`

## Styleguide

The gulp file included with this theme is configured to compile a KSS styleguide (https://github.com/kss-node/kss-node) on `gulp watch`. The styleguide can be found in the `./styleguide` directory.

To add an entry to the styleguide, include a SCSS comment block in the following format in any partial:

```SCSS
// Basic
//
// Button style can be applied to links, button elements, and inputs.
//
// :hover - Hover state
// :focus - Focused state
// :active - Active state
//
// Markup:
// <a href="about.html" class="button {{modifier_class}}">A link tag button</a>
// <button type="button" class="button {{modifier_class}}">A button element</button>
// <input type="submit" class="button {{modifier_class}}" value="An input button" />
//
// Weight: 10
//
// Styleguide base.button.basic
```

For more information about KSS styleguide syntax, see https://github.com/kss-node/kss/blob/spec/SPEC.md.

## Components library

This theme is configured to work with a components library. Components can be defined in the `components` directory. A component includes a .twig template file, an associated SCSS or JS file (both are optional), and a .json file which provides sample content. See `components/card` as an example. The .twig file defined in the component can then be included by a .twig.html file in the `templates/` directory. See https://www.mediacurrent.com/blog/integrating-components-drupal-8-part-1/ for a thorough walkthrough of how this works.

If you need to use Foundation mixins in your component partials, include the following in the partial:

`@include 'foundation';`

## How to compile CSS and create the styleguide

This process has been tested with the following versions:

* nodejs - v.9.11.2
* npm - v.6.4.1
* gulp cli - v.1.4.0

First, see if you have npm installed by running:

  `npm -v`

If not, install npm by downloading the latest nodejs installer from https://nodejs.org/en/. If you run into errors when running `gulp watch` in the last step, or you get errors during the installation process, you may need to downgrade your version of nodejs to v.9.11.2. You can get that version here: https://nodejs.org/en/download/releases/

This might require sudo access.

---

If you've globally installed gulp before, you'll want to remove the old version. To check your version, run:

  `gulp -v`

---

If you simply get "command not found," move on to the next step. Otherwise, if you **don't** see CLI Version 1.x in the output of the command above, remove your old installation of gulp by running:

  `npm rm --global gulp`

---

Install the standalone gulp CLI using:

  `npm install --global gulp-cli`

---

In your terminal, change to the theme's root directory. Run the following command to install the required versions of each of the dependencies:

  `npm install`

---

To have gulp automatically watch and compile your SASS files, and compile the styleguide run the following:

  `gulp watch`

Running `gulp watch` also sets up LiveReload so that your browser will be refreshed every time there's a change in the CSS. You'll need to install the LiveReload plugin for this to work: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en
