/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

/**
 * appendSVGChild takes a string, HTMLElement or SVGElement, Record<string, unknown> and string as its arguments. It either adds the defined SVG element to an existing SVG or SVG Element, or adds an `<svg>` to a HTML element.
 *
 * The return value is the generated SVG element.
 *
 * @param {string} elementType - the type of element to add. If the target is a HTMLElement then this **must** be `svg`.
 *
 * @param {HTMLElement | SVGElement} target - the HTML or SVG element to which to add the element.
 *
 * @param {Record<string, unknown>} [attributes = {}] - the attributes, if any, to apply to the element.
 *
 * @param {string} [text = ''] - if the element is a text element, this is the text to apply.
 */
function appendSVGChild(
  elementType: string,
  target: HTMLElement | SVGElement,
  attributes: Record<string, unknown> = {},
  text = ''
):
  | SVGElement
  | SVGDescElement
  | SVGGraphicsElement
  | SVGTextElement
  | SVGTitleElement {
  const element: SVGElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    elementType
  );
  Object.entries(attributes).map((a) =>
    element.setAttribute(a[0], a[1] as string)
  );
  if (text) {
    const textNode = document.createTextNode(text);
    element.appendChild(textNode);
  }
  target.appendChild(element);
  return element;
}

export default appendSVGChild;
