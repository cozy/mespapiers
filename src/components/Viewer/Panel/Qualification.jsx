import React, { useState, useEffect } from 'react'

import { getBoundT } from 'cozy-scanner'
import { useClient } from 'cozy-client'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Typography from 'cozy-ui/transpiled/react/Typography'
import withLocales from 'cozy-ui/transpiled/react/I18n/withLocales'

import fr from '../locales/fr.json'
import en from '../locales/fr.json'

const locales = { fr, en }

const validPageLabel = page => page === 'front' || page === 'back'

const Qualification = ({ file = {}, t, f, lang }) => {
  const scannerT = getBoundT(lang)
  const client = useClient()
  const [currentUser, setCurrentUser] = useState(null)

  const { name: filename, metadata = {} } = file
  const { qualification = {} } = metadata
  const { label, page: pageLabel, featureDate } = qualification

  // TODO Improve it when other contact choices are needed
  useEffect(() => {
    let isMounted = true
    ;(async () => {
      const contactCollection = client.collection('io.cozy.contacts')
      const { data: currentUser } = await contactCollection.findMyself()
      isMounted && setCurrentUser(currentUser[0])
    })()

    return () => {
      isMounted = false
    }
  }, [client])

  return (
    <List className={'u-pv-half'}>
      <ListItem>
        <Typography variant={'h6'}>{t('viewer.panel.title')}</Typography>
      </ListItem>
      {featureDate && (
        <ListItem>
          <ListItemText
            disableTypography
            primary={
              <Typography variant={'caption'}>
                {t(`viewer.panel.qualification.date.title.${featureDate}`)}
              </Typography>
            }
            secondary={
              <Typography variant={'body1'}>
                {f(qualification[featureDate], 'DD/MM/YYYY')}
              </Typography>
            }
          />
        </ListItem>
      )}
      <ListItem>
        <ListItemText
          disableTypography
          primary={
            <Typography variant={'caption'}>
              {t('viewer.panel.qualification.identity')}
            </Typography>
          }
          secondary={
            <Typography variant={'body1'}>{currentUser?.fullname}</Typography>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          disableTypography
          primary={
            <Typography variant={'caption'}>
              {t('viewer.panel.qualification.label.title')}
            </Typography>
          }
          secondary={
            <Typography variant={'body1'}>
              {validPageLabel(pageLabel)
                ? t(`viewer.panel.qualification.label.${pageLabel}`)
                : filename}
            </Typography>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          disableTypography
          primary={
            <Typography variant={'caption'}>
              {t('viewer.panel.qualification.qualification')}
            </Typography>
          }
          secondary={
            <Typography variant={'body1'}>
              {scannerT(`Scan.items.${label}`)}
            </Typography>
          }
        />
      </ListItem>
    </List>
  )
}

export default withLocales(locales)(Qualification)
