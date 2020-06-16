<p align="center">
  <a href="https://scripture.page">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72.7 96" height=60>
      <path id="scriptly-logo-path" fill="#102542" d="M59.6 18.5S76.2-1.6 72 0c-2.9 1.2-19.7 6.7-19.7 6.7l-1.2-5-9.6 6.4L39.1 1l-4.4 7.3-19.5 48-5.3 13.7-.2.6.1-.3L0 96l1.2-.2L26.3 52c10.3-7.5 27.4-17 27.4-17l9.6-6.2s-2.8-.9-9.6.2l9.7-10.6zm-13-4.6a236 236 0 00-16.2 22 277.3 277.3 0 00-14 23.6c-1.5 2.6-2.8 5.4-4.2 8A165.2 165.2 0 0140 20.4 216.7 216.7 0 0152.4 6.8l-5.8 7z"/>
    </svg>
  </a>
</p>
<h1 align="center">
  Scriptly
</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/0366bbf9-cc13-4423-a980-be26fccb90df/deploy-status)](https://app.netlify.com/sites/scripture/deploys)

Welcome to Scriptly, a site designed to produce scripture-styled patriarchal blessings. [What's a patriarchal blessing?](https://www.churchofjesuschrist.org/study/manual/gospel-topics/patriarchal-blessings) 

# Local Development

In order to run the site locally, clone this repository then install all dependencies using either `yarn install` or `npm install`. Finally, run `gatsby develop`. Visit https://localhost:8000 to see the site.

To run tests, run `npm run test` which will kick off the Jest testing suite. Note: Currently, there are only unit tests. 

# Site breakdown

This site is made up of multiple components:

* Frontend - Built on [GatsbyJS](https://gatsbyjs.org), a React based website building framework
* Backend - Two Node.js functions hosted on AWS Lambda

## Frontend

The frontend code makes up the majority of this repository.
```
.
├── __mocks__
│   ├── file-mock.js
│   └── gatsby.js
├── src
│   ├── components
│   │   ├── __tests__
│   │   ├── css
│   │   └── ...
│   ├── images
│   ├── intl
│   ├── machines
│   └── pages
├── static
├── gatsby-config.js
├── jest-preprocess.js
├── jest.config.js
└── loadershim.js
```

The `__mocks__` directory and `jest-preprocess.js`, `jest.config.js`, and `loadershim.js` files are all used for testing. The tests themselves are in the `__tests__` directory. See [Gatsby testing](https://www.gatsbyjs.org/docs/testing/) for more information about this setup.

Overall site flow and logic is handled by an [xState](https://github.com/davidkpiano/xstate) state machine, located in the `machines` directory.

The `pages` directory contains React components that will be turned into pages on build, while the `components` are used in those pages across the site.

Internationalization is handled by [react-intl](https://github.com/yahoo/react-intl), with translations located in the `intl` directory. The site is currently available in the following languages:

* English
* Spanish

Would you like to help translate to a new language? Get in touch!

## Backend 

The backend functions are at the root level of the repository in these folders.

```
.
├── scriptly-docx-lambda
└── scriptly-pdf-lambda
```

Once the user posts their form data, it is sent over to the `scriptly-docx-lambda` function. This function has docx templates which are populated with the user's data by the [docxtemplater](https://github.com/open-xml-templating/docxtemplater) library. After the docx is created, the `scriptly-pdf-lambda` function is called. It picks up the docx file from S3 and converts it to a PDF using a headless OpenOffice in Lambda.  

# Todo

* Visual testing using Jest or Cypress
* OCR/text-recognition so that users can upload PDF versions of their blessings instead of typing them