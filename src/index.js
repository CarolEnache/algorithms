import './styles.css';
import 'regenerator-runtime/runtime';
import createStore from './fakeData';
import { async } from 'regenerator-runtime/runtime';

document.getElementById('app').innerHTML = `
<h1>Hello Algorithms!</h1>
<div>
  Open the console to see the magic
</div>
`;

// cache example
const isUnique = arr => {
  const cache = {};
  let result = true;

  for (let i = 0; i < arr.length; i++) {
    console.log(`~~~LOOP~~~ i === ${i}`);
    if (cache[arr[i]]) {
      return false;
    } else {
      cache[arr[i]] = true;
    }
  }

  return result;
};

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
      cache[arr[i]] = true;
    }
  }

  return result.sort((a, b) => a - b);
};

uniqueSort([4, 2, 2, 3, 2, 2, 2]);
console.log(uniqueSort([4, 2, 2, 3, 2, 2, 2]));
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Basic memoization');

const times10 = n => {
  return n * 10;
};

times10(9);
console.log(times10(9));

const basicMemoCache = {};

const memoTimes10 = n => {
  console.log('basicMemoCache 1', basicMemoCache);
  if (n in basicMemoCache) {
    console.log('basicMemoCache 2', basicMemoCache);
    console.log('Fetching from cache', n);
    return basicMemoCache[n];
  } else {
    console.log('basicMemoCache 3', basicMemoCache);
    console.log('Calculating result');
    let result = times10(n);
    basicMemoCache[n] = result;
    return result;
  }
};

console.log(memoTimes10(9), 'calculating');
console.log(memoTimes10(9), 'calculated');

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Memoization with Closure');

const memoizedClosureTimes10 = n => {
  const closureCache = {};

  return n => {
    console.log('closureCache 1', closureCache);
    if (n in closureCache) {
      console.log('closureCache 2', closureCache);
      console.log('Fetching from cache', n);
      return closureCache[n];
    } else {
      console.log('closureCache 3', closureCache);
      console.log('Calculating result');
      let result = times10(n);
      closureCache[n] = result;
      return result;
    }
  };
};

const memoClosureTimes10 = memoizedClosureTimes10();

try {
  console.log(memoClosureTimes10(9), 'calculating');
  console.log(memoClosureTimes10(9), 'calculated');
} catch (e) {
  console.error('Memoization with Closure ERROR: ', e);
}

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Generic Memoize Function');

const genericMemoizedFunction = cb => {
  const genericMemoCache = {};

  return (...n) => {
    console.log('genericMemoCache 1', genericMemoCache);
    if (n in genericMemoCache) {
      console.log('genericMemoCache 2', genericMemoCache);
      console.log('Fetching from cache', n);
      return genericMemoCache[n];
    } else {
      console.log('genericMemoCache 3', genericMemoCache);
      console.log('Calculating result');
      let result = cb(...n);
      genericMemoCache[n] = result;
      return result;
    }
  };
};

const genericMemoFunc = genericMemoizedFunction(times10);

try {
  console.log(genericMemoFunc(9), 'calculating');
  console.log(genericMemoFunc(9), 'calculated');
} catch (e) {
  console.error('Memoization with Closure ERROR: ', e);
}

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Memoized Factorial in Closure');

function memoFactorial(n) {
  const cache = {};

  return n => {
    var result = 1;
    if (n in cache) {
      return cache[n];
    } else {
      for (var i = 2; i <= n; i++) {
        console.log(`result ${result} * number ${n} =  ${result * n}`);
        result *= i;
      }
      cache[n] = result;
      return result;
    }
  };
}

const memoFact = memoFactorial();

console.log(memoFact(5), 'calculating');
console.log(memoFact(5), 'calculated');
console.log(memoFact(6), 'calculating');
console.log(memoFact(5), 'calculated');
console.log(memoFact(6), 'calculated');

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Recursive Memoized Factorial');

function memoRecursiveFactorial(callbackFactorial) {
  const cache = {};

  return number => {
    if (cache[number]) {
      return cache[number];
    } else {
      let result = callbackFactorial(number);
      cache[number] = result;
      return result;
    }
  };
}

function factorial(n) {
  if (n === 1) {
    return 1;
  } else {
    console.log(`number ${factorial(n - 1)} * ${n} = ${n * factorial(n - 1)}`);
    return n * factorial(n - 1);
  }
}

const memoRF = memoRecursiveFactorial(factorial);
console.log(memoRF(5), 'calculating');
console.log(memoRF(5), 'calculated');
console.log(memoRF(6), 'calculated');
console.log(memoRF(5), 'calculated');
console.log(memoRF(5), 'calculated');
console.log(memoRF(6), 'calculated');
console.log(memoRF(5), 'calculated');
console.log(memoRF(5), 'calculated');
console.log(memoRF(5), 'calculated');

function memoCesar(fn) {
  const cacheArr = [];
  const cache = [];

  return function() {
    const hash = Array.prototype.slice.call(arguments).toString();
    const index = cacheArr.indexOf(hash);
    if (index > -1) {
      return cache[index];
    } else {
      const result = fn.apply(null, arguments);
      const i = cacheArr.length;
      cacheArr[i] = hash;
      cache[i] = result;
      return result;
    }
  };
}

const useMemoCesar = (obj, fn) => {
  obj[`_${fn}`] = obj[fn];
  obj[fn] = memoCesar(obj[`_${fn}`]);
};

