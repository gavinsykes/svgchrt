import isObject from '../src/isObject';
import { expect } from 'chai';
import 'mocha';

const expectedResults = [
  {
    testVal: 5,
    eR: false
  },
  {
    testVal: '5',
    eR: false
  },
  {
    testVal: "This isn't an object",
    eR: false
  },
  {
    testVal: 'This one is an object. Or is it?',
    eR: false
  },
  {
    testVal: [5],
    eR: false
  },
  {
    testVal: true,
    eR: false
  },
  {
    testVal: { 5: 5 },
    eR: true
  },
  {
    testVal: {},
    eR: true
  },
  {
    testVal: { 5: { 5: 5 } },
    eR: true
  }
];

expectedResults.map((t) =>
  describe(`isObject(${t.testVal})`, () => {
    it(`should return ${t.eR}`, () => {
      const result = isObject(t.testVal);
      expect(result).to.equal(t.eR);
    });
  })
);
