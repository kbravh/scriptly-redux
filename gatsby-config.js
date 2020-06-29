module.exports = {
    siteMetadata: {
        title: `Scriptly`,
        description: `Make your patriarchal blessing look like it was taken right out of the pages of the scriptures.`,
        author: `@kbravh`,
        siteUrl: `https://scripture.page`
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
            resolve: `gatsby-plugin-monetization`,
            options: {
                paymentPointer: '$ilp.uphold.com/BfyYUyGBrEgA',
            },
        },
        // the layout must be above the intl plugin so that the IntlProvider wraps the layout
        {
            resolve: `gatsby-plugin-layout`,
            options: {
                component: require.resolve(`./src/components/layout.jsx`)
            }
        },
        {
            resolve: `gatsby-plugin-intl`,
            options: {
                // language JSON resource path
                path: `${__dirname}/src/intl`,
                // supported language
                languages: [`en`, `es`],
                // language file path
                defaultLanguage: `en`,
                // option to redirect to `/en` when connecting `/`
                redirect: false,
            },
        },
        `gatsby-plugin-sitemap`,
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host: 'https://scripture.page',
                sitemap: 'https://scripture.page/sitemap.xml',
                policy: [{ userAgent: '*', allow: '/' }]
            }
        },
        {
            resolve: "gatsby-plugin-sentry",
            options: {
                dsn: "https://67e863347a06470ca38859621a7f5830@sentry.io/2877175",
                environment: process.env.NODE_ENV,
                enabled: (() => ["production"].indexOf(process.env.NODE_ENV) !== -1)()
            }
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-prefetch-google-fonts`,
            options: {
                fonts: [{
                        family: 'Cormorant Garamond',
                    },
                    {
                        family: 'Della Respira',
                    }
                ]
            }
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        `gatsby-plugin-offline`,
    ],
}