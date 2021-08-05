/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import { SettingsObject, SCInterface } from './interfaces';
import defaultSettings from './defaultSettings';
import initialLayout, { getChartArea } from './layout';
import deepObjectMerge from './deepObjectMerge';
import appendSVGChild from './appendSVGChild';
import plot from './plot';
import placePlot from './placePlot';
import buildSurround from './buildSurround';

// UPDATE 5th August 2021 - attempting to reconstruct with a functional approach, in a more D3-esque style

interface Margin extends Record<string, Number> {
  top: Number;
  right: Number;
  bottom: Number;
  left: Number;
}

enum LegendOrientation {
  Horizontal = "horizontal",
  Vertical = "vertical"
}

enum LegendPosition {
  TopLeft     = "top-left",
  Top         = "top",
  TopRight    = "top-right",
  Right       = "right",
  BottomRight = "bottom-right",
  Bottom      = "bottom",
  BottomLeft  = "bottom-left",
  Left        = "left",
}

interface LegendItem extends Record<string, unknown> {}

export const chart = () => {
  let width: Number,
  height: Number,
  margin: Margin,
  title: String,
  subtitle: String,
  legendDisplay: Boolean,
  legendItems: LegendItem[],
  legendPosition: LegendPosition,
  legendOrientation: LegendOrientation,
  target: HTMLDivElement | String;
  const my = () => {
    if (target !instanceof HTMLDivElement && target !instanceof String) {
      // Error, target isn't a div or string
    } else if (target instanceof String) {
      if (document.querySelector(target as string) instanceof HTMLDivElement) {
        target = document.querySelector(target as string) as HTMLDivElement;
      } else {
        // Error, selector is not a div element
      }
    }
    const surround = buildSurround().target(target)
    .width(width)
    .height(height)
    .margin(margin)
    .title(title)
    .subtitle(subtitle)
    .legendDisplay(legendDisplay)
    .legendItems(legendItems)
    .legendPosition(legendPosition)
    .legendOrientation(legendOrientation);
  };

  my.height = function(_?: Number) {
    return arguments.length
      ? ((height = _ as Number), my)
      : height;
  }
  
  my.legendDisplay = function(_?: Boolean) {
    return arguments.length
    ? ((legendDisplay = _ as Boolean), my)
    : legendDisplay;
  }

  my.legendItems = function(_?: LegendItem[]) {
    return arguments.length
      ? ((legendItems = _ as LegendItem[]), my)
      : legendItems;
  }
  
  my.legendOrientation = function(_?: LegendOrientation) {
    return arguments.length
    ? ((legendOrientation = _ as LegendOrientation), my)
    : legendOrientation;
  }
  
  my.legendPosition = function(_?: LegendPosition) {
    return arguments.length
    ? ((legendPosition = _ as LegendPosition), my)
    : legendPosition;
  }

  my.margin = function(_?: Margin) {
    return arguments.length
      ? ((margin = _ as Margin), my)
      : margin;
  }

  my.subtitle = function(_?: String) {
    return arguments.length
      ? ((subtitle = _ as String), my)
      : subtitle;
  }
  
  my.target = function(_?: HTMLDivElement | String) {
    return arguments.length
      ? ((target = _ as HTMLDivElement | String), my)
      : target;
  }

  my.title = function(_?: String) {
    return arguments.length
      ? ((title = _ as String), my)
      : title;
  }

  my.width = function(_?: Number) {
    return arguments.length
      ? ((width = _ as Number), my)
      : width;
  }

  return my;
}; 

/* interface SCConstructor {
  new (
    options: Record<string, unknown>,
    data: Record<string, unknown>[]
  ): SCInterface;
} */
/**
 * SVGChrt.
 *
 * @param {SettingsObject} settings - the settings to apply to the visualisation.
 *
 * @param {HTMLElement} target - the HTML element in which to build the visualisation.
 *
 */
export default class SVGChrt implements SCInterface {
  // Exposed selectable elements
  canvas: SVGElement | null;
  chartArea: SVGGraphicsElement | null;
  /*
    Canvas - done-ish
    ChartArea - done
    Title
    Subtitle
    Legend
    Each legend item 
  */
  defaultSettings = defaultSettings;
  layout = initialLayout;
  appendSVGChild = appendSVGChild;
  plot = plot;
  placePlot = placePlot;
  deepObjectMerge = deepObjectMerge;
  getChartArea = getChartArea;
  settings: SettingsObject;
  target: HTMLElement;
  data: Record<string, unknown>[];
  constructor(
    options: Record<string, unknown> = {},
    data: Record<string, unknown>[] = []
  ) {
    this.settings = deepObjectMerge(
      deepObjectMerge(this.defaultSettings, {
        canvas: { viewBox: `0 0 960 500` }
      } as Record<string, unknown>),
      options
    ) as SettingsObject;
    this.target = /^#\w*/i.test(this.settings.target)
      ? (document.querySelector(this.settings.target) as HTMLElement)
      : (document.querySelector(`#${this.settings.target}`) as HTMLElement);
    this.canvas = null;
    this.chartArea = null;
    this.data = data;
  }

  render(): void {
    if (!this.target) {
      throw new Error(
        `Sorry, ${this.settings.target} doesn't appear to exist in the document. Please use a target <div> or <section> that is already in the document to display your visualisation.`
      );
      return;
    }
    const tET = this.target.tagName.toLowerCase();
    if (!['div', 'section'].includes(tET)) {
      throw new Error(
        `Sorry, ${this.settings.target} doesn't appear to be a <div> or <section>. You need to select one of those from the document to display your visualisation.`
      );
      return;
    }
    const c = buildSurround(this.settings, this.target);
    this.chartArea = c.chartArea;
    this.canvas = c.canvas;
    if (this.plot instanceof Function) {
      this.plot(this, this.settings);
      this.placePlot(this.chartArea);
    }
  }
}