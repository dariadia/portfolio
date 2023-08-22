const config = require('./src/config');

module.exports = {
  siteMetadata: {
    title: 'Daria V. Diachkova - Senior Frontend Engineer and small team Frontend Lead',
    description:
      'UX and inclusivity-focused Senior Frontend Engineer and small team Frontend Lead (≤5 team members) with 5+ years of experience in React, Node.js and TypeScript.',
    siteUrl: 'https://dariadia-portfolio.vercel.app/',
    image: '/og.png',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    'gatsby-plugin-remove-console',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/favicon/icon.png',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/content/projects`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 700,
              linkImagesToOriginal: true,
              quality: 90,
              tracedSVG: { color: config.colors.accent },
            },
          },
        ],
      },
    },
  ],
};
