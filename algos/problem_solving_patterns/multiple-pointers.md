# Multiple Pointers Problem Solving Pattern 

<img src="https://i.imgur.com/FOjZeRR.png" />

## Learning Objectives
By the end of this lesson, you will be able to:
- Know when to use the multiple pointers approach
- Explain how the multiple pointers approach can be used to solve an algo
- Use multiple pointers to solve **sumZero** and **insertion sort**


## Prerequisites
* Working knowledge of ascending/descending for loops 
* Working knowledge of using multiple conditions in a for loop

## Multiple Pointers

This approach uses multiple pointers that correspond to an index position and move towards the beginning, end or middle based on specific condition.s 

This approach can incorporate double nested loops however a much better solution is to limit it to a single loop. 

### Looping Approaches

As mention previously using the multiple pointer approach can be done using:

- nested for loops
- single loop with multiple pointers defined

We will first take a look at a double nested for loop. 

### Nested For Loops

Let's say we needed to loop over an array and keep j one position ahead of i the entire time.  Doing so using the following would mean O(n^2)

```js
let arr = [1,2,3]
for(let i = 0; i < arr.length; i += 1){
    for(let j = i + 1; j < arr.length-1; j += 1) {
        console.log(arr[i], arr[j])
    }
}


=> 1 2
=> 1 3
=> 2 3

```

This same requirement can also be accomplished using a single while loop and thereby increase the time efficiency to O(n)

```js
let arr = [1,2,3]
let i = 0
let j = i + 1

while(i < arr.length){
  if(j < arr.length) {
      console.log(arr[i], arr[j])
      j++
  } else {
    i++
    j = i + 1
  }
}


=> 1 2
=> 1 3
=> 2 3

```

Let's apply both of these approaches to solve the **sumeZero** algo. 

### Solving sumZero

This algo takes in a sorted array of integers and returns either an array of the first pair that sum to 0 or an empty array. 

```js
sumZero([-3, -2, -1, 0, 1, 2, -3]) // [-3, 3]
sumZero([-2, -1, 0, 1, 2]) // [-2, 2]
sumZero([-2, -1, 0, 4, 5]) // []
```

#### O(n^2) Time Complexity Approach

The most obvious approach to solving this would be to add the value a position i with each subsequent value until we find a pair that sums to 0.  Here is a good way to visualize how the algo works through the steps. 

```js
INDEX:   1   2   3   4   5
ELEM    -2, -1,  0, 1,  2
         i
             j

sum = -2 + -1 = -3
sum = -2 + 0 = -2
sum = -2 + 1 = -1
sum = -2 + 2 = 0
```

The doubles nested solution will look like this and have a time complexity of O(n^2). 

```js
function sumZero(arr){
  for(let i = 0; i < arr.length; i += 1){
    for(let j = i + 1; j < arr.length; j += 1){
      if(arr[i] + arr[j] === 0){
        return [arr[i], arr[j]]
      }
    }
  }
  return []
}
```

#### O(n) Time Complexity Approach

A much better approach to solving this algo is to limit it to a single loop yet still incorporate multiple pointers.  

Here we will position the pointers at opposite ends with each one working their way to the middle.  If at any point left exceeds right then we know there is no possible solution and that becomes the condition on which the loop terminates. 

```js
INDEX:   0   1   2   3   4  5
ELEM    -2, -1,  0,  1,  2  3
         l
                            r

sum = -2 + 3 = 1
sum = -2 + 2 = 0
```

Here is a solution that uses a single while loop. 

```js
function sumZero(arr){
  let left = 0
  let right = arr.length-1
  while(left < right){
    let sum = arr[left] + arr[right]
    if(sum === 0){
      return [arr[left], arr[right]]
    } else if(sum > 0){
       right -= 1
    } else {
      left += 1
    }
  }
  return []
}

```

### Solving insertionSort


```
INDEX    0  1  2
ELEM     3  2  1
            i      
          j
```

Here is the solution using a double nested for loop. 

```js
function insertionSort(arr){
  for(let i = 1; i < arr.length; i += 1){
    let cur = arr[i]
    for(var j = i - 1; arr[j] > cur && j > -1; j -= 1){
      arr[j+1] = arr[j]
    }
    arr[j+1] = cur
  }
  return arr
}
```

And once again we refactor to leverage a single loop with multiple pointers. 


```js
function insertionSort(arr){
  let i = 1
  let j = i - 1
  let temp = arr[1];
  while(i < arr.length){
    if(j > -1 && arr[j] > temp) {
         arr[j+1] = arr[j]
        j--
    } else {
      console.log('j, temp', j, temp)
      arr[j+1] = temp
      i++
      j = i - 1
      temp = arr[i]
    }
 } 
 return arr
}

```

### Resources
