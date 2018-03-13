
// arguments object - no longer bound with arrow functions

const add = (a, b) => {
  //console.log(arguments);
  return a + b;
};

console.log(add(55, 1, 1001));

// this keyword - no longer bound
const user = {
  name: 'Miguel',
  cities: ['Merced', 'Atwater', 'Oakland', 'Berkeley'],
  printPlacesLived() {
    // console.log(this.name);
    // console.log(this.cities);
    const cityMessages = this.cities.map((city) => this.name + ' has lived in ' + city);

    return cityMessages;

    // this.cities.forEach((city) => {
    //   console.log(this.name + ' has lived/will live in ' + city);
    // });
  }
};

console.log(user.printPlacesLived());

// Challenge area

const multiplier = {
  // numbers - array of numbers
  numbers: [1, 2, 3],
  // multiplyBy - single number
  multiplyBy: 2,
  // multiply - return a new array where the numbers have been multiplied
  multiply() {
    return this.numbers.map((num) => num * this.multiplyBy);
  }
}

console.log(multiplier.multiply());
