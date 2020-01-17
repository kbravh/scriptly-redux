import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import DocPreview from '../components/doc-preview'

import '../components/css/index.css'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="home">
      <div className="welcome">
        <h1>Welcome to Scriptly!</h1>
        <p>Your patriarchal blessing is like a personal chapter of scripture written <span style={{fontStyle: 'italic'}}>just for you</span>.</p>
        <p>We think it should look like one, too.</p>
      </div>
      <DocPreview />
    </div>
    <Link to="/form" className="action-button">Get started</Link>
  </Layout>
)

export default IndexPage
