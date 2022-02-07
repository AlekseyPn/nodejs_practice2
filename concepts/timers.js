const start = performance.now();

setTimeout(() => {
    console.log(performance.now() - start);
    console.log('setTimeout 1s');
}, 1000)

function my(arg) {
    console.log('arg:' + arg);
}

setTimeout(my, 1500, 'hello')


let timeoutId = setTimeout(() => {
    console.log('boom');
}, 5000)

setTimeout(() => {
    clearTimeout(timeoutId)
    console.log('clear')
}, 1000)

const intervalId = setInterval(() => {
    console.log(performance.now())
}, 1000)

setTimeout(() => {clearInterval(intervalId)}, 5000);

console.log('Before');
setImmediate(() => {
    console.log('after all');
})
console.log('After');
timeoutId = setTimeout(() => {
    console.log('boom');
}, 5000)

timeoutId.unref();

setImmediate(() => {
    timeoutId.ref();
})