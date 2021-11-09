import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const OnboardedGuardedRoute = ({
  component: Component,
  reverseGuard = false,
  settingsData,
  ...rest
}) => {
  const onboarded = settingsData?.[0]?.onboarded
  return (
    <Route
      {...rest}
      render={props => {
        if (reverseGuard === true && onboarded === true) {
          return <Redirect to="/" />
        } else if (reverseGuard !== true && onboarded !== true) {
          return <Redirect to="/onboarding" />
        } else {
          return <Component {...props} />
        }
      }}
    />
  )
}

export const OnboardingGuardedRoute = props =>
  OnboardedGuardedRoute({ reverseGuard: true, ...props })
