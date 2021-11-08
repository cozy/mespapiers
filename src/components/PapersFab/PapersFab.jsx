import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Fab from 'cozy-ui/transpiled/react/Fab'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'

import PlaceholderThemesList from 'src/components/Placeholders/PlaceholderThemesList'
import { usePlaceholderModal } from 'src/components/Hooks/usePlaceholderModal'

const styleFab = { position: 'fixed', zIndex: 10 }

export const PapersFab = () => {
  const { t } = useI18n()

  const {
    showPlaceholderThemesList,
    setShowPlaceholderThemesList
  } = usePlaceholderModal()

  return (
    <>
      <Fab
        color="primary"
        aria-label={t('Home.Fab.ariaLabel')}
        style={styleFab}
        className="u-bottom-m u-right-m"
        onClick={() => setShowPlaceholderThemesList(true)}
      >
        <Icon icon={PlusIcon} />
      </Fab>
      {showPlaceholderThemesList && (
        <PlaceholderThemesList
          title={t('PlaceholdersList.title', { name: '' })}
          onClose={() => setShowPlaceholderThemesList(false)}
        />
      )}
    </>
  )
}
