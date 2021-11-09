'use strict'
import React from 'react'
import { render } from '@testing-library/react'
import { Switch, Redirect } from 'react-router-dom'
import { createHashHistory } from 'history'

import AppLike from 'test/components/AppLike'
import {
  OnboardedGuardedRoute,
  OnboardingGuardedRoute
} from 'src/components/Router'

const ComponentOnboarded = () => <div>ONBOARDED</div>
const ComponentOnboarding = () => <div>ONBOARDING</div>

const setup = (settingsData, history) => {
  return render(
    <AppLike history={history}>
      <Switch>
        <OnboardedGuardedRoute
          exact
          path="/"
          component={ComponentOnboarded}
          settingsData={settingsData}
        />
        <OnboardingGuardedRoute
          exact
          path="/onboarding"
          component={ComponentOnboarding}
          settingsData={settingsData}
        />

        <Redirect from="*" to="/" />
      </Switch>
    </AppLike>
  )
}

describe('Router', () => {
  describe('OnboardedGuardedRoute', () => {
    it('should display route when onboarded = true', () => {
      const settingsData = [
        {
          onboarded: true
        }
      ]
      const { getByText } = setup(settingsData)

      expect(getByText('ONBOARDED')).toBeDefined()
    })

    it('should redirect to /onboarding route when onboarded = false', () => {
      const settingsData = [
        {
          onboarded: false
        }
      ]
      const { getByText } = setup(settingsData)

      expect(getByText('ONBOARDING')).toBeDefined()
    })

    it('should redirect to /onboarding route when no `onboarded` value is set', () => {
      const settingsData = [
        {
          onboarded: false
        }
      ]
      const { getByText } = setup(settingsData)

      expect(getByText('ONBOARDING')).toBeDefined()
    })

    it('should redirect to /onboarding route when settingsData is undefined', () => {
      const settingsData = undefined
      const { getByText } = setup(settingsData)

      expect(getByText('ONBOARDING')).toBeDefined()
    })

    it('should redirect to /onboarding route when settingsData is empty array', () => {
      const settingsData = []
      const { getByText } = setup(settingsData)

      expect(getByText('ONBOARDING')).toBeDefined()
    })
  })

  describe('OnboardingGuardedRoute', () => {
    it('should display route route when settingsData is false', () => {
      const settingsData = [
        {
          onboarded: false
        }
      ]
      const history = createHashHistory()
      history.push('/onboarding')
      const { getByText } = setup(settingsData, history)

      expect(getByText('ONBOARDING')).toBeDefined()
    })

    it('should redirect to / route when settingsData is true', () => {
      const settingsData = [
        {
          onboarded: true
        }
      ]
      const history = createHashHistory()
      history.push('/onboarding')
      const { getByText } = setup(settingsData, history)

      expect(getByText('ONBOARDED')).toBeDefined()
    })
  })
})
