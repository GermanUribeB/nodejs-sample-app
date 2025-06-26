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
                script {
                  try {
                    sh 'npm test'
                  } catch (err) {
                    // Optional: Add test reporting here
                    junit 'junit.xml' // If you configure Jest to output JUnit format
                    // Fail the build if tests fail
                    error('Tests failed')
                  }
                }
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
                sshagent(['your-ssh-credential-id']) {
                    sh """
                    scp -o StrictHostKeyChecking=no -r * vagrant@192.168.60.20:/var/www/node-app/
                    ssh vagrant@192.168.60.20 "cd /var/www/node-app && npm install --production && pm2 restart app"
                    """
                }
            }
        }
    }
}
