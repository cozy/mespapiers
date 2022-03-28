import React from 'react'
import { Switch, Redirect, HashRouter } from 'react-router-dom'

import Home from 'src/components/Home/Home'
import Onboarding from 'src/components/Onboarding/Onboarding'
import PapersListWrapper from 'src/components/Papers/PapersListWrapper'
import FilesViewerWithQuery from 'src/components/Viewer/FileViewerWithQuery'
import OnboardedGuardedRoute from 'src/components/OnboardedGuardedRoute'
import PlaceholderThemesListModal from 'src/components/Placeholders/PlaceholderThemesListModal'
import CreatePaperModal from 'src/components/StepperDialog/CreatePaperModal'

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
  },
  {
    path: '/create',
    component: PlaceholderThemesListModal
  },
  {
    path: '/create/:qualificationLabel',
    render: props => {
      const {
        location: { search },
        history
      } = props
      const isDeepBack = search.includes('deepBack')
      const onClose = () => history.go(isDeepBack ? -2 : -1)

      return <CreatePaperModal {...props} onClose={onClose} />
    }
  }
]

export const AppRouter = () => {
  return (
    <HashRouter>
      <Switch>
        {routes.map((route, idx) => (
          <OnboardedGuardedRoute
            key={idx}
            exact
            path={route.path}
            component={route.component}
            render={route.render}
          />
        ))}
        <Redirect from="*" to="/" />
      </Switch>
    </HashRouter>
  )
}
