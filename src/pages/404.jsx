import React from "react"
import { useIntl } from 'gatsby-plugin-intl'
import SEO from "../components/seo"
import { motion } from 'framer-motion'

const NotFoundPage = () => {
  const intl = useIntl()
  return (
    <>
      <SEO title={intl.formatMessage({ id: "404.title" })} />
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center"
      }}
        initial="hidden"
        animate="visible"
        exit={{ y: 100, opacity: 0 }}
        variants={{
          hidden: { y: 100, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        }}
        transition={{ duration: .75 }}
      >
        <h1>{intl.formatMessage({ id: "404.notfound" })}</h1>
        <p>{intl.formatMessage({ id: "404.message" })}</p>
      </motion.div>
    </>
  )
}

export default NotFoundPage
