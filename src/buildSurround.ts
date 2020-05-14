import addLegend from './addLegend';
import addSubtitle from './addSubtitle';
import addTitle from './addTitle';
import clearCanvas from './clearCanvas';
import placeCanvas from './placeCanvas';

function buildSurround(settings: settingsObject = defaultSettings) {
  clearCanvas();
  placeCanvas();
  if (settings.legend.position === 'top' || settings.legend.position === 'bottom' || settings.legend.orientation === 'horizontal') {
    settings.legend.displaceTitle = false;
  }
  if (settings.legend.display && settings.legend.orientation === 'vertical' && settings.legend.displaceTitle) {
    addLegend();
    addTitle();
    addSubtitle();
  } else {
    addTitle();
    addSubtitle();
    addLegend();
  }
};

export default buildSurround;
