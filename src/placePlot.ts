import { getChartArea } from './layout';

function placePlot(chartArea: SVGGraphicsElement) {
  chartArea.setAttribute('transform',`translate(${getChartArea().points.x1},${getChartArea().points.y1})`);
};

export default placePlot;
