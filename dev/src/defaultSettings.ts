/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

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
interface PaddingandMargin extends Record<string, unknown> {
  top: number;
  right: number;
  bottom: number;
  left: number;
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
export interface LegendItemIcon extends Record<string, unknown> {
  cx?: number;
  cy?: number;
  d?: string;
  display: boolean;
  height?: number;
  r?: number;
  rx?: number;
  ry?: number;
  shape: string;
  width?: number;
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
interface LegendItem extends Record<string, unknown> {
  class?: string;
  displayName: string;
  icon?: LegendItemIcon;
  id?: string;
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
interface LegendBackground extends Record<string, unknown> {
  display: boolean;
  colour: string;
  r: number;
  rx: number;
  ry: number;
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
interface Legend extends Record<string, unknown> {
  background: LegendBackground;
  displaceTitle: boolean;
  display: boolean;
  icons: LegendItemIcon;
  itemMargin: PaddingandMargin;
  items: LegendItem[];
  layOverChart: boolean;
  margin: PaddingandMargin;
  orientation: string;
  padding: PaddingandMargin;
  position: string;
  title: string;
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
interface Canvas extends Record<string, unknown> {
  height: number;
  padding: PaddingandMargin;
  viewBox: string;
  width: number;
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
interface Chart extends Record<string, unknown> {
  margin: PaddingandMargin;
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
interface Title extends Record<string, unknown> {
  display: boolean;
  margin: PaddingandMargin;
  text: string;
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
interface TitleAppendage extends Record<string, unknown> {
  append: boolean;
  join: string;
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
interface Subtitle extends Title {
  appendToTitle: TitleAppendage;
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
export interface SettingsObject extends Record<string, unknown> {
  background: boolean;
  canvas: Canvas;
  chart: Chart;
  description: string;
  id: string;
  legend: Legend;
  subtitle: Subtitle;
  target: string;
  title: Title;
}

const defaultSettings: SettingsObject = {
  background: true,
  canvas: {
    height: 500,
    padding: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    },
    viewBox: '0 0 960 500',
    width: 960
  } as Canvas,
  chart: {
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    }
  } as Chart,
  description: '',
  id: '',
  legend: {
    background: {
      colour: 'white',
      display: false,
      r: 0,
      rx: 0,
      ry: 0
    },
    displaceTitle: false,
    display: false,
    icons: {
      cx: 7,
      cy: 7,
      display: false,
      height: 14,
      r: 7,
      rx: 7,
      ry: 7,
      shape: 'rect',
      width: 14
    } as LegendItemIcon,
    itemMargin: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    },
    items: [] as LegendItem[],
    layOverChart: false,
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    },
    orientation: 'vertical',
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    position: 'right',
    title: ''
  } as Legend,
  subtitle: {
    appendToTitle: {
      append: false,
      join: ` - `
    },
    display: false,
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    },
    text: ''
  },
  target: '',
  title: {
    display: false,
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    },
    text: ''
  }
};

export default defaultSettings;
