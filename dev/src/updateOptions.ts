/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import defaultSettings from './defaultSettings';
import deepObjectMerge from './deepObjectMerge';

/**
 * updateOptions takes a Record<string, unknown> as its argument. It merges the current settings of the visualisation with the new options.
 *
 * The return value is the new settings.
 *
 * @param {Record<string, unknown>} options - the new settings to apply to the visualisation.
 *
 * @returns {Record<string, unknown>} The new settings.
 *
 */
function updateOptions(options = {}): Record<string, unknown> {
  const newSettings: Record<string, unknown> = deepObjectMerge(
    defaultSettings,
    options
  );
  return newSettings;
}

export default updateOptions;
