FROM paas-docker-artifactory.gannettdigital.com/paas-centos7-base:latest
MAINTAINER Ryan Graef <rgraef@gannett.com>

ENV NODEJS_VERSION=6.3.1
ENV NODE_USER=node
ENV APP_ROOT=/opt/gannett/cincy-cal
ENV PORT=3000

HEALTHCHECK CMD curl --fail http://localhost:${PORT}/status/environment || exit 1

RUN useradd -ms /bin/bash ${NODE_USER}

RUN yum install -y epel-release git npm bzip2 ruby ruby-dev make gcc gcc-c++ libffi libffi-devel gmp-devel.x86_64 fontconfig && yum update -y && yum update -y --security && yum clean all
RUN npm install -g n && n ${NODEJS_VERSION}

WORKDIR ${APP_ROOT}

RUN chown -R ${NODE_USER}:${NODE_USER} ${APP_ROOT}

COPY package.json .npmrc .bowerrc bower.json ${APP_ROOT}/

USER ${NODE_USER}

RUN npm set progress=false && npm config set depth 0
RUN npm install --no-optional
RUN npm install @newrelic/native-metrics

COPY ./ ${APP_ROOT}/

USER root
RUN gem install sass && rm -rf $(ruby -rubygems -e'puts Gem.default_dir')/cache
RUN chown -R ${NODE_USER}:${NODE_USER} ${APP_ROOT}/public
USER ${NODE_USER}

RUN npm run build-client

EXPOSE ${PORT}
CMD ["node", "server.js"]
