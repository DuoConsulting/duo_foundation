# Duo Foundation

A custom starter theme for Drupal 8 that incorporates a component library and living style guide, and is based on **Foundation 6.5.3**. When developing a new theme, clone this theme and rename it appropriately for the new site. Search for all filenames that include `duo_foundation` and all instances of code that include the string `duo_foundation` and replace them with your new theme machine name.

This theme is **not intended to be used as a parent theme**, so it is not necessary to have a copy of this theme in your project once you have cloned it.

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

The default values for all the various Foundation variables can be found in `./scss/_settings.scss.` All the variables defined there are built-in to Foundation, with the exception of a handful of custom colors and fonts which appear at the very top of the file. That should be the first place you go to update basic styles for the theme, before creating your own custom styles.

The following JavaScript libraries are included globally (on all pages) by default:

* Foundation core
* Drilldown
* Dropdown
* Offcanvas

### Add or remove Foundation styles

Include or exclude Foundation styles by commenting or uncommenting the includes in `./scss/styles.scss`. For example, if you would like to include the CSS required to style  Foundation badges, then you should uncomment this line in `styles.scss`:

`@include foundation-badge;`

### Add or remove Foundation JavaScript libraries

All Foundation libraries are defined in duo_foundation.libraries.yml. Include them as needed in template files or globally. For example, to include the accordion library in a template file for an accordion component, add the following to the template file:

`{{ attach_library('duo_foundation/foundation.accordion') }}`

### Foundation and NPM
The Foundation framework is included as an NPM package in the `./node_modules` directory. It will be installed when you run `npm ci` for the first time (see Compiling CSS further down). The gulpfile for this project specifies the path to Foundation in the array of include paths to use when compiling the CSS. This is what enables gulp/sass to find all the Foundation mixins that you will use in the theme, including the mixins in `styles.scss` which pull in the styles for the various Foundation components.

### Block placement

To get started, try placing the following blocks in the following regions:
* Header
  * Main navigation
* Messages
  * Status messages
* Highlighted
  * Help
* Tools
  * Primary admin actions
  * Tabs
* Page Title
  * Page title
* Content
  * Main page content
* Right Off Canvas
  * Main navigation

## Styleguide

The gulp file included with this theme is configured to compile a KSS styleguide (https://github.com/kss-node/kss-node) on `gulp watch-styleguide` (or `npm run watch-styleguide` within a docker container). The styleguide can be found in the `./styleguide` directory.

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

If you would like to update the look/feel of the styleguide itself, you can edit the twig templates and SCSS in `./styleguide-config/duo-kss-builder`.

For more information about KSS styleguide syntax, see https://github.com/kss-node/kss/blob/spec/SPEC.md.

## Components library

This theme is configured to work with a components library. Components can be defined in the `components` directory. A component includes a .twig template file, an associated SCSS or JS file (both are optional), and a .json file which provides sample content. See `components/card` as an example. The .twig file defined in the component can then be included by a .twig.html file in the `templates/` directory. See https://www.mediacurrent.com/blog/integrating-components-drupal-8-part-1/ for a thorough walkthrough of how this works.

If you need to use Foundation mixins and/or your theme variables in your component partials, include the following in the partial:

`@import 'settings';`

## Gulp

CSS is compiled for this theme via Gulp. All gulp tasks are defined in `./gulpfile.js`. The following build tasks are defined:

* `gulp` - Kicks off `gulp build`, below.
* `gulp build` - Compile the global CSS and components CSS and run the lint tool.
* `gulp watch` - Same as above but continue watching for changes to SCSS files.
* `gulp build-styleguide` - Same as `gulp build` but it also generates the styleguide. Note that this task takes a little longer to compile.
* `gulp watch-styleguide` - Same as above but continue watching for changes to SCSS files.

There are a handful of NPM tasks defined in package.json which correlate to these gulp tasks. You can use these NPM tasks within a Docker container to compile CSS:

* `npm run start` - Kicks off `gulp build`.
* `npm run build` - Kicks off `gulp build-styleguide`.
* `npm run watch` - Kicks off `gulp watch`.
* `npm run watch-styleguide` - Kicks off `gulp watch-styleguide`.

## Linting

All the gulp tasks include a step to test using Sass Lint (https://github.com/sasstools/sass-lint/tree/master). See `./.sass-lint.yml` for a complete list of which lint rules are enabled and disabled. The default configuration is just a recommendation and can be adjusted as needed per project. Disabling rules for a single line or block (and sometimes an entire partial) is ok as long as you're not "cheating." An example is if you're including CSS from a vendor plugin and you do not want to rewrite all the CSS to conform to our linting rules.

## Compile CSS and Create the Styleguide

If you are running the site locally via docksal (recommended), you can do the following to **WATCH** and compile your SASS using the same versions of node/npm used by the build process:

    $ fin bash (to SSH into the docker container)

    $ cd /var/www/docroot/themes/custom/duo_foundation

    $ npm ci (you only need to do this once)

    $ npm run watch, or $ npm run watch-styleguide to compile both the theme CSS and the styleguide.

If you are **NOT** running the site locally via docksal, you can follow the steps below to compile directly on your local machine, though this is more prone to error due to inconsistent versions of nodejs/npm/gulp cli on different machines.

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

  `gulp watch` or `gulp watch-styleguide` to compile both the theme CSS and the styleguide.
