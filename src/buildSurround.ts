import addLegend from './addLegend';
import addSubtitle from './addSubtitle';
import addTitle from './addTitle';
import clearCanvas from './clearCanvas';
import placeCanvas from './placeCanvas';
import defaultSettings, { SettingsObject } from './defaultSettings';

import { Caller, ReturnedCanvas } from './interfaces';

function buildSurround(settings: SettingsObject = defaultSettings,target: HTMLElement): SVGGraphicsElement {
  clearCanvas(target);
  let c: ReturnedCanvas = placeCanvas(settings,target);
  if (settings.legend.position === 'top' || settings.legend.position === 'bottom' || settings.legend.orientation === 'horizontal') {
    settings.legend.displaceTitle = false;
  }
  if (settings.legend.display && settings.legend.orientation === 'vertical' && settings.legend.displaceTitle) {
    addLegend(settings,c.canvas);
    addTitle(settings,c.canvas);
    addSubtitle(settings,c.canvas);
  } else {
    addTitle(settings,c.canvas);
    addSubtitle(settings,c.canvas);
    addLegend(settings,c.canvas);
  }
  return c.chartArea;
};

export default buildSurround;
