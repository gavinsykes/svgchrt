import appendSVGChild from './appendSVGChild';
import deepObjectMerge from './deepObjectMerge';
import defaultSettings, { SettingsObject, LegendItemIcon } from './defaultSettings';
import layout from './layout';

function addLegend(settings: SettingsObject = defaultSettings, canvas: SVGGraphicsElement) {
  if (settings.legend.display && settings.legend.items) {
    const legend: SVGGraphicsElement = appendSVGChild('g', canvas, {class: 'legend',id: `${settings.id ? settings.id + '-' : ''}legend`
    }) as SVGGraphicsElement;
    let legendBackground: SVGGraphicsElement | null = null;
    if (settings.legend.background.display) {
      legendBackground = appendSVGChild('rect', legend, {
        class: 'legend-background',
        fill: settings.legend.background.color,
        rx: settings.legend.background.rx || settings.legend.background.r || 0,
        ry: settings.legend.background.ry || settings.legend.background.r || 0
      }) as SVGGraphicsElement;
    }
    const legend_items: SVGGraphicsElement[] = settings.legend.items.map((c, i) => appendSVGChild('g', legend, {'class': `legend-item ${settings.legend.items[i]?.class ? settings.legend.items[i]?.class : ''}`}) as SVGGraphicsElement);
    const maxWidth: number = layout.get().legend.points.x2 - Math.max(settings.legend.padding.left, 0) - Math.max(settings.legend.padding.right, 0) - layout.get().legend.points.x1;
    const maxHeight: number = layout.get().legend.points.y2 - Math.max(settings.legend.padding.top, 0) - Math.max(settings.legend.padding.bottom, 0) -layout.get().legend.points.y1;

    let legend_lines: SVGGraphicsElement[][] = [[]];
    let lineCount: number = 0;

    legend_items.map((l, i) => {
      let params: LegendItemIcon = deepObjectMerge(
        settings.legend.icons as LegendItemIcon,
        settings.legend.items[i]?.icon as LegendItemIcon
      ) as LegendItemIcon;
      let icon;
      if (params.display) {
        icon = appendSVGChild(params.shape, l, {
          class: `legend-item-icon`,
          ...params
        }) as SVGGraphicsElement;
      }
      let text = appendSVGChild(
        'text',
        l,
        {
          class : 'legend-item-text',
          dy    : '1em'
        },
        settings.legend.items[i].displayName
      ) as SVGTextElement;
      let translations = {
        icon : {
          x : 0,
          y : 0
        },
        text : {
          x : 0,
          y : 0
        }
      };
      if (icon) {
        translations.text.x = icon.getBBox().width + 4;
        if (icon.getBBox().height > text.getBBox().height) {
          translations.text.y = (icon.getBBox().height - text.getBBox().height - 4) / 2;
        } else if (icon.getBBox().height < text.getBBox().height) {
          translations.icon.y = (text.getBBox().height - icon.getBBox().height + 6) / 2;
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

    legend_items.map((l, i) => {
      if (settings.legend.orientation === 'horizontal') {
        if (legend_lines[lineCount].slice(0,i+1).reduce((total: number,item: SVGGraphicsElement) => total+settings.legend.itemMargin.right+item.getBBox().width,0) +l.getBBox().width > maxWidth) {
          lineCount++;
          legend_lines.push([]);
        }
        legend_lines[lineCount].push(l);
      } else {
        if (legend_lines[lineCount].slice(0,i+1).reduce((total, item) => total+settings.legend.itemMargin.bottom+item.getBBox().height,0)>maxHeight) {
          lineCount++;
          legend_lines.push([]);
        }
        legend_lines[lineCount].push(l);
      }
    });

    legend_lines.forEach((line: SVGGraphicsElement[], index) => {
      line.forEach((el: SVGGraphicsElement, i) => {
        if (settings.legend.orientation === 'horizontal') {
          el.setAttribute('transform',`translate(${Math.max(settings.legend.padding.left, 0) + line.slice(0, i).reduce((total, item) => total + settings.legend.itemMargin.right + item.getBBox().width,0)},${Math.max(settings.legend.padding.top, 0) + legend_lines.slice(0, index).reduce((total,line) => total +settings.legend.itemMargin.bottom + line.reduce((max, item) => item.getBBox().height > max ? item.getBBox().height : max,0),0)})`);
        } else {
          el.setAttribute('transform',`translate(${Math.max(settings.legend.padding.left, 0) + legend_lines.slice(0, index).reduce((total, line) => total + settings.legend.itemMargin.right + line.reduce((max, item) => item.getBBox().width > max ? item?.getBBox().width : max,0),0)},${Math.max(settings.legend.padding.top, 0) + line.slice(0, i).reduce((total, item) => total + settings.legend.itemMargin.bottom +item.getBBox().height,0)})`);
        }
      });
    });

      if (legendBackground) {
        legendBackground.setAttribute(
          'width',(
          settings.legend.padding.left +
            legend.getBBox().width +
            settings.legend.padding.right).toString()
        );
        legendBackground.setAttribute(
          'height',
          (settings.legend.padding.top +
            legend.getBBox().height +
            settings.legend.padding.bottom).toString()
        );
      }
      layout.legend = deepObjectMerge(layout.legend, {
        height: legend.getBBox().height,
        width: legend.getBBox().width
      });
      let xcoord, ycoord;
      switch (settings.legend.position) {
        case 'top-left':
          xcoord = layout.legend.points.x1;
          ycoord = layout.legend.points.y1;
          if (settings.legend.orientation === 'horizontal') {
            settings.legend.displaceTitle = false;
          }
          if (!settings.legend.layOverChart) {
            if (settings.legend.orientation == 'vertical') {
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
          xcoord = (canvas.getBBox().width - layout.legend.width) / 2;
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
        case 'right':
          xcoord = layout.legend.points.x2 - layout.legend.width;
          ycoord =
            (layout.legend.points.y1 + layout.legend.points.y2 - layout.legend.height) / 2;
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
          xcoord = (canvas.getBBox().width - layout.legend.width) / 2;
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
            (layout.legend.points.y1 + layout.legend.points.y2 - layout.legend.height) / 2;
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
      layout.chart.width =
        layout.chart.points.x2 - layout.chart.points.x1;
      layout.chart.height =
        layout.chart.points.y2 - layout.chart.points.y1;
      legend.setAttribute('transform', `translate(${xcoord},${ycoord})`);
      layout.legend = deepObjectMerge(layout.get().legend, {
        points: {
          x1: legend.getBBox().x,
          x2: legend.getBBox().x + legend.getBBox().width,
          y1: legend.getBBox().y,
          y2: legend.getBBox().y + legend.getBBox().height
        }
      });
    }
  };

export default addLegend;
