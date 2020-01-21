import React, {useContext} from 'react'
import Layout from '../components/layout'
import formContext from '../contexts/FormContext'

const Download = ({navigate}) => {
  const {formData, links, setLinks} = useContext(formContext)
  if(!formData){ // if the user navigated here without filling out the form, redirect home
    navigate(`/`)
  }
  return (
    <Layout>
      Download page
    </Layout>
  )
}

export default Download