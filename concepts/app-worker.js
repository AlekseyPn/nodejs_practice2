const {Worker} = require('worker_threads')

// best performance compared with slow-compute-without-thread

const compute = (nums) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
            workerData: {nums}
        })

        worker.on('message', (msg) => {
            console.log(worker.threadId)
            resolve(msg);
        })

        worker.on('error', (err) => {
            reject(err);
        })

        worker.on('exit', () => {
            console.log('exit');
        })
    })
};

const main = async () => {
    performance.mark('start');

    const result = await Promise.all([
        compute([25, 20, 19, 48, 30, 50]),
        compute([25, 20, 19, 48, 30, 50]),
        compute([25, 20, 19, 48, 30, 50]),
        compute([25, 20, 19, 48, 30, 50])])

    console.log(result);
    performance.mark('end');

    performance.measure('main', 'start', 'end')
    console.log(performance.getEntriesByName('main').pop())
}


setTimeout(() => {
    console.log('timeout')
}, 1000)
main();