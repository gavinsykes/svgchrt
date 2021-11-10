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
  let width = 960;
  let height = 500;
  let margin: Margin = { top: 0, right: 0, bottom: 0, left: 0 };
  let title = '';
  let subtitle = '';
  let legendDisplay = false;
  let legendItems: LegendItem[] = [];
  let legendPosition = LegendPosition.Right;
  let legendOrientation = LegendOrientation.Vertical;
  let target: SVGElement | string;
  const my = () => {
    if (!(target instanceof SVGElement)) {
      // Error, target isn't an SVG or string
      throw new Error("Target isn't an SVG element or string!");
    } else if (typeof target === 'string') {
      if (document.querySelector(target as string) instanceof SVGElement) {
        target = document.querySelector(target as string) as SVGElement;
      } else {
        // Error, selector is not an SVG element
        throw new Error('Given selector is not an SVG element!');
      }
    }
  };

  my.height = function (_: number) {
    height = _;
    return my;
  };

  my.getHeight = function (): number {
    return height;
  };

  my.legendDisplay = function (_: boolean) {
    legendDisplay = _;
    return my;
  };

  my.getLegendDisplay = function (): boolean {
    return legendDisplay;
  };

  my.legendItems = function (_: LegendItem[]) {
    legendItems = _;
    return my;
  };

  my.getLegendItems = function (): LegendItem[] {
    return legendItems;
  };

  my.legendOrientation = function (_: LegendOrientation) {
    legendOrientation = _;
    return my;
  };

  my.getLegendOrientation = function (): LegendOrientation {
    return legendOrientation;
  };

  my.legendPosition = function (_: LegendPosition) {
    legendPosition = _;
    return my;
  };

  my.getLegendPosition = function (): LegendPosition {
    return legendPosition;
  };

  my.margin = function (_: Margin) {
    margin = _;
    return my;
  };

  my.getMargin = function (): Margin {
    return margin;
  };

  my.subtitle = function (_: string) {
    subtitle = _;
    return my;
  };

  my.getSubtitle = function (): string {
    return subtitle;
  };

  my.target = function (_: SVGElement | string) {
    target = _;
    return my;
  };

  my.getTarget = function (): SVGElement {
    return target as SVGElement;
  };

  my.title = function (_: string) {
    title = _;
    return my;
  };

  my.getTitle = function (): string {
    return title;
  };

  my.width = function (_: number): typeof my {
    width = _;
    return my;
  };

  my.getWidth = function (): number {
    return width;
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
