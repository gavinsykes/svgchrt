/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import { SettingsObject } from './interfaces';
import buildSurround from './buildSurround';
import defaultSettings from './defaultSettings';
import plot from './plot';

/**
 * render takes a SettingsObject and HTMLElement as its arguments. It generates an SVG element onto which it applies the title, description, subtitle and chart area.
 *
 * The return value is void.
 *
 * @param {SettingsObject} settings - the settings to apply to the visualisation.
 *
 * @param {HTMLElement} target - the HTML element in which to build the visualisation.
 *
 */
function render(
  settings: SettingsObject = defaultSettings,
  target: HTMLElement
): void {
  const c = buildSurround(settings, target);
  if (plot instanceof Function) {
    plot(c.chartArea);
  }
}

export default render;