const lib = {
  factorial: n => {
    if (n === 1) {
      return 1;
    } else {
      const lastFactorial = lib.factorial(n - 1);
      const thisFactorial = n * lastFactorial;
      if (n === 2) {
        console.log(`${lastFactorial} * ${n} = ${thisFactorial}`);
      } else {
        console.log(`* ${n} = ${thisFactorial}`);
      }
      return thisFactorial;
    }
  }
};

useMemoCesar(lib, 'factorial');
console.log(lib.factorial(5), 'calculating 5');
console.log(lib.factorial(5), 'calculated 5');
console.log(lib.factorial(4), 'calculated 4');
console.log(lib.factorial(3), 'calculated 3');
console.log(lib.factorial(2), 'calculated 2');

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Linear Search');

function linearSearch(list, item) {
  let index = -1;

  list.forEach((listItem, i) => {
    if (listItem === item) {
      index = i;
    }
  });
  return index;
}

console.log(linearSearch([2, 6, 7, 90, 103], 90));

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Binary Search');

function binarySearch(list, item) {
  let min = 0;
  let max = list.length - 1;
  let guess;

  while (min <= max) {
    guess = Math.floor(min + max / 2);

    if (list[guess] === item) {
      return list[guess];
    } else if (list[guess] < item) {
      min = guess++;
    } else if (list[guess] > item) {
      max = guess--;
    }
    return list[guess];
  }
}

console.log(binarySearch([2, 6, 7, 90, 103], 90));

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Implement basic Bubblesort');

// [9, 2, 5, 6, 4, 3, 7, 10, 1, 8];
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

function swap(array, i, j) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function bubbleSortBasic(array) {
  let iteration = 0;
  for (var i = 0; i < array.length; i++) {
    for (var j = 1; j < array.length; j++) {
      iteration++;
      if (array[j - 1] > array[j]) {
        swap(array, j - 1, j);
      }
    }
  }
  console.log(iteration);
  return array;
}

console.log(bubbleSortBasic([9, 2, 5, 6, 4, 3, 7, 10, 1, 8]));

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Implement optimized Bubblesort');

function bubbleSortOptimized(array) {
  let swapped;
  let iteration = 0;

  do {
    swapped = false;
    for (var i = 0; i < array.length; i++) {
      for (var j = 1; j < array.length; j++) {
        iteration++;
        if (array[j - 1] > array[j]) {
          swap(array, j - 1, j);
          swapped = true;
        }
      }
    }
  } while (swapped);
  console.log(iteration);
  return array;
}

console.log(bubbleSortOptimized([9, 2, 5, 6, 4, 3, 7, 10, 1, 8]));

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Implement Merge Sort');

function merge(left, right) {
  let sortedArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      sortedArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      sortedArray.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return sortedArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

function mergeSort(list) {
  if (list.length === 1) {
    return list;
  }
  const middle = Math.floor(list.length / 2);
  const left = list.slice(0, middle);
  const right = list.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

mergeSort([9, 2, 5, 6, 4, 3, 7, 10, 1, 8]); //returns [1,2,3,4,5,6,7,8,9,10]

console.log(mergeSort([9, 2, 5, 6, 4, 3, 7, 10, 1, 8]));

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Greedy Algorithm');

function greedyChange(amount) {
  const options = [25, 10, 5];
  let result = [];
  let left = amount;

  const twentyFife = amount => {
    if (left < options[0]) {
      return fifteen(amount);
    }
    result.push(options[0]);
    left = amount - options[0];
    return twentyFife(amount - options[0]);
  };

  const fifteen = amount => {
    if (left === options[1]) {
      return result.push(options[1]);
    } else if (left < options[1]) {
      return result.push(options[2]);
    }
    result.push(options[1]);
    left = amount - options[1];
    return fifteen(amount - options[0]);
  };
  twentyFife(amount);
  return result;
}

console.log(greedyChange(35));

const makeChange = (coins, amount) => {
  coins.sort((a, b) => b - a);
  let coinTotal = 0;
  let i = 0;

  while (amount > 0) {
    if (coins[i] <= amount) {
      amount -= coins[i];
      coinTotal++;
    } else {
      i++;
    }
  }
  return coinTotal;
};

console.log(makeChange([5, 10, 25], 100));

console.log(
  '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~custom Generator function where we dynamically generate values into the object and iterate over them'
);
const numbers = {
  *[Symbol.iterator]({ start = 0, end = 100, step = 1 } = {}) {
    for (let i = start; i <= end; i += step) {
      yield i;
    }
  }
};

// for (let num of numbers) {
//   console.log(num);
// }

console.log(
  `My lucky numbers are: ${[
    ...numbers[Symbol.iterator]({ start: 6, end: 30, step: 4 })
  ]}`
);

function* generatorExample() {
  yield 4;
  yield 5;
  yield 6;
}

const generator = generatorExample();

console.log(generator.next());
console.log('hello world');
console.log(generator.next());
console.log('hello again');
console.log(generator.next());
console.log('hello and done');
console.log(generator.next());

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Async iterators *for await of*');

const store = createStore();
console.log(store);

const customers = {
  [Symbol.iterator]: function() {
    let i = 0;
    return {
      next: async function() {
        i++;
        const customer = await store.get('customer', i);

        if (!customer) {
          return { done: true };
        }

        customer.foods = await store.get('food', i);

        return {
          value: customer,
          done: false
        };
      }
    };
  }
};

(async function() {
  for await (const customer of customers) {
    console.log(customer);
  }
})();

console.log(customer.next);
