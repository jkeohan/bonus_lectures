# Pseudocode Examples

### why algorithms? 🤔
> you'll be asked to solve them on an interview 😅

It's to train your brain into solving everyday problems. 

1. If you have to go to the database, reach for all the books in the database, bring them back, and render it onto the page; your code running and algo.
```
- call database
- get data
- come back
- put it in an image tag
- render each one onto the page
```
...and what if: 

2. Go to the database, reach for all the books in the database, but only get the ones that that have a ranking of 5 stars or maybe 4 stars..for now, horror books, and the `client` or `user` is only looking for stephen king books. Then bring them back, and render them onto the page? ...that's your code running an algo

```
- call database
- evaluate that are:
 - 5 stars
 - 5.9 ...
 - 5.8 ...
 - ...
 - 4 stars
 - filter author that goes by 'Stephan King'
 - come back
 - put it in an image tag
 - render each one onto the page
```
An algorithm is:
- "a procedure for solving a problem in terms of the actions to be executed and the order in which those actions are to be executed." 
- An algorithm is the sequence of steps taken to solve a problem. 
- The steps are normally "sequence," "selection, " "iteration," and a "case-type" statement.

### How do we solve difficult algos? 🤔

Pseudocode is an artificial and informal language that helps programmers develop algorithms. Pseudocode is a "text-based" detail (algorithmic) design tool.

The "rules" of Pseudocode are reasonably straightforward. All statements showing "dependency" are to be indented. These include while, do, for, if, switch.

### Examples:

problem: 
Evaluate all the student's exam grades, if the students recieved anything above 60 they passed otherwise they didnt.

```text
// pseaudocode:
If student's grade is greater than or equal to 60
    Print "passed"
else
    Print "failed"
endif
```

problem: 
Find the class average of the student's exam grade


```text
// pseaudocode: 
Set total to zero
Set grades to one
Set the classAverage to zero

while grades is less than or equal to totalStudents
    Input the next grade
    Add the grade to total
endwhile

classAverage is: total divided by totalStudents
Print the class average.
```

```text
initialize passes to zero
initialize failures to zero
initialize student to one

while student counter is less than or equal to ten
    input the next exam result
    if the student passed
        add one to passes
    else
        add one to failures
    endif
    
    add one to student counter
endwhile

print the number of passes
print the number of failures

if eight or more students passed
    print "raise tuition"
endif
```

## Some keywords that could be used:
For looping and selection, calling The keywords that are to be used include 

- Do While...EndDo 
- Do Until...Enddo
- Loop
- Case...EndCase
- If...Endif
- Call with (parameters)
- Call
- Return
- When


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
