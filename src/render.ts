import buildSurround from './buildSurround';
import plot from './plot';

function render() {
  buildSurround();
  if (plot instanceof Function) {
    plot();
  }
}

export default render;
