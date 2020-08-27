import appendSVGChild from './appendSVGChild';

function svgWrapText(item: SVGTextElement, width: number): void {
  if (item.getComputedTextLength() < width) {
    return;
  }
  const words: string[] = item?.textContent
    ?.split(/\s+/)
    .reverse() as string[];
  let word: string;
  let line: string[] = [];
  let lineNumber = 0;
  const lineHeight = 1.1;
  const x = item.getAttribute('x');
  const y = item.getAttribute('y');
  const dyval: string = item.getAttribute('dy') ? item.getAttribute('dy')! : '0' ;
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
