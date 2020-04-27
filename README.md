SVGChrtJS
=========

The easiest way to put together a data visualisation in SVG.
------------------------------------------------------------

### Installation

`npm install svgchrtjs`

`<script src=""></script>`

### Usage

```javascript
const SVGChart = require('svgchrtjs');

const data = []; // Your dataset
const options = {}; // How you want the visualisation to look

const Chart = SVGChart.SVGChart(data,options);

Chart.plot = function() {
  /* Remember, this only provides an area
  *  to display your visualisation without
  *  having it clash with titles, subtitles
  *  or your legend. It also easily generates
  *  the legend for you. The flipside of this
  *  is that this then allows you to do
  *  whatever you want with your plot and use
  *  whichever library you see fit.
  */
};

Chart.render();
```

### Reference

#### Available options:

1. background (boolean), default: `true`

   Decides whether or not to give your chart a background to make it stand out from the page. If set to `true` it will provide a `<rect>` element with the class of `chart-background` for styling with CSS, and its `height` and `width` attributes will match those of the parent `<svg>`.

1. canvas (object)

   Contains 4 items:

   1. height (integer), default: `500`

      Determines the height of your visualisation in pixels.

   1. padding (object)

      Contains 4 items: `top`, `right`, `bottom` and `left`, each of which defaults to `10` and provides an inner padding so that your visualisation is not squashed up to the edge of the SVG.

   1. viewBox (string), default: `'0 0 960 500'`

      Determines the viewBox of your `<svg>` and should usually match `0 0 width height`.

   1. width (integer), default: `960`

      Determines the width of your visualisation in pixels.

1. chart (object)

   Contains 1 item:

   1. margin (object)

      Contains 4 items: `top`, `right`, `bottom` and `left`, each of which defaults to `10` and provides a margin around your visualisation so that it can be visually separate from the rest of the elements.

1. description (string), default: `''`

   Provides a description of your visualisation to assistive technologies such as screen readers.

1. id (string), defaut: `''`

   Adds an ID to the parent SVG. **Please include an ID**

1. legend (object)

   Contains 12 items:

   1. background (object)

   Contains 1 item:

      1. display (boolean), default: `false`

         Decides whether or not to add a background to the legend. If it is set to true it will add a `<rect>` element with the class `legend-background` for styling with CSS.

      1. displaceTitle (boolean), default: `false`

         Decides whether the placement of the legend should have an effect on the positioning of the title and subtitle. If it set to true then if `options.legend.position` is set to `top-left`, `left`, `bottom-left`, `top-right`, `right` or `bottom-right` and the `options.legend.orientation` is set to `vertical` then the title and subtitle will shift (and possibly wrap) into their new smaller container.

         If `options.legend.position` is set to `top` or `bottom` or `options.legend.orientation` is set to `horizontal` then this option is ignored.

      1. display (boolean), default: `false`

         Decides whether or not to display the legend.

      1. icons (object)

         Provides a default for the icons contained in each legend item.

         Contains 4 items:

            1. display (boolean), default: `false`

               Determines whether to display an icon.

            1. height (integer), default: `14`

               Determines the height of the icons in pixels.

               **N.B** The `height` property is only applicable to certain SVG elements, in this case the `shape` beneath this defaults to `rect` which takes a height property.

            1. shape (string), default: `'rect'`

               Determines the shape that the icons should take.

            1. width (integer), default: `14`

               Determines the width of the icons in pixels.

               **N.B** The `width` property is only applicable to certain SVG elements, in this case the `shape` above this defaults to `rect` which takes a width property.

      1. itemMargin (object)

      Contains 4 items: `top`, `right`, `bottom` and `left`, each of which defaults to `10` and provides a margin between each legend item to allow them to be visually separate from each other.

      1. items (array), default: `[]`

      An array of objects to be displayed on the legend. Each object must contain a `displayName` property which contains the text that will be displayed, this can either be a string or a function that returns a string. You may also want to include a `class` property to style the icons differently (different fill colours for example) with CSS.

      As you may be pulling in your legend items from a dataset containing many more properties, the library will simply ignore any additional properties.

      If this array is empty then the legend will not display.

      1. layOverChart (boolean), default: `false`

      Decides whether the legend should be displayed on top of the visualisation or resize the visualisation to fit.

      1. margin (object)

      Contains 4 items: `top`, `right`, `bottom` and `left`, each of which defaults to `10` and provides a margin around your visualisation so that it can be visually separate from the rest of the elements.

      1. orientation (string), default: `'vertical'`
      1. padding (object)
      1. position (string), default: `'right'`
      1. title (string), default: `''`
    legend: {
      background: { display: false },
      displaceTitle: false,
      display: false,
      icons: {
        display: false,
        height: 14,
        shape: "rect",
        width: 14
      },
      itemMargin: { top: 5, right: 5, bottom: 5, left: 5 },
      items: [],
      layOverChart: false,
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      orientation: "vertical",
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
      position: "right",
      title: ""
    },
1. subtitle (object)

Contains 3 items:

1.1. display (boolean), default: `false`

Determines whether to display a subtitle on the chart, if it is set to `true` and `options.subtitle.text` is not an empty string, it will provide a `<text>` element with the class of `chart-subtitle` for styling with CSS. Other attributes will be `dy="1em"`, `text-anchor="middle"` and `x` and `y` which the library will calculate. Should the subtitle be too long to fit onto a single line, the `<text>` element will contain 2 or more `<tspan>` elements.

1.1. margin (object)

Contains 4 items: `top`, `right`, `bottom` and `left`, each of which defaults to `10` and provides a margin around your subtitle so that it can be visually separate from the rest of the elements.

1.1. text (string), default: `''`

Contains the text to display as the subtitle, if it is not an empty string and `options.subtitle.display` is set to `true`, it will provide a `<text>` element with the class of `chart-subtitle` for styling with CSS. Other attributes will be `dy="1em"`, `text-anchor="middle"` and `x` and `y` which the library will calculate. Should the subtitle be too long to fit onto a single line, the `<text>` element will contain 2 or more `<tspan>` elements.

1. target (string), default: `''` **REQUIRED**

Targets the container `<div>` or `<section>` where your visualisation is to be displayed. Will throw an error is either left blank or the target element does not exist.

Can target either an element's ID or its querySelector.

1. title (object)

Contains 3 items:

1.1. display (boolean), default: `false`

Determines whether to display a title on the chart, if it is set to `true` and `options.title.text` is not an empty string, it will provide a `<text>` element with the class of `chart-title` for styling with CSS. Other attributes will be `dy="1em"`, `text-anchor="middle"` and `x` and `y` which the library will calculate. Should the title be too long to fit onto a single line, the `<text>` element will contain 2 or more `<tspan>` elements.

1.1. margin (object)

Contains 4 items: `top`, `right`, `bottom` and `left`, each of which defaults to `10` and provides a margin around your subtitle so that it can be visually separate from the rest of the elements.

1.1. text (string), default: `''`

**Please include a title**

Contains the text to display as the title, if it is not an empty string and `options.title.display` is set to `true`, it will provide a `<text>` element with the class of `chart-title` for styling with CSS. Other attributes will be `dy="1em"`, `text-anchor="middle"` and `x` and `y` which the library will calculate. Should the title be too long to fit onto a single line, the `<text>` element will contain 2 or more `<tspan>` elements.

If it is not an empty string then, regardless of whether `options.title.display` is true, it will add a `<title>` element to your SVG to allow assistvie technologies such as screenreaders to see it.
