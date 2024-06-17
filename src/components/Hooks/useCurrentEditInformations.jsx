import { useLocation } from 'react-router-dom'
import { usePapersDefinitions } from 'src/components/Contexts/PapersDefinitionsProvider'
import {
  getPaperDefinitionByFile,
  makeCurrentStep
} from 'src/components/ModelSteps/Edit/helpers'
import { buildFileQueryById } from 'src/queries'

import { isQueryLoading, useQuery } from 'cozy-client'

/**
 * @param {string} fileId
 * @param {'information'|'contact'} model
 * @returns {{ file: IOCozyFile, paperDef: object, currentStep: object, searchParams: { backgroundPath: string, metadataName: string }, isLoading: boolean }}
 */
export const useCurrentEditInformations = (fileId, model) => {
  const location = useLocation()
  const { papersDefinitions } = usePapersDefinitions()
  const metadataName = new URLSearchParams(location.search).get('metadata')

  const buildedFilesQuery = buildFileQueryById(fileId)
  const { data: file, ...filesQueryResult } = useQuery(
    buildedFilesQuery.definition,
    buildedFilesQuery.options
  )
  const isLoadingFiles =
    isQueryLoading(filesQueryResult) || filesQueryResult.hasMore

  const paperDef =
    (!isLoadingFiles && getPaperDefinitionByFile(papersDefinitions, file)) ||
    null

  const currentStep = makeCurrentStep({ paperDef, model, metadataName })

  return {
    file,
    paperDef,
    currentStep,
    searchParams: { metadataName },
    isLoading: isLoadingFiles
  }
}
