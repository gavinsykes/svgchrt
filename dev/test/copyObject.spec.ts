import copyObject from '../src/copyObject';
import { expect } from 'chai';
import 'mocha';

function arrayCompare(arr1: Array<any>, arr2: Array<any>): boolean {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
  if (!arr1.length || !arr2.length) return false;
  let result = true;
  arr1.map((c, i, a) => {
    if (c !== arr2[i]) result = false;
  });
  return result;
}

const original = {
  a: 'a',
  b: 2,
  c: [1, 2],
  d: {
    a: 'a',
    b: 2
  }
};

const copied: { [index: string]: any } = copyObject(original) as {
  [index: string]: any;
};

copied.a = 1;
copied.b = 'b';
copied.c = [3, 4];
copied.d.a = 1;
copied.d.b = 'b';
copied.d.c = [1, 2, 3, 4];

original.a = 'aaa';
original.b = 22;
original.c = [11, 22];
original.d.a = 'aaa';
original.d.b = 22;

describe('copied.a', () => {
  it('should be 1', () => {
    expect(copied.a).to.equal(1);
  });
});

describe('copied.b', () => {
  it('should be b', () => {
    expect(copied.b).to.equal('b');
  });
});

describe('copied.c', () => {
  it('should be [3,4]', () => {
    expect(arrayCompare(copied.c, [3, 4])).to.equal(true);
  });
});

describe('copied.d.a', () => {
  it('should be 1', () => {
    expect(copied.d.a).to.equal(1);
  });
});

describe('copied.d.b', () => {
  it('should be b', () => {
    expect(copied.d.b).to.equal('b');
  });
});

describe('copied.d.c', () => {
  it('should be [1,2,3,4]', () => {
    expect(arrayCompare(copied.d.c, [1, 2, 3, 4])).to.equal(true);
  });
});

describe('original.a', () => {
  it('should be aaa', () => {
    expect(original.a).to.equal('aaa');
  });
});

describe('original.b', () => {
  it('should be 22', () => {
    expect(original.b).to.equal(22);
  });
});

describe('original.c', () => {
  it('should be [11,22]', () => {
    expect(arrayCompare(original.c, [11, 22])).to.equal(true);
  });
});

describe('original.d.a', () => {
  it('should be aaa', () => {
    expect(original.d.a).to.equal('aaa');
  });
});

describe('original.b', () => {
  it('should be 22', () => {
    expect(original.d.b).to.equal(22);
  });
});
