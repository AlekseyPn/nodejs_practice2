const perfHooks = require('perf_hooks');

test = perfHooks.performance.timerify(test);

const performanceObserver = new perfHooks.PerformanceObserver((items, observer) => {
    console.log(items.getEntries());

    const entry = items.getEntriesByName('slowMeasure').pop();

    console.log(`${entry.name}: ${entry.duration}`);
    observer.disconnect();
})

performanceObserver.observe({
    entryTypes: ['measure', 'function']
})

function test() {

    const arr = [];
    for(let i = 0; i < 100000000; i++) {
        arr.push(i * i);
    }
};

function slow() {
    performance.mark('slow');
    const arr = [];

    for(let i = 0; i < 100000000; i++) {
        arr.push(i * i);
    }

    performance.mark('slowEnd');
    performance.measure('slowMeasure', 'slow', 'slowEnd');
}

slow();
test();