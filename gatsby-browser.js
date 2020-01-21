import React from 'react'
import { FormProvider } from './src/contexts/FormContext'

export const wrapRootElement = ({element}) => (
  <FormProvider>{element}</FormProvider>
)