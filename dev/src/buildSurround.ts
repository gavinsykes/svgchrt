/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import {
  LegendPosition,
  LegendOrientation
} from './interfaces';

export interface Margin extends Record<string, number> {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface LegendItem extends Record<string, unknown> {
  text: string;
  colour?: string;
  shape?: string;
  cx?: string;
  cy?: string;
  d?: string;
  height?: string;
  r?: string;
  rx?: string;
  ry?: string;
  width?: string;
  x?: string;
  y?: string;
}

export const buildSurround = (): typeof my => {
  let width = 960;
  let height = 500;
  let margin = { top: 0, right: 0, bottom: 0, left: 0 };
  let title: string;
  let subtitle: string;
  let titleTextElement: SVGTextElement | null;
  let titleElement: SVGTitleElement | null;
  let subtitleTextElement: SVGTextElement | null;
  let legendDisplay = false;
  let legendElement: SVGGraphicsElement | null;
  let legendItems: LegendItem[];
  let legendPosition = LegendPosition.Right;
  let legendOrientation = LegendOrientation.Vertical;
  let chartArea: SVGGraphicsElement;
  let target: SVGElement;
  const my = () => {
    if (!target) {
      throw new Error(
        `Looks like I haven't been given a target SVG to work with.`
      );
    }
    if (!(target instanceof SVGElement)) {
      throw new Error(
        `Looks like the target I have been given isn't an SVG. I have been given ${target}`
      );
    }
    target.setAttribute('width', `${width}`);
    target.setAttribute('height', `${height}`);
    titleTextElement = target.querySelector('text.title');
    titleElement = target.querySelector('title') as SVGTitleElement | null;
    subtitleTextElement = target.querySelector('text.subtitle');
    if (title) {
      if (titleTextElement) {
        titleTextElement.textContent = title;
      } else {
        titleTextElement = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'text'
        );
        titleTextElement.textContent = title;
        titleTextElement.setAttribute('class', 'title');
        titleTextElement.setAttribute('text-anchor', 'middle');
        titleTextElement.setAttribute('x', `${width / 2}`);
        titleTextElement.setAttribute(
          'y',
          `${titleTextElement.getBBox().height}`
        );
        titleTextElement.setAttribute('dy', '1em');
        target.appendChild(titleTextElement);
      }
      if (titleElement) {
        titleElement.textContent = title;
      } else {
        titleElement = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'title'
        );
        titleElement.textContent = title;
        target.appendChild(titleElement);
      }
    } else {
      console.warn('You really should consider giving your chart a title!');
      if (titleTextElement) {
        titleTextElement.remove();
      }
      if (titleElement) {
        titleElement.remove();
      }
    }
    if (subtitle) {
      if (subtitleTextElement) {
        subtitleTextElement.textContent = subtitle;
      } else {
        subtitleTextElement = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'text'
        );
        subtitleTextElement.textContent = subtitle;
        subtitleTextElement.setAttribute('class', 'subtitle');
        subtitleTextElement.setAttribute('text-anchor', 'middle');
        subtitleTextElement.setAttribute('x', `${width / 2}`);
        subtitleTextElement.setAttribute(
          'y',
          `${
            subtitleTextElement.getBBox().height +
            10 +
            (titleTextElement ? titleTextElement?.getBBox().height : 0)
          }`
        );
        subtitleTextElement.setAttribute('dy', '1em');
        target.appendChild(subtitleTextElement);
      }
    } else {
      if (subtitleTextElement) {
        subtitleTextElement.remove();
      }
    }
    if (legendDisplay && legendItems) {
      if (!legendElement) {
        legendElement = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'g'
        ) as SVGGraphicsElement;
      }
      legendElement.setAttribute('class', 'legend');
      const legendBackground = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect'
      );
      legendBackground.setAttribute('class', 'legend-background');
      legendElement.appendChild(legendBackground);
      legendItems.map((c, i) => {
        const legendItemElement = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'g'
        );
        legendItemElement.setAttribute('class', 'legend-item');
        const legendItemElementIcon = document.createElementNS(
          'http://www.w3.org/2000/svg',
          c.shape ? (c.shape as string) : 'rect'
        ) as SVGGraphicsElement;
        legendItemElementIcon.setAttribute('class', 'legend-item-icon');
        legendItemElementIcon.setAttribute('cx', c.cx ? c.cx : '');
        legendItemElementIcon.setAttribute('cy', c.cy ? c.cy : '');
        legendItemElementIcon.setAttribute('cx', c.d ? c.d : '');
        legendItemElementIcon.setAttribute('cy', c.height ? c.height : '');
        legendItemElementIcon.setAttribute('cx', c.r ? c.r : '');
        legendItemElementIcon.setAttribute('cx', c.rx ? c.rx : '');
        legendItemElementIcon.setAttribute('cy', c.ry ? c.ry : '');
        legendItemElementIcon.setAttribute('cy', c.width ? c.width : '');
        legendItemElementIcon.setAttribute('cx', c.x ? c.x : '');
        legendItemElementIcon.setAttribute('cy', c.y ? c.y : '');
        legendItemElementIcon.setAttribute('fill', c.colour ? c.colour : '');
        const legendItemElementText = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'text'
        ) as SVGTextElement;
        legendItemElementText.setAttribute('class', 'legend-item-text');
        legendItemElementText.setAttribute('dy', '12px');
        legendItemElementText.textContent = c.text;
        legendItemElementText.setAttribute(
          'transform',
          `translate(${legendItemElementIcon.getBBox().width + 5},0)`
        );
        legendItemElement.appendChild(legendItemElementIcon);
        legendItemElement.appendChild(legendItemElementText);
        legendItemElement.setAttribute('transform', `translate(0,${i * 20})`);
      });
      const legendTransform = { x: 0, y: 0 };
      switch (legendPosition) {
        case 'top-left':
          break;
        case 'top':
          break;
        case 'top-right':
          break;
        case 'right':
          legendTransform.x =
            width - margin.right - legendElement.getBBox().width;
          break;
        case 'bottom-right':
          break;
        case 'bottom':
          break;
        case 'bottom-left':
          break;
        case 'left':
          break;
        default:
          break;
      }
      target.appendChild(legendElement);
    } else {
      if (legendElement) {
        legendElement.remove();
      }
    }
    let g = target.querySelector('g.chart-area') as SVGGraphicsElement;
    if (!g) {
      g = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'g'
      ) as SVGGraphicsElement;
      g.setAttribute('class', 'chart-area');
      target.appendChild(g);
      chartArea = g;
    }
  };

  my.margin = function (_: Margin): typeof my | Margin {
    return arguments.length ? ((margin = _), my) : margin;
  };

  my.title = function (_: string): typeof my | string {
    return arguments.length ? ((title = _), my) : title;
  };

  my.subtitle = function (_: string): typeof my | string {
    return arguments.length ? ((subtitle = _), my) : subtitle;
  };

  my.width = function (_: number): typeof my | number {
    return arguments.length ? ((width = _), my) : width;
  };

  my.height = function (_: number): typeof my | number {
    return arguments.length ? ((height = _), my) : height;
  };

  my.legendPosition = function (_: LegendPosition): typeof my | LegendPosition {
    return arguments.length ? ((legendPosition = _), my) : legendPosition;
  };

  my.legendDisplay = function (_: boolean): typeof my | boolean {
    return arguments.length ? ((legendDisplay = _), my) : legendDisplay;
  };

  my.legendItems = function (_: LegendItem[]): typeof my | LegendItem[] {
    return arguments.length ? ((legendItems = _), my) : legendItems;
  };

  my.legendOrientation = function (_: LegendOrientation): typeof my | LegendOrientation {
    return arguments.length ? ((legendOrientation = _), my) : legendOrientation;
  };

  my.target = function (_: SVGElement): typeof my | SVGElement {
    return arguments.length ? ((target = _), my) : target;
  };

  my.chartArea = function () {
    return {
      g: chartArea,
      x1:
        margin.left +
        (legendElement &&
        (legendPosition === LegendPosition.Left ||
          (legendOrientation === LegendOrientation.Vertical &&
            (legendPosition === LegendPosition.TopLeft ||
              legendPosition === LegendPosition.BottomLeft)))
          ? legendElement?.getBBox().width
          : 0),
      x2:
        margin.right +
        (legendElement &&
        (legendPosition === LegendPosition.Right ||
          (legendOrientation === LegendOrientation.Vertical &&
            (legendPosition === LegendPosition.TopRight ||
              legendPosition === LegendPosition.BottomRight)))
          ? legendElement?.getBBox().width
          : 0),
      y1:
        margin.top +
        10 +
        (titleTextElement ? titleTextElement.getBBox().height : 0) +
        (subtitleTextElement ? subtitleTextElement.getBBox().height : 0) +
        (legendElement &&
        (legendPosition === LegendPosition.Top ||
          (legendOrientation === LegendOrientation.Horizontal &&
            (legendPosition === LegendPosition.TopLeft ||
              legendPosition === LegendPosition.TopRight)))
          ? legendElement?.getBBox().height
          : 0),
      y2:
        margin.bottom +
        (legendElement &&
        (legendPosition === LegendPosition.Bottom ||
          (legendOrientation === LegendOrientation.Horizontal &&
            (legendPosition === LegendPosition.BottomLeft ||
              legendPosition === LegendPosition.BottomRight)))
          ? legendElement?.getBBox().height
          : 0)
    };
  };

  return my;
};

export default buildSurround;
