const defaultSettings = {
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
  },
  chart       : {
    margin : {
      top    : 10,
      right  : 10,
      bottom : 10,
      left   : 10
    }
  },
  description : '',
  id          : '',
  legend      : {
    background    : {
      display : false
    },
    displaceTitle : false,
    display       : false,
    icons         : {
      display : false,
      height  : 14,
      shape   : 'rect',
      width   : 14
    },
    itemMargin    : {
      top    : 5,
      right  : 5,
      bottom : 5,
      left   : 5
    },
    items         : [],
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
  },
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

export default { defaultSettings };
