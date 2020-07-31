import defaultSettings from './defaultSettings'
import deepObjectMerge from './deepObjectMerge'

function updateOptions (options = {}): object {
  const newSettings: object = deepObjectMerge(defaultSettings, options)
  return newSettings
};

export default updateOptions
