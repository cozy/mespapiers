import React, { createContext, useState } from 'react'

const FormDataContext = createContext()

const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    contactId: '',
    metadata: {},
    data: {}
  })

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  )
}

export default FormDataContext

export { FormDataProvider }
