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