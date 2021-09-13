import React, { useState, useMemo, Fragment } from 'react'
import Form from 'react-jsonschema-form'

import { useStepperDialogContext } from 'src/components/Hooks/useStepperDialogContext'
import FileInputAdapter from 'src/components/ModelPages/widgets/FileInputAdapter'
import InputAdapter from 'src/components/ModelPages/widgets/InputAdapter'
import InputDateAdapter from 'src/components/ModelPages/widgets/InputDateAdapter'
import './styles.styl'

const ObjectFieldTemplate = props => {
  return props.properties.map(element => {
    return <Fragment key={element.name}>{element.content}</Fragment>
  })
}

const widgets = { FileInputAdapter, InputAdapter, InputDateAdapter }
const FormSchema = () => {
  const { allCurrentPages, currentPageIndex } = useStepperDialogContext()
  const [state, setState] = useState({})

  const schema = useMemo(
    () => allCurrentPages[currentPageIndex - 1].model.schema,
    [allCurrentPages, currentPageIndex]
  )
  const uiSchema = useMemo(
    () => allCurrentPages[currentPageIndex - 1].model.uiSchema,
    [allCurrentPages, currentPageIndex]
  )

  const onChange = ({ formData }) => {
    setState(prev => ({
      ...prev,
      ...formData
    }))
  }

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      widgets={widgets}
      onChange={onChange}
      ObjectFieldTemplate={ObjectFieldTemplate}
      formData={state}
    >
      {/* Don't remove "<></>"" => https://github.com/commitd/components-rjsf/issues/1 */}
      <></>
    </Form>
  )
}

export default FormSchema
