import React from 'react'

import { models, useQuery } from 'cozy-client'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Typography from 'cozy-ui/transpiled/react/Typography'
import withLocales from 'cozy-ui/transpiled/react/I18n/withLocales'

import fr from '../locales/fr.json'
import en from '../locales/fr.json'
import { getContactByIds } from '../queries'

const {
  contact: { getFullname },
  document: {
    locales: { getBoundT }
  }
} = models

const locales = { fr, en }

const validPageLabel = page => page === 'front' || page === 'back'

// TODO Use getReferencedBy from cozy-client
const getReferencedBy = (file, referencedBy) => {
  if (file?.relationships?.referenced_by?.data?.length > 0) {
    const references = file.relationships.referenced_by.data
    return references.filter(reference => reference.type === referencedBy)
  }
  return []
}

const Qualification = ({ file = {}, t, f, lang }) => {
  const scannerT = getBoundT(lang)

  const { name: filename, metadata = {} } = file
  const {
    qualification = {},
    page: pageLabel,
    datetime,
    datetimeLabel
  } = metadata
  const { label } = qualification

  const contactIds = getReferencedBy(file, 'io.cozy.contacts').map(
    contact => contact.id
  )
  const contactByIdsQuery = getContactByIds(contactIds)
  const { data: contactList } = useQuery(
    contactByIdsQuery.definition,
    contactByIdsQuery.options
  )

  const contactsDisplayed =
    contactList?.map(contact => `${getFullname(contact)}`).join(', ') || ''

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
              {t(
                `viewer.panel.qualification.date.title.${
                  datetimeLabel === 'datetime' || datetimeLabel === undefined
                    ? 'addedOn'
                    : datetimeLabel
                }`
              )}
            </Typography>
          }
          secondary={
            <Typography variant={'body1'}>
              {f(datetime, 'DD/MM/YYYY')}
            </Typography>
          }
        />
      </ListItem>
      {contactsDisplayed.length > 0 && (
        <ListItem>
          <ListItemText
            disableTypography
            primary={
              <Typography variant={'caption'}>
                {t('viewer.panel.qualification.identity')}
              </Typography>
            }
            secondary={
              <Typography variant={'body1'}>{contactsDisplayed}</Typography>
            }
          />
        </ListItem>
      )}
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
