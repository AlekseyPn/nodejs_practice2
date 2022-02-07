const EventEmitter = require('events');

const myEmitter = new EventEmitter;

const logDbConnection = () => {
    console.log('db connected')
}

myEmitter.addListener('connected', logDbConnection);

myEmitter.emit('connected');

myEmitter.removeListener('connected', logDbConnection);

myEmitter.emit('connected');

myEmitter.on('message', (data) => {
    console.log('received', data);
});
myEmitter.prependListener('message', () => {
    console.log('new')
})

myEmitter.emit('message', 'hello world');

myEmitter.once('off', () => {
    console.log('once');
})

myEmitter.emit('off');
myEmitter.emit('off');

console.log(myEmitter.getMaxListeners());
myEmitter.setMaxListeners(1);
console.log(myEmitter.getMaxListeners());

console.log(myEmitter.listenerCount('message'))
console.log(myEmitter.listenerCount('off'))



console.log(myEmitter.listeners('message'))

console.log(myEmitter.eventNames());

myEmitter.on('error', (error) => {
    console.log('Error:' + error.message);
})

myEmitter.emit('error', new Error('error'))

const target = new EventTarget;

const logTarget  = () => {
    console.log('target')
}

target.addEventListener('raise', logTarget);

target.dispatchEvent(new Event('raise'));
