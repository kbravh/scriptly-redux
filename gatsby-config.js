module.exports = {
  siteMetadata: {
    title: `Scriptly`,
    description: `Make your patriarchal blessing look like it was taken right out of the pages of the scriptures.`,
    author: `@laborforzion`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-sentry",
      options: {
        dsn: "https://67e863347a06470ca38859621a7f5830@sentry.io/2877175",
      }
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.jsx`)
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: 'Cormorant Garamond',
            text: `THE BOOK OF EL LIBRO DE DAMON`
          },
          {
            family: 'Alata'
          }
        ]
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
