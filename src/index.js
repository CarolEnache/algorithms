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