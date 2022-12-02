const testArr = [1, 2, 3, 4, 5];

// const testFn = async (deep) => {


//   /* Next step  */
//   const nextStep = deep - 1;

//   /* */


// }
// testFn();

const recursiveFn = (deep) => {
  const numbers = [];

  const nextStep = deep - 1;

  for (let element of testArr) {

    numbers.push(element);
  }

  if (deep > 0) {
    // console.log(recursiveFn(nextStep));
    return numbers.concat(recursiveFn(nextStep));
  } else {
    return
  }
}

console.log(recursiveFn(3));