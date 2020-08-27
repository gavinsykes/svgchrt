import defaultSettings from './defaultSettings';
import deepObjectMerge from './deepObjectMerge';

function updateOptions(options = {}): Record<string, unknown> {
  const newSettings: Record<string, unknown> = deepObjectMerge(
    defaultSettings,
    options
  );
  return newSettings;
}

export default updateOptions;
