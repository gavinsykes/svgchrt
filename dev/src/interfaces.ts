/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import { SettingsObject } from './defaultSettings';
import { LayoutObject } from './layout';

/**
 * buildSurround takes a SettingsObject and HTMLElement as its arguments. It generates an SVG element onto which it applies the title, description, subtitle and chart area.
 *
 * The return value is the generted chart area.
 *
 * @param {SettingsObject} settings - the settings to apply to the visualisation.
 *
 * @param {HTMLElement} target - the HTML element in which to build the visualisation.
 *
 */
export interface ReturnedCanvas {
  canvas: SVGElement;
  chartArea: SVGGraphicsElement;
}

export interface Caller {
  layout: LayoutObject;
  settings: SettingsObject;
  target: HTMLElement;
}
