import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby';
import React from 'react';

export const ShowImage = (props) => (
    <StaticQuery
        query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                sizes(maxWidth: 600) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    `}

        render={(data) => {
            const image = data.images.edges.find(n => n.node.relativePath.includes(props.filename));
            if (!image) return null;

            const imageSizes = image.node.childImageSharp.sizes;
            return (
                <Img
                    {...props}
                    sizes={imageSizes}
                />
            );
        }}
    />
)