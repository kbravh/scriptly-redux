import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import {motion} from 'framer-motion'

import './css/header.css'

const Header = ({ siteTitle, location }) => (
  <motion.header
    initial={location.pathname === '/' ? {y: -100, opacity: 0} : false}
    animate={{y: 0, opacity: 1}}
    transition={{duration: .75}}
  >
    <nav>
      <h1>
        <Link className="brand-logo" to="/" >
          <svg id="scriptly-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72.7 96">
            <path id="scriptly-logo-path" d="M59.6 18.5S76.2-1.6 72 0c-2.9 1.2-19.7 6.7-19.7 6.7l-1.2-5-9.6 6.4L39.1 1l-4.4 7.3-19.5 48-5.3 13.7-.2.6.1-.3L0 96l1.2-.2L26.3 52c10.3-7.5 27.4-17 27.4-17l9.6-6.2s-2.8-.9-9.6.2l9.7-10.6zm-13-4.6a236 236 0 00-16.2 22 277.3 277.3 0 00-14 23.6c-1.5 2.6-2.8 5.4-4.2 8A165.2 165.2 0 0140 20.4 216.7 216.7 0 0152.4 6.8l-5.8 7z"/>
          </svg>
          {siteTitle}
        </Link>
      </h1>
    </nav>
  </motion.header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
