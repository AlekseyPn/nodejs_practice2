const crypto = require('crypto');
const https = require("https");
const start = performance.now();

// increase thread size
process.env.UV_THREAD_POOL_SIZE = 8;

// worker thread
for (let i = 0; i <= 50; i++) {
    crypto.pbkdf2('test', 'salt', 10000, 64, 'sha512', () => {
        console.log(performance.now() - start)
    });
}

// core
for (let i = 0; i < 50; i++) {
    https.get('https://yandex.ru', (res) => {
        res.on('data', () => {})
        res.on('end', () => {
            console.log(performance.now() - start)
        })
    })
}