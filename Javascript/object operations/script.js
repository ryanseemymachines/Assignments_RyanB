
const student={
    name: "Ryan",
    age:22,
    grade:"B+",
    city:"Trivandrum",
}

// console.log(Object.keys(student));
const properties=Object.keys(student);
console.log(`The properties of the object are: `+properties.join(", "));

const values=Object.values(student);
console.log(`The values of the properties of the object are: `+values.join(", "));

const pairs=Object.entries(student);
console.log(`The properties of the object are: `,pairs.join(" - "));

console.log(`The key value pairs are:`);
for (let [key,value] of pairs){
    console.log(`Key: ${key} , Value: ${value}`);
}

const additionalInfo={
    hobby:"Photography",
    school:"Loyola School",
}

//copying student into studentCopy
let studentCopy=Object.assign({},student);

//merging student and additionalInfo into fullStudentProfile
let fullStudentProfile=Object.assign({},student,additionalInfo);

//printing the merged and copied objects
console.log(`Copied object studentCopy`);
studentCopy=Object.entries(studentCopy);
for (let [key,value] of studentCopy){
    console.log(`Key: ${key} , Value: ${value}`);
}

console.log(`Merged object fullStudentProfile`);
fullStudentProfile=Object.entries(fullStudentProfile);
for (let [key,value] of fullStudentProfile){
    console.log(`Key: ${key} , Value: ${value}`);
}

//config object

const userProfile={
    name: "Mark",
    age:35,
    email:"hello@example.com",
}

console.log(userProfile);

//creating a copy of the userProfile for freezing

console.log(`Freeze operations`)
let frozenUser={...userProfile};

console.log(`Before freezing`,frozenUser);

//freeze
Object.freeze(frozenUser);

//modifying the property of a frozen object
frozenUser.age=50;
console.log(frozenUser);

//adding new property to the original object and the frozen object
userProfile.phone=9876543210;
console.log(`After adding new property to original object: `,userProfile);

frozenUser.phone=9632587410;
console.log(`After adding new property to frozen object: `,frozenUser);

//deleting a property from the original object and the frozen object

delete userProfile.age;
console.log(`After deleting age from the original object: `,userProfile);

delete frozenUser.age;
console.log(`After deleting age from the frozen object: `,frozenUser);

///checking if the objet is frozen or not
const value=Object.isFrozen(frozenUser);
console.log(`Is frozenUser frozen: `,value);

const value1=Object.isFrozen(userProfile);
console.log(`Is userProfile frozen: `,value1);


//creating a copy of the userProfile for seal
console.log(`Seal operations`)
userProfile.age=40;
userProfile.phone=12345687109;
let sealedUser={...userProfile};

console.log(`Before seal`,sealedUser);

//seal
Object.seal(sealedUser);

//modifying the property of a sealed object
sealedUser.age=50;
console.log(`After modifying the sealed object: `,sealedUser);

//adding new property to the original object and the sealed object
userProfile.job="IT";
console.log(`After adding new property to original object: `,userProfile);

sealedUser.job="IT";
console.log(`After adding new property to sealed object: `,sealedUser);

//deleting a property from the original object and the frozen object
delete userProfile.phone;
console.log(`After deleting phone from the original object: `,userProfile);

delete sealedUser.age;
console.log(`After deleting age from the sealed object: `,sealedUser);

//checking if the objet is sealed or not
const value2=Object.isSealed(sealedUser);
console.log(`Is sealedUser sealed: `,value2);

const value3=Object.isSealed(userProfile);
console.log(`Is userProfile sealed: `,value3);

//preventExtensions
console.log(`preventExtensions operations`);

const nonExtensibleUser={...userProfile};
console.log(`Before preventExtensions`,nonExtensibleUser);
console.log(userProfile);

//appyling preventExtensions
Object.preventExtensions(nonExtensibleUser);

//adding new property to the original object and the preventExtensions object
userProfile.phone=111111111111;
console.log(`Original object after adding new property`,userProfile);

nonExtensibleUser.phone=222222222;
console.log(`preventExtensions object after adding new property`,nonExtensibleUser);

//modifying existing properties
userProfile.phone=1212121212;
console.log(`Original object after modifying property`,userProfile);

nonExtensibleUser.age=545454;
console.log(`preventExtensions object after modifying property`,nonExtensibleUser);

//delete existing property

delete userProfile.job;
console.log(`Original object after deleting property`,userProfile);

delete nonExtensibleUser.job;
console.log(`preventExtensions object after modifying property`,nonExtensibleUser);

//check
const value4=Object.isExtensible(userProfile);
console.log(`Is userProfile extensible: `,value4);

const value5=Object.isExtensible(nonExtensibleUser);
console.log(`Is nonExtensibleUser nonextensible: `,value5);
