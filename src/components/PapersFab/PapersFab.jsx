import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGeneralActions } from 'src/components/Hooks/useGeneralActions'
import { useKonnectorsActions } from 'src/components/Hooks/useKonnectorsActions'
import { useScroll } from 'src/components/Hooks/useScroll'
import { isReminder } from 'src/components/Placeholders/helpers'
import { APPS_DOCTYPE } from 'src/constants'

import { useClient, Q } from 'cozy-client'
import { isInstalled } from 'cozy-client/dist/models/applications'
import ActionsMenu from 'cozy-ui/transpiled/react/ActionsMenu'
import Fab from 'cozy-ui/transpiled/react/Fab'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const PapersFab = () => {
  const { t } = useI18n()
  const scroll = useScroll()
  const isOnTop = scroll.scrollTop < 80
  const navigate = useNavigate()
  const actionBtnRef = useRef()
  const { pathname } = useLocation()
  const [showGeneralMenu, setShowGeneralMenu] = useState(false)
  const [showKonnectorMenu, setShowKonnectorMenu] = useState(false)
  const client = useClient()

  const redirectPaperCreation = async paperDefinition => {
    setShowKonnectorMenu(false)
    const redirectPath = `${pathname}/create/${paperDefinition.label}`
    const countrySearchParam = `${
      paperDefinition.country ? `country=${paperDefinition.country}` : ''
    }`

    if (isReminder(paperDefinition)) {
      const { data: apps } = await client.query(Q(APPS_DOCTYPE))
      const isNoteAppInstalled = !!isInstalled(apps, { slug: 'notes' })

      if (!isNoteAppInstalled) {
        return navigate({
          pathname: `${pathname}/installAppIntent`,
          search: `redirect=${redirectPath}`
        })
      }
    }

    return navigate({
      pathname: redirectPath,
      search: countrySearchParam
    })
  }

  const generalActions = useGeneralActions({
    setShowGeneralMenu,
    setShowKonnectorMenu,
    redirectPaperCreation
  })

  const konnectorsActions = useKonnectorsActions({
    setShowKonnectorMenu,
    redirectPaperCreation
  })

  const handleClick = () => {
    return generalActions.length === 0
      ? navigate('/paper/create')
      : setShowGeneralMenu(prev => !prev)
  }

  return (
    <>
      <Fab
        color="primary"
        variant={isOnTop ? 'extended' : 'circular'}
        innerRef={actionBtnRef}
        onClick={handleClick}
        aria-label={t('Home.Fab.createPaper')}
        aria-controls={
          showGeneralMenu || showKonnectorMenu ? 'fab-menu' : undefined
        }
        aria-haspopup={true}
        aria-expanded={showGeneralMenu || showKonnectorMenu ? true : undefined}
      >
        <Icon icon="plus" {...(isOnTop && { className: 'u-mr-half' })} />
        {isOnTop && t('common.add')}
      </Fab>

      {showGeneralMenu && (
        <ActionsMenu
          ref={actionBtnRef}
          open={showGeneralMenu}
          actions={generalActions}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          onClose={() => setShowGeneralMenu(false)}
        />
      )}

      {showKonnectorMenu && (
        <ActionsMenu
          ref={actionBtnRef}
          open={showKonnectorMenu}
          actions={konnectorsActions}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          onClose={() => setShowKonnectorMenu(false)}
        />
      )}
    </>
  )
}

export default PapersFab
