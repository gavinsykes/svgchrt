import appendSVGChild from './appendSVGChild';
import defaultSettings from './defaultSettings';

function addDescription(settings = defaultSettings, canvas: SVGElement): void {
  if (settings.description) {
    appendSVGChild('desc', canvas, {}, settings.description) as SVGDescElement;
  }
}

export default addDescription;
