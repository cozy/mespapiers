import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'

import { themes } from 'cozy-scanner/dist/DocumentTypeData'
import { FixedDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid'
import Card from 'cozy-ui/transpiled/react/Card'
import Typography from 'cozy-ui/transpiled/react/Typography'
import IconStack from 'cozy-ui/transpiled/react/IconStack'
import Icon from 'cozy-ui/transpiled/react/Icon'
import FileDuotoneIcon from 'cozy-ui/transpiled/react/Icons/FileDuotone'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import PlaceholdersList from 'src/components/Placeholders/PlaceholdersList'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'

const PlaceholderThemesList = ({ title, onClose }) => {
  const { t } = useI18n()
  const scannerT = useScannerI18n()
  const defaultState = useMemo(
    () => ({
      onBack: false,
      currentQualifItems: [],
      qualificationLabel: ''
    }),
    []
  )
  const [state, setState] = useState(defaultState)

  const resetCurrentQualif = useCallback(() => {
    setState({ ...defaultState, onBack: true })
  }, [defaultState])

  const setQualifByTheme = useCallback(theme => {
    setState(prev => ({
      ...prev,
      currentQualifItems: theme.items,
      qualificationLabel: theme.label
    }))
  }, [])

  return state.currentQualifItems.length === 0 ? (
    <FixedDialog
      onClose={onClose}
      title={title}
      transitionDuration={state.onBack ? 0 : undefined}
      open={true}
      content={
        <Grid container spacing={1}>
          {themes.map((theme, idx) => {
            return (
              <Grid
                key={idx}
                item
                xs={6}
                onClick={() => setQualifByTheme(theme)}
              >
                <Card
                  className={
                    'u-flex u-flex-column u-flex-items-center u-ph-half u-ov-hidden'
                  }
                >
                  <IconStack
                    backgroundIcon={
                      <Icon
                        icon={FileDuotoneIcon}
                        color="var(--primaryColor)"
                        size={24}
                      />
                    }
                    foregroundIcon={
                      <Icon
                        icon={theme.icon}
                        color="var(--primaryColor)"
                        size={14}
                      />
                    }
                  />
                  <Typography
                    variant={'body2'}
                    className={'u-flex-wrap u-pl-half'}
                  >
                    {scannerT(`themes.${theme.label}`)}
                  </Typography>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      }
    />
  ) : (
    <FixedDialog
      onClose={resetCurrentQualif}
      transitionDuration={0}
      title={t('PlaceholdersList.title', {
        name: ` - ${scannerT(`themes.${state.qualificationLabel}`)}`
      })}
      open={true}
      content={
        <PlaceholdersList currentQualifItems={state.currentQualifItems} />
      }
    />
  )
}

PlaceholderThemesList.propTypes = {
  title: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default PlaceholderThemesList
