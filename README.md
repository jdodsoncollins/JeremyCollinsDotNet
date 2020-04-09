## JeremyCollins.net web source

This is the source for jeremycollins.net. Tech stack relied upon for deployment:

Deployment stack, optional:
- Docker
- Traefik

Local server & client:
- NodeJS
- [Gatsby](https://www.gatsbyjs.org/) (includes React, [Theme UI](https://theme-ui.com/))


### Local Installation (with Docker)

Pull and run [docker repo](https://hub.docker.com/r/jdodsoncollins/jeremycollins.net/) `docker pull jdodsoncollins/jeremycollins.net && docker-compose up`

Docker container extends `nginx-alpine` container, so follow any appropriate nginx docker guide if you're curious what that does or have problems. 

##### Local Development

1. `cd site && npm install`
2. Use `gatsby develop` to build and run locally. This site is built with [Gatsby](https://www.gatsbyjs.org/) so basic familiarity is needed if you roll with this project.

As far as UI goes, this site implements and extends the theme [Minimal Blog by LekoArts](https://github.com/LekoArts/gatsby-themes/tree/master/themes/gatsby-theme-minimal-blog), with the following customizations:
- Overridden primary components (header, footer, homepage, post)
- A few added utility components (such as a graphql optimized image-loader component and root wrapper)
- New hooks and texts
- [Theme UI](https://www.gatsbyjs.org/docs/theme-ui/) overrides (most notably, the site should automatically toggle light or dark mode depending on your device settings, if applicable)