const { spawn } = require('child_process');

const childProcess = spawn('ls')

childProcess.stdout.on('data', (data) => {
    console.log(`STDOUT: ${data}`)
})

childProcess.stderr.on('data', (data) => {
    console.log(`STDERR: ${data}`)
})

childProcess.on('exit', (code) => {
    console.log(`Exit code: ${code}`)
})