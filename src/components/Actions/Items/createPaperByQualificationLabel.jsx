import React, { forwardRef } from 'react'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import { findPlaceholderByLabelAndCountry } from 'src/helpers/findPlaceholders'

import ActionsMenuItem from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuItem'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const createPaperByQualificationLabel = ({
  showKonnectorMenuOrRedirect,
  qualificationLabel,
  country
}) => {
  return {
    name: 'createPaperByQualificationLabel',
    // eslint-disable-next-line react/display-name
    Component: forwardRef((props, ref) => {
      const { t } = useI18n()
      const scannerT = useScannerI18n()
      const { papersDefinitions: paperDefinitionsList } = usePapersDefinitions()

      const paperDefinition = findPlaceholderByLabelAndCountry(
        paperDefinitionsList,
        qualificationLabel,
        country
      )[0]

      return (
        <ActionsMenuItem
          {...props}
          ref={ref}
          onClick={() => showKonnectorMenuOrRedirect(paperDefinition)}
        >
          <ListItemIcon>
            <Icon icon={paperDefinition.icon} />
          </ListItemIcon>
          <ListItemText
            primary={t('action.createPaperByQualificationLabel', {
              qualificationLabel: scannerT(`items.${qualificationLabel}`)
            })}
          />
        </ActionsMenuItem>
      )
    })
  }
}