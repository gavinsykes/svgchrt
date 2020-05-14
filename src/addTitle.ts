import appendSVGChild from './appendSVGChild';
import deepObjectMerge from './deepObjectMerge';
import defaultSettings from './defaultSettings';
import layout from './layout';
import svgWrapText from './svgWrapText';

function addTitle(settings = defaultSettings, canvas: SVGElement) {
  if (settings.title.text) {
    appendSVGChild('title', canvas, {}, settings.title.text) as SVGTitleElement;
    if (settings.title.display) {
      const title: SVGTextElement = appendSVGChild('text',canvas,{class: 'chart-title',dy: '1em','text-anchor': 'middle',x: layout.get().canvas.width / 2,y: layout.get().title.points.y1},settings.title.text) as SVGTextElement;
      let shift: string = 'none';
      if (settings.legend.displaceTitle) {
        if (/left/.test(settings.legend.position)) {
          shift = 'left';
          title.setAttribute('x',((layout.get().canvas.width + layout.get().legend.width + Math.max(layout.get().title.margin.left,layout.get().legend.margin.right,0)) / 2).toString());
        } else if (/right/.test(settings.legend.position)) {
          shift = 'right';
          title.setAttribute('x',((layout.get().canvas.width - layout.get().legend.width - Math.max(layout.get().title.margin.right,layout.get().legend.margin.left,0)) / 2).toString());
        }
      }
      let titleWidth =
        layout.get().canvas.width -
        Math.max(settings.canvas.padding.left,settings.title.margin.left,0) -
        Math.max(settings.canvas.padding.right,settings.title.margin.right,0) -
        (settings.legend.displaceTitle
          ? layout.get().legend.width +
            (shift === 'left'
             ? Math.max(settings.legend.margin.left,settings.canvas.padding.left,0) +
               Math.max(settings.title.margin.left,settings.legend.margin.right,0)
             : Math.max(settings.legend.margin.right,settings.canvas.padding.right,0) +
               Math.max(settings.title.margin.right,settings.legend.margin.left,0))
          : 0);
      svgWrapText(title, titleWidth);
      let newLayoutTitle = deepObjectMerge(layout.get().title, {
          height : title.getBBox().height,
          points : {
            x1 : title.getBBox().x,
            x2 : title.getBBox().x + title.getBBox().width,
            y2 : title.getBBox().y + title.getBBox().height
          },
          width  : title.getBBox().width
        });
      layout.set(newLayoutTitle,'title');
      layout.set(layout.get().title.points.y2 + Math.max(layout.get().title.margin.bottom,layout.get().subtitle.margin.top,0),'subtitle','points','y1');
      layout.set(layout.get().chart.points.y2 - layout.get().chart.points.y1,'chart','height');
      if (!settings.legend.displaceTitle) {
        layout.set(layout.get().title.points.y2 + Math.max(layout.get().title.margin.bottom,layout.get().legend.margin.top,0),'legend','points','y1');
      }
    }
  } else {
    console.warn(`You haven't given this chart a title. It will still render okay but a title is strongly recommended for accessibility purposes. If you don't want to display a title but still give it one, set title.text to your title and title.display to false.`);
  }
};

export default addTitle;
