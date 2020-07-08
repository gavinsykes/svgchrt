function appendSVGChild(
  elementType: string,
  target: HTMLElement | SVGElement,
  attributes: object = {},
  text: string = ''
): SVGElement
 | SVGDescElement
 | SVGGraphicsElement
 | SVGTextElement
 | SVGTitleElement {
  let element: SVGElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    elementType
  );
  Object.entries(attributes).map((a) => element.setAttribute(a[0], a[1]));
  if (text) {
    let textNode = document.createTextNode(text);
    element.appendChild(textNode);
  }
  target.appendChild(element);
  return element;
};

export default appendSVGChild;
