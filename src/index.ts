import defaultSettings, { SettingsObject } from './defaultSettings';
import initialLayout, { getChartArea } from './layout';
import isObject from './isObject';
import deepObjectMerge from './deepObjectMerge';
import appendSVGChild from './appendSVGChild';
import svgWrapText from './svgWrapText';
import updateData from './updateData';
import updateOptions from './updateOptions';
import placeCanvas from './placeCanvas';
import addTitle from './addTitle';
import addSubtitle from './addSubtitle';
import addDescription from './addDescription';
import addLegend from './addLegend';
import plot from './plot';
import placePlot from './placePlot';
import buildSurround from './buildSurround';
import render from './render';
import { Caller } from './interfaces';

class SVGChrt {
  defaultSettings = defaultSettings;
  layout          = initialLayout;
  settings        : SettingsObject;
  target          : HTMLElement;
  constructor(options = {}, data = []) {
    this.settings = deepObjectMerge(this.defaultSettings, options) as SettingsObject;
    this.target = /^#\w*/i.test(this.settings.target)
                ? document.querySelector(this.settings.target) as HTMLElement
                : document.querySelector(`#${this.settings.target}`) as HTMLElement;
  }
  render() {
    if (!this.target) {
      throw new Error(
        `Sorry, ${this.settings.target} doesn't appear to exist in the document. Please use a target <div> or <section> that is already in the document to display your visualisation.`
      );
      return;
    }
    let tET = this.target.tagName.toLowerCase();
    if (!['div', 'section'].includes(tET)) {
      throw new Error(
        `Sorry, ${this.settings.target} doesn't appear to be a <div> or <section>. You need to select one of those from the document to display your visualisation.`
      );
      return;
    }
    let c: SVGGraphicsElement = buildSurround(this.settings,this.target);
    if (plot instanceof Function) {
      plot(c);
    }
  }
}

module.exports = SVGChrt;
