import React from 'react'
import { useIntl } from 'gatsby-plugin-intl'
import SEO from "../components/seo"

import '../components/css/faq.css'

const FAQ = () => {
  const intl = useIntl()
  return (
    <>
      <SEO title="FAQs" />
      <h1 className="faq-header">{intl.formatMessage({ id: "faq.title" })}</h1>
      <ul className="faq-list">
        <li>
          <h3>{intl.formatMessage({ id: "faq.seen-by-others" })}</h3>
          <p>{intl.formatMessage({ id: "faq.seen-by-others-answer" })}</p>
        </li>
      </ul>
      <div className="contact-me">
        {intl.formatMessage({ id: "faq.contact" })} <a href="mailto:info@laborforzion.com">info@laborforzion.com</a>
      </div>
    </>
  )
}

export default FAQ