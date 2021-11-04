/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import { buildSurround, Margin, LegendItem } from './buildSurround';

// UPDATE 5th August 2021 - attempting to reconstruct with a functional approach, in a more D3-esque style

enum LegendOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

enum LegendPosition {
  TopLeft = 'top-left',
  Top = 'top',
  TopRight = 'top-right',
  Right = 'right',
  BottomRight = 'bottom-right',
  Bottom = 'bottom',
  BottomLeft = 'bottom-left',
  Left = 'left'
}

export const chart = (): typeof my => {
  let width: number,
    height: number,
    margin: Margin,
    title: string,
    subtitle: string,
    legendDisplay: boolean,
    legendItems: LegendItem[],
    legendPosition: LegendPosition,
    legendOrientation: LegendOrientation,
    target: SVGElement | string;
  const my = () => {
    if (!(target instanceof SVGElement)) {
      // Error, target isn't an SVG or string
    } else if (typeof target === 'string') {
      if (document.querySelector(target as string) instanceof SVGElement) {
        target = document.querySelector(target as string) as SVGElement;
      } else {
        // Error, selector is not an SVG element
      }
    }
  };

  my.height = function (_: number) {
    return arguments.length ? ((height = _), my as typeof my) : height;
  };

  my.legendDisplay = function (_: boolean) {
    return arguments.length
      ? ((legendDisplay = _), my as typeof my)
      : legendDisplay;
  };

  my.legendItems = function (_: LegendItem[]) {
    return arguments.length
      ? ((legendItems = _), my as typeof my)
      : legendItems;
  };

  my.legendOrientation = function (_: LegendOrientation) {
    return arguments.length
      ? ((legendOrientation = _), my as typeof my)
      : legendOrientation;
  };

  my.legendPosition = function (_: LegendPosition) {
    return arguments.length
      ? ((legendPosition = _), my as typeof my)
      : legendPosition;
  };

  my.margin = function (_: Margin) {
    return arguments.length ? ((margin = _), my as typeof my) : margin;
  };

  my.subtitle = function (_: string) {
    return arguments.length ? ((subtitle = _), my as typeof my) : subtitle;
  };

  my.target = function (_: SVGElement) {
    return arguments.length ? ((target = _), my as typeof my) : target;
  };

  my.title = function (_: string) {
    return arguments.length ? ((title = _), my as typeof my) : title;
  };

  my.width = function (_: number) {
    return arguments.length ? ((width = _), my as typeof my) : width;
  };

  my.draw = function () {
    buildSurround()
      .width(width)
      .margin(margin)
      .height(height)
      .target(target as SVGElement)
      .title(title)
      .subtitle(subtitle)
      .legendDisplay(legendDisplay)
      .legendItems(legendItems)
      .legendPosition(legendPosition)
      .legendOrientation(legendOrientation);
  };

  return my;
};
