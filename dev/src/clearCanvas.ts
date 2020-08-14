function clearCanvas(target: HTMLElement): void {
  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }
}

export default clearCanvas;
