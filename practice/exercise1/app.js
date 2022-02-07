const { Worker } = require('worker_threads');

const perfHooks = require('perf_hooks');

const { fork } = require('child_process');

const performanceObserver = new perfHooks.PerformanceObserver((items, observer) => {
    items.getEntries().forEach(entry => {
        console.log(`${entry.name}: ${entry.duration}`);
    })
});

performanceObserver.observe({
    entryTypes: ['measure']
})


const workerFunction = (nums) => {
    performance.mark('work start');
    return new Promise((resolve) => {
        const worker = new Worker('./worker.js', {
            workerData: {
                nums,
            },
        });

        worker.on('message', (data) => {
            console.log(data)
            performance.mark('work end');
            performance.measure('worker', 'work start', 'work end');
            resolve(data);
        })
    })
}

const forkFunction = (array) => {
    performance.mark('fork start');
    return new Promise((resolve) => {
        const forkProcess = fork('./fork.js');
        forkProcess.on('message', (data) => {
            console.log(data)
            performance.mark('fork end');
            performance.measure('fork', 'fork start', 'fork end');
            resolve(data);
        })

        forkProcess.send(array);
    })
}

async function main() {
    await workerFunction([25, 19, 48, 30, 50]);
    await forkFunction([25, 19, 48, 30, 50]);
}

main();