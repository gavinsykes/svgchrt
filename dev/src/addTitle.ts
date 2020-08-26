import appendSVGChild from './appendSVGChild';
import deepObjectMerge from './deepObjectMerge';
import defaultSettings from './defaultSettings';
import svgWrapText from './svgWrapText';
import { LayoutItem } from './interfaces';
import layout from './layout';

function addTitle(settings = defaultSettings, canvas: SVGElement): void {
  if (settings.title.text) {
    if (settings.subtitle.text && settings.subtitle.appendToTitle.append) {
      appendSVGChild('title', canvas, {}, `${settings.title.text}${settings.subtitle.appendToTitle.join}${settings.subtitle.text}`)
    } else {
      appendSVGChild('title', canvas, {}, settings.title.text) as SVGTitleElement;
    }
    if (settings.title.display) {
      const title: SVGTextElement = appendSVGChild(
        'text',
        canvas,
        {
          'class': 'chart-title',
          'dy': '1em',
          'text-anchor': 'middle',
          'x': layout.canvas.width / 2,
          'y': layout.title.points.y1
        },
        settings.title.text
      ) as SVGTextElement;
      let shift = 'none';
      if (settings.legend.displaceTitle) {
        if (/left/.test(settings.legend.position)) {
          shift = 'left';
          title.setAttribute(
            'x',
            (
              (layout.canvas.width +
                layout.legend.width +
                Math.max(
                  layout.title.margin.left,
                  layout.legend.margin.right,
                  0
                )) /
              2
            ).toString()
          );
        } else if (/right/.test(settings.legend.position)) {
          shift = 'right';
          title.setAttribute(
            'x',
            (
              (layout.canvas.width -
                layout.legend.width -
                Math.max(
                  layout.title.margin.right,
                  layout.legend.margin.left,
                  0
                )) /
              2
            ).toString()
          );
        }
      }
      const titleWidth =
        layout.canvas.width -
        Math.max(settings.canvas.padding.left, settings.title.margin.left, 0) -
        Math.max(
          settings.canvas.padding.right,
          settings.title.margin.right,
          0
        ) -
        (settings.legend.displaceTitle
          ? layout.legend.width +
            (shift === 'left'
              ? Math.max(
                  settings.legend.margin.left,
                  settings.canvas.padding.left,
                  0
                ) +
                Math.max(
                  settings.title.margin.left,
                  settings.legend.margin.right,
                  0
                )
              : Math.max(
                  settings.legend.margin.right,
                  settings.canvas.padding.right,
                  0
                ) +
                Math.max(
                  settings.title.margin.right,
                  settings.legend.margin.left,
                  0
                ))
          : 0);
      svgWrapText(title, titleWidth);
      const newLayoutTitle = deepObjectMerge(layout.title, {
        height: title.getBBox().height,
        points: {
          x1: title.getBBox().x,
          x2: title.getBBox().x + title.getBBox().width,
          y2: title.getBBox().y + title.getBBox().height
        },
        width: title.getBBox().width
      }) as LayoutItem;
      layout.title = newLayoutTitle;
      layout.subtitle.points.y1 =
        layout.title.points.y2 +
        Math.max(layout.title.margin.bottom, layout.subtitle.margin.top, 0);
      layout.chart.points.y1 =
        layout.title.points.y2 +
        Math.max(layout.title.margin.bottom, layout.chart.margin.top, 0);
      layout.chart.height = layout.chart.points.y2 - layout.chart.points.y1;
      if (!settings.legend.displaceTitle) {
        layout.legend.points.y1 =
          layout.title.points.y2 +
          Math.max(layout.title.margin.bottom, layout.legend.margin.top, 0);
      }
    }
  } else {
    console.warn(
      "You haven't given this chart a title. It will still render okay but a title is strongly recommended for accessibility purposes. If you don't want to display a title but still give it one, set title.text to your title and title.display to false."
    );
  }
}

export default addTitle;
