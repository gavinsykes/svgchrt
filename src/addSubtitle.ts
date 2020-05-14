import appendSVGChild from './appendSVGChild';
import deepObjectMerge from './deepObjectMerge';
import defaultSettings from './defaultSettings';
import layout from './layout';
import svgWrapText from './svgWrapText';

function addSubitle(settings = defaultSettings, canvas: SVGElement) {
  if (settings.subtitle.display) {
    const subtitle: SVGTextElement = appendSVGChild('text',canvas,{class: 'chart-title',dy: '1em','text-anchor': 'middle',x: layout.get().canvas.width / 2,y: layout.get().subtitle.points.y1},settings.subtitle.text) as SVGTextElement;
    let shift: string = 'none';
    if (settings.legend.displaceTitle) {
      if (/left/.test(settings.legend.position)) {
        shift = 'left';
        subtitle.setAttribute('x',((layout.get().canvas.width + layout.get().legend.width + Math.max(layout.get().subtitle.margin.left,layout.get().legend.margin.right,0)) / 2).toString());
      } else if (/right/.test(settings.legend.position)) {
        shift = 'right';
        subtitle.setAttribute('x',((layout.get().canvas.width - layout.get().legend.width - Math.max(layout.get().subtitle.margin.right,layout.get().legend.margin.left,0)) / 2).toString());
      }
    }
    let subtitleWidth =
      layout.get().canvas.width -
      Math.max(settings.canvas.padding.left,settings.subtitle.margin.left,0) -
      Math.max(settings.canvas.padding.right,settings.subtitle.margin.right,0) -
      (settings.legend.displaceTitle
        ? layout.get().legend.width +
          (shift === 'left'
           ? Math.max(settings.legend.margin.left,settings.canvas.padding.left,0) +
             Math.max(settings.subtitle.margin.left,settings.legend.margin.right,0)
           : Math.max(settings.legend.margin.right,settings.canvas.padding.right,0) +
             Math.max(settings.subtitle.margin.right,settings.legend.margin.left,0))
        : 0);
    svgWrapText(subtitle, subtitleWidth);
    let newLayoutSubtitle = deepObjectMerge(layout.get().subtitle, {
        height : subtitle.getBBox().height,
        points : {
          x1 : subtitle.getBBox().x,
          x2 : subtitle.getBBox().x + subtitle.getBBox().width,
          y2 : subtitle.getBBox().y + subtitle.getBBox().height
        },
        width  : subtitle.getBBox().width
      });
    layout.set(newLayoutSubtitle,'subtitle');
    layout.set(layout.get().subtitle.points.y2 + Math.max(layout.get().subtitle.margin.bottom,layout.get().subtitle.margin.top,0),'subtitle','points','y1');
    layout.set(layout.get().chart.points.y2 - layout.get().chart.points.y1,'chart','height');
    if (!settings.legend.displaceTitle) {
      layout.set(layout.get().subtitle.points.y2 + Math.max(layout.get().subtitle.margin.bottom,layout.get().legend.margin.top,0),'legend','points','y1');
    }
  }
};

export default addSubitle;
