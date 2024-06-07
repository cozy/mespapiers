import React, { useMemo } from 'react'
import { usePapersDefinitions } from 'src/components/Contexts/PapersDefinitionsProvider'
import HomeLayout from 'src/components/Home/HomeLayout'
import useReferencedContact from 'src/components/Hooks/useReferencedContact'
import HomeSkeletons from 'src/components/Views/HomeSkeletons'
import {
  makeKonnectorsAndQualificationLabelWithoutFiles,
  makePapers,
  makeQualificationLabelWithoutFiles
} from 'src/components/Views/helpers'
import {
  buildFilesQueryWithQualificationLabel,
  buildKonnectorsQueryByQualificationLabels
} from 'src/queries'

import { isQueryLoading, useQueryAll } from 'cozy-client'

const Home = () => {
  const { papersDefinitions } = usePapersDefinitions()

  const papersDefinitionsLabels = useMemo(
    () => papersDefinitions.map(paperDefinition => paperDefinition.label),
    [papersDefinitions]
  )

  const filesQueryByLabels = buildFilesQueryWithQualificationLabel()
  const { data: filesWithQualificationLabel, ...queryResult } = useQueryAll(
    filesQueryByLabels.definition,
    filesQueryByLabels.options
  )
  const isLoadingFiles = isQueryLoading(queryResult) || queryResult.hasMore

  const { contacts, isLoadingContacts } = useReferencedContact(
    filesWithQualificationLabel
  )

  const papers = useMemo(
    () => makePapers(papersDefinitionsLabels, filesWithQualificationLabel),
    [papersDefinitionsLabels, filesWithQualificationLabel]
  )

  const qualificationLabelWithoutFiles = useMemo(
    () => makeQualificationLabelWithoutFiles(papersDefinitionsLabels, papers),
    [papersDefinitionsLabels, papers]
  )
  const konnectorsQueryByQualificationLabels =
    buildKonnectorsQueryByQualificationLabels(qualificationLabelWithoutFiles)
  const { data: konnectors, ...konnectorsQueryResult } = useQueryAll(
    konnectorsQueryByQualificationLabels.definition,
    konnectorsQueryByQualificationLabels.options
  )
  const isLoadingKonnectors =
    isQueryLoading(konnectorsQueryResult) || konnectorsQueryResult.hasMore

  if (isLoadingFiles || isLoadingContacts || isLoadingKonnectors) {
    return <HomeSkeletons withFabs data-testid="HomeSkeletons" />
  }

  const konnectorsAndQualificationLabelWithoutFiles =
    makeKonnectorsAndQualificationLabelWithoutFiles(
      konnectors,
      qualificationLabelWithoutFiles
    )

  return (
    <HomeLayout
      contacts={contacts}
      papers={papers}
      konnectors={konnectorsAndQualificationLabelWithoutFiles}
    />
  )
}

export default Home
