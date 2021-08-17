import React from 'react'

import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Typography from 'cozy-ui/transpiled/react/Typography'
import withLocales from 'cozy-ui/transpiled/react/I18n/withLocales'

import fr from '../locales/fr.json'
import en from '../locales/fr.json'

const locales = { fr, en }

const Qualification = ({ file, t, f }) => {
  const { created_at, name, metadata } = file || {}
  const qualificationLabel = metadata?.qualification.label

  return (
    <List className={'u-pv-half'}>
      <ListItem>
        <Typography variant={'h6'}>{t('viewer.panel.title')}</Typography>
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
            <Typography variant={'body1'}>{qualificationLabel}</Typography>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          disableTypography
          primary={
            <Typography variant={'caption'}>
              {t('viewer.panel.qualification.label')}
            </Typography>
          }
          secondary={<Typography variant={'body1'}>{name}</Typography>}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          disableTypography
          primary={
            <Typography variant={'caption'}>
              {t('viewer.panel.qualification.identity')}
            </Typography>
          }
          secondary={<Typography variant={'body1'}>...</Typography>}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          disableTypography
          primary={
            <Typography variant={'caption'}>
              {t('viewer.panel.qualification.date')}
            </Typography>
          }
          secondary={
            <Typography variant={'body1'}>
              {f(created_at, 'DD/MM/YYYY')}
            </Typography>
          }
        />
      </ListItem>
    </List>
  )
}

export default withLocales(locales)(Qualification)
