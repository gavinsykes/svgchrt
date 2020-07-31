import { SettingsObject } from './defaultSettings'

export interface ReturnedCanvas {
  canvas : SVGElement;
  chartArea : SVGGraphicsElement;
}

interface Points {
  x1 : number;
  x2 : number;
  y1 : number;
  y2 : number;
}

interface Margin {
  top : number;
  right : number;
  bottom : number;
  left : number;
}

export interface LayoutItem {
  height : number;
  margin : Margin;
  points : Points;
  width : number;
}

export interface LayoutObject {
  canvas : LayoutItem;
  chart : LayoutItem;
  legend : LayoutItem;
  subtitle : LayoutItem;
  title : LayoutItem;
}

export interface Caller {
  layout : LayoutObject;
  settings : SettingsObject;
  target : HTMLElement;
}
