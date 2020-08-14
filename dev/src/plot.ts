import appendSVGChild from './appendSVGChild';
import { getChartArea } from './layout';

function plot(chartArea: SVGGraphicsElement): void {
  appendSVGChild('rect', chartArea, {
    fill: '#F808',
    width: getChartArea().width,
    height: getChartArea().height
  });
}

export default plot;
