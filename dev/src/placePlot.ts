/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import { getChartArea } from './layout';

/**
 * placePlot takes an SVGGraphicsElement as its argument and translates it to the correct point on the parent SVG.
 *
 * The return value is void.
 *
 * @param {SVGGraphicsElement} chartArea - the chart area to move.
 *
 */
function placePlot(chartArea: SVGGraphicsElement): void {
  chartArea.setAttribute(
    'transform',
    `translate(${getChartArea().points.x1},${getChartArea().points.y1})`
  );
}

export default placePlot;
