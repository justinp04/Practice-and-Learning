let challenge = '30 Days Of JavaScript';

console.log(challenge);

// Print out the length of the string
console.log(challenge.length);

// Change a string to all upper case
console.log(challenge.toUpperCase());

// Change a string to all lower case
console.log(challenge.toLowerCase());

// Get rid of the first word in the string
console.log(challenge.substring(3));

// Only have the first word in the string
console.log(challenge.substring(0,2));

// Check if the string contains the word 'Script'
console.log(challenge.includes('Script'));

// Split the string into an array
console.log(challenge.split(' '));

// Replace JavaScript with the word Python
console.log(challenge.replace('JavaScript', 'Python'));

// Find the character value at the index 15 in the string 
console.log(challenge.charAt(15));

// Find the character code of J in the string
console.log(challenge.charCodeAt(11));

// Find the first occurence of the char 'a' in the stirng 
console.log(challenge.indexOf('a'));

// Find the last occurence of 'a' in the string
console.log(challenge.lastIndexOf('a'));

// Find the occurence of the word 'because' in the following string
let challenge2 = 'You cannot end a sentence with because because because is a conjunction';
console.log(challenge2.indexOf('because'));
// Does the same
console.log(challenge2.search('because'));

// Find the last occurence of the word 'because' in the string
console.log(challenge2.lastIndexOf('because'));

// Remove any trailing whitespace at th begging and end of the challenge string
console.log(challenge.trim());

// Have this return true
console.log(challenge.startsWith('30'));
console.log(challenge.endsWith('pt'));

// Fine all the 'a's in the string
// The flag 'g' means that 
console.log(challenge.match(/a/g));

// Repeat challenge twice
console.log(challenge.repeat(2));
