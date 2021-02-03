/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import appendSVGChild from './appendSVGChild';
import defaultSettings from './defaultSettings';
import svgWrapText from './svgWrapText';
import layout from './layout';

/**
 * addTitle takes a SettingsObject and an SVGElement as its arguments. It adds a `<text>` element to the SVG element which may or may not contain more than 1 <tspan> element.
 *
 * The return value is void.
 *
 * @param {SettingsObject} settings - the settings object in which the function looks for the title to add.
 *
 * @param {SVGElement} canvas - the SVG element to which to add the title.
 */
function addTitle(settings = defaultSettings, canvas: SVGElement): void {
  if (settings.title.text) {
    appendSVGChild(
      'title',
      canvas,
      {},
      `${settings.title.text}${
        settings.subtitle.appendToTitle.append
          ? settings.subtitle.appendToTitle.join +
            settings.subtitle.appendToTitle.join
          : ''
      }`
    ) as SVGTitleElement;
    if (settings.title.display) {
      const title: SVGTextElement = appendSVGChild(
        'text',
        canvas,
        {
          'class': 'chart-title',
          'dy': '1em',
          'text-anchor': 'middle',
          'x': layout.get().canvas.width / 2,
          'y': layout.get().title.points.y1
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
              (layout.get().canvas.width +
                layout.get().legend.width +
                Math.max(
                  layout.get().title.margin.left,
                  layout.get().legend.margin.right,
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
              (layout.get().canvas.width -
                layout.get().legend.width -
                Math.max(
                  layout.get().title.margin.right,
                  layout.get().legend.margin.left,
                  0
                )) /
              2
            ).toString()
          );
        }
      }
      const titleWidth =
        layout.get().canvas.width -
        Math.max(settings.canvas.padding.left, settings.title.margin.left, 0) -
        Math.max(
          settings.canvas.padding.right,
          settings.title.margin.right,
          0
        ) -
        (settings.legend.displaceTitle
          ? layout.get().legend.width +
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
      layout.chart.height = layout.chart.points.y2 - layout.chart.points.y1;
      layout.set('title.height', title.getBBox().height);
      layout.set('title.points.x1', title.getBBox().x);
      layout.set('title.points.x2', title.getBBox().x + title.getBBox().width);
      layout.set('title.points.y2', title.getBBox().y + title.getBBox().height);
      layout.set('title.width', title.getBBox().width);
      layout.set(
        'subtitle.points.y1',
        layout.get().title.points.y2 +
          Math.max(
            layout.get().title.margin.bottom,
            layout.get().subtitle.margin.top,
            0
          )
      );
      layout.set(
        'chart.points.y1',
        layout.get().title.points.y2 +
          Math.max(
            layout.get().title.margin.bottom,
            layout.get().chart.margin.top,
            0
          )
      );
      layout.set(
        'subtitle.points.y1',
        layout.get().title.points.y2 +
          Math.max(
            layout.get().title.margin.bottom,
            layout.get().subtitle.margin.top,
            0
          )
      );
      layout.set(
        'chart.height',
        layout.get().chart.points.y2 - layout.get().chart.points.y1
      );
      if (!settings.legend.displaceTitle) {
        layout.set(
          'legend.points.y1',
          layout.get().title.points.y2 +
            Math.max(
              layout.get().title.margin.bottom,
              layout.get().legend.margin.top,
              0
            )
        );
      }
    }
  } else {
    console.warn(
      "You haven't given this chart a title. It will still render okay but a title is strongly recommended for accessibility purposes. If you don't want to display a title but still give it one, set title.text to your title and title.display to false."
    );
  }
}

export default addTitle;
