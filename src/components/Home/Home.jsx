import React, { useContext } from 'react'

import { useQuery, isQueryLoading } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Empty } from 'cozy-ui/transpiled/react'
import Fab from 'cozy-ui/transpiled/react/Fab'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'
import Spinner from 'cozy-ui/transpiled/react/Spinner'

import { getAllPapers } from '../../utils/queries'
import { PapersList } from '../Papers'
import { PlaceholdersList } from '../Placeholders'
import { DialogModalContext } from '../Contexts'
import Stepper from '../Stepper'
import HomeCloud from '../../assets/icons/HomeCloud.svg'

const Home = () => {
  const { t } = useI18n()
  const { isDialogModalOpen } = useContext(DialogModalContext)
  const { data, ...rest } = useQuery(
    getAllPapers.definition,
    getAllPapers.options
  )

  return (
    <>
      {isQueryLoading(rest) ? (
        <Spinner
          size="xxlarge"
          className="u-flex u-flex-justify-center u-mt-2 u-h-5"
        />
      ) : data && data.length === 0 ? (
        <Empty
          icon={HomeCloud}
          title={t('Home.Empty.title')}
          text={t('Home.Empty.text')}
          layout={false}
        />
      ) : (
        <PapersList papers={data || []} />
      )}
      <PlaceholdersList papers={data || []} />
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: 'fixed' }}
        className="u-bottom-l u-right-l"
      >
        <Icon icon={PlusIcon} />
      </Fab>

      {isDialogModalOpen && <Stepper />}
    </>
  )
}

export default Home
