/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import defaultSettings from './defaultSettings';
import { LayoutObject, ChartArea } from './interfaces';

const layout: LayoutObject = {
  get: function (): LayoutObject {
    return this;
  },
  set: function (
    propChain: string,
    newState: Record<string, unknown> | string | number
  ): LayoutObject | void {
    if (['get', 'set'].includes(propChain)) {
      console.warn(
        "Please don't attempt to change the getter or setter functions in the layout object!"
      );
      return;
    }
    if (propChain === '') return;
    propChain
      .split('.')
      .reduce(
        (original: Record<string, unknown>, nuevo: string, level: number) => {
          if (!(nuevo in original)) {
            original[nuevo] = {};
          }
          if (level === propChain.split('.').length - 1) {
            original[nuevo] = newState;
          }
          if (typeof original[nuevo] === 'string')
            return original[nuevo] as string;
          if (typeof original[nuevo] === 'number') {
            return original[nuevo] as number;
          } else {
            return original[nuevo] as Record<string, unknown>;
          }
        },
        this as Record<string, unknown>
      );
    return this;
  },
  canvas: {
    height: defaultSettings.canvas.height,
    padding: defaultSettings.canvas.padding,
    width: defaultSettings.canvas.width
  },
  chart: {
    height: 0,
    margin: defaultSettings.chart.margin,
    points: {
      x1: Math.max(
        defaultSettings.canvas.padding.left,
        defaultSettings.chart.margin.left,
        0
      ),
      x2:
        defaultSettings.canvas.width -
        Math.max(
          defaultSettings.canvas.padding.right,
          defaultSettings.chart.margin.right,
          0
        ),
      y1: Math.max(
        defaultSettings.canvas.padding.top,
        defaultSettings.chart.margin.top,
        0
      ),
      y2:
        defaultSettings.canvas.height -
        Math.max(
          defaultSettings.canvas.padding.bottom,
          defaultSettings.chart.margin.bottom,
          0
        )
    },
    width: 0
  },
  legend: {
    height: 0,
    margin: { top: 10, right: 10, bottom: 10, left: 10 },
    points: {
      x1: Math.max(
        defaultSettings.canvas.padding.left,
        defaultSettings.legend.margin.left,
        0
      ),
      x2:
        defaultSettings.canvas.width -
        Math.max(
          defaultSettings.canvas.padding.right,
          defaultSettings.legend.margin.right,
          0
        ),
      y1: Math.max(
        defaultSettings.canvas.padding.top,
        defaultSettings.legend.margin.top,
        0
      ),
      y2:
        defaultSettings.canvas.height -
        Math.max(
          defaultSettings.canvas.padding.bottom,
          defaultSettings.legend.margin.bottom,
          0
        )
    },
    width: 0
  },
  subtitle: {
    height: 0,
    margin: {
      top: 5,
      right: 10,
      bottom: 5,
      left: 10
    },
    points: {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0
    },
    width: 0
  },
  title: {
    height: 0,
    margin: {
      top: 10,
      right: 10,
      bottom: 5,
      left: 10
    },
    points: {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0
    },
    width: 0
  }
};

export function getChartArea(): ChartArea {
  const l = layout.get().chart;
  return {
    height: l.height,
    points: {
      x1: l.points.x1,
      x2: l.points.x2,
      y1: l.points.y1,
      y2: l.points.y2
    },
    width: l.width
  };
}

export default layout;
