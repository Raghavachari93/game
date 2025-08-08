pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "raghavender123456/game"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
    sh """
        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
        docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}
        docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest
        docker push ${DOCKER_IMAGE}:latest
    """
}

            }
        }
    }
}

