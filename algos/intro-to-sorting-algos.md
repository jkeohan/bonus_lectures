[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

## Learning Objectives
By the end of this lesson, you will be able to:
- Have a working knowledge of using the the **Array.sort()** method
- Implement **bubble, insertion and merge** sorting algorithms.


## Prerequisites
* Big O Notation
* Working knowledge of ascending/descending for loops 
* Working knowledge of while loops 

## What is Sorting?

Sorting is the process or rearranging the items in a collection (e.g. an array) so that the items are in some kind of order. 

Here are a few examples:

- sorting numbers from smallest to largest
- sorting names alphabetically
- sorting movies based on release year

## JavaScript Array.sort()

JavaScript arrays come with predefined method called `.sort()`.  

Let's take the following array and sort it using `Array.sort()`. 

```js
console.log(['Zoe', 'Jane', 'Kel', 'Alex'])
=> [ 'Alex', 'Jane', 'Kel', 'Zoe' ]
```

Now that works, but just not how you would expect it to work.

Let's add a few duplicate names but this time but in all lowercase characters. 

```js
console.log(['Zoe', 'Jane', 'Kel', 'Alex', 'alex])
=> [ 'Alex', 'Jane', 'Kel', 'Zoe', 'alex', 'jane' ]
```


Hmmm...not what you expected correct. 

Let's try one more example using numbers to see if performs any differently. 

```js
console.log([12, 10,3,2,1].sort())
=> [ 1, 10, 12, 2, 3 ]
```

Looks like `.sort()` doesn't quite meet our expectations. 

My guess is that were missing some vital piece of info on how to use `.sort()` so its off to the 
[MDN - Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) docs to figure out what were missing.  

The docs state that the method can take in a optional `compareFunction` but if omitted...

<img src="https://i.imgur.com/9Vc0xNc.png" />

Ok. Now I'm sure most of us don't either know what Unicode is or how to start even using it in order to sort. 

### Actually Sorting

So `sort()` accepts an optional `comarator` function and we can use it to tell JS how we want to sort. The function takes in 2 values (a and b) and compares those elements.  Based on that comparison it returns either 1, -1 or 0. 

This breaks it down a little further.

- if it returns a negative number, a should come before b
- if it returns a positive number, b should come before a
- If we return 0 it sorts them the same

Let's take a look at how to use the `comarator` function and create a function that sorts numbers in ascending order.

```js
function sortNumsAsc(a, b) {
  if( a > b) { return 1}
  else if(a < b) { return -1}
  else { return 0}
}

console.log([12,3,10,2,1].sort(sortNumbersAsc))
```

Now let's try and write the code a bit more efficiently. 

```js
function sortNumsAsc(num1, num2) {
  return num1 - num2
}

console.log([12,3,10,2,1].sort(sortNumbersAsc))
```

Although `.sort()` will meet your sorting needs one common practice in learnig algos is to reproduce the code that already is being used within the given JS method. 

As for sorting there are over a dozen ways to sort an array and each one provides context into how to use JS in unique ways to do the same thing and in the process learn to become more efficient and code for optimization. 

## Bubble Sort

We will kick off sorting algos with `Bubble Sort`.  

This algo starts at the beginning of the array, much like `.sort()` and compares the first 2 values which it then sorts.  It then proceeds to compare values 2 and 3 and sorts them as well.  It continues this process until it has looped over the entire array once for each element in the array.   We can use some logic to limit the number of iterations and even stop them if the array has been sorted. 

<img src="https://i.imgur.com/92umHRm.png" width=300/>

Let's take look at a visual representation of this on [visualgo](https://visualgo.net/en/sorting)

##### Pseudocode...Pseudocode...Pseudocode...

Whats that you say? We should start by righting some pseudocode? I couldn't agree more. 

Let's give it a try.

```js
// LOOP over the array in ascending order setting i = 0
//  LOOP over the array ascending order setting j = 0
//   IF arr[j] > arr[i]
//    SWAP the elements
//   END IF
//  END LOOP
// END LOOP
```

With the pseudocode in place we have enough to get starting writing the actual code. 

```js
function bubbleSort(arr) {
  for(let i = 0; i < arr.length; i += 1) {
    for(let j = 0; j < arr.length; j += 1) {
      console.log(arr, arr[j], arr[j+1])
      if(arr[j] > arr[j+1]) {
        let temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
      }
    }
  }
  return arr
}

bubbleSort([3,2,1])

// [ 3, 2, 1 ] 3 2
// [ 2, 3, 1 ] 3 1
// [ 2, 1, 3 ] 3 undefined
// [ 2, 1, 3 ] 2 1
// [ 1, 2, 3 ] 2 3
// [ 1, 2, 3 ] 3 undefined
// [ 1, 2, 3 ] 1 2
// [ 1, 2, 3 ] 2 3
// [ 1, 2, 3 ] 3 undefined
// [ 1, 2, 3 ]


```

<hr>

### :alarm_clock: Activity

Based on the console output does anything stand out perhaps has you thinking about improving the code performance or efficiency? 

When asked slack your answer(s) in the thread. 

<hr>

#### Things That Stand Out

So it seems like the following things stand stand out. 

- it tries to sort an element that isn't there (undefined)
- it continues to sort all values even though the ones at the end are in the right position
- it continues to sort even though by the end of the second loop the array is already sorted. 

<hr>

### :alarm_clock: Activity

Take a moment and try to address the first bullet point. Think how you might resolve the issue with comparing a value that doesn't exist (undefined)

When asked slack your answer in the thread. 

<hr>

## Bubble Sort Refactor 

Based on the inefficiencies let's see if we can make a few changes that will improve the performance. 

#### Removing Undefined
We can resolve the issue of having to compare an element past the length of the array by removing one value from `arr.length` of the in the nested loop. 

```js
function bubbleSort(arr) {
  for(let i = 0; i < arr.length; i += 1) {
    for(let j = 0; j < arr.length-1; j += 1) {
   ...rest of code
    }
  }
  return arr
}

bubbleSort([3,2,1])

// [ 3, 2, 1 ] 3 2
// [ 2, 3, 1 ] 3 1
// [ 2, 1, 3 ] 2 1
// [ 1, 2, 3 ] 2 3
// [ 1, 2, 3 ] 1 2
// [ 1, 2, 3 ] 2 3
// [ 1, 2, 3 ]
```

#### Stop Sorting Elements At End Of Array

This solution will also require making one small edit to the second loop but it might not be as obvious.  

Keep in mind that we already already removed one value from the length (length-1) that keeps it confined to only the elements in the array.  

But what if we could also dynamically decrease the arrays length with each iteration. That would limit the number of elements it needs to compare. 

<hr>

### :alarm_clock: Activity

Take a moment to think how you might dynamically decrease the arrays length with each iteration, but without removing elements.  

When asked slack your answer in the thread. 

<hr>


And here is our pseudocode:

```js
// LOOP over the array in descending order (i)
//  LOOP over the array while j < i - 1
//   IF arr[j] is > arr[i]
//    SWAP the elements
//   END IF
//  END LOOP
// END LOOP

```

With the new pseudocode in place we can now write our code. 

```js
function bubbleSort(arr) {
  for(let i = arr.length; i > 0; i -= 1) {
    for(let j = 0; j < i - 1; j += 1) {
      console.log(arr, arr[j], arr[j+1])
      if(arr[j] > arr[j+1]) {
        // SWAP
        let temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
      }
    }
  }
}
```

This solution is a bit more involved and requires that we think outside the box. By that I mean our attention has been focused on looping in ascending order but what if the initial loop was done in descending order. We 

- set the first loop to iterate in descending order
- prevent the second loop from comparing those ending elements

### One Last Bubble Sort Refactor

Although our previous refactor increased the efficiency of our code we can do one better. It would make sense that if the array was already sorted that we should add some logic to terminate the loops since any additional comparisons would not be required.  To do this we need keep track if any elements have been swapped during the loop.  If not then the array is already sorted and we should end the loops and return the sorted array. 

Let's add a few new lines to our pseudocode in order to keep track of any swaps that might have occurred. 

```js
//  CREATE a variable called swapHappened 
// LOOP over the array in descending order (i)
//  SET swapHappened  to true
//  LOOP over the array while j < i - 1
//   IF arr[j] is > arr[i]
//    SWAP the elements
//    SET swapHappened  to false
//   END IF
//  END LOOP
//  IF swapHappened  is false
//   BREAK
//  END IF
// END LOOP

```

Here is the code:

```js
function bubbleSort(arr) {
  let noSwap;
  for(let i = arr.length; i > 0; i -= 1) {
    noSwap = true
    for(let j = 0; j < i - 1; j += 1) {
      console.log(arr, arr[j], arr[j+1])
      if(arr[j] > arr[j+1]) {
        // SWAP
        let temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
        noSwap = false
      }
    }
    if(noSwaps) break;
  }
  return arr
}
```

### Bubble Sort - Final Refactor

One last refactor we can perform is to swap out the initial for loop with a while loop. 

```js
function bubbleSort(array) {
  let swapHappened; 
  do {
    swapHappened = false;
    let end = array.length-1
    for (var i = 0; i < end; i += 1) {
      if (array[i] > array[i + 1]) {
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swapHappened = true;
      }
    }
    end -= 1
  } while (swapHappened)
  return array;
}

```





## Additional Resources
- Visualize bubble sort and insertion sort using [this fun tool](https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html).
- More visuals here: [bubble sort](https://www.youtube.com/watch?v=Cq7SMsQBEUw), [insertion sort](https://www.youtube.com/watch?v=8oJS1BMKE64).
- Some [sample interview questions](https://hoven-in.appspot.com/Home/Data-Structures/Data-Structure-Interview-Questions/interview-questions-on-bubble-sort-01.html) about bubble sort. (Note: The code in this article is not JavaScript.)
- Recap of how [insertion sort works](https://hackernoon.com/programming-with-js-insertion-sort-1316df8354f5).
- Last but certainly not least: Folk dancing for [bubble sort](https://www.youtube.com/watch?v=lyZQPjUT5B4) and [insertion sort](https://www.youtube.com/watch?v=ROalU379l3U).
