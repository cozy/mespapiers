import React from 'react'
import { Switch, Redirect, HashRouter } from 'react-router-dom'

import Home from 'src/components/Home/Home'
import Onboarding from 'src/components/Onboarding/Onboarding'
import PapersListWrapper from 'src/components/Papers/PapersListWrapper'
import FilesViewerWithQuery from 'src/components/Viewer/FileViewerWithQuery'
import OnboardedGuardedRoute from 'src/components/OnboardedGuardedRoute'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/files/:fileCategory',
    component: PapersListWrapper
  },
  {
    path: '/file/:fileId',
    component: FilesViewerWithQuery
  },
  {
    path: '/onboarding',
    component: Onboarding
  }
]

export const AppRouter = () => (
  <HashRouter>
    <Switch>
      {routes.map((route, idx) => (
        <OnboardedGuardedRoute
          key={idx}
          exact
          path={route.path}
          component={route.component}
        />
      ))}
      <Redirect from="*" to="/" />
    </Switch>
  </HashRouter>
)
