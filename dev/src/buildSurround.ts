/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import addLegend from './addLegend';
import addSubtitle from './addSubtitle';
import addTitle from './addTitle';
import clearCanvas from './clearCanvas';
import placeCanvas from './placeCanvas';
import defaultSettings, { SettingsObject } from './defaultSettings';

import { ReturnedCanvas } from './interfaces';

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
function buildSurround(
  settings: SettingsObject = defaultSettings,
  target: HTMLElement
): ReturnedCanvas {
  clearCanvas(target);
  const c: ReturnedCanvas = placeCanvas(settings, target);
  if (
    settings.legend.position === 'top' ||
    settings.legend.position === 'bottom' ||
    settings.legend.orientation === 'horizontal'
  ) {
    settings.legend.displaceTitle = false;
  }
  if (
    settings.legend.display &&
    settings.legend.orientation === 'vertical' &&
    settings.legend.displaceTitle
  ) {
    if (settings.legend.display && settings.legend.items.length > 0) {
      addLegend(settings, c.canvas);
    }
    addTitle(settings, c.canvas);
    addSubtitle(settings, c.canvas);
  } else {
    addTitle(settings, c.canvas);
    addSubtitle(settings, c.canvas);
    if (settings.legend.display && settings.legend.items.length > 0) {
      addLegend(settings, c.canvas);
    }
  }
  return c;
}

export default buildSurround;
