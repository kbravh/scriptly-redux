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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `scriptly`,
        short_name: `scriptly`,
        start_url: `/`,
        background_color: `#F7F7F7`,
        theme_color: `#102542`,
        display: `minimal-ui`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
