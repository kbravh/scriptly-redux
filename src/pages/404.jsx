import React from "react"
import {useIntl} from 'gatsby-plugin-intl'
import SEO from "../components/seo"

const NotFoundPage = () => {
  const intl = useIntl()
  return (
  <>
    <SEO title={intl.formatMessage({id: "404.title"})} />
    <h1>{intl.formatMessage({id: "404.notfound"})}</h1>
    <p>{intl.formatMessage({id: "404.message"})}</p>
  </>
)}

export default NotFoundPage
