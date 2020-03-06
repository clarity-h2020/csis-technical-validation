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
        // FIXE: This is some 'docker magic'. Although already checked out by Jenkins, here inside of the container, there's still the old stuff
        // so we have to check oput again. Absolut ridiculous. 
        checkout([$class: 'GitSCM', branches: [[name: '*/profiles-cypress']], browser: [$class: 'GithubWeb', repoUrl: 'https://github.com/clarity-h2020/csis-technical-validation/'], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'CleanBeforeCheckout']], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'clarity-ci-github', url: 'git@github.com:clarity-h2020/csis-technical-validation.git']]])  
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
    stage('run myclimateservices profiles smoketests') {
      steps {
        echo "Running build ${env.BUILD_ID}"
        sh "yarn run cypress run --record --key 27000bb3-b497-4c44-b4e7-74d06ffba4b9 --env username=$CLARTIY_PROFILES_CREDENTIALS_USR,password=$CLARTIY_PROFILES_CREDENTIALS_PSW"
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
				to: "pascal@cismet.de", 
				subject: "Build failed in Jenkins: ${currentBuild.fullDisplayName}",
                body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>"""
        }
        unstable {
            emailext attachLog: true, 
				to: "pascal@cismet.de", 
				subject: "Jenkins build became unstable: ${currentBuild.fullDisplayName}",
                body: """<p>UNSTABLE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>"""
        }
    }
}
