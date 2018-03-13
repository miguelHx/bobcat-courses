

class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }
  getGreeting() {
    return `Hi. I am ${this.name}.`;
  }
  getDescription() {
    return `${this.name} is ${this.age} year(s) old.`
  }

}

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
  hasMajor() {
    return !!this.major;
  }
  //@Override getDescription()
  getDescription() {
    let description = super.getDescription();

    if (this.hasMajor()) {
      description += ` Their major is ${this.major}.`;
    }
    return description;
  }
}
// const me = new Student('Miguel Hernandez', 20, 'Computer Science & Engineering');
// console.log(me.getDescription());
//
// const other = new Student();
// console.log(other.getDescription());

class Traveler extends Person {
  constructor(name, age, homeLocation) {
    super(name, age);
    this.homeLocation = homeLocation;
  }
  //@Override getGreeting()
  getGreeting() {
    let greeting = super.getGreeting();
    if (this.homeLocation) {
      greeting += ` I am visiting from ${this.homeLocation}`;
    }
    return greeting;
  }
}

// create new subclass of person
// traveler -> person
// add support for homeLocation (member variable)
// override getGreeting
// 1. Hi. I am Miguel Hernandez. I'm visiting frmo Philadelphia.
// 2. Hi. I am Miguel Hernandez.

const me = new Traveler('Miguel Hernandez', 20, 'Merced');
console.log(me.getGreeting());

const other = new Traveler();
console.log(other.getGreeting());
