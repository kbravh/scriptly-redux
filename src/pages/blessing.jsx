import React, { useEffect } from 'react'
import gsap, { Bounce } from 'gsap'
import { useMachine } from '@xstate/react'
import { formMachine } from '../machines/formMachine'
import { motion, AnimatePresence } from 'framer-motion'

import SEO from '../components/seo'
import BlessingForm from '../components/blessing-form'

import '../components/css/blessing.css'

// intro and outro animation settings
const variants = {
  hidden: {
    x: 100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1
  }
}

const exit = {
  x: -100,
  opacity: 0
}

const Blessing = () => {
  const [state, send] = useMachine(formMachine)
  const { docx_link, pdf_link } = state.context

  return (
    <>
      <SEO title="Blessing Form" />
      <AnimatePresence exitBeforeEnter>
        {state.matches(`form`) && (
          <motion.div className="blessing-page-container" key="blessing-form" initial="hidden" animate="visible" variants={variants} exit={exit}>
            <BlessingForm send={send} />
          </motion.div>
        )}
        {state.matches(`gen_docx`) && (
          <motion.div className="blessing-page-container" key="generating-docx" initial="hidden" animate="visible" variants={variants} exit={exit}>
            <GeneratingDocx />
          </motion.div>
        )}
        {state.matches(`error_docx`) && (
          <motion.div className="blessing-page-container" key="error-docx" initial="hidden" animate="visible" variants={variants} exit={exit}>
            <section>
              <h4>Uh oh, it seems like an error occurred. Try again?</h4>
              <button className="action-button" onClick={() => send(`RETRY`)}>Retry DOCX</button>
            </section>
          </motion.div>
        )}
        {state.matches(`error_pdf`) && (
          <motion.div className="blessing-page-container" key="error-pdf" initial="hidden" animate="visible" variants={variants} exit={exit}>
            <section>
              <h4>Uh oh, it seems like an error occurred while making the PDF. Try again?</h4>
              <button className="action-button" onClick={() => send(`RETRY`)}>Retry PDF</button>
              <h5>You can still download the Word document here for now.</h5>
              <a className="action-button" href={docx_link} download>Download docx</a>
            </section>
          </motion.div>
        )}
        {state.matches(`gen_pdf`) && (
          <motion.div className="blessing-page-container" key="gen-pdf" initial="hidden" animate="visible" variants={variants} exit={exit}>
            <GeneratingPDF />
          </motion.div>
        )}
        {state.matches(`success`) && (
          <motion.div className="blessing-page-container" key="success" initial="hidden" animate="visible" variants={variants} exit={exit}>
            <section id="final-download">
              <h4>Congrats! Here are the download links for your blessing as a Word document and a PDF. These links will expire in 24 hours.</h4>
              <div className="download-links">
                <a className="action-button" href={docx_link} download target="_blank" rel="noopener noreferrer">Download docx</a>
                <a className="action-button" href={pdf_link} download target="_blank" rel="noopener noreferrer">Download pdf</a>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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

const GeneratingPDF = () => {
  useEffect(() => {
    gsap.to('#scroll', {
      duration: 1,
      y: 10,
      repeat: -1,
      yoyoEase: "power2.in"
    })

    gsap.to('#star-1', {
      rotate: 180,
      y: -5,
      scale: 1.2,
      repeat: -1,
      duration: 3,
      transformOrigin: "50% 50%",
      yoyoEase: "power2.in"
    })

    gsap.to('#star-2', {
      rotate: 180,
      scale: 1.2,
      y: 10,
      repeat: -1,
      duration: 2,
      transformOrigin: "50% 50%",
      yoyoEase: "power2.in"
    })

    gsap.to('#star-3', {
      rotate: 180,
      scale: 1.2,
      y: 5,
      repeat: -1,
      duration: 2.5,
      transformOrigin: "50% 50%",
      yoyoEase: "power2.in"
    })

    gsap.to('#circle-1', {
      keyframes: [
        { x: -5, y: 30, opacity: 0 },
        { y: 25, opacity: 1 },
        { y: 20 }, { y: 15 }, { y: 10 },
        { y: 5 }, { y: 0 }, { y: -5 },
        { y: -10, opacity: 0 }
      ],
      repeat: -1,
    })

    gsap.to('#circle-2', {
      keyframes: [
        { x: 2, y: 0, opacity: 0 },
        { y: -5, opacity: 1 },
        { y: -10 }, { y: -15 },
        { y: -20, opacity: 0 }
      ],
      repeat: -1,
    })

    gsap.to('#circle-3', {
      keyframes: [
        { x: 10, y: 35, opacity: 0 },
        { y: 30, opacity: 1 },
        { y: 25 }, { y: 20 }, { y: 15 },
        { y: 10 }, { y: 5 },
        { y: 0, opacity: 0 }
      ],
      repeat: -1,
    })
  }, [])
  return (
    <>
      <h2>Generating PDF</h2>
      <svg id="magic-scroll" style={{ width: "100px" }} xmlns="http://www.w3.org/2000/svg" viewBox="-10 0 70 100">
        <defs />
        <switch transform="matrix(.54567 0 0 .54567 -2.5 39.5)">
          <g>
            <path id="scroll" d="M85.1 9.8c-2.3-2-6-4.6-10.7-4.8a9.2 9.2 0 00-6.5 2.1L6.9 68l-.2.4a8.7 8.7 0 00-1.8 5c-.1 4.4 1.8 8 3.7 11 4.5 6.6 11 11.3 17.9 12.8h.9V97c.2 0 .4-.2.5-.3 6.8-6.4 13.5-13 20-19.4L58.5 67l10.3-10.6a1199 1199 0 0019.5-20 1.6 1.6 0 00.4-.6V34.9l-.1-.3-.2-.3-.1-.1-.1-.1-.3-.2-.3-.1c-1.6-.5-3-1-4.6-1.9l.6-.5a432 432 0 004.8-5l.7-.8.3-.3a7 7 0 001.7-5.3c-.3-4.4-3.6-8-6-10.2zm2.2 10.8c.2 1.2 0 2.3-.5 2.7l-.8.8-5.1 5-2 1.8v.1l-.2.2-12.2 12L56.3 53 46 63.7a1530 1530 0 00-15.3 15.6 19 19 0 00-5.8-9.2c-2-1.8-5.3-4-9.4-4.6a45829.9 45829.9 0 0155.3-55.3c.8-.7 2-1 3.5-1 2.7.2 5.6 1.4 8.2 3.7a15 15 0 014.9 7.7zM66 53.6L55.5 64 45 74.5 26.3 93.7A29.5 29.5 0 0112 82.3a16 16 0 01-3-8.7c.1-1.1.5-2 1.1-2.7l.3-.3a5 5 0 013.6-1c1.8 0 3.6.6 5.4 1.6L13.8 77v.1l-.2.3-.1.3v1c1.2 3.8 4.1 7 8 8.5a8 8 0 006.7-.3 6 6 0 002-2.2c6.3-6 12.5-12.2 18.6-18.2l10.5-10.3 10-10.1 11.1-11.4L84 36zM22.2 73.3a16 16 0 014.8 7.6c.2 1 0 1.9-.5 2.4l-.3.2c-.8.5-2 .5-3.5 0a9.9 9.9 0 01-5.7-5.1l5.2-5z" />
          </g>
        </switch>
        <path id="star-1" d="M6 37a1 1 0 001 1 3 3 0 013 3 1 1 0 002 0 3 3 0 013-3 1 1 0 000-2 3 3 0 01-3-3 1 1 0 00-2 0 3 3 0 01-3 3 1 1 0 00-1 1zm5-1a5 5 0 001 1 5 5 0 00-1 1 5 5 0 00-1-1 5 5 0 001-1z" />
        <path id="star-2" d="M28 4a3 3 0 01-3-3 1 1 0 00-2 0 3 3 0 01-3 3 1 1 0 000 2 3 3 0 013 3 1 1 0 002 0 3 3 0 013-3 1 1 0 000-2zm-4 2a5 5 0 00-1-1 5 5 0 001-1 5 5 0 001 1 5 5 0 00-1 1z" />
        <path id="star-3" d="M39 27a1 1 0 001 1 3 3 0 013 3 1 1 0 002 0 3 3 0 013-3 1 1 0 000-2 3 3 0 01-3-3 1 1 0 00-2 0 3 3 0 01-3 3 1 1 0 00-1 1zm5-1a5 5 0 001 1 5 5 0 00-1 1 5 5 0 00-1-1 5 5 0 001-1z" />
        <path style={{opacity: 0}} id="dot-1" d="M0 37h2v2H0z" />
        <path style={{opacity: 0}} id="dot-2" d="M9 27h2v2H9z" />
        <path style={{opacity: 0}} id="dot-3" d="M19 42h2v2h-2z" />
        <path style={{opacity: 0}} id="dot-4" d="M21 24h2v2h-2z" />
        <path style={{opacity: 0}} id="dot-5" d="M24 27h2v2h-2z" />
        <path style={{opacity: 0}} id="dot-6" d="M35 32h2v2h-2z" />
        <path style={{opacity: 0}} id="dot-7" d="M35 19h2v2h-2z" />
        <path id="circle-1" style={{opacity: 0}} d="M4 20a3 3 0 103 3 3 3 0 00-3-3zm0 4a1 1 0 111-1 1 1 0 01-1 1z" />
        <path id="circle-2" style={{opacity: 0}} d="M28 40a3 3 0 103-3 3 3 0 00-3 3zm4 0a1 1 0 11-1-1 1 1 0 011 1z" />
        <path id="circle-3" style={{opacity: 0}} d="M45 16a3 3 0 10-3-3 3 3 0 003 3zm0-4a1 1 0 11-1 1 1 1 0 011-1z" />
      </svg>
    </>
  )
}