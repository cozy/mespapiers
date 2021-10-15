require('@babel/polyfill')

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// polyfill for requestAnimationFrame
/* istanbul ignore next */
global.requestAnimationFrame = cb => {
  setTimeout(cb, 0)
}

/* Fix error: "Material-UI: The color provided to augmentColor(color) is invalid.
The color object needs to have a `main` property or a `500` property."*/
jest.mock('cozy-ui/transpiled/react/utils/color', () => ({
  getCssVariableValue: () => '#fff'
}))

window.cozy = {
  bar: {
    BarLeft: () => null,
    BarCenter: () => null,
    BarRight: () => null
  }
}

// Don't print console.warn, console.error, console.info & console.debug in tests
global.console = {
  ...global.console,
  warn: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  debug: jest.fn()
}
