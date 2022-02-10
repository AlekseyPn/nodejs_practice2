// node --expose-gc --trace_gc_verbose ./concepts/globals.js
let outer = null
let run = function () {
  let inner = outer

  let unused = function () {
    if (inner)
      console.log('hi')
  }

  outer = {
    longStr: new Array(10000000).join('*')
  }
}

setInterval(run, 1000);
