'use strict'

/* eslint-env jest */

import React from 'react'
import { render } from '@testing-library/react'

import AppLike from '../components/AppLike'
import Home from 'components/Home/Home'

describe('Home components:', () => {
  const setup = () => {
    return render(
      <AppLike>
        <Home />
      </AppLike>
    )
  }
  it('Home should be rendered correctly', () => {
    const { container } = setup()
    expect(container).toMatchSnapshot()
  })
})
