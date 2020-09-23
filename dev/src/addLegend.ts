/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import appendSVGChild from './appendSVGChild';
import deepObjectMerge from './deepObjectMerge';
import defaultSettings, {
  SettingsObject,
  LegendItemIcon
} from './defaultSettings';
import layout, { LegendLayout } from './layout';

/**
 * addLegend takes a SettingsObject and an SVGElement as its arguments. It adds a `<g>` element to the SVG element with class `legend`.
 *
 * The return value is void.
 *
 * @param {SettingsObject} settings - the settings object in which the function looks for the settings with which to add the legend.
 *
 * @param {SVGElement} canvas - the SVG element to which to add the legend.
 */
function addLegend(
  settings: SettingsObject = defaultSettings,
  canvas: SVGElement
): void {
  if (settings.legend.display && settings.legend.items.length === 0) {
    const legend: SVGGraphicsElement = appendSVGChild('g', canvas, {
      class: 'legend',
      id: `${settings.id ? settings.id + '-' : ''}legend`
    }) as SVGGraphicsElement;
    let legendBackground: SVGGraphicsElement | null = null;
    if (settings.legend.background.display) {
      legendBackground = appendSVGChild('rect', legend, {
        class: 'legend-background',
        fill: settings.legend.background.colour,
        rx: settings.legend.background.rx || settings.legend.background.r || 0,
        ry: settings.legend.background.ry || settings.legend.background.r || 0
      }) as SVGGraphicsElement;
    }
    const legendItems: SVGGraphicsElement[] = settings.legend.items.map(
      (c, i) =>
        appendSVGChild('g', legend, {
          class: `legend-item ${
            settings.legend.items[i]?.class
              ? settings.legend.items[i].class
              : ''
          }`,
          id: settings.legend.items[i]?.id
            ? `${settings.id ? settings.id + '-' : ''}legend-item-${
                settings.legend.items[i].id
              }`
            : ''
        }) as SVGGraphicsElement
    );
    const maxWidth: number =
      layout.legend.points.x2 -
      Math.max(settings.legend.padding.left, 0) -
      Math.max(settings.legend.padding.right, 0) -
      layout.legend.points.x1;
    const maxHeight: number =
      layout.legend.points.y2 -
      Math.max(settings.legend.padding.top, 0) -
      Math.max(settings.legend.padding.bottom, 0) -
      layout.legend.points.y1;

    const legendLines: SVGGraphicsElement[][] = [[]];
    let lineCount = 0;

    legendItems.map((l, i) => {
      const params: LegendItemIcon = deepObjectMerge(
        settings.legend.icons as LegendItemIcon,
        settings.legend.items[i]?.icon as LegendItemIcon
      ) as LegendItemIcon;
      let icon;
      if (params.display) {
        icon = appendSVGChild(params.shape, l, {
          class: 'legend-item-icon',
          ...params
        }) as SVGGraphicsElement;
      }
      const text = appendSVGChild(
        'text',
        l,
        {
          class: 'legend-item-text',
          dy: '1em'
        },
        settings.legend.items[i].displayName
      ) as SVGTextElement;
      const translations = {
        icon: {
          x: 0,
          y: 0
        },
        text: {
          x: 0,
          y: 0
        }
      };
      if (icon) {
        translations.text.x = icon.getBBox().width + 4;
        if (icon.getBBox().height > text.getBBox().height) {
          translations.text.y =
            (icon.getBBox().height - text.getBBox().height - 4) / 2;
        } else if (icon.getBBox().height < text.getBBox().height) {
          translations.icon.y =
            (text.getBBox().height - icon.getBBox().height + 6) / 2;
        }
        icon.setAttribute(
          'transform',
          `translate(${translations.icon.x},${translations.icon.y})`
        );
      }
      text.setAttribute(
        'transform',
        `translate(${translations.text.x},${translations.text.y})`
      );
    });

    legendItems.map((l, i) => {
      if (settings.legend.orientation === 'horizontal') {
        if (
          legendLines[lineCount]
            .slice(0, i + 1)
            .reduce(
              (total: number, item: SVGGraphicsElement) =>
                total + settings.legend.itemMargin.right + item.getBBox().width,
              0
            ) +
            l.getBBox().width >
          maxWidth
        ) {
          lineCount++;
          legendLines.push([]);
        }
        legendLines[lineCount].push(l);
      } else {
        if (
          legendLines[lineCount]
            .slice(0, i + 1)
            .reduce(
              (total: number, item: SVGGraphicsElement) =>
                total +
                settings.legend.itemMargin.bottom +
                item.getBBox().height,
              0
            ) > maxHeight
        ) {
          lineCount++;
          legendLines.push([]);
        }
        legendLines[lineCount].push(l);
      }
    });

    legendLines.forEach((line: SVGGraphicsElement[], index) => {
      line.forEach((el: SVGGraphicsElement, i) => {
        if (settings.legend.orientation === 'horizontal') {
          el.setAttribute(
            'transform',
            `translate(
            ${
              Math.max(settings.legend.padding.left, 0) +
              line
                .slice(0, i)
                .reduce(
                  (total, item) =>
                    total +
                    settings.legend.itemMargin.right +
                    item.getBBox().width,
                  0
                )
            },
            ${
              Math.max(settings.legend.padding.top, 0) +
              legendLines
                .slice(0, index)
                .reduce(
                  (total, line) =>
                    total +
                    settings.legend.itemMargin.bottom +
                    line.reduce(
                      (max, item) =>
                        item.getBBox().height > max
                          ? item.getBBox().height
                          : max,
                      0
                    ),
                  0
                )
            })`
          );
        } else {
          el.setAttribute(
            'transform',
            `translate(
            ${
              Math.max(settings.legend.padding.left, 0) +
              legendLines
                .slice(0, index)
                .reduce(
                  (total, line) =>
                    total +
                    settings.legend.itemMargin.right +
                    line.reduce(
                      (max, item) =>
                        item.getBBox().width > max
                          ? item?.getBBox().width
                          : max,
                      0
                    ),
                  0
                )
            },
            ${
              Math.max(settings.legend.padding.top, 0) +
              line
                .slice(0, i)
                .reduce(
                  (total, item) =>
                    total +
                    settings.legend.itemMargin.bottom +
                    item.getBBox().height,
                  0
                )
            })`
          );
        }
      });
    });

    if (legendBackground) {
      legendBackground.setAttribute(
        'width',
        (
          settings.legend.padding.left +
          legend.getBBox().width +
          settings.legend.padding.right
        ).toString()
      );
      legendBackground.setAttribute(
        'height',
        (
          settings.legend.padding.top +
          legend.getBBox().height +
          settings.legend.padding.bottom
        ).toString()
      );
    }
    layout.legend = deepObjectMerge(layout.legend, {
      height: legend.getBBox().height,
      width: legend.getBBox().width
    }) as LegendLayout;
    let xcoord = 0;
    let ycoord = 0;
    switch (settings.legend.position) {
      case 'top-left':
        xcoord = layout.legend.points.x1;
        ycoord = layout.legend.points.y1;
        if (settings.legend.orientation === 'horizontal') {
          settings.legend.displaceTitle = false;
        }
        if (!settings.legend.layOverChart) {
          if (settings.legend.orientation === 'vertical') {
            layout.chart.points.x1 =
              Math.max(
                settings.canvas.padding.left,
                settings.legend.margin.left,
                0
              ) +
              layout.legend.width +
              Math.max(
                settings.legend.margin.right,
                settings.chart.margin.left,
                0
              );
          } else {
            layout.chart.points.y1 +=
              Math.max(
                settings.canvas.padding.top,
                settings.legend.margin.top,
                0
              ) +
              layout.legend.height +
              Math.max(
                settings.legend.margin.bottom,
                settings.chart.margin.top,
                0
              );
          }
        }
        break;
      case 'top':
        xcoord =
          (parseInt(canvas.getAttribute('width') as string) -
            layout.legend.width) /
          2;
        ycoord = layout.legend.points.y1;
        settings.legend.displaceTitle = false;
        if (!settings.legend.layOverChart) {
          layout.chart.points.y1 +=
            Math.max(
              settings.canvas.padding.top,
              settings.legend.margin.top,
              0
            ) +
            layout.legend.height +
            Math.max(
              settings.legend.margin.bottom,
              settings.chart.margin.top,
              0
            );
        }
        break;
      case 'top-right':
        xcoord = layout.legend.points.x2 - layout.legend.width;
        ycoord = layout.legend.points.y1;
        if (settings.legend.orientation === 'horizontal') {
          settings.legend.displaceTitle = false;
        }
        if (!settings.legend.layOverChart) {
          if (settings.legend.orientation === 'vertical') {
            layout.chart.points.x2 =
              settings.canvas.width -
              (Math.max(
                settings.canvas.padding.right,
                settings.legend.margin.right,
                0
              ) +
                layout.legend.width +
                Math.max(
                  settings.legend.margin.left,
                  settings.chart.margin.right,
                  0
                ));
          } else {
            layout.chart.points.y1 +=
              Math.max(
                settings.canvas.padding.top,
                settings.legend.margin.top,
                0
              ) +
              layout.legend.height +
              Math.max(
                settings.legend.margin.bottom,
                settings.chart.margin.top,
                0
              );
          }
        }
        break;
      // DOne properly down to here
      case 'right':
        xcoord = layout.legend.points.x2 - layout.legend.width;
        ycoord =
          (layout.legend.points.y1 +
            layout.legend.points.y2 -
            layout.legend.height) /
          2;
        if (!settings.legend.layOverChart) {
          layout.chart.points.x2 =
            layout.canvas.width -
            (Math.max(
              settings.canvas.padding.right,
              settings.legend.margin.right,
              0
            ) +
              layout.legend.width +
              Math.max(
                settings.legend.margin.left,
                settings.chart.margin.right,
                0
              ));
        }
        break;
      case 'bottom-right':
        xcoord = layout.legend.points.x2 - layout.legend.width;
        ycoord = layout.legend.points.y2 - layout.legend.height;
        if (!settings.legend.layOverChart) {
          if (settings.legend.orientation === 'vertical') {
            layout.chart.points.x2 =
              layout.canvas.width -
              (Math.max(
                settings.canvas.padding.right,
                settings.legend.margin.right,
                0
              ) +
                layout.legend.width +
                Math.max(
                  settings.legend.margin.left,
                  settings.chart.margin.right,
                  0
                ));
          } else {
            layout.chart.points.y2 =
              layout.canvas.height -
              (Math.max(
                settings.canvas.padding.bottom,
                settings.legend.margin.bottom,
                0
              ) +
                layout.legend.height +
                Math.max(
                  settings.legend.margin.top,
                  settings.chart.margin.bottom,
                  0
                ));
          }
        }
        break;
      case 'bottom':
        xcoord =
          (parseInt(canvas.getAttribute('width') as string) -
            layout.legend.width) /
          2;
        ycoord = layout.legend.points.y2 - layout.legend.height;
        if (!settings.legend.layOverChart) {
          layout.chart.points.y2 =
            layout.canvas.height -
            (Math.max(
              settings.canvas.padding.bottom,
              settings.legend.margin.bottom,
              0
            ) +
              layout.legend.height +
              Math.max(
                settings.legend.margin.top,
                settings.chart.margin.bottom,
                0
              ));
        }
        break;
      case 'bottom-left':
        xcoord = layout.legend.points.x1;
        ycoord = layout.legend.points.y2 - layout.legend.height;
        if (!settings.legend.layOverChart) {
          if (settings.legend.orientation === 'vertical') {
            layout.chart.points.x1 =
              Math.max(
                settings.canvas.padding.left,
                settings.legend.margin.left,
                0
              ) +
              layout.legend.width +
              Math.max(
                settings.legend.margin.right,
                settings.chart.margin.left,
                0
              );
          } else {
            layout.chart.points.y2 =
              layout.canvas.height -
              (Math.max(
                settings.canvas.padding.bottom,
                settings.legend.margin.bottom,
                0
              ) +
                layout.legend.height +
                Math.max(
                  settings.legend.margin.top,
                  settings.chart.margin.bottom,
                  0
                ));
          }
        }
        break;
      case 'left':
        xcoord = layout.legend.points.x1;
        ycoord =
          (layout.legend.points.y1 +
            layout.legend.points.y2 -
            layout.legend.height) /
          2;
        if (!settings.legend.layOverChart) {
          layout.chart.points.x1 =
            Math.max(
              settings.canvas.padding.left,
              settings.legend.margin.left,
              0
            ) +
            layout.legend.width +
            Math.max(
              settings.legend.margin.right,
              settings.chart.margin.left,
              0
            );
        }
        break;
    }
    layout.chart.width = layout.chart.points.x2 - layout.chart.points.x1;
    layout.chart.height = layout.chart.points.y2 - layout.chart.points.y1;
    legend.setAttribute('transform', `translate(${xcoord},${ycoord})`);
    layout.legend = deepObjectMerge(layout.legend, {
      points: {
        x1: legend.getBBox().x,
        x2: legend.getBBox().x + legend.getBBox().width,
        y1: legend.getBBox().y,
        y2: legend.getBBox().y + legend.getBBox().height
      }
    }) as LegendLayout;
  }
}

export default addLegend;
