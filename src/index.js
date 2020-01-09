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




