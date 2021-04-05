# Reverse a String

## Challenge
Given a string, return the reverse of that string. 

Example: 

```javascript
let ia = "kenny"
reverseString(ia)

// output:
// => "ynnek"
```

```javascript
/**
 * @param {string}
 * @return {string}
 */
```

## What interview questions do you have for the interviewer?

```javascript
// how should we handle an empty string
// => return the empty string

// ADDITIONAL QUESTIONS

```

## for loop in descending order + .join

```javascript
// INIT function reverseString that takes in a string as input
    // INIT an arr named revStringArr as an empty array (this is where I would put the word in reverse)
    // LOOP over the input string in descending order
        // ADD each letter to the end of revStringArr
    // END LOOP

    // INIT a string named revStr
    // SET revStr to use the Array .join() method to join the array into a single string
    // RETURN revStr
// END function
```


## for loop in ascending order + .join

```javascript
// INIT function reverseString that takes in a string as input
    // INIT an arr named revStringArr as an empty array (this is where I would put the word in reverse)
    // LOOP over the input string in descending order
        // ADD each letter to the beginning of revStringArr
    // END LOOP

    // INIT a string named revStr
    // SET revStr to use the Array .join() method to join the array into a single string
    // RETURN revStr
// END function
```

## while loop + concatenation

```javascript
// INIT function reverseString that takes in a string as input
    // INIT reversedStr as an empty string
    // SET counter = inputStr.length - 1
    // WHILE counter > 0
       // EDD inputStr[counter] to reversedStr
       // SUBTRACT one from the counter
    // END WHILE
    // RETURN reversedStr
// END function
```

## .split + .reverse + .join
Research the above methods to solve this.

```javascript
// .split()
// .reverse()
// .join()

```
