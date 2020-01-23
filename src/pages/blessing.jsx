import React from 'react'

import { useMachine } from '@xstate/react'
import { formMachine } from '../machines/formMachine'

import Layout from '../components/layout'
import SEO from '../components/seo'
import BlessingForm from '../components/blessing-form'

const Blessing = () => {
  const [state, send] = useMachine(formMachine)
  const { docx_link, pdf_link } = state.context

  return (
    <Layout>
      <SEO title="Blessing Form" />
      <h5>{state.value}</h5>
      <pre>{JSON.stringify(state.context,null, 2)}</pre>
      {state.matches(`form`) && <BlessingForm send={send} />}
      {state.matches(`gen_docx`) && <div>Generating docx</div>}
      {state.matches(`gen_pdf`) && <div>Generating pdf</div>}
      {state.matches(`success`) && (
        <section>
          <a href={docx_link} download>Download docx</a>
          <a href={pdf_link} download>Download pdf</a>
        </section>
      )}
    </Layout>
  )
}

export default Blessing