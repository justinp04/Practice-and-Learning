// Creating an empty array, we use the array constructor
const arr = Array();

console.log(arr);

// Creating an array with square brackets (the recommended way)
const arr2 = [];
console.log(arr);

// Can create an array with values already in it, similar to java

// You can print the length of the array and the contents in it via:
console.log('arr2:', arr2);
console.log('arr2 length:', arr2.length);

// Unlike java, arrays can have different types of data in them
const arr3 = [1, 2, 'hello', true];

console.log('arr3:', arr3);

// You can create an array using split on a string
const arr4 = 'hello world'.split(' ');

// You can access an element of an array via an index
console.log('arr4 index 0:', arr4[0]);

// Creating an array via concatenating two arrays
const arr5 = arr3.concat(arr4);
console.log(arr5);

// Getting the index of a value in an array
console.log('index of hello:', arr5.indexOf('hello'));

// If the value is not found, then it will return -1
console.log('index of goodbye:', arr5.indexOf('goodbye'));

// Getting the lsat index of an element in an array
let arr6 = ['hello','goodbye','hello','goodbye','goodbye','hello','goodbye']
console.log('last index of hello:' + arr6.lastIndexOf('hello'));

// To check if an item exists in an array, you can use .includes()
console.log('arr6 includes hello:', arr6.includes('hello'));
console.log('arr6 includes good evening:', arr6.includes('good evening'));

// Converting an array to a string
console.log('arr6 to string:', arr6.toString());

// Join array elements to print out a string
console.log('arr6 joined:', arr6.join(' '));

// Adding an element to the end of an array
arr6.push('good evening');
console.log('arr6 after push:', arr6);

// Removing an element from the end of an array
arr6.pop();
console.log('arr6 after pop:', arr6);

// Adding an element to the start of an array
arr6.unshift('good evening');
console.log('arr6 after unshift:', arr6);