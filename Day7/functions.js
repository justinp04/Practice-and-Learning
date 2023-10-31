// Functions can be delcared with and without parameters
function printHello()
{
    console.log("Hello");
}

function add(numOne, numTwo)
{
    console.log(numOne + numTwo);
}

// A function with an unlimited number of parameters
function addAll()
{
    var sum = 0;
    for(var i = 0; i < arguments.length; i++)
    {
        sum += arguments[i];
    }
    console.log(sum);
}

function fullName(firstName, lastName)
{
    console.log(firstName + " " + lastName);
}