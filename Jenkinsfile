//===== Define environment variables =====
def appName = 'cincy-cal'
def artifactoryRoot = "https://artifactory.gannettdigital.com/artifactory/ldsn-node/${appName}"
//===== End environment variables =====

node('swarm') {
  stage('release') {
    deleteDir()
    sh 'npm -v'
    sh 'node -v'
    sh 'printenv'

    checkout scm
    sh 'git clean -fd'
    sh 'git submodule init && git submodule update'

    sh 'npm install bower'
    sh 'npm install grunt'
    sh 'gem install sass --user-install'

    sh 'npm install'
    withEnv(["PATH=${env.PATH}:/opt/jenkins/.gem/ruby/2.2.0/bin:${env.WORKSPACE}/node_modules/.bin"]) {
      sh 'bower install --config.interactive=false'
      sh 'grunt build'
    }

    sh "npm version 0.${CHANGE_ID}.${BUILD_NUMBER}"
    sh 'npm pack'

    def appVersion = sh(script: "node -p \"require('./package.json').version\"", returnStdout: true).trim()
    echo "App version: ${appVersion}"

    def packageFileName = "${appName}-${appVersion}.tgz"
    echo "Uploading $packageFileName to Artifactory"

    withCredentials([
      [$class: 'StringBinding', credentialsId: 'ARTIFACTORY_DEPLOY_KEY', variable: 'ARTIFACTORY_DEPLOY_KEY']
    ]) {
      sh "curl -X PUT -i -T ${packageFileName} -H 'x-api-key:${env.ARTIFACTORY_DEPLOY_KEY}' '$artifactoryRoot/'"
    }

    //sh 'git pull origin master'
    //sh 'git push origin HEAD:master --tags'
  }

  stage('deploy') {
    //checkout scm
    //sh 'git clean -fd'
    //sh 'git submodule init && git submodule update'

    def appVersion = sh(script: "node -p \"require('./package.json').version\"", returnStdout: true).trim()
    def environment = env.DEPLOY_ENVIRONMENT ?: "staging";
    echo "Environment variable: ${env.DEPLOY_ENVIRONMENT}"
    echo "Deployment environment: ${environment} - Cincy Calendar Redesign version: ${appVersion}"

    sh 'npm --prefix ldsn-node-deployment-client install ldsn-node-deployment-client'

    withEnv(["APP_VERSION=${appVersion}","NODE_ENV=${environment}","NODE_CONFIG_DIR=deploy_configs"]) {
      withCredentials([
        [$class: 'StringBinding', credentialsId: 'DEPLOYMENT_API_KEY', variable: 'DEPLOYMENT_API_KEY'],
        [$class: 'StringBinding', credentialsId: 'SCALR_API_KEY', variable: 'SCALR_API_KEY'],
        [$class: 'StringBinding', credentialsId: 'SCALR_SECRET_KEY', variable: 'SCALR_SECRET_KEY']
      ]) {
        sh "node ldsn-node-deployment-client/deploy.js"
      }
    }
  }

   stage('testing') {
      withEnv(["startTunnel=true", "SAUCE_LABS=true", "PATH=${env.PATH}:/opt/jenkins/.gem/ruby/2.2.0/bin"]) {
       dir("${env.WORKSPACE}/test") {
         sh "gem install bundler --user-install"
         sh "bundle install --path /opt/jenkins/.gem"

         sauce('gd_automation') {           
           sauceconnect(options: '', useGeneratedTunnelIdentifier: false, verboseLogging: false) {
             sh ''' rake test_sauce test_params="-o '-t @cincy-cal'" '''
             junit keepLongStdio: true, testDataPublishers: [[$class: 'SauceOnDemandReportPublisher', jobVisibility: 'public']], testResults: 'junit_reports/**'
           }
         }
       }
     }
   }
}
