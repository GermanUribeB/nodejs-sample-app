pipeline {
    agent any
    
    environment {
        NODE_VERSION = '16'
    }
    
    stages {
        stage('Setup Node') {
            steps {
                sh """
                curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo bash -
                sudo apt-get install -y nodejs
                """
            }
        }
        
        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/GermanUribeB/nodejs-sample-app.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'  // If you have a build script
            }
        }
        
        stage('Deploy to Staging') {
            steps {
                sshagent(['vagrant-staging-ssh']) {
                    sh '''
                    # Copy files to staging
                    scp -o StrictHostKeyChecking=no -r ./* vagrant@192.168.60.20:/var/www/node-app/
                    
                    # Install dependencies and restart
                    ssh vagrant@192.168.60.20 "cd /var/www/node-app && \
                        npm install --production && \
                        pm2 start app.js --name node-app || \
                        pm2 restart node-app"
                    '''
                }
            }
        }
    }
}
