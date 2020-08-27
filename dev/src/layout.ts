import defaultSettings from './defaultSettings';

interface PaddingandMargin extends Record<string, unknown> {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface Points extends Record<string, unknown> {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

interface CanvasLayout extends Record<string, unknown> {
  height: number;
  padding: PaddingandMargin;
  width: number;
}

interface ChartLayout extends Record<string, unknown> {
  height: number;
  margin: PaddingandMargin;
  points: Points;
  width: number;
}

export type LegendLayout = ChartLayout;

export type SubtitleLayout = ChartLayout;

export type TitleLayout = ChartLayout;

interface LayoutObject extends Record<string, unknown> {
  get: () => LayoutObject;
  set: (
    newState: Record<string, unknown> | string | number,
    ...propChain: string[]
  ) => void;
  canvas: CanvasLayout;
  chart: ChartLayout;
  legend: LegendLayout;
  subtitle: SubtitleLayout;
  title: TitleLayout;
}

const layout: LayoutObject = {
  get: function (): LayoutObject {
    return this;
  },
  set: function (
    newState: Record<string, unknown> | string | number,
    ...propChain: string[]
  ): void {
    /* propChain.reduce((a, b, level) => {
      if (level === path.length) {
        a[b] = newState;
      }
      return a[b];
    }, this); */
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

interface PointsCoords {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

interface ChartArea {
  height: number;
  points: PointsCoords;
  width: number;
}

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
