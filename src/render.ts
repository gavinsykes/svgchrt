import buildSurround from './buildSurround'
import defaultSettings, { SettingsObject } from './defaultSettings'
import plot from './plot'

function render (settings: SettingsObject = defaultSettings, target: HTMLElement) {
  const c: SVGGraphicsElement = buildSurround(settings, target)
  if (plot instanceof Function) {
    plot(c)
  }
}

export default render
