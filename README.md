## JeremyCollins.net web source

### Remote Installation on Ubuntu Server

1. Install [Docker for Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
2. Pull [docker repo](https://hub.docker.com/r/jdodsoncollins/jeremycollins.net/) `sudo docker pull jdodsoncollins/jeremycollins.net`
3. Docker container extends `nginx-alpine` container, so follow any appropriate nginx docker guide. 

JeremyCollins.net is deployed using a [Traefik](https://docs.traefik.io/) container, which handles the pulling of the `jdodsoncollins/jeremycollins.net` container


### Local Installation

1. [Install Docker](https://docs.docker.com/install/)
2. Install bundler with `gem install bundler`
3. Install gems with `bundle install`
4. Change directory to `/site` and run Jekyll with `bundle exec jekyll serve --watch` or `bundle exec jekyll build`

--- or ---

Pull [docker repo](https://hub.docker.com/r/jdodsoncollins/jeremycollins.net/) `docker pull jdodsoncollins/jeremycollins.net`

##### Local Development

1. Change directory into `/site` and `npm install`
2. Use `gulp` to process style changes


This project is based on the [Neo-HPSTR Jekyll Theme](http://aronbordin.com/neo-hpstr-jekyll-theme). See this project for further build info -- My variant is like a 'lite' version of this theme but otherwise compiles the same.


The theme is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT). 
