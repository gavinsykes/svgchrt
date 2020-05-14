function appendSVGChild(element: string, target: HTMLElement | SVGElement, attributes: object = {}, text = ''): SVGElement | SVGDescElement | SVGGraphicsElement | SVGTextElement | SVGTitleElement {
  let e: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", element);
  Object.entries(attributes).map((a) => e.setAttribute(a[0] as string, a[1]));
  if (text) {
    e.textContent = text;
  }
  target.appendChild(e);
  return e;
};

export default appendSVGChild;
