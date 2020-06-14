import React from "react"
import { useIntl, Link } from "gatsby-plugin-intl"

import SEO from "../components/seo"
import DocPreview from '../components/doc-preview'
import { motion } from 'framer-motion'

import '../components/css/index.css'

const IndexPage = () => {
  const intl = useIntl()
  return (
    <>
      <SEO title={intl.formatMessage({id: "home.title"})} />
      <motion.div className="home" key="home"
        initial="hidden"
        animate="visible"
        exit={{ y: 100, opacity: 0 }}
        variants={{
          hidden: { y: 100, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        }}
        transition={{ duration: .75 }}
      >
        <div className="welcome">
          <h1>{intl.formatMessage({id: "home.welcome"})}</h1>
          <p>{intl.formatMessage({id: "home.personal-chapter"})} <span style={{ fontStyle: 'italic' }}>{intl.formatMessage({id: "home.justforyou"})}</span>.</p>
          <p>{intl.formatMessage({id: "home.look-like"})}</p>
        </div>
        <DocPreview />
      </motion.div>
      <motion.div key="get-started"
        initial="hidden"
        animate="visible"
        exit={{ y: 100, opacity: 0 }}
        variants={{
          hidden: { y: 100, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        }}
        transition={{ duration: .75 }}
      >
        <Link to="/blessing" className="action-button">{intl.formatMessage({id: "home.start"})}</Link>
      </motion.div>
    </>
  )
}

export default IndexPage
