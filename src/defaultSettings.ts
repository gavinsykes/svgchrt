interface PaddingandMargin {
  top    : number;
  right  : number;
  bottom : number;
  left   : number;
}

interface LegendItemIcon {
  cx?     : string;
  cy?     : string;
  d?      : string;
  display : boolean;
  height? : number;
  r?      : string;
  rx?     : string;
  ry?     : string;
  shape   : string;
  width?  : number;
}

interface LegendItem {
  class?       : string;
  displayName  : string;
  icon?        : LegendItemIcon;
}

interface Legend {
  background    : object;
  displaceTitle : boolean;
  display       : boolean;
  icons         : LegendItemIcon;
  itemMargin    : PaddingandMargin;
  layOverChart  : boolean;
  margin        : PaddingandMargin;
  orientation   : string;
  padding       : PaddingandMargin;
  position      : string;
  title         : string;
}

interface Canvas {
  height  : number;
  padding : PaddingandMargin;
  viewBox : string;
  width   : number;
}

interface Chart {
  margin : PaddingandMargin;
}

interface Titles {
  display : boolean;
  margin  : PaddingandMargin;
  text    : string;
}

export interface SettingsObject {
  background  : boolean;
  canvas      : Canvas;
  chart       : Chart;
  description : string;
  id          : string;
  legend      : Legend;
  subtitle    : Titles;
  target      : string | undefined;
  title       : Titles;
}

const defaultSettings: SettingsObject = {
  background  : true,
  canvas      : {
    height  : 500,
    padding : {
      top    : 10,
      right  : 10,
      bottom : 10,
      left   : 10
    },
    viewBox  : '0 0 960 500',
    width    : 960
  } as Canvas,
  chart       : {
    margin : {
      top    : 10,
      right  : 10,
      bottom : 10,
      left   : 10
    }
  } as Chart,
  description : '',
  id          : '',
  legend      : {
    background    : {
      color   : 'white',
      display : false,
      r       : 0,
      rx      : 0,
      ry      : 0
    },
    displaceTitle : false,
    display       : false,
    icons         : {
      display : false,
      height  : 14,
      shape   : 'rect',
      width   : 14
    } as LegendItemIcon,
    itemMargin    : {
      top    : 5,
      right  : 5,
      bottom : 5,
      left   : 5
    },
    items         : [] as LegendItem[],
    layOverChart  : false,
    margin        : {
      top    : 10,
      right  : 10,
      bottom : 10,
      left   : 10
    },
    orientation   : 'vertical',
    padding       : {
      top    : 0,
      right  : 0,
      bottom : 0,
      left   : 0
    },
    position      : 'right',
    title         : ''
  } as Legend,
  subtitle    : {
    display : false,
    margin  : {
      top    : 10,
      right  : 10,
      bottom : 10,
      left   : 10
    },
    text    : ''
  },
  target      : undefined,
  title       : {
    display : false,
    margin  : {
      top    : 10,
      right  : 10,
      bottom : 10,
      left   : 10
    },
    text    : ''
  }
};

export default defaultSettings;
