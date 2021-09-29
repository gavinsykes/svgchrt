/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import appendSVGChild from './appendSVGChild';

/**
 * svgWrapText takes an SVGTextElement and number as its arguments. It wraps the SVGTextElement into the number of SVG pixels by adding multiple `<tspan>` elements if required and aligning them correctly.
 *
 * The return value is void.
 *
 * @param {SVGTextElement} item - the text item to wrap.
 *
 * @param {number} width - the wrapping width in SVG pixels.
 *
 */
function svgWrapText(item: SVGTextElement, width: number, lineHeight = 1.1): void {
  if (item.getComputedTextLength() < width) {
    return;
  }
  const words: string[] = item?.textContent?.split(/\s+/).reverse() as string[];
  let word: string;
  let line: string[] = [];
  let lineNumber = 0;
  const x = item.getAttribute('x');
  const y = item.getAttribute('y');
  const dyval: string = item.getAttribute('dy')
    ? item.getAttribute('dy')!
    : '0';
  const value: number = parseFloat(dyval.match(/[0-9.]/)![0]);
  const units: string = dyval.match(/[A-Za-z%]+/)![0];
  const dy = {
    value: value,
    units: units
  };
  item.textContent = null;
  let tspan: SVGTextElement = appendSVGChild('tspan', item, {
    x: x,
    y: y,
    dy: `${dy.value}${dy.units}`
  }) as SVGTextElement;
  while ((word = words.pop() as string)) {
    line.push(word);
    tspan.textContent = line.join(' ');
    if (tspan.getComputedTextLength() > width) {
      line.pop();
      tspan.textContent = line.join(' ');
      line = [word];
      tspan = appendSVGChild(
        'tspan',
        item,
        {
          x: x,
          y: y,
          dx: 0,
          dy: `${++lineNumber * lineHeight + dy.value}${dy.units}`
        },
        word
      ) as SVGTextElement;
    }
  }
}

export default svgWrapText;
