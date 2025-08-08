pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("raghavachari93/game:${env.BUILD_NUMBER}")
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    sh "docker push raghavachari93/game:${env.BUILD_NUMBER}"
                    sh "docker tag raghavachari93/game:${env.BUILD_NUMBER} raghavachari93/game:latest"
                    sh "docker push raghavachari93/game:latest"
                }
            }
        }
    }
}
