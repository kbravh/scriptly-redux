import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"
import DocPreview from '../components/doc-preview'
import { motion } from 'framer-motion'

import '../components/css/index.css'

const IndexPage = () => {
  return (
    <>
      <SEO title="Home" />
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
          <h1>Welcome to Scriptly!</h1>
          <p>Your patriarchal blessing is like a personal chapter of scripture written <span style={{ fontStyle: 'italic' }}>just for you</span>.</p>
          <p>We think it should look like one, too.</p>
        </div>
        <DocPreview />
      </motion.div>
      <Link to="/blessing" className="action-button">Get started</Link>
    </>
  )
}

export default IndexPage
