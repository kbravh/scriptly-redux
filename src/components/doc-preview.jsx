import React, {useEffect} from 'react';
import {useIntl} from 'gatsby-plugin-intl'
import Typed from 'typed.js'
import './css/doc-preview.css'
import names from './names.json'

const DocPreview = () => {
    const intl = useIntl()

    const nameTypingOptions = {
        // show localized names, but default to english if not found
        strings: names[intl.locale] ? names[intl.locale] : names["en"],
        startDelay: 1500,
        typeSpeed: 100,
        backSpeed: 100,
        shuffle: true,
        loop: true,
        showCursor: false,
        contentType: null,
        backDelay: 3000
    }

    useEffect(() => {
        const typed = new Typed('#scripture-name', nameTypingOptions)
        typed.start()
        return () => {typed.destroy()} // cleanup on unmount to prevent memory leaks
    })

    return (
        <div className="doc-preview shadow">
            <div className="header">
                <span>Damon Greer</span>
                <span>Patriarchal Blessing</span>
            </div>
            <div className="title">{intl.formatMessage({id: "home.book"})} <span id="scripture-name">ANDREA</span></div>
            <p className="book-intro">
                Blessing given by Henry Coulson, Patriarch of the Aurora Colorado stake to Damon Greer, son of Melissa Jane Deckow and Craig Wilson Greer, on October 16, 2005.
            </p>
            <div className="text-body">
                <strong className="chapter-heading">CHAPTER 1</strong>
                <br/>
                <i className="chapter-intro">Every worthy, baptized member is entitled to and should receive a patriarchal blessing, which provides inspired direction from the Lord. Patriarchal blessings include a declaration of a person’s lineage in the house of Israel and contain personal counsel from the Lord. As a person studies his or her patriarchal blessing and follows the counsel it contains, it will provide guidance, comfort, and protection.</i>
                <br/>
                <br/>
                <div><span className="first-letter">A</span> patriarchal blessing includes a declaration of lineage, stating that the person is of the house of Israel—a descendant of Abraham, belonging to a specific tribe of Jacob. Many Latter-day Saints are of the tribe of Ephraim, the tribe given the primary responsibility to lead the latter-day work of the Lord.</div>
                    <div>2. Because each of us has many bloodlines running in us, two members of the same family may be declared as being of different tribes in Israel.</div>
                    <div>3. It does not matter if a person's lineage in the house of Israel is through bloodlines or by adoption. Church members are counted as a descendant of Abraham and an heir to all the promises and blessings contained in the Abrahamic covenant.</div>
                    <div>4. Those who have received a patriarchal blessing should read it humbly, prayerfully, and frequently. It contains personal revelation and instructions from Heavenly Father, who knows our strengths, weaknesses, and eternal potential. Patriarchal blessings may contain promises, admonitions, and warnings.</div>
                    <div>5. Those who follow the counsel in their patriarchal blessing will be less likely to go astray or be misled. Only by following the counsel in a patriarchal blessing can one receive the blessings contained therein.</div>
            </div>
        </div>
    )
}

export default DocPreview