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
    CLARTIY_PROFILES_CREDENTIALS = credentials('clarity-profiles-credentials')
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
    stage('run health-check-cypress') {
      steps {
        echo "Running build ${env.BUILD_ID}"
        sh "yarn run cypress run --env username=$CLARTIY_PROFILES_CREDENTIALS_USR,password=$CLARTIY_PROFILES_CREDENTIALS_PSW"
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
        failure {
            emailext attachLog: true, 
				to: "clarity-dev@lists.atosresearch.eu", 
				subject: "CSIS Monitoring Tests failed: ${currentBuild.fullDisplayName}",
                body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                <p>Visit <a href='https://health-check.clarity.cismet.de/'>CSIS Service Monitoring</a> for more details.</p>"""
        }
        unstable {
            emailext attachLog: true, 
				to: "clarity-dev@lists.atosresearch.eu", 
				subject: "CSIS Monitoring became unstable: ${currentBuild.fullDisplayName}",
                body: """<p>UNSTABLE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                <p>Visit <a href='https://health-check.clarity.cismet.de/'>CSIS Service Monitoring</a> for more details.</p>"""
        }
  }
}