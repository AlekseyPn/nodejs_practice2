/* event loop inside libuv */

const fs = require('fs');

console.log('init');

setTimeout(() => {
    console.log(performance.now(), '0s timer')
}, 100)

setImmediate(() => {
    console.log('Immediate');
})

fs.readFile(__filename, () => {
    console.log('file readed')})

setTimeout(() => {
    for (let i = 0; i < 1000000000; i++) {}
    console.log('Done')

    Promise.resolve().then(() => {
        console.log('Promise resolved timeout');
    })

    process.nextTick(() => {
        console.log('next tick timeout')
    })
}, 0)

process.nextTick(() => {
    console.log('next tick')
})

Promise.resolve().then(() => {
    console.log('Promise resolved');
})

console.log('Final');