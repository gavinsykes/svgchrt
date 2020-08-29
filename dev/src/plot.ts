/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import appendSVGChild from './appendSVGChild';
import { getChartArea } from './layout';

/**
 * plot takes an SVGGraphicsElement as its argument. It generates a `<rect>` element onto which it applies a fill colour and width and height to cover the whole chartable area.
 *
 * The return value is void.
 *
 * @param {SVGGraphicsElement} chartArea - the chartable area to represent.
 *
 */
function plot(chartArea: SVGGraphicsElement): void {
  appendSVGChild('rect', chartArea, {
    fill: '#F808',
    width: getChartArea().width,
    height: getChartArea().height
  });
}

export default plot;
