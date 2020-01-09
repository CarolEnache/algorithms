import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

//What is the TC?

var countChars = function(str) {
  var count = 0;

  for (var i = 0; i < str.length; i++) {
    count++;
  }

  return count;
};

countChars("dance");
countChars("walk");
