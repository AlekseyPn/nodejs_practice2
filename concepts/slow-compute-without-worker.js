const factorial = (n) => {
    if (n === 1 || n === 0) {
        return 1;
    }

    return factorial(n - 1) * n;
}

const compute = (nums) => {
    const arr = [];

    for (let i = 0; i < 100000000; i++) {
        arr.push(i * i)
    }

    return nums.map(el => factorial(el));
};

const main = () => {
    performance.mark('start');

    const result = [
        compute([25, 20, 19, 48, 30, 50]),
        compute([25, 20, 19, 48, 30, 50]),
        compute([25, 20, 19, 48, 30, 50]),
        compute([25, 20, 19, 48, 30, 50])]

    console.log(result);
    performance.mark('end');

    performance.measure('main', 'start', 'end')
    console.log(performance.getEntriesByName('main').pop())
}
setTimeout(() => {
    console.log('timeout')
}, 1000)

main();