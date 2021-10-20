'use strict'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import AppLike from 'test/components/AppLike'
import InputTextAdapter from 'src/components/ModelSteps/widgets/InputTextAdapter'

jest.mock('cozy-scanner/dist/locales', () => ({
  getBoundT: jest.fn(() => jest.fn())
}))

const mockAttrs = (type = '', value = 'fakeValue') => ({
  name: 'name01',
  inputLabel: 'PaperJSON.IDCard.number.inputLabel',
  metadata: { name01: value },
  type
})

const setup = (attrs = mockAttrs()) => {
  const value = attrs.metadata.name01
  const container = render(
    <AppLike>
      <InputTextAdapter attrs={attrs} setValue={jest.fn()} />
    </AppLike>
  )
  const input = container.getByDisplayValue(value)

  return {
    input,
    ...container
  }
}

describe('InputTextAdapter components:', () => {
  it('should be rendered correctly', () => {
    const { container } = setup()

    expect(container).toBeDefined()
  })

  it('should have a value of 5 letters', () => {
    const { input } = setup(mockAttrs(':5'))
    fireEvent.change(input, { target: { value: 'abcde' } })

    expect(input.value).toBe('abcde')
  })

  it('should have a value of "fakeValue"', () => {
    const { input } = setup(mockAttrs(':5'))
    fireEvent.change(input, { target: { value: 'abcdefgh' } })
    expect(input.value).toBe('fakeValue')

    fireEvent.change(input, { target: { value: '123456789' } })
    expect(input.value).toBe('fakeValue')
  })

  it('should have a value of 5 digits', () => {
    const { input } = setup(mockAttrs('Number:5', '789'))
    fireEvent.change(input, { target: { value: '12345' } })

    expect(input.value).toBe('12345')
  })
})
