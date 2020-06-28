import React from 'react'
import { useIntl } from "gatsby-plugin-intl"
import SEO from '../components/seo'

import '../components/css/what-is.css'

const WhatIs = () => {
    const intl = useIntl()
    return (
        <>
            <SEO title={intl.formatMessage({ id: "whatIs.title" })} />
            <h1 className="what-header">{intl.formatMessage({ id: "whatIs.title" })}</h1>
            <section className="what-is">
                <p>{intl.formatMessage({ id: "whatIs.members" })}</p>
                <p>{intl.formatMessage({ id: "whatIs.patriarch" })}</p>
                <p>{intl.formatMessage({ id: "whatIs.find" })}<a href="https://www.churchofjesuschrist.org/study/manual/gospel-topics/patriarchal-blessing" className="regular-link">{intl.formatMessage({ id: "whatIs.church" })}</a></p>
            </section>
        </>
    )
}

export default WhatIs