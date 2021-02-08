/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

/**
 * interface PaddingandMargin provides the inner padding and/or outer margin of an item, its 4 values are top, right, bottom and left.
 *
 */
export interface PaddingandMargin extends Record<string, unknown> {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * interface Points provides the co-ordinates of each point of an item, in the format x1, x2, y1, y2.
 *
 */
export interface Points extends Record<string, unknown> {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

/**
 * interface CanvasLayout provides the height, padding and width of the canvas.
 *
 */
export interface CanvasLayout extends Record<string, unknown> {
  height: number;
  padding: PaddingandMargin;
  width: number;
}

export interface ChartArea extends Record<string, unknown> {
  height: number;
  points: Points;
  width: number;
}

/**
 * interface ChartLayout provides the height, margin, points and width of the chartable area.
 *
 */
export interface ChartLayout extends ChartArea {
  margin: PaddingandMargin;
}

/**
 * interface LegendLayout is currently equivalent to ChartLayout.
 *
 */
export type LegendLayout = ChartLayout;

/**
 * interface SubtitleLayout is currently equivalent to ChartLayout.
 *
 */
export type SubtitleLayout = ChartLayout;

/**
 * interface TitleLayout is currently equivalent to ChartLayout.
 *
 */
export type TitleLayout = ChartLayout;

/**
 * interface LayoutObject provides the shape of the entire visualisation's layout. Its containes a getter, setter, and a CanvasLayout, ChartLayout, LegendLayout, SubtitleLayout and TitleLayout.
 *
 */
export interface LayoutObject extends Record<string, unknown> {
  get: () => LayoutObject;
  set: (
    propChain: string,
    newState: Record<string, unknown> | string | number
  ) => LayoutObject | void;
  canvas: CanvasLayout;
  chart: ChartLayout;
  legend: LegendLayout;
  subtitle: SubtitleLayout;
  title: TitleLayout;
}

export enum LegendItemIconShape {
  Circle = 'circle',
  Ellipse = 'ellipse',
  Line = 'line',
  Path = 'path',
  Polygon = 'polygon',
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
  shape: LegendItemIconShape;
  width?: number;
}

/**
 * interface LegendItem is for each item in the displayed Legend.
 *
 * The required value is the displayName and the optional ones are class, icon and id.
 *
 */
export interface LegendItem extends Record<string, unknown> {
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
export interface LegendBackground extends Record<string, unknown> {
  display: boolean;
  colour?: string;
  r?: number;
  rx?: number;
  ry?: number;
}

export enum LegendOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

export enum LegendPosition {
  TopLeft = 'top-left',
  Top = 'top',
  TopRight = 'top-right',
  Right = 'right',
  BottomRight = 'bottom-right',
  Bottom = 'bottom',
  BottomLeft = 'bottom-left',
  Left = 'left'
}

/**
 * interface Legend provides all the information surrounding the visualisation's legend.
 *
 */
export interface LegendSettings extends Record<string, unknown> {
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
export interface CanvasSettings extends Record<string, unknown> {
  height: number;
  padding: PaddingandMargin;
  viewBox: string;
  width: number;
}

/**
 * interface ChartSettings is for the chart settings.
 *
 */
export interface ChartSettings extends Record<string, unknown> {
  margin: PaddingandMargin;
}

/**
 * interface TitleSettings is for the title settings.
 *
 */
export interface TitleSettings extends Record<string, unknown> {
  display: boolean;
  margin: PaddingandMargin;
  text: string;
}

/**
 * interface TitleAppendage is for the join between the title and subtitle.
 *
 */
export interface TitleAppendage extends Record<string, unknown> {
  append: boolean;
  join: string;
}

/**
 * interface SubtitleSettings is for the subtitle settings.
 *
 */
export interface SubtitleSettings extends TitleSettings {
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

export interface ReturnedCanvas {
  canvas: SVGElement;
  chartArea: SVGGraphicsElement;
}

export interface Caller {
  layout: LayoutObject;
  settings: SettingsObject;
  target: HTMLElement;
}
