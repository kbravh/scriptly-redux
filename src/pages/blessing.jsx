import React, { useEffect } from 'react'
import gsap, { Bounce } from 'gsap'
import { useMachine } from '@xstate/react'
import { formMachine } from '../machines/formMachine'

import Layout from '../components/layout'
import SEO from '../components/seo'
import BlessingForm from '../components/blessing-form'

import '../components/css/blessing.css'

const Blessing = () => {
  const [state, send] = useMachine(formMachine)
  const { docx_link, pdf_link } = state.context

  return (
    <Layout>
      <SEO title="Blessing Form" />
      {state.matches(`form`) && <BlessingForm send={send} />}
      {state.matches(`gen_docx`) && <GeneratingDocx />}
      {state.matches(`error_docx`) && (
        <section>
          <h4>Uh oh, it seems like an error occurred. Try again?</h4>
          <button className="action-button" onClick={() => send(`RETRY`)}>Retry DOCX</button>
        </section>
      )}
      {state.matches(`error_pdf`) && (
      <section>
        <h4>Uh oh, it seems like an error occurred while making the PDF. Try again?</h4>
        <button className="action-button" onClick={() => send(`RETRY`)}>Retry PDF</button>
        <h5>You can still download the Word document here for now.</h5>
        <a className="action-button" href={docx_link} download>Download docx</a>
      </section>
      )}
      {state.matches(`gen_pdf`) && <h3>Generating PDF...</h3>}
      {state.matches(`success`) && (
        <section id="final-download">
          <h4>Congrats! Here are the download links for your blessing as a Word document and a PDF. These links will expire in 24 hours.</h4>
          <a className="action-button" href={docx_link} download>Download docx</a>
          <a className="action-button" href={pdf_link} download>Download pdf</a>
        </section>
      )}
    </Layout>
  )
}

export default Blessing

const GeneratingDocx = () => {
  const tl = gsap.timeline({ repeat: -1 });
  tl.timeScale(1.5)

  useEffect(() => {
    tl.to('#quill', 1, { rotate: -40, })
      .add('dip')
      .to('#quill', 1, { y: 25 }, '-=0.5')
      .add('raise')
      .to('#quill', 1, { y: 0 }, '-=0.5')
      .to('#quill', 1, { rotate: 0, x: -15, y: -7 }, '-=0.5')
      .add('write-line1')
      .to('#quill', 1, { rotate: 5, ease: Bounce.easeOut }, 'write-line1')
      .to('#quill', 1, { x: 0 }, 'write-line1')
      .to('#quill', 0.4, { x: -10, y: -1, rotation: 0 }, '-=0.3')
      .add('write-line2')
      .to('#quill', 1, { rotate: 5, ease: Bounce.easeOut }, 'write-line2')
      .to('#quill', 1, { x: 0 }, 'write-line2')
      .to('#quill', 0.6, { rotate: 0 }, '-=0.2')
      .add('fade-text')

    //Drip the ink when the quill is raised
    tl.to('#inkdrop', { width: 5, y: -20 }, 'dip')
      .to('#inkdrop', 0.25, { y: 0 }, 'dip+=0.25')

    //Write line 1
    tl.to('#scroll-text-1', 1.3, { opacity: 1 }, 'write-line1')
    //Write line 2
    tl.to('#scroll-text-2', 1.3, { opacity: 1 }, 'write-line2')
    //Fade line 1
    tl.to('#scroll-text-1', 1, { opacity: 0 }, 'fade-text')
    //Fade line 2
    tl.to('#scroll-text-2', 1, { opacity: 0 }, 'fade-text')
  }, [tl])
  return (
    <>
      <h2>Generating Document</h2>
      <svg id="writing" style={{ width: "100px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 -40 90.4 120">
        <path id="inkpot" d="M68.1 56.8a1.8 1.8 0 100 3.6h.8v4.2c-3.7.3-5.8 2-5.8 4.6v4.3c0 1 .8 1.8 1.8 1.8h14c1 0 1.9-.8 1.9-1.8v-5.4c0-1.2-.6-3-3.9-3.6v8h-2V60.3h.9a1.8 1.8 0 000-3.6z" />
        <path id="inkdrop" d="m 73.793574,59.881877 a 1.6,1.6 0 0 1 -3.2,0 c 0,-0.9 1,-1.8 1.6,-3.1 0.6,1.3 1.6,2.2 1.6,3.1 z" />
        <path id="quill" d="M90.4 1A1 1 0 0089 0c-.6.3-12.1 6.2-32.9 30l-2.3 2.6A458.8 458.8 0 0036 54a1.8 1.8 0 003 2.2s3-4 7.9-9.9l11 .4a1.8 1.8 0 00.2-3.6l-8.3-.3 1.7-2 12.7.4 1.4-1.4A633 633 0 0082 19.6C90.4 9 90.4 1.3 90.4 1z" />
        <path id="scroll" d="M33.4 35.8H6.1a5 5 0 00-3.8 1.7C-.3 40.3 0 45.7 0 46.3c0 1 .9 1.7 1.8 1.7h9L18 68.8c1 3 2.3 6.5 6 6.5H52.7c2.9 0 5.1-1.5 6.3-4.1a10.1 10.1 0 00.8-4.2c0-1-.8-1.8-1.8-1.8h-8.8l-4-10.9-4.4-12.4c-1.8-5.4-4.9-6.1-7.4-6.1zm0 3.6c1.3 0 2.8 0 4 3.7l5 13.8 3 8.3H29.3a1.8 1.8 0 00-1.8 2v.2c0 .5-.1 4.2-3.5 4.2-1 0-1.5-.9-2.6-4l-9-26.2-.7-2h21.7zm-27.3 0c1.6 0 2.2 1.1 2.9 3.1l.6 2h-6c.2-1.7.5-3.6 1.4-4.5.3-.4.6-.5 1.1-.5zM31 69h25l-.3.8c-.6 1.3-1.5 2-3 2H30.1l.9-2.8z" />
        <path id="scroll-text-1" style={{ opacity: 0 }} d="M34.5 46.2H18.1l1.2 3.6h16.5z" />
        <path id="scroll-text-2" style={{ opacity: 0 }} d="M21.8 57h10.8l-1.3-3.7H20.5z" />
      </svg>
    </>
  )
}