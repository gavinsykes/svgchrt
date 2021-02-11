/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import appendSVGChild from './appendSVGChild';
import {Datum, SettingsObject, SCInterface} from './interfaces';
import { getChartArea } from './layout';

/**
 * plot takes an SVGGraphicsElement as its argument. It generates a `<rect>` element onto which it applies a fill colour and width and height to cover the whole chartable area.
 *
 * The return value is void.
 *
 * @param {SVGGraphicsElement} chartArea - the chartable area to represent.
 *
 */
function plot(caller: SCInterface, settings: SettingsObject, data: Datum<unknown>[] = []): void {
  appendSVGChild('rect', caller.chartArea as SVGGraphicsElement, {
    fill: '#F808',
    width: getChartArea().width,
    height: getChartArea().height
  });
  appendSVGChild('text',caller.chartArea as SVGGraphicsElement,{
    fill : 'black',
  },`${JSON.stringify(data)} ${JSON.stringify(settings)}`)
}

export default plot;
