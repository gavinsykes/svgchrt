import appendSVGChild from './appendSVGChild'
import deepObjectMerge from './deepObjectMerge'
import defaultSettings from './defaultSettings'
import svgWrapText from './svgWrapText'
import { LayoutItem } from './interfaces'
import layout from './layout'

function addSubitle (settings = defaultSettings, canvas: SVGElement) {
  if (settings.subtitle.display) {
    const subtitle: SVGTextElement = appendSVGChild('text', canvas, {
      class: 'chart-subtitle',
      dy: '1em',
      'text-anchor': 'middle',
      x: layout.canvas.width / 2,
      y: layout.subtitle.points.y1
    }, settings.subtitle.text) as SVGTextElement
    let shift: string = 'none'
    if (settings.legend.displaceTitle) {
      if (/left/.test(settings.legend.position)) {
        shift = 'left'
        subtitle.setAttribute('x', (
          (
            layout.canvas.width +
            layout.legend.width +
            Math.max(
              layout.subtitle.margin.left,
              layout.legend.margin.right,
              0
            )
          ) / 2
        ).toString())
      } else if (/right/.test(settings.legend.position)) {
        shift = 'right'
        subtitle.setAttribute('x', (
          (
            layout.canvas.width -
          layout.legend.width -
          Math.max(
            layout.subtitle.margin.right,
            layout.legend.margin.left,
            0
          )
          ) / 2
        ).toString())
      }
    }
    const subtitleWidth =
      layout.canvas.width -
      Math.max(settings.canvas.padding.left, settings.subtitle.margin.left, 0) -
      Math.max(settings.canvas.padding.right, settings.subtitle.margin.right, 0) -
      (settings.legend.displaceTitle
        ? layout.legend.width +
          (shift === 'left'
            ? Math.max(settings.legend.margin.left, settings.canvas.padding.left, 0) +
             Math.max(settings.subtitle.margin.left, settings.legend.margin.right, 0)
            : Math.max(settings.legend.margin.right, settings.canvas.padding.right, 0) +
             Math.max(settings.subtitle.margin.right, settings.legend.margin.left, 0))
        : 0)
    svgWrapText(subtitle, subtitleWidth)
    const newLayoutSubtitle = deepObjectMerge(layout.subtitle, {
      height: subtitle.getBBox().height,
      points: {
        x1: subtitle.getBBox().x,
        x2: subtitle.getBBox().x + subtitle.getBBox().width,
        y2: subtitle.getBBox().y + subtitle.getBBox().height
      },
      width: subtitle.getBBox().width
    }) as LayoutItem
    layout.subtitle = newLayoutSubtitle
    layout.chart.points.y1 = layout.subtitle.points.y2 + Math.max(layout.subtitle.margin.bottom, layout.chart.margin.top, 0)
    layout.chart.height = layout.chart.points.y2 - layout.chart.points.y1
    if (!settings.legend.displaceTitle) {
      layout.legend.points.y1 = layout.subtitle.points.y2 + Math.max(layout.subtitle.margin.bottom, layout.legend.margin.top, 0)
    }
  }
};

export default addSubitle
