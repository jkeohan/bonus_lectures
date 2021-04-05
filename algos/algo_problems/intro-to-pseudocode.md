# Pseudocode Examples

### Why Algorithms? 🤔
> you'll be asked to solve them on an interview 😅

It's to train your brain into solving everyday problems. 

### What Is An Algorithm? 🤔

An algorithm is:
- "a procedure for solving a problem in terms of the actions to be executed and the order in which those actions are to be executed." 
- An algorithm is the sequence of steps taken to solve a problem. 
- The steps are normally "sequence," "selection, " "iteration," and a "case-type" statement.

### How do we solve difficult algos? 🤔

Pseudocode is an artificial and informal language that helps programmers develop algorithms. Pseudocode helps developers think through the problem without writing any actual code. 

The **rules** of pseudocode almost always include the following:
- key actions are capitalized
- nested code is always indented
- ending statements are included to indicate the ending of a codeblock

### Examples:

Think about when you cross the street and all the actions that you take to make it to the other side safely.  

```text
WAIT for the light to turn red
IF all cars have stopped
  CROSS the street
ELSE IF some cars are coming to a stop
  WAIT for them to stop before deciding to cross the street
END IF

```

Problem: 
Evaluate all the student's exam grades, if the students recieved anything above 60 they passed otherwise they didnt.

```text
IF a student's grade is greater than or equal to 60
   RETURN PASSED
ELSE 
    RETURN FAILED
END IF
```

Problem: 
Find the class average of the student's exam grade


```text
SET a variable called total to zero
SET a variable called grades to one
SET a variable classAverage to zero

WHILE grades is less than or equal to totalStudents
    ADD the current grade to total 
END WHILE

SET classAverage equal to total / totalStudents

RETURN classAverage
```
<!-- 
```text
INTI a variable called passes to zero
INTI a variable called failures to zero
INTI a variable called student to one

WHILE student counter is less than or equal to ten
    input the next exam result
    if the student passed
        add one to passes
    else
        add one to failures
    endif
    
    add one to student counter
END WHILE

print the number of passes
print the number of failures

if eight or more students passed
    print "raise tuition"
endif
``` -->

## Some keywords that could be used:
For looping and selection refer to the following key words:

- DO WHILE..END WHILE
- Loop...END LOOP
- CASE...END CASE
- IF...END IF
- RETURN


Always indent scopes and end them with proper spacing, and/or end keywords

As verbs, use the words Generate, Compute, Process, etc. Words such as set, reset, increment, compute, calculate, add, sum, multiply, ... print, display, input, output, edit, test. Along with careful indentation tend to foster desirable pseudocode.


## Pseudocode "standard"
Common categories of actions include:
 - Input: GET, READ, OBTAIN
 - Output: PRINT, DISPLAY, SHOW
 - Compute: COMPUTE, CALCULATE, DETERMINE
 - Initialize: SET, INIT
 - Add One: INCREMENT, BUMP, ADD


### Sequence
A series of instructions to complete one action and proceed to the next

Example:
```text
GET temperature value
GET weather type
PRINT “It is <temperature> degrees and <weather type> out right now”
``` 

### If-Then-Else: 

A decision between two sequences based on some condition (NOTE: the indentation of the `then` and `else` sequences)
```text
GET num
IF num % 2 THEN
  PRINT “<num> is even!”
ELSE
  PRINT “<num> is odd!”
ENDIF
```

### While: 
As long as some condition is met, continuously run the same sequence (NOTE: the indentation of the while loop)
```text
DETERMINE buellerIsPresent
WHILE !buellerIsPresent
  PRINT “Bueller? …”
  DETERMINE buellerIsPresent
ENDWHILE
```

### Case: 
Like an if-else statement but matching on a particular value (NOTE: if we want our case statement to be comprehensive, we need to provide a DEFAULT case) 
```text
CASE temp OF:
  “Cold”: PRINT “Better stay indoors...”
  “Cool”: PRINT “Bring a jacket!”
  “Warm”: PRINT “Enjoy the sun!”
  DEFAULT:
    PRINT: “Unknown temp, You’re on your own!”
ENDCASE
```

### Repeat:
```text
REPEAT:
  PRINT “Pete and Repete were sitting on a bridge. Pete fell off. Who was left?”
  GET userAnswer
UNTIL userAnswer != ‘Repete’
```

### For:
A for loop is just a specialized while loop that loops over elements of some collection
```text
GET limit
FOR EACH number up to limit
  IF number is divisible by 5 and 3 THEN
     PRINT “FizzBuzz”
  ELSE IF number is divisible by 3 THEN
    PRINT “Fizz”
  ELSE IF number is divisible by 5 THEN
    PRINT “Buzz”
  ELSE
    PRINT number
  ENDIF
ENDFOR
```

Using the pseudocode...
## Challenge1
Given a string, write the pseudocode function to check if it is palindrome or not. 
> A string is said to be palindrome if reverse of the string is same as string. For example, “radar” is palindrome, but “radix” is not palindrome.

## Challenge2
Function `VowelCount(str)` takes the `str` string parameter being passed and `return` the number of vowels the string contains 
> (ie. "All cows eat grass" would return 5).
