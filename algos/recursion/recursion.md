## Recursion


### Objectives:

- Explain what recursion is and why we would want to use it. 
- Break recursion down into it's Base and Recursive case statement.
- Demonstrate several use cases for recursion.

#### What is Recursion?

Recursion, at it's most basic level, is when a function calls itself.  It's an interesting way of implementing a looping construct via one or more function calls.  So if you have reached the point where your investigating this thing called **"Recursion"**, AND your already familiar with JavaScript, then it's assumed you already know how to implement **Loops** and **Functions**. 

#### Why would you use Recursion? 

The 2 reasons to use recursion are:

1. It's a much clearer and elegant approach to emulating a looping construct.
2. There are use cases where recursion is **required**.  

The following quote by __Leigh Caldwell__ on Stack Overflow eloquently describes recursion:

>"Loops may achieve a performance gain for your program. Recursion may achieve a performance gain for your programmer.  Choose which is more important in your situation"
>

Opting to use recursion could be made solely from a design perspective but the `need` to use recursion will be based on how you answer following question: 

> Do you know the exact number of times the loop needs to run?


### Writing a recursive function

The answer to the previous question can take two forms:

- A set number of times such as the length of an array or string.
- An unknown number of times such as in an array that contains arrays which also contain arrays and so on. The true number of times can only be determined after you reach the last array. 

So every loop implements one form of the above conditional logic and then executes a code block if that condition is true.  Writing a recursive function operates the same way in that it also evaluates a **base** condition, which if true, then calls itself. 

In a recursive function these conditions are referenced to as `cases` and are defined as follows: 

- **Base case:** if true the function returns a value and stops calling itself
- **Recursive case:** do something and call the function again

#### Starter CodeSandbox

Fork this [CodePen](https://codepen.io/jkeohan/pen/vYpGQrv?editors=0010)

Let's break down a classic algo problem **Reverse A String** and define what are it's base and recursive cases.

```
let string = "hello";
let newString = "";
for(let i = string.length-1; i > -1; i -= 1) {
  newString += string[i]
}
```

The **cases** are as follows:

- **Base:** when i === -1 the loop stops
- **Recursive:** do the thing which in this case is: newString += string[i]

How about we change it up a bit and use a `while` loop:

```
let string = "hello";
let newString = "";
let i = string.length-1
let loop = true;
while(loop) {
  if(i === 0) { rerun = false }
  newString += string[i];
  i -= 1;
}
```

The cases are as follows:
- **Base:** stop if loop is not true
- **Recursive:** do the thing which in this case is: newString += string[i]

Packaging either of these solutions for reusability leads us to nest them inside **functions**, which is one of the key elements in recursion:

```
function reverse(string) {
  let newString = "";
  for(let i = string.length-1; i > -1; i -= 1) {
    newString += string[i];
  }
  return newString;
}
```

Now let's refactor this into a **recursive function**.  Doing so requires that we define both the **Base** and **Recursive** cases:

```
function reverse(string) {
  let char= string[0];
  // base case...stop looking when...the string is empty
  if (string.length === 1) {
    return char;
  }
  // recursive case...call the function and pass in the string stripped of it's first char
  else {
    return reverse(string.substr(1)) + char;
  }
}

console.log("reverse", reverse("hello"));
```

The cases are as follows:
- **Base:** when string === "" return the value
- **Recursive:** return reverse(string.substr(1)) + reversedWord 

The last refactor is to make this code look a bit more elegant using a ternary operator:

```
function reverse(string) {
	return string === "" ? "" : reverse(string.substr(1)) + s[0]
}
```

One thing to note about both examples is the order of the returned items. This will be visible when we view the `call stack` in the next section but  

### The Call Stack

One way to convey the inner workings of recursion is to view the `call stack` which is used by the computer to store the sequence of procedures or functions in the order in which they were called.  

Adding a `debugger` in your code will provide you the opportunity to see the functions as they are pushed into the call stack as well as the current returned value. 

Show the call stack for reverse a string using a for loop and compare that to a recursive function. 

<img src="https://i.imgur.com/Zj8j125.png" />

### When is Recursion Necessary? 

Recursion is needed when the exact number of times the function needs to run is unknown.  Our expectation is that it needs to run a finite number of times until the `base` case is evaluted to true.  

A good working example of this is the algorithmic problem of **Flatten an Array**

#### LAB: 30min

1. Create a new **repl** for each of the following problems and convert them into recursive functions.  
2. Define the **Base** and **Recursive** case statements.
5. Add the code needed to fulfill these requirements. 


**sumOfArrayIntegers**

```
function sum(arr){
  let s = 0;
  arr.forEach(d => {
    s += d
  })
  return s
}

sumOfArrayIntegers([1,2,3]) => 6
```

<!-- [sumOfArraySolution](<https://replit.com/@jkeohan/Algo-Sum-Of-Array-Solution#index.js>) -->

**isPalindrome**

```
function isPalindrome(s) {
  var s = s.toString().toLowerCase();
  let arr = s.split(' ').join('').split(''); 
  for (let i = 0; i < arr.length / 2; i += 1) {
    if (arr[i] !== arr[arr.length - (i + 1)]) {
      return false;
    }
  }
  return true;
}

isPalindrome('hello') => 'olleh'
```
