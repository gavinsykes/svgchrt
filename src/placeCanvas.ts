import appendSVGChild from './appendSVGChild';
import defaultSettings, { SettingsObject } from './defaultSettings';
import layout from './layout';

import { ReturnedCanvas } from './interfaces';

function placeCanvas(settings: SettingsObject = defaultSettings, target: HTMLElement): ReturnedCanvas {
  let canvas: SVGElement = appendSVGChild('svg', target, {
    class   : 'chart svg-chart',
    height  : settings.canvas.height,
    viewBox : settings.canvas.viewBox,
    width   : settings.canvas.width,
    xmlns   : 'http://www.w3.org/2000/svg',
    'xmlns  : xlink':'http://www.w3.org/1999/xlink'
  });
  if (settings.background) {
    appendSVGChild('rect', canvas, {
      class  : 'chart-background',
      height : settings.canvas?.height,
      width  : settings.canvas?.width
    }) as SVGGraphicsElement;
  }
  layout.set(Math.max(settings.title?.margin?.top,settings.canvas?.padding?.top,0),'title','points','y1');
  layout.set(Math.max(settings.title?.margin?.top,settings.canvas?.padding?.top,0),'subtitle','points','y1');
  layout.set({
    x1 : Math.max(settings.legend.margin.left,settings.canvas.padding.left,0),
    x2 : settings.canvas.width - Math.max(settings.legend.margin.right,settings.canvas.padding.right,0),
    y1 : Math.max(settings.legend.margin.top,settings.canvas.padding.top,0),
    y2 : settings.canvas.height - Math.max(settings.legend.margin.bottom,settings.canvas.padding.bottom,0)
  },'legend','points');
  layout.set({
    x1 : Math.max(settings.chart.margin.left,settings.canvas.padding.left,0),
    x2 : settings.canvas.width - Math.max(layout.canvas.padding.right,layout.chart.margin.right,0),
    y1 : Math.max(settings.chart.margin.top,settings.canvas.padding.top,0),
    y2 : settings.canvas.height - Math.max(layout.canvas.padding.bottom,layout.chart.margin.bottom,0)
  },'chart','points');
  layout.set(layout.get().chart.points.x2 - layout.get().chart.points.x1,'chart','width');
  layout.set(layout.get().chart.points.y2 - layout.get().chart.points.y1,'chart','height');
  let chartArea: SVGGraphicsElement = appendSVGChild('g', canvas, {
    class : 'chart-area',
    id    : `${settings.id ? settings.id + '-' : ''}chart-area`
  }) as SVGGraphicsElement;
  return {
    canvas    : canvas,
    chartArea : chartArea
  };
};

export default placeCanvas;
