/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import { SettingsObject } from './defaultSettings';

/**
 * buildSurround takes a SettingsObject and HTMLElement as its arguments. It generates an SVG element onto which it applies the title, description, subtitle and chart area.
 *
 * The return value is the generted chart area.
 *
 * @param {SettingsObject} settings - the settings to apply to the visualisation.
 *
 * @param {HTMLElement} target - the HTML element in which to build the visualisation.
 *
 */
export interface ReturnedCanvas {
  canvas: SVGElement;
  chartArea: SVGGraphicsElement;
}

/**
 * buildSurround takes a SettingsObject and HTMLElement as its arguments. It generates an SVG element onto which it applies the title, description, subtitle and chart area.
 *
 * The return value is the generted chart area.
 *
 * @param {SettingsObject} settings - the settings to apply to the visualisation.
 *
 * @param {HTMLElement} target - the HTML element in which to build the visualisation.
 *
 */
interface Points {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

/**
 * buildSurround takes a SettingsObject and HTMLElement as its arguments. It generates an SVG element onto which it applies the title, description, subtitle and chart area.
 *
 * The return value is the generted chart area.
 *
 * @param {SettingsObject} settings - the settings to apply to the visualisation.
 *
 * @param {HTMLElement} target - the HTML element in which to build the visualisation.
 *
 */
interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface LayoutItem {
  height: number;
  margin: Margin;
  points: Points;
  width: number;
}

export interface LayoutObject {
  canvas: LayoutItem;
  chart: LayoutItem;
  legend: LayoutItem;
  subtitle: LayoutItem;
  title: LayoutItem;
}

export interface Caller {
  layout: LayoutObject;
  settings: SettingsObject;
  target: HTMLElement;
}
