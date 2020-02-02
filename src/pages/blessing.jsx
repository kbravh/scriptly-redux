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
      {state.matches(`form`) && <BlessingForm send={send} />}
      {state.matches(`gen_docx`) && <div>Generating docx</div>}
      {state.matches(`error_docx`) && <button className="action-button" onClick={() => send(`RETRY`)}>Retry DOCX</button>}
      {state.matches(`error_pdf`) && <button className="action-button" onClick={() => send(`RETRY`)}>Retry PDF</button>}
      {state.matches(`gen_pdf`) && <div>Generating pdf</div>}
      {state.matches(`success`) && (
        <section>
          <a className="action-button" href={docx_link} download>Download docx</a>
          <a className="action-button" href={pdf_link} download>Download pdf</a>
        </section>
      )}
    </Layout>
  )
}

export default Blessing