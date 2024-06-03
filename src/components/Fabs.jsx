import React from 'react'
import FabWrapper from 'src/components/FabWrapper'
import ForwardFab from 'src/components/ForwardFab/ForwardFab'
import PapersFab from 'src/components/PapersFab/PapersFab'

export const AppFabs = () => {
  return (
    <FabWrapper>
      <ForwardFab />
      <PapersFab />
    </FabWrapper>
  )
}
