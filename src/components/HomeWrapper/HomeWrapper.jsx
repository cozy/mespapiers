import React, { useContext } from 'react'

import { useQuery, isQueryLoading } from 'cozy-client'
import Spinner from 'cozy-ui/transpiled/react/Spinner'

import { getAllPapers } from '../../utils/queries'
import { DialogModalContext } from '../Contexts'
import DialogInStepperWrapper from '../DialogInStepperWrapper'
import Home from '../Home'

const HomeWrapper = () => {
  const { isDialogModalOpen } = useContext(DialogModalContext)
  const { data, ...rest } = useQuery(
    getAllPapers.definition,
    getAllPapers.options
  )

  return !isDialogModalOpen ? (
    isQueryLoading(rest) ? (
      <Spinner
        size="xxlarge"
        className="u-flex u-flex-justify-center u-mt-2 u-h-5"
      />
    ) : (
      <Home data={data || []} />
    )
  ) : (
    <DialogInStepperWrapper />
  )
}

export default HomeWrapper
