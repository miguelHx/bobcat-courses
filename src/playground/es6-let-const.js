var nameVar = 'Miguel';
var nameVar = 'name';
console.log('nameVar', nameVar);


let nameLet = 'Jen';
nameLet = 'miguel';
console.log('nameLet', nameLet);


const nameConst = 'Frank';
console.log('nameConst', nameConst);



// block scoping

var fullName = 'Miguel Hernandez';

if (fullName) {
  let firstName = fullName.split(' ')[0]; 
  console.log(firstName);
}

console.log(firstName);
