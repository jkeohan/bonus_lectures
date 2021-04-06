# Multiple Pointers Problem Solving Pattern 

<img src="https://i.imgur.com/98YnScd.png" />

## Learning Objectives
By the end of this lesson, you will be able to:
- Know when to use the multiple pointers approach
- Explain how the multiple pointers approach can be used to solve an algo
- Use multiple pointers to solve **sumZero** and **insertionSort**


## Prerequisites
* Working knowledge of ascending/descending for loops 
* Working knowledge of while loops
* Working knowledge of using multiple conditions in a loop

## Multiple Pointers

The multiple pointers approach uses separate pointers that correspond to index positions and move towards the beginning, end or middle based on specific condition


### Looping Approaches

We can make use of the following looping techniques to solve a problem using the multiple pointer approach. 

- double nested for loops
- single while loop with multiple pointers defined

We will first take a look at a double nested for loop. 

### Nested For Loops

Let's say we needed to loop over an array and keep the nested loop(**j**) one position ahead of first loop(**i**) the entire time.  

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

This type of approach is called **brute force** as you are forcing every combination until the solution is found. Taking this nested looping approach will mean our solution has a time efficiency of **O(n^2)**. 

This same requirement can also be accomplished using a single **while loop** and thereby increase the efficiency to **O(n)**.

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

Let's apply the **brute force** method and a slight variation of the **while** loop to solve one of the more basic algos you will encounter that require finding two numbers that add to a target number.  

### Solving sumZero

The algo accepts a sorted array of integers and returns either an array of the first pair that sum to 0 or an empty array.  Keep in mind that this specific solution does require that the array first be sorted. 

```js
sumZero([-3, -2, -1, 0, 1, 2, -3]) // [-3, 3]
sumZero([-2, -1, 0, 1, 2]) // [-2, 2]
sumZero([-2, -1, 0, 4, 5]) // []
```

#### Double Nested Loop Solution

The brute force way of solving this would be to add the value in the first loop(**i**) with each subsequent value of nested loop(**j**) until we find a pair that sums to 0.  

Here is a good first step in trying to visualize each step performed by the algo.

```
INDEX:   1   2   3   4   5
VALUE:  -2, -1,  0, 1,  2
         i
             j
       
       i    j
sum = -2 + -1 = -3
sum = -2 +  0 = -2
sum = -2 +  1 = -1
sum = -2 +  2 =  0
```

Of course we should define those steps above as pseudocode before we write any actual code. 

```
LOOP over the array length SETTING i = 0
 LOOP over the array length SETTING j = i + 1
  IF arr[i] + arr[j] === 0
   RETURN an array of those two values ([arr[left], arr[right]])
  END IF
 END LOOP
END LOOP
RETURN empty array
```

With our pseudocode in place let's write the code. 

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

#### Single Loop Solution

The above solution does indeed solve the algo using multiple pointers however it has a time efficiency of O(n^2).  If we take a simple loop approach we can increase the time efficiency to O(n).

One slight difference in this approach will be to position the pointers at opposite ends of the array with each one working their way towards the middle.  

If ever **left** exceeds **right** then we know there is no possible solution and we will use that logic to terminate the loop.  

```js
INDEX:   0   1   2   3   4  5
ELEM    -2, -1,  0,  1,  2  3
         l
                            r

sum = -2 + 3 = 1
sum = -2 + 2 = 0
```

Of course we should define those steps above as pseudocode before we write any actual code. 

```
SET a variable called left to 0
SET a variable called right to the length of the array - 1
WHILE left < right
    SET sum to adding the arr[left] + arr[right]
    IF sum = 0
        RETURN an array of those two values ([arr[left], arr[right]])
    ELSE IF sum > 0
        DECREASE right by 1
    ELSE 
        INCREASE left by 1
    END IF
END WHILE
RETURN empty array
```

Here is a solution that uses a single while loop and has a time complexity of O(n).

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

**InsertionSort** is one of the 3 basic sorting algos.  The other two are **bubble** and **selection** sort.  All three of these sorting algos make use of multiple pointers and does so in a very unique.   **j** starts one position behind **i** and when **j** finds a value that is less than the value at **i** it decrements until it finds the proper position to place the element in the correct order. 

Here are the starting positions for both **i** and **j** and some additional pseudocode to help work through the problem. 

```js
INDEX   -1  0  1  2
ELEM        3  2  1
               i      
            j
```


```
LOOP over the array in ascending order SETTING i = 1
 SET a var called cur to the element at position i
 LOOP over the array in descending order SETTING j = i - 1
  IF j > -1 AND arr[j] > cur
    SET arr[j + 1] = arr[j]
  END IF
 END LOOP
    SET arr[j+1] = cur
END LOOP
RETURN arr
```

#### Brute Force Solution

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

#### Single Loop Solution

Let's refactor and implement a single loop which will reduce the time complexity as before. 


```js
function insertionSort(arr){
  let i = 1
  let j = i - 1
  let cur = arr[1];
  while(i < arr.length){
    if(j > -1 && arr[j] > cur) {
         arr[j+1] = arr[j]
        j--
    } else {
      console.log('j, cur', j, cur)
      arr[j+1] = cur
      i++
      j = i - 1
      cur = arr[i]
    }
 } 
 return arr
}
```

### Resources
