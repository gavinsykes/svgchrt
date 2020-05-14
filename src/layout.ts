import defaultSettings from './defaultSettings';

const layout: {[index: string]:any} = {
  get    : function(): object {return this;},
  set    : function(newState: object | string | number,...propChain: string[]): void {
    switch (propChain.length) {
      case 1:
        this[propChain[0]] = newState;
        break;
      case 2:
        this[propChain[0]][propChain[1]] = newState;
        break;
      case 3:
        this[propChain[0]][propChain[1]][propChain[2]] = newState;
        break;
      case 4:
        this[propChain[0]][propChain[1]][propChain[2]][propChain[3]] = newState;
        break;
      case 5:
        this[propChain[0]][propChain[1]][propChain[2]][propChain[3]][propChain[4]] = newState;
        break;
    }
  },
  canvas : {
    height  : defaultSettings.canvas.height,
    padding : defaultSettings.canvas.padding,
    width   : defaultSettings.canvas.width
  },
  chart  : {
    axes : {
      bottom : {
        height : 0,
        label  : {
          height : 0,
          points : {
            x1 : 0,
            x2 : 0,
            y1 : 0,
            y2 : 0 
          },
          width  : 0
        },
        points : {
          x1 : 0,
          x2 : 0,
          y1 : 0,
          y2 : 0
        },
        scale  : {
          height : 0,
          points : {
            x1 : 0,
            x2 : 0,
            y1 : 0,
            y2 : 0
          },
          width  : 0
        },
        width  : 0
      },
      left: {
        height : 0,
        label  : {
          height : 0,
          points : {
            x1 : 0,
            x2 : 0,
            y1 : 0,
            y2 : 0
          },
          width  : 0
        },
        points  : {
          x1 : 0,
          x2 : 0,
          y1 : 0,
          y2 : 0
        },
        scale   : {
          height : 0,
          points : {
            x1 : 0,
            x2 : 0,
            y1 : 0,
            y2 : 0  
          },
          width  : 0
        },
        width : 0
      },
      right: {
        height: 0,
        label: {
          height: 0,
          points: { x1: 0, x2: 0, y1: 0, y2: 0 },
          width: 0
        },
        points: { x1: 0, x2: 0, y1: 0, y2: 0 },
        scale: {
          height: 0,
          points: { x1: 0, x2: 0, y1: 0, y2: 0 },
          width: 0
        },
        width: 0
      },
      top: {
        height: 0,
        label: {
          height: 0,
          points: { x1: 0, x2: 0, y1: 0, y2: 0 },
          width: 0
        },
        points: { x1: 0, x2: 0, y1: 0, y2: 0 },
        scale: {
          height: 0,
          points: { x1: 0, x2: 0, y1: 0, y2: 0 },
          width: 0
        },
        width: 0
      }
    },
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
    items: [],
    margin: { top: 10, right: 10, bottom: 10, left: 10 },
    points: {
      x1 : Math.max(defaultSettings.canvas.padding.left,defaultSettings.legend.margin.left,0),
      x2 : defaultSettings.canvas.width - Math.max(defaultSettings.canvas.padding.right,defaultSettings.legend.margin.right,0),
      y1 : Math.max(defaultSettings.canvas.padding.top,defaultSettings.legend.margin.top,0),
      y2 : defaultSettings.canvas.height - Math.max(defaultSettings.canvas.padding.bottom,defaultSettings.legend.margin.bottom,0)
      },
    position : "bottom",
    width    : 0
  },
  subtitle : {
    height : 0,
    margin : {
      top    : 5,
      right  : 10,
      bottom : 5,
      left   : 10
    },
    points : {
      x1 : 0,
      x2 : 0,
      y1 : 0,
      y2 : 0
    },
    width  : 0
  },
  title : {
    height : 0,
    margin : {
      top    : 10,
      right  : 10,
      bottom : 5,
      left   : 10
    },
    points : {
      x1 : 0,
      x2 : 0,
      y1 : 0,
      y2 : 0
    },
    width  : 0
  }
};

export function getChartArea() {
  let l = layout.get();
  return {
    height : l.chart.height,
    points : {
      x1 : l.chart.points.x1,
      x2 : l.chart.points.x2,
      y1 : l.chart.points.y1,
      y2 : l.chart.points.y2
    },
    width  : l.chart.width
  }
}

export default layout;
