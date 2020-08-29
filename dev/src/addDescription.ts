/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import appendSVGChild from './appendSVGChild';
import defaultSettings from './defaultSettings';

/**
 * addDescription takes a SettingsObject and an SVGElement as its arguments. It adds a `<desc>` element to the SVG element.
 *
 * The return value is void.
 *
 * @param {SettingsObject} settings - the settings object in which the function looks for the description to add.
 *
 * @param {SVGElement} canvas - the SVG element to which to add the description.
 */
function addDescription(settings = defaultSettings, canvas: SVGElement): void {
  if (settings.description) {
    appendSVGChild('desc', canvas, {}, settings.description) as SVGDescElement;
  }
}

export default addDescription;
