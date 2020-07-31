import appendSVGChild from './appendSVGChild';
import defaultSettings, { SettingsObject } from './defaultSettings';
import layout from './layout';

import { ReturnedCanvas } from './interfaces';

function placeCanvas(
  settings: SettingsObject = defaultSettings,
  target: HTMLElement
): ReturnedCanvas {
  const canvas: SVGElement = appendSVGChild('svg', target, {
    'class': 'chart svg-chart',
    'height': settings.canvas.height,
    'id': settings.id,
    'viewBox': settings.canvas.viewBox,
    'width': settings.canvas.width,
    'xmlns': 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink'
  });
  if (settings.background) {
    appendSVGChild('rect', canvas, {
      class: 'chart-background',
      height: settings.canvas?.height,
      width: settings.canvas?.width
    }) as SVGGraphicsElement;
  }
  layout.title.points.y1 = Math.max(
    settings.title?.margin?.top,
    settings.canvas?.padding?.top,
    0
  );
  layout.subtitle.points.y1 = Math.max(
    settings.title?.margin?.top,
    settings.canvas?.padding?.top,
    0
  );
  layout.legend.points = {
    x1: Math.max(settings.legend.margin.left, settings.canvas.padding.left, 0),
    x2:
      settings.canvas.width -
      Math.max(settings.legend.margin.right, settings.canvas.padding.right, 0),
    y1: Math.max(settings.legend.margin.top, settings.canvas.padding.top, 0),
    y2:
      settings.canvas.height -
      Math.max(settings.legend.margin.bottom, settings.canvas.padding.bottom, 0)
  };
  layout.chart.points = {
    x1: Math.max(settings.chart.margin.left, settings.canvas.padding.left, 0),
    x2:
      settings.canvas.width -
      Math.max(layout.canvas.padding.right, layout.chart.margin.right, 0),
    y1: Math.max(settings.chart.margin.top, settings.canvas.padding.top, 0),
    y2:
      settings.canvas.height -
      Math.max(layout.canvas.padding.bottom, layout.chart.margin.bottom, 0)
  };
  layout.chart.width = layout.chart.points.x2 - layout.chart.points.x1;
  layout.chart.height = layout.chart.points.y2 - layout.chart.points.y1;
  const chartArea: SVGGraphicsElement = appendSVGChild('g', canvas, {
    class: 'chart-area',
    id: `${settings.id ? settings.id + '-' : ''}chart-area`
  }) as SVGGraphicsElement;
  return {
    canvas: canvas,
    chartArea: chartArea
  };
}

export default placeCanvas;
