import { Link, useIntl, changeLocale } from "gatsby-plugin-intl"
import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"
import { motion } from 'framer-motion'

import './css/header.css'

const languages = [
  { name: `english`, code: `en` },
  { name: `spanish`, code: `es` }
]

const Header = ({ siteTitle }) => {
  const intl = useIntl()
  const [isLanguageOpen, setLanguageOpen] = useState(false)
  const languageButtonRef = useRef(null)
  const languageListRef = useRef(null)

  const handleKeypress = event => {
    if(event.key === `Escape` && isLanguageOpen){
      setLanguageOpen(false)
    }
  }

  const clickOutsideHandler = event => {
    if(languageListRef.current.contains(event.target)){
      return
    } else {
      setLanguageOpen(false)
    }
  }

  useEffect(() => {
    if(isLanguageOpen){
      //put focus on the current language
      languageListRef.current.querySelector(`.language[data-code="${intl.locale}"]`).focus()
      document.addEventListener("mousedown", clickOutsideHandler)
    } else {
      document.removeEventListener("mousedown", clickOutsideHandler)
    }
  }, [isLanguageOpen])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: .75 }}
    >
      <nav>
        <h1>
          <Link className="brand-logo" to="/" >
            <svg id="scriptly-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72.7 96">
              <path id="scriptly-logo-path" d="M59.6 18.5S76.2-1.6 72 0c-2.9 1.2-19.7 6.7-19.7 6.7l-1.2-5-9.6 6.4L39.1 1l-4.4 7.3-19.5 48-5.3 13.7-.2.6.1-.3L0 96l1.2-.2L26.3 52c10.3-7.5 27.4-17 27.4-17l9.6-6.2s-2.8-.9-9.6.2l9.7-10.6zm-13-4.6a236 236 0 00-16.2 22 277.3 277.3 0 00-14 23.6c-1.5 2.6-2.8 5.4-4.2 8A165.2 165.2 0 0140 20.4 216.7 216.7 0 0152.4 6.8l-5.8 7z" />
            </svg>
            {siteTitle}
          </Link>
        </h1>
        <div id="nav-links">
          <motion.h3
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to="/faq" activeStyle={{ borderBottom: `3px solid var(--background-color)` }}>{intl.formatMessage({ id: "header.faq" })}</Link>
          </motion.h3>
          <div className="language-section">
            <motion.button
              id="language-button"
              aria-haspopup="true"
              aria-controls="language-select"
              aria-label={intl.formatMessage({id: "header.lang-menu"})}
              ref={languageButtonRef}
              initial={{ y: 4 }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.9 }}
              style={{ height: 28 }}
              onClick={() => setLanguageOpen(!isLanguageOpen)}
            >
              <svg id="language-logo" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="28px" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.4" clipRule="evenodd" viewBox="0 0 28 28">
                <path id="language-path" d="M28 0v22H16l-8 6v-6H0V0zm-7 5V3h-2v2h-3v2h5a11.9 11.9 0 01-1.3 4.3A14.4 14.4 0 0118 8.7v-.2l-1.8 1 .1.2c.7 1.2 1.5 2.4 2.4 3.4a12.4 12.4 0 01-2.6 2.7l-.3.2-.3.2 1.2 1.6a14.5 14.5 0 003.5-3.3 9.4 9.4 0 002.6 1.4l.6-1.8-.6-.3-1.5-1A14 14 0 0023 7h1V5zM8 6H6.7L2.4 16h2.2l.4-1 .4-1h5.2l.8 2h2.2L9.3 6zm-1.7 6h3.4L8 8z" />
              </svg>
            </motion.button>
            <motion.ul id="language-select"
              onKeyUp={handleKeypress}
              ref={languageListRef}
              animate={isLanguageOpen ? `open` : `closed`}
              variants={{
                open: { opacity: 1, scale: 1, y: 10 },
                closed: { opacity: 0, scale: 0.6, transition: { type: "spring", stiffness: 400, damping: 40 }, y: 10 }
              }}
            >
              {languages.map(language => (
                <motion.button
                  key={language.code}
                  data-code={language.code}
                  className="language"
                  tabIndex={isLanguageOpen ? "0" : "-1"}
                  onClick={() => changeLocale(language.code)}
                >
                  {intl.formatMessage({ id: `header.` + language.name })}
                </motion.button>
              ))}
            </motion.ul>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

// Language logo by Explanaicon from the Noun Project