
let arr=[1,2,3,4,5,6,7];

console.log(`Original array: `+arr);
console.log(`First element: `+arr[0]);

//remove the last element(pop)
arr.pop();
console.log(`Array after poping: `+arr);

//add a new element(push)
arr.push(10);
console.log(`Array after pushing: `+arr);

//removing first element(shift)
arr.shift();
console.log(`Array after using shift: `+arr);

//adding new element to the beginning(unshift)
arr.unshift(9);
console.log(`Array after using unshift: `+arr);

//print each element * 2(forEach)
console.log(`Multiplying each element by 2`);
arr.forEach(num =>  {console.log(num*2);
                        });

// use map to create a new array where each number is squared.(map)
const square=arr.map((num,index,arr) => {console.log(`Square of ${arr[index]} is ${num ** 2}`);
                                        return num ** 2;
                                        });
console.log(`Squared array: `+square);

// use filter to create a new array containing only even numbers.(filter)
const even=arr.filter(num => num%2===0);
console.log(`Filtered array: `+even);

//use reduce to Calculate the sum of all numbers in the array.(filter)
const sum=arr.reduce((accumulator,num) => accumulator+=num,0);
console.log(`Sum is: `+sum);

//Check if the array contains any number greater than 10.(some)
console.log(arr.some(num => num>10));

//Check if all numbers are positive.(every)
console.log(arr.every(num => num>0));

//slice function()
const slicedArray=arr.slice(2,6);
console.log(`The sliced array is: `+slicedArray);
console.log(`The original array is: `+arr);

//sort using sort function() and find num > 4 and findIndex
arr.sort();
console.log(`The sorted array is:`+arr);
let num1= arr.find(num => num > 4);
console.log(`First number greater than 4 is: `+num1);
let pos1=arr.findIndex(num => num > 4)
console.log(`Index of first number greater than 4 is: `+pos1);

//ascending
arr.sort((a,b) => (a-b));
console.log(`The numerically sorted array is ascending order is:`+arr);
num1= arr.find(num => num > 4);
console.log(`First number greater than 4 is: `+num1);
pos1=arr.findIndex(num => num > 4)
console.log(`Index of first number greater than 4 is: `+pos1);

//descending
arr.sort((a,b) => (b-a));
console.log(`The numerically sorted array is descending order is:`+arr);
num1= arr.find(num => num > 4);
console.log(`First number greater than 4 is: `+num1);
pos1=arr.findIndex(num => num > 4)
console.log(`Index of first number greater than 4 is: `+pos1);

//concat 
const concatArray=arr.concat(slicedArray);
console.log(`The newly concatenated array is:`+concatArray);


//reverse
console.log(`The reverse order is: `+concatArray.reverse());


//flat
let newArray = [arr,[slicedArray]];
console.log(arr);
const flatArray=newArray.flat(2);
console.log(flatArray);

//splice function
let splicedArray=arr.splice(2,2,12,11);
console.log(`The spliced array is: `+splicedArray);
console.log(`The new array is: `+arr);