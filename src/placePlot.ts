import { getChartArea } from './layout';

function placePlot(chartArea) {
  chartArea.setAttribute('transform',`translate(${getChartArea().points.x1},${getChartArea().points.y1})`);
};

export default placePlot;
