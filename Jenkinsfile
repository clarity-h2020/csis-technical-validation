pipeline {
  agent {
    // this image provides everything needed to run Cypress
    docker {
      image 'cypress/base:10'//cismet/cypress-base-10-with-jenkins-user:1.0'
      //image 'cypress/browsers:node11.13.0-chrome73'
      args '--ipc=host -e HOME=/var/jenkins_home/'
    }
  }
  
  environment {
    CLARTIY_CSIS_CREDENTIALS = credentials('clarity-csis-credentials')
  }
  
  stages {
    // first stage installs node dependencies and Cypress binary
    stage('build') {
      steps {
        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        // sh 'npm ci'
        // sh 'export HOME=/var/jenkins_home/'
        
        sh 'yarn install --frozen-lockfile'       
        sh 'yarn run cypress verify'

        catchError {
            echo "Build ${env.BUILD_ID} failed"           
        }
      }
    }
    stage('run myclimateservices CSIS smoketests') {
      steps {
        echo "Running build ${env.BUILD_ID}"
        sh "yarn run cypress run --env username=$CLARTIY_CSIS_CREDENTIALS_USR,password=$CLARTIY_CSIS_CREDENTIALS_PSW"
        catchError {
            echo "Build ${env.BUILD_ID} failed"           
        }
      }
    }
  }
  post {
        always {
                script {
                    properties([[$class: 'GithubProjectProperty',
                    projectUrlStr: 'https://github.com/clarity-h2020/csis-technical-validation']])
                }
                step([$class: 'GitHubIssueNotifier',
                    issueAppend: true,
                    issueReopen: false,
                    issueLabel: 'CI',
                    issueTitle: '$JOB_NAME $BUILD_DISPLAY_NAME failed'])
        }
    }
}
