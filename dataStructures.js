var word = "abc=defgh==i"

var text = "abcd"
var rtext = "debcaf"

// => Data Structure "SET" Using Union Set.
// => to compare to strings and return the Not-included String.
/* function checkText(t, rt){
  var arOfText = []
  var wt = ""
  
  // convert text to array
  for(var i=0; i<t.length; i++) {
    arOfText.push(t[i])
  }
  
  // Check for value not in contained
  // in each text string
  for(var i=0; i<rt.length; i++){
    if(!arOfText.includes(rt[i])){
      wt+=rt[i]
    }
  }
  return wt;
} */

// console.log(checkText(text, rtext))

/* function reverseStr(word) {
  console.log("The entered word ", word)
  var arletters = []
  var chr = []
  let rword = []
  let reversedWord = ""
  
  // transform string letters to an array first
  let i=0;
  while(i<word.length){
    arletters.push(word[i])
    i++
  }
  
    console.log(,arletters)
 
  // reset index num
  i=null
  
  // Check for none alphabetical characters
  arletters.forEach((w,i,arr) =>{
    var rx = /[a-z]/
    if(rx.test(w) === false){
      console.log("el-> w", w)
      chr[i] = w
      arletters.splice(i,1)
    }
  })
  console.log("Chr", chr)
  
  
  
  // reverse word/elements here.
  while(arletters.length>0)
  {
    var popped = arletters.pop()
    rword.push(popped)
  }
  
  
  // now add characters according to
  // previous position
  if(rword.length != 0){
    chr.forEach((c,i,arr) =>{
    console.log("B4 fixing in", rword)
    rword.splice([i],0,c)
    // console.log("Chr", c, i)
  })
  }
  
  // return string letters back to array
  while(rword.length>0){
    reversedWord+=rword.shift()
  }
  
  console.log(reversedWord.length)
  return reversedWord;
}
  
console.log(reverseStr(word)); */


// Solution Gotten from Telegram Channel
function reverseInPlace(arr){
  let reg = new RegExp('[a-z]');
  
  for(let i=0, j=arr.length-1; i<arr.length/2; i++,j--){
    // while(!reg.test(arr[i])){
    //    i++;
    // }

    // while(!reg.test(arr[j])){
    //    j--;
    // }

    // Array Swapping/Destructuring Here!
    console.log("isDestructuring...", [arr[i], arr[j]] = [arr[j], arr[i]]);
    
    // [arr[i],arr[j]] = [arr[j],arr[i]];
    // [0, 3] = ['c', 'a'];
    // [0, 3] = ['c', 'a'];
  }
  
  return arr;
}

const stringy = (str) => {
  return reverseInPlace(str.split('')).join('');
}

// console.log(stringy('a=bcdefg'));
// console.log(stringy('abc^defgh==i'));




/* ====================== Quick - Sort ======================= */

function quickSort(arr) {
  if (arr.length < 2) return arr;

  let lesserValues = [];
  let greaterValues = [];
  let pivot = arr[0];  /* Picking Pivot from middle of the array / dataset of values */
  
  let i;

  for (i = 1; i < arr.length; i++) {
    if (arr[i] > pivot) {
      greaterValues.push(arr[i])
    } else {
      lesserValues.push(arr[i])
    }
  }
  console.log('Pivot Values', pivot)
  return quickSort(lesserValues).concat(pivot, quickSort(greaterValues))
}


// -> Example 2 For Quick Sort.

// basic implementation, where pivot is the first element
function quickSortBasic(array) {
  if(array.length < 2) {
    return array;
  }

  var pivot = array[0];
  var lesserArray = [];
  var greaterArray = [];

  for (var i = 1; i < array.length; i++) {
    if ( array[i] > pivot ) {
      greaterArray.push(array[i]);
    } else {
      lesserArray.push(array[i]);
    }
  }

  return quickSortBasic(lesserArray).concat(pivot, quickSortBasic(greaterArray));
}

// 123456
const data_set = [4, 5, 6, 2, 3, 1]
console.log(quickSort(data_set))
// console.log(quickSortBasic(data_set))