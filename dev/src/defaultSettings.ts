/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import {
  SettingsObject,
  LegendItemIconShape,
  LegendItem,
  LegendOrientation,
  LegendPosition
} from './interfaces';

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
      shape: LegendItemIconShape.Rect,
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
    orientation: LegendOrientation.Vertical,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    position: LegendPosition.Right,
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
