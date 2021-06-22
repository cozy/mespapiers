'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import AppLike from '../components/AppLike'
import App from '../../src/components/App'

describe('App component only', () => {
  it('should be mounted correctly', () => {
    const component = shallow(
      <AppLike>
        <App />
      </AppLike>
    ).getElement()
    expect(component).toMatchSnapshot()
  })
})
