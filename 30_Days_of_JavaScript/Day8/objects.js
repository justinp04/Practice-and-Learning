// Giving the person object properties
const person = {
    firstName: 'Justin',
    lastName: 'Pan',

    // Giving the person object a object function
    getFullName: function() {
        return `${this.firstName} ${this.lastName}`;
    }
};

console.log(person.getFullName());
