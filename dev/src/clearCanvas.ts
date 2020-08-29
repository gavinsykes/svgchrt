/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

/**
 * clearCanvas takes a HTMLElement as its argument. It completely empties the element ready for the visualisation to be generated.
 *
 * The return value is void.
 *
 * @param {HTMLElement} target - the HTML element to clear.
 *
 */
function clearCanvas(target: HTMLElement): void {
  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }
}

export default clearCanvas;
