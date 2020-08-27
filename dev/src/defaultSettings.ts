interface PaddingandMargin extends Record<string, unknown> {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

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

interface LegendItem extends Record<string, unknown> {
  class?: string;
  displayName: string;
  icon?: LegendItemIcon;
  id?: string;
}

interface LegendBackground extends Record<string, unknown> {
  display: boolean;
  colour: string;
  r: number;
  rx: number;
  ry: number;
}

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

interface Canvas extends Record<string, unknown> {
  height: number;
  padding: PaddingandMargin;
  viewBox: string;
  width: number;
}

interface Chart extends Record<string, unknown> {
  margin: PaddingandMargin;
}

interface Title extends Record<string, unknown> {
  display: boolean;
  margin: PaddingandMargin;
  text: string;
}

interface TitleAppendage extends Record<string, unknown> {
  append: boolean;
  join: string;
}

interface Subtitle extends Title {
  appendToTitle: TitleAppendage;
}

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
