import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

// cache example
const isUnique = (arr) => {
  const cache = {};
  let result = true;

  for (let i = 0; i < arr.length; i++) {
    console.log(`~~~LOOP~~~ i === ${i}`);
    if (cache[arr[i]]) {
      return false
    } else {
      cache[arr[i]] = true;
    }
  }

  return result;
}

console.log('isUnique 1', isUnique([1, 2, 3]));
console.log('isUnique 2', isUnique([1, 1, 3]));

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Unique sort');
//___________________________________Unique sort

const uniqueSort = function(arr) {
  const cache = {};
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (!cache[arr[i]]) {
      result.push(arr[i]);
      cache[arr[i]] = true
    }
  }

  return result.sort((a, b) => a - b);
};

uniqueSort([4,2,2,3,2,2,2]);
console.log(uniqueSort([4, 2, 2, 3, 2, 2, 2]))
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Basic memoization');

const times10 = (n) => {
  return n * 10
};

times10(9);
console.log(times10(9));

const basicMemoCache = {};

const memoTimes10 = (n) => {
  console.log('basicMemoCache 1', basicMemoCache)
  if (n in basicMemoCache) {
    console.log('basicMemoCache 2', basicMemoCache)
    console.log('Fetching from cache', n);
    return basicMemoCache[n];
  } else {
    console.log('basicMemoCache 3', basicMemoCache)
    console.log('Calculating result');
    let result = times10(n);
    basicMemoCache[n] = result;
    return result
  }
};

console.log(memoTimes10(9), 'calculating')
console.log(memoTimes10(9), 'calculated')

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Memoization with Closure');

const memoizedClosureTimes10 = (n) => {
  const closureCache = {};

  return (n) => {
    console.log('closureCache 1', closureCache)
    if (n in closureCache) {
      console.log('closureCache 2', closureCache)
      console.log('Fetching from cache', n);
      return closureCache[n];
    } else {
      console.log('closureCache 3', closureCache)
      console.log('Calculating result');
      let result = times10(n);
      closureCache[n] = result;
      return result
    }
  }
};

const memoClosureTimes10 = memoizedClosureTimes10();

try {
  console.log(memoClosureTimes10(9), 'calculating');
  console.log(memoClosureTimes10(9), 'calculated');
} catch(e) {
  console.error('Memoization with Closure ERROR: ', e)
};

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Generic Memoize Function');

const genericMemoizedFunction = (cb) => {
  const genericMemoCache = {};

  return (...n) => {
    console.log('genericMemoCache 1', genericMemoCache)
    if (n in genericMemoCache) {
      console.log('genericMemoCache 2', genericMemoCache)
      console.log('Fetching from cache', n);
      return genericMemoCache[n];
    } else {
      console.log('genericMemoCache 3', genericMemoCache)
      console.log('Calculating result');
      let result = cb(...n);
      genericMemoCache[n] = result;
      return result
    }
  }
};

const genericMemoFunc = genericMemoizedFunction(times10);

try {
  console.log(genericMemoFunc(9), 'calculating');
  console.log(genericMemoFunc(9), 'calculated');
} catch (e) {
  console.error('Memoization with Closure ERROR: ', e)
};

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Memoized Factorial in Closure');

function memoFactorial(n) {
  const cache = {}

    return (n) => {
      var result = 1
      if (n in cache) {
        return cache[n]
      } else {
        for(var i = 2; i <= n; i++) {
          console.log(`result ${result} * number ${n} =  ${result * n}`)
          result *= i
        }
        cache[n] = result
        return result
      }
    }
}

const memoFact = memoFactorial();

console.log(memoFact(5), 'calculating')
console.log(memoFact(5), 'calculated')
console.log(memoFact(6), 'calculating')
console.log(memoFact(5), 'calculated')
console.log(memoFact(6), 'calculated')

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Recursive Memoized Factorial');

function memoRecursiveFactorial(callbackFactorial) {
  const cache = {}

  return (number) => {
    if(cache[number]) {
      return cache[number]
    } else {
      let result = callbackFactorial(number)
      cache[number] = result
      return result
    }
  }
}

function factorial(n) {
  if (n === 1) {
    return 1
  } else {
    console.log(`number ${factorial(n - 1)} * ${n} = ${ n * factorial(n - 1)}`)
    return n * factorial(n - 1)
  }
};

const memoRF = memoRecursiveFactorial(factorial);
console.log(memoRF(5), 'calculating')
console.log(memoRF(5), 'calculated')
console.log(memoRF(6), 'calculated')
console.log(memoRF(5), 'calculated')
console.log(memoRF(5), 'calculated')
console.log(memoRF(6), 'calculated')
console.log(memoRF(5), 'calculated')
console.log(memoRF(5), 'calculated')
console.log(memoRF(5), 'calculated')


console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Linear Search');

function linearSearch(list, item) {
  let index = -1;

  list.forEach((listItem, i) => {
    if (listItem === item) {
      index = i
    }
  })
  return index
}

console.log(linearSearch([2,6,7,90,103], 90));

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Binary Search');

function binarySearch(list, item) {
  let min = 0
  let max = list.length -1;
  let guess;

  while(min <= max) {
    guess = Math.floor(min + max / 2);

    if(list[guess] === item) {
      return list[guess]
    } else if (list[guess] < item) {
      min = guess ++
    } else if (list[guess] > item) {
      max = guess --
    }
    return list[guess]
  }
}

console.log(binarySearch([2, 6, 7, 90, 103], 90));

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Implement Bubblesort');

// [9, 2, 5, 6, 4, 3, 7, 10, 1, 8];
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

function swap(array, i, j) {
  var temp = array[i]
  array[i] = array[j]
  array[j] = temp
  console.log(array, array[i], array[j], 'swap')
}

console.log(swap([1, 2, 3, 4, 5], 3, 4), 'swap')

function BubblesortBasic(array) {
  for(var i = 0; i < array.length; i++) {
    for(var j = 1; j < array.length; j++) {
      console.log('j: ', array[j])
      console.log('i: ', array[i])
      console.log(array[j - 1] > array[j])
      if (array[j -1 ] > array[j]) {
        // [array[j], array[i]] = [array[i], array[j]]
        swap(array, j - 1 , j)
      }
    }
  }
  return array
}

console.log(BubblesortBasic([9, 2, 5, 6, 4, 3, 7, 10, 1, 8]))
