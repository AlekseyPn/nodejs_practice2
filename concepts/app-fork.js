const { fork } = require('child_process');

const forkProcess = fork('./fork.js');

forkProcess.on('message', (data) => {
    console.log(`Received data: ${data}`)
})

forkProcess.on('close', (code) => {
    console.log(`Exited: ${code}`)
})

forkProcess.send('Ping')
forkProcess.send('disconnect')