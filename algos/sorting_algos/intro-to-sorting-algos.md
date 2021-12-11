[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Intro To Sorting Algos

<img src="https://i.imgur.com/wlCY5GQ.png" />

## Learning Objectives
By the end of this lesson, you will be able to:
- Have a working knowledge of using the the **Array.sort()** method
- Be able to write pseudocode based on sorting requirements
- Implement **bubble, selection** and **insertion** sorting algorithms.


## Prerequisites
* Working knowledge of ascending/descending for loops 
* Working knowledge of using multiple conditions in a for loop

## What is Sorting?

Sorting is the process or rearranging the items in a collection (e.g. an array) so that the items are in some kind of order. 

Here are a few examples:

- sorting numbers from smallest to largest
- sorting names alphabetically
- sorting movies based on release year

**Starter Repl**

<!-- untouched starter code -->
<!-- Fork this [Starter Repl](https://repl.it/@jkeohan/Algo-into-to-sorting-lecture#index.js) -->

Fork this [Starter Repl](https://replit.com/@jkeohan/Algo-into-to-sorting-lecture-12-11-21#index.js)

<!-- This contains the most recent walkthrough
https://replit.com/@jkeohan/Algo-into-to-sorting-lecture-3#index.js
 -->



<!-- Solutions 
 https://replit.com/@jkeohan/intro-to-sorting#index.js
 https://replit.com/@jkeohan/Algo-into-to-sorting-lecture-seir-1207#index.js
 https://replit.com/@jkeohan/intro-to-sorting-starter
-->


## JavaScript Array.sort()

Let's start our discussion of sorting with JavaScript's predefined Array method called `.sort()`.  

We will use to to following array and then sort it using `Array.sort()`. 

```js
console.log(['Zoe', 'Jane', 'Kel', 'Alex'].sort())
=> [ 'Alex', 'Jane', 'Kel', 'Zoe' ]
```

Now that works, but just not how you would expect it to work.

Let's add a few duplicate names but this time but in all lowercase characters. 

```js
console.log(['Zoe', 'Jane', 'Kel', 'Alex', 'alex].sort())
=> [ 'Alex', 'Jane', 'Kel', 'Zoe', 'alex', 'jane' ]
```


:thought_balloon: Is that what you expected?

Let's try one more example using numbers to see if performs any differently. 

```js
console.log([12, 10,3,2,1].sort())
=> [ 1, 10, 12, 2, 3 ]
```

Looks like `.sort()` doesn't quite meet our expectations. 

My guess is that were missing some vital piece of info on how to use `.sort()` so its off to the 
[MDN - Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) docs to figure out what were missing.  

The docs state that the method can take in a optional `compareFunction`.

<img src="https://i.imgur.com/9Vc0xNc.png" width=700/>

Ok. Now I'm sure most of us don't either know what Unicode is or how to start even using it in order to sort. 

### Actually Sorting

So `sort()` accepts an optional `comarator` function and we can use it to tell JS how we want to sort. The function takes in 2 values (a and b) and compares those elements.  Based on that comparison it returns either 1, -1 or 0. 

Let's breaks it down a little further.

- if it returns a negative number, a should come before b
- if it returns a positive number, b should come before a
- If we return 0 it leaves them in the same order

Let's take a look at how to use the `comarator` function and create a function that sorts numbers in ascending order.

```js
function sortAsc(a, b) {
  if( a > b) { return 1}
  else if(a < b) { return -1}
  else { return 0}
}

console.log([12,3,10,2,1].sort(sortAsc))
```

Now let's try and write the code a bit more efficiently. 

```js
function sortAsc(num1, num2) {
  return num1 - num2
}
```

Although `.sort()` will meet your sorting needs one common practice in learnig algos is to reproduce the code that already is being used within the given JS method. 

As for sorting there are over a dozen ways to sort an array and each one provides context into how to use JS in unique ways to do the same thing and in the process learn to become more efficient and code for optimization. 

**Sorting Names**

We can use the same sorting function to sort the array of names as well. 


```js
console.log(['Zoe', 'Jane', 'Kel', 'Alex', 'alex].sort(sortAsc))
=> [ 'Alex', 'Jane', 'Kel', 'Zoe', 'alex', 'jane' ]
```

Hmmm...that didn't work as expected. 

:question: How would you go about resolving this? 


## Bubble Sort

We will kick off sorting algos with `Bubble Sort`.  

This algo starts at the beginning of the array and compares and sorts the first 2 values.  It then proceeds to compare values 2 and 3 and sorts them as well.  It continues this process until it has compared all adjacent pairs and looped over the entire array for each element in the array.  

We can however add some additional logic that would improve the performance including ending the loops once the array has been sorted. 

<img src="https://i.imgur.com/92umHRm.png" width=300/>

Let's take look at a visual representation of this on [visualgo](https://visualgo.net/en/sorting)

##### Pseudocode...Pseudocode...Pseudocode...

Whats that you say? We should start by righting some pseudocode? I couldn't agree more. 

Let's give it a try.

```js
// LOOP over the length of the array in ascending order setting i = 0
//  LOOP over the length of the array in ascending order setting j = 0
//   IF arr[j] > arr[j+1]
//    SWAP the elements
//   END IF
//  END LOOP
// END LOOP
// RETURN THE ARRAY
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

```


Let's take a look at the console logs and see if anything stands out.

```js

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

Review the console output and look for any possible inefficiencies in its design.  

Then ask yourself how you might update the code to improve it's performance. 

When asked slack your answer(s) in the thread. 

<hr>

#### Things That Stand Out

So it seems like the following things stand stand out. 

- it tries to sort an element that isn't there (undefined)
- it continues to sort all values even though the ones at the end are in the right position
- it continues to sort even though by the end of the second loop the array is already sorted

<hr>

### :alarm_clock: Activity

Take a moment and try to address the first bullet point. Think how you might resolve the issue with comparing a value that doesn't exist (undefined)

When asked slack your answer in the thread. 

<hr>

## Bubble Sort Refactor 

Based on our brainstorming let's sse if we can improve the code. 

#### Removing Undefined
We can resolve the issue of having to compare an element past the length of the array by removing one value from `arr.length` from the the nested `j` loop. 

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
```

Let's take a look at the console logs so we can see the code in action.


```js
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

Keep in mind that we already already removed one value from the length (length-1) which keeps it confined to only the elements in the array.  

But what if we could also continue to decrease that value. That would continue to limit the number of elements the `j` loop would need to iterate over. 

<hr>

### :alarm_clock: Activity

Take a moment to think how you might dynamically decrease the arrays length with each iteration, but without actually removing elements from the array 

When asked slack your answer in the thread. 

<hr>

We can implement this logic of decreasing that value by also subtracting `i` as well within the `j` loop condition.  This would continue to decrease the that value by 1 every time a new `i` loop initiates.


Let' take a moment and update ou pseudocode to reflect the changes we decided.  

```js
// LOOP over the length of the array in ascending order setting i = 0
//  LOOP over the array.length-1-i in ascending order setting j = 0
//   IF arr[j] is > arr[i]
//    SWAP the elements
//   END IF
//  END LOOP
// END LOOP
// RETURN THE ARRAY
```


With the new pseudocode in place we can now write our code. 

```js
function bubbleSort(arr) {
  for(let i = 0; i < arr.length; i += 1) {
    for(let j = 0; j < arr.length-1-i; j += 1) {
      // ...rest of code
    }
  }
  return arr
}

bubbleSort([3,2,1])
```



### Stop Sorting A Sorted Array

Our previous refactor increased the efficiency of our code and we have one final improvement to make. It makes sense that if the array is already sorted that we should add some logic to terminate the loops, since any additional comparisons would redundant.  

To do this we need to keep track and determine if any elements have been swapped during the loop.  If not, then the array is already sorted and, we should end the loops and return the sorted array. 

Let's add a few new lines to our pseudocode in order to keep track of any swaps that might have occurred. 

```js
// CREATE a variable called swapHappened 
// LOOP over the length of the array in ascending order setting i = 0
//  LOOP over the array.length-1-i in ascending order setting j = 0
//  SET swapHappened  to false
//  LOOP over the array while j < i - 1
//   IF arr[j] is > arr[i]
//    SWAP the elements
//    SET swapHappened to true
//   END IF
//  END LOOP
//  IF swapHappened is not true 
//   BREAK the loop
//  END IF
// END LOOP
// RETURN THE ARRAY
```

Here is the code:

```js
function bubbleSort(arr) {
  let swapHappened ;
  for(let i = 0; i < arr.length; i += 1) {
    swapHappened  = false
    for(let j = 0; j < arr.length-1-i; j += 1) {
      console.log(arr, arr[j], arr[j+1])
      if(arr[j] > arr[j+1]) {
        // SWAP
        let temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
        swapHappened  = true
      }
    }
    if(!swapHappened) break;
  }
  return arr
}

bubbleSort([3,2,1])
```
<br>

Here is the working [Bubble Sort Solution](https://repl.it/@jkeohan/Algo-Bubble-Sort#index.js)


## Selection Sort

Selection sort works in a similar fashion to Bubble sort however its a bit more efficient. It keeps track of the lowest value as it is discovered and, only at the end of the loop, does it perform a single swap. 

Here is visual that conveys that logic.

<img src="https://i.imgur.com/W7qQdBV.png" width=300/>


#### Pseudocode...Pseudocode...Pseudocode...

As always let's start by writing some pseudocode to work out our thought process. We can use much of the Bubble sort logic here but with a few key edits. 

Things to keep in mind when working out the pseudocode are:

- we need to keep track of the lowest value as it is found
- we should not compare the same element to itself so 2nd loop should start at the next element
- the swap must only happen a single time after each j loop has completed 

```js
// LOOP over the array in ascending order setting i = 0
//  SET a variable called smallest to i
//  LOOP over the array ascending order setting j = i + 1
//   IF arr[j] < arr[lowest]
//    SET lowest to j
//   END IF
//  END LOOP
//  SWAP the elements
// END LOOP
// RETURN THE ARRAY
```

With our pseudocode in place let's write our code.

```js

function selectionSort(arr) {
  for(let i = 0; i < arr.length; i += 1) {
    let lowest = i
    for(let j = i + 1; j < arr.length; j += 1) {
      if(arr[j] < arr[lowest]) {
          lowest = j
      }
    }
    let temp = arr[i]
    arr[i] = arr[lowest]
    arr[lowest] = temp
 }
 return arr
}  

selectionSort([3,2,1])
```

Let's add some additional console logs so we can see the changes take place in sequence. 



```js
//...rest of code
console.log(arr, arr[lowest])
console.log('SWAPPING HAPPENED:')
let temp = arr[i]
arr[i] = arr[lowest]
arr[lowest] = temp
console.log(arr)
console.log('##########################') 
//...rest of code
```

Let's take a look at the console logs so we can see the code in action. 

```js
[ 3, 1, 2 ] 1
SWAPPING HAPPENED:
[ 1, 3, 2 ]
##########################
[ 1, 3, 2 ] 2
SWAPPING HAPPENED:
[ 1, 2, 3 ]
##########################
[ 1, 2, 3 ] 3
SWAPPING HAPPENED:
[ 1, 2, 3 ]
##########################
[ 1, 2, 3 ]
```

<hr>

### :alarm_clock: Activity

Based on the console output does anything stand out that perhaps has you thinking about improving the code performance or efficiency? 

When asked slack your answer(s) in the thread. 

<hr>


#### Increase Selection Sort Efficiency 

So it appears that a swap happens even if it's not required.  Let's first update our pseudocode with the changes. 


```js
// LOOP over the array in ascending order setting i = 0
//  SET a variable called smallest to i
//  LOOP over the array ascending order setting j = i + 1
//   IF arr[j] < arr[lowest]
//    SET lowest to j
//   END IF
//  END LOOP
//  IF(i is not equal to lowest) 
//   SWAP the elements
//  END IF
// END LOOP
// RETURN THE ARRAY
```

And then update the code to stay in line with our pseudocode.

```js

function selectionSort(arr) {
  for(let i = 0; i < arr.length; i += 1) {
    let lowest = i
    for(let j = i + 1; j < arr.length; j += 1) {
      if(arr[j] < arr[lowest]) {
          lowest = j
      }
    }
    if(i !== lowest) {
        let temp = arr[i]
        arr[i] = arr[lowest]
        arr[lowest] = temp
    }
 }
 return arr
}  

selectionSort([3,2,1])
```

Here is the working [Selection Sort Solution](https://repl.it/@jkeohan/Algo-Selection-Sort-Solution#index.js)


## BONUS: Insertion Sort

Insertion sort is the last of the basic sorting algos we will be covering in this lecture and might be the most challenging to wrap our heads around. 

The way it works is that it splits the array into two sections — one sorted and the other unsorted. We don’t know if any of the items are in place yet, so we will start our sorted list with the first item and consider it an an array of a single sorted item.

Then we start going through the other items in the array. For each one we must find it’s proper place in the sorted array. We do that by finding the first smaller item or until we reach the beginning of the sorted list.

This algo is unique in that the first loop () starts one position ahead first second loop (j).  It's thee job of the second loop to sort each element and does so by looping in descending order, or backwards, in order to insert (more like swap) elements into their correct placement in the sorted portion of the array. 

```js
3, 2, 1  // the only sorted part is the first item
3, 3, 1  // 3 > 2 we move 3 forward
2, 3, 1  // and then swap the first element with 2
2, 3, 1  // 3 > 1 and we now compare it to each element until we reach the head 
2, 3, 3  // compare all to 1, until we reach the head
2, 2, 3  // compare all to 1, until we reach the head
1, 2, 3  // once the head is reached we swap the element
```

During this process it temporary creates duplicates in the array until it breaks out of the secondary loop (j) and  at that point it swaps the elements.

Here is a snippet from the console logs which we can use to understand what is happening within the loops which will help us write the needed pswudocode. 

```js
[ 3, 2, 1 ] arr[i] is: 2
INSIDE j LOOP - arr[j] is 3
SWAPPING HAPPENED IN j LOOP: 3 > 2 true
[ 3, 3, 1 ]
J LOOP COMPPLETED. j is: -1
[ 3, 3, 1 ] 2
SWAPPING HAPPENED IN i:
[ 2, 3, 1 ]
```

Let's also take a look at [Visualgo](https://visualgo.net/en/sorting) and see if we can see that pattern in action. 

Here is the visual that conveys the logic

<img src="https://i.imgur.com/FOkttXw.png" width=300/>


#### Pseudocode...Pseudocode...Pseudocode...

Before we write the pseudocode let me share some of the requirements:

- the i loop will always be one ahead of j by 1
- the j loop will iterate in descending order
- the j loop will need to match 2 conditions to continue looping
- the first condition is that j is greater than or equal to 0
- the second condition is that the current value of j is > the current value 

**The Swap**

The swap happens two places.  Once in the `j` loop as it keeps moving the higher values forward in the array and then again in the `i` loop where it places in the element it's correct position 

Wow...that seems like it contains much more logic than either of the previous sorting algos. But in reality it's not any more code, only different logic. 

```js
// LOOP over the array in ascending order setting i = 1
//  SET a variable called currentVal to i
//  LOOP over the array descending order setting j = i - 1 
//   CONTINUE TO LOOP IF j is >= 0 && the value at j is > currentVal
//   SWAP adjacent values by setting arr[j + 1] = arr[j]
//  END LOOP
//  SET  arr[j + 1] = currentVal
// END LOOP
// RETURN THE ARRAY
```

With our pseudocode in place let's write our code.  Make not that the second loop makes use of the `var` keyword instead of `let`.  This is due to the fact that we want `j` to be available or scoped outside of it's loop.  `let` were introduced to create block scope at which point `j` wouldn't exist outside its loop. 

```js
function insertionSort(arr){
  for(let i = 1; i < arr.length; i += 1){
    let currentVal = arr[i]
    for(var j = i - 1; j >=0 && arr[j] > currentVal; j -= 1) {
      arr[j + 1] = arr[j]  
    }
    arr[j+1] = currentVal
  }
  return arr
}

insertionSort([3,2,1])
```

Let's add some additional console logs so we can see the changes take place in sequence.


```js
function insertionSort(arr){
  for(let i = 1; i < arr.length; i += 1){
    let currentVal = arr[i]
    console.log(arr, 'arr[i] is:', currentVal)
    for(var j = i - 1; j >=0 && arr[j] > currentVal; j -= 1) {
     console.log('INSIDE j LOOP - arr[j] is', arr[j])
     console.log('SWAPPING HAPPENED IN j LOOP:', arr[j], '>', currentVal, arr[j] > currentVal)
      arr[j + 1] = arr[j]
      console.log(arr)
    }
    console.log('J LOOP COMPPLETED. j is:', j)
    console.log(arr, currentVal)
    console.log('SWAPPING HAPPENED IN i:')
    arr[j+1] = currentVal
    console.log(arr)
    console.log('##########################')
  }
  return arr
}

insertionSort([3,2,1])
```

Let's take a look at the console logs so we can see the code in action.

```js
[ 3, 2, 1 ] arr[i] is: 2
INSIDE j LOOP - arr[j] is 3
SWAPPING HAPPENED IN j LOOP: 3 > 2 true
[ 3, 3, 1 ]
J LOOP COMPPLETED. j is: -1
[ 3, 3, 1 ] 2
SWAPPING HAPPENED IN i:
[ 2, 3, 1 ]
##########################
[ 2, 3, 1 ] arr[i] is: 1
INSIDE j LOOP - arr[j] is 3
SWAPPING HAPPENED IN j LOOP: 3 > 1 true
[ 2, 3, 3 ]
INSIDE j LOOP - arr[j] is 2
SWAPPING HAPPENED IN j LOOP: 2 > 1 true
[ 2, 2, 3 ]
J LOOP COMPPLETED. j is: -1
[ 2, 2, 3 ] 1
SWAPPING HAPPENED IN i:
[ 1, 2, 3 ]
##########################
```

Here is the working [Insertion Sort Solution](https://repl.it/@jkeohan/Algo-Insertion-Sort#index.js)


### :alarm_clock: Activity - Bubble Sort Refactor Challenges

With a full working solution try your hand at the following separate refactors:

**Descending Order**

Refactor both the i and j loops to work in descending order and sort lowest to highest. 

**Do/While Loop**

Replace the initial (i) loop with a do/while loop 




<hr>

<details>
<summary>Solutions</summary>

**Descending Order**

```js
/*
0  1  2  3  4 
4  3  2  1
            i
      j
*/

function bubbleSort(arr) {
  let swapHappened;
  for(let i = arr.length; i >= 0; i -= 1) {
    swapHappened = true
    for(let j = arr.length - 2; j >= arr.length - i ; j -= 1) {
      console.log(arr, arr[j], arr[j+1], `i: ${i} j: ${j}`)
      if(arr[j+1] < arr[j]) {
        let temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
        swapHappened = false
      }
    }
    if(swapHappened) return arr
  }
  return arr
}

bubbleSort([3,2,1])
```

**Do/While Loop**

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

bubbleSort([3,2,1])

```
</details>

## Additional Resources

- [Step-by-step Visualization of Algorithms](https://visualgo.net/bn/sorting)
- [Animated Comparison of Sorting Algorithms](http://www.sorting-algorithms.com/)
- [Big O Cheat Sheet](http://bigocheatsheet.com/)
- Visualize bubble sort and insertion sort using [this fun tool](https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html).
- Recap of how [insertion sort works](https://hackernoon.com/programming-with-js-insertion-sort-1316df8354f5).
- [Inserrtion Sort](https://medium.com/hackernoon/programming-with-js-insertion-sort-1316df8354f5)

- Some [sample interview questions](https://hoven-in.appspot.com/Home/Data-Structures/Data-Structure-Interview-Questions/interview-questions-on-bubble-sort-01.html) about bubble sort. (Note: The code in this article is not JavaScript.)
- Visual on [bubble sort](https://i.imgur.com/2GXltBB.png)
