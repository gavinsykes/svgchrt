/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

/**
 * interface PaddingandMargin is for use to determine either the padding or margin of an item, with numeric values for top, right, bottom and left.
 *
 */
interface PaddingandMargin extends Record<string, unknown> {
  top: number;
  right: number;
  bottom: number;
  left: number;
}


enum LegendItemIconShape {
  Circle = 'circle',
  Ellipse = 'ellipse',
  Line = 'line',
  Path = 'path',
  Polygon=  'polygon',
  Polyline = 'polyline',
  Rect = 'rect'
}
/**
 * interface LegendItemIcon is for the icons on the displayed Legend.
 *
 * The required values in any instance are display and shape. Depending on which shape is chosen then the nature os SVG means that others will also be required.
 *
 * rect (default) - width and height will be required. rx and ry are optional.
 *
 * circle - cx, cy and r will be required.
 *
 * ellipse - cx, cy, rx and ry will be required.
 *
 * path - d is required.
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
 * interface LegendItem is for each item in the displayed Legend.
 *
 * The required value is the displayName and the optional ones are class, icon and id.
 *
 */
interface LegendItem extends Record<string, unknown> {
  class?: string;
  displayName: string;
  icon?: LegendItemIcon;
  id?: string;
}

/**
 * interface LegendBackground is for the background of the displayed Legend.
 *
 * The required value is display and the optional values are colour, r, rx and ry.
 *
 */
interface LegendBackground extends Record<string, unknown> {
  display: boolean;
  colour?: string;
  r?: number;
  rx?: number;
  ry?: number;
}

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
  Left = 'left',
}

/**
 * interface Legend provides all the information surrounding the visualisation's legend.
 *
 */
interface LegendSettings extends Record<string, unknown> {
  background: LegendBackground;
  displaceTitle: boolean;
  display: boolean;
  icons: LegendItemIcon;
  itemMargin: PaddingandMargin;
  items: LegendItem[];
  layOverChart: boolean;
  margin: PaddingandMargin;
  orientation: LegendOrientation;
  padding: PaddingandMargin;
  position: LegendPosition;
  title: string;
}

/**
 * interface CanvasSettings is for the canvas settings.
 *
 */
interface CanvasSettings extends Record<string, unknown> {
  height: number;
  padding: PaddingandMargin;
  viewBox: string;
  width: number;
}

/**
 * interface ChartSettings is for the chart settings.
 *
 */
interface ChartSettings extends Record<string, unknown> {
  margin: PaddingandMargin;
}

/**
 * interface TitleSettings is for the title settings.
 *
 */
interface TitleSettings extends Record<string, unknown> {
  display: boolean;
  margin: PaddingandMargin;
  text: string;
}

/**
 * interface TitleAppendage is for the join between the title and subtitle.
 *
 */
interface TitleAppendage extends Record<string, unknown> {
  append: boolean;
  join: string;
}

/**
 * interface SubtitleSettings is for the subtitle settings.
 *
 */
interface SubtitleSettings extends TitleSettings {
  appendToTitle: TitleAppendage;
}

/**
 * interface SettingsObject is for the settings object.
 *
 */
export interface SettingsObject extends Record<string, unknown> {
  background: boolean;
  canvas: CanvasSettings;
  chart: ChartSettings;
  description: string;
  id: string;
  legend: LegendSettings;
  subtitle: SubtitleSettings;
  target: string;
  title: TitleSettings;
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
  },
  chart: {
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    }
  },
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
    },
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
  },
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
