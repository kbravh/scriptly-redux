const  React = require('react')
const { FormProvider } = require('./src/contexts/FormContext')

exports.wrapRootElement = ({element}) => (
  <FormProvider>{element}</FormProvider>
)