// This JavaScript file contains code on making higher order functions

// What are higher order functions?
// Higher order functions are functions that take other functions as arguments or return functions as their results

// An example is a callback function which can be passed as a paramter to another function
// A callback function
const callback = (n) => {
    return n ** 2;
}

// A function that takes the other function as a callback
function cube(callback, n) {
    return callback(n) * n;
}