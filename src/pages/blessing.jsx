import React from 'react'

import { useMachine } from '@xstate/react'
import { formMachine } from '../machines/formMachine'

import Layout from '../components/layout'
import SEO from '../components/seo'
import BlessingForm from '../components/blessing-form'

const Blessing = () => {
  const [state, send] = useMachine(formMachine)

  return (
    <Layout>
      <SEO title="Blessing Form" />
      <BlessingForm send={send} />
    </Layout>
  )
}

export default Blessing