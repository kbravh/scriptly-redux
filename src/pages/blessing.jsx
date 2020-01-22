import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import BlessingForm from '../components/blessing-form'

const Blessing = () => {
  return (
    <Layout>
      <SEO title="Blessing Form" />
      <BlessingForm />
    </Layout>
  )
}

export default Blessing