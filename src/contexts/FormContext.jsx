import React, {createContext, useState} from 'react'

const FormContext = createContext()

export const FormProvider = ({children}) => {
  const [formData, setFormData] = useState()
  const [links, setLinks] = useState()

  return (
    <FormContext.Provider value={{
      formData, setFormData,
      links, setLinks
    }}>
      {children}
    </FormContext.Provider>
  )
}

export default FormContext