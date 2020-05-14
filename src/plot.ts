import appendSVGChild from './appendSVGChild';
import { getChartArea } from './layout';
import placePlot from './placePlot';

function plot() {
  appendSVGChild('rect', chartArea, {
    fill   : '#F808',
    width  : getChartArea().width,
    height : getChartArea().height
  });
  placePlot();
};

export default plot;
