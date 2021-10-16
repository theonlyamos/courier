require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://courier-gh.netlify.app",
    title: "CourierGH",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
      	name: `Courier GH App`,
        short_name: `CourierGH`,
        description: `Want to move things from one location to other? Look no further`,
        lang: `en`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        start_url: `/app`,
        background_color: `#663399`,
        theme_color: `#fff`,
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-image",
    "gatsby-plugin-netlify",
    "gatsby-plugin-mdx",
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID
        }
      }
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    {
      resolve: `gatsby-transformer-opencage-geocoder`,
      options: {     
        api_key: process.env.OPENCAGE_API_KEY,      
        nodeTypes: [
          // Forward Geocoding
          { nodeType: `NodeTypeToBeGeocoded`,
            addressFields: [
              'Address1', 'Address2', 'Address3', 'Town', 'Country', 'Postcode'],
            addFullResult: false,
          },
          
          // Reverse Geocoding
          { nodeType: `NodeTypeToBeReverseGeocoded`,
            positionFields: {
              lat: `lat`,
              lon: `lon`
            },
            addFullResult: true,
          }
          
        ]
      }
    }
  ],
};
