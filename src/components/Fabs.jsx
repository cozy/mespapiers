import React from 'react'
import { Outlet } from 'react-router-dom'
import FabWrapper from 'src/components/FabWrapper'
import ForwardFab from 'src/components/ForwardFab/ForwardFab'
import PapersFab from 'src/components/PapersFab/PapersFab'

export const AppFabs = () => {
  return (
    <>
      <Outlet />
      <FabWrapper>
        <ForwardFab />
        <PapersFab />
      </FabWrapper>
    </>
  )
}
