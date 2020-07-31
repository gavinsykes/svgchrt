function clearCanvas (target: HTMLElement) {
  while (target.firstChild) {
    target.removeChild(target.firstChild)
  }
};

export default clearCanvas
