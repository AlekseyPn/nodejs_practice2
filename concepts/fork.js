process.on('message', (msg) => {
    console.log(msg);

    if (msg === 'disconnect') {
        process.disconnect();
        return;
    }
    process.send('Pong');
})