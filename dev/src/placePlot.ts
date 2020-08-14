import { getChartArea } from './layout';

function placePlot(chartArea: SVGGraphicsElement): void {
  chartArea.setAttribute(
    'transform',
    `translate(${getChartArea().points.x1},${getChartArea().points.y1})`
  );
}

export default placePlot;
