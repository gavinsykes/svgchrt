import deepObjectMerge from '../src/deepObjectMerge';
import { expect } from 'chai';
import 'mocha';
import defaultSettings from '../src/defaultSettings';

const options = {
  legend: {
    background: {
      colour: 'white'
    },
    displaceTitle: false,
    display: true,
    icons: {
      display: true
    },
    items: [
      {
        displayName: 'Test1',
        icon: { display: false }
      },
      {
        displayName: 'Test2',
        icon: { display: true, shape: 'circle', cx: 5, cy: 5, r: 5 }
      },
      {
        displayName: 'Test3'
      },
      {
        displayName: 'Test4'
      },
      {
        displayName: 'Test'
      },
      {
        displayName: 'Test'
      },
      {
        displayName: 'Test'
      },
      {
        displayName: 'Test'
      }
    ],
    position: 'bottom',
    orientation: 'horizontal'
  },
  description: 'description of the test-chart',
  id: 'test-chart',
  subtitle: {
    display: true,
    text: 'We go hard or we go home'
  },
  target: '#chart',
  title: {
    display: true,
    text: "Bitch I'm Madonna"
  }
};

const obj1 = {
  a: 'a',
  b: 2,
  c: [1, 2, 3],
  d: {
    a: 10,
    b: 20
  }
};
const obj2 = {
  d: 'd',
  e: 'f',
  f: 2,
  g: 3
};

const merged12: { [index: string]: unknown } = deepObjectMerge(obj1, obj2);
const mergedSettings: { [index: string]: unknown } = deepObjectMerge(
  defaultSettings,
  options
);

describe('mergedSettings.legend.displaceTitle', () => {
  it('should be false', () => {
    expect(mergedSettings.legend.displaceTitle).to.equal(false);
  });
});
describe('mergedSettings.legend.display', () => {
  it('should be true', () => {
    expect(mergedSettings.legend.display).to.equal(true);
  });
});
describe('mergedSettings.legend.icons.display', () => {
  it('should be true', () => {
    expect(mergedSettings.legend.icons.display).to.equal(true);
  });
});
describe('mergedSettings.legend.background.colour', () => {
  it('should be false', () => {
    expect(mergedSettings.legend.background.colour).to.equal('white');
  });
});
describe('obj1.b', () => {
  it('should be 2', () => {
    expect(obj1.b).to.equal(2);
  });
});
describe('obj1.c', () => {
  it('should be [1,2,3]', () => {
    expect(obj1.c[1]).to.equal(2);
  });
});
describe('obj1.d.a', () => {
  it('should be 10', () => {
    expect(obj1.d.a).to.equal(10);
  });
});
describe('obj1.d.b', () => {
  it('should be 20', () => {
    expect(obj1.d.b).to.equal(20);
  });
});
describe('merged12.d', () => {
  it('should be d', () => {
    expect(merged12.d).to.equal('d');
  });
});
