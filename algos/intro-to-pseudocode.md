# Intro To Pseudocode 

As developers we often go through many stages, from getting an idea to reaching a valid, working implementation of it. This often requires developers to design an **algorithm**, apply it to the problem at hand, and then test it for various input datasets.

#### But What Is An Algorithm? 🤔

An algorithm is:
- A procedure for solving a problem in terms of the actions to be executed and the order in which those actions are to be executed.
- An algorithm is the sequence of steps taken to solve a problem. 

Here where pseudocode comes to the rescue. Pseudocode is a technique used to describe the distinct steps of an algorithm in a manner that is easy to understand for anyone with basic programming knowledge.

<hr>

**:question: What is an algorithm?**

<hr>

#### Just How Important Is Good Pseudocode

Open this starter repl: [Starter Repl](https://replit.com/@jkeohan/Algo-intro-to-pseudocode#index.js). 

When writing instructions for another human to perform a basic task we take into account certain assumptions and provide detailed instructions for where we know they are needed.  Let's take the following example.

##### Assemble A New IKEA Shelving Unit 

Assumptions: (what assumptions can we make?)
- User knows how to open the box
- User knows how to remove objects from the box
- User knows to look for instructions
- User knows that twisting screwdriver right tightens and left loosens

Detailed Instructions: (where are more detailed instructions required?)
- User must be provided the steps on how to assemble the parts in the proper order
- User provided diagrams for which parts to connect and which screws are used for those connections

<hr>

:alarm_clock: Activity - 5min 

Let's watch the [Exact Instructions Challenge](https://www.youtube.com/watch?v=Ct-lOOUqmyY) to see just how often writing an algorithm can be. 

<hr>

## The Main Keywords Of Pseudocode

The core of pseudocode is the ability to represent programming constructs. These constructs — also called keywords —are used to describe the control flow of the algorithm.

- SEQUENCE represents linear tasks sequentially performed one after the other.
- WHILE a loop with a condition at its beginning.
- REPEAT-UNTIL a loop with a condition at the bottom.
- FOR another way of looping.
- IF-THEN-ELSE a conditional statement changing the flow of the algorithm.
- CASE the generalization form of IF-THEN-ELSE.

<img src="https://i.imgur.com/cDN573l.png" />


 ## Rules of writing pseudocode

 Since everyone who writes pseudocode does so in their own style or preference here are some simple rules that help make pseudocode more universally understood.

- Always **capitalize** the initial word 
- Have only one statement per line.
- **Indent** to show hierarchy, improve readability, and show nested constructs.
- Always end multiline sections using any of the END keywords (ENDIF, ENDWHILE, etc.).-
- Use the naming domain of the problem, not that of the implementation. E.g., “Append the last name to the first name” instead of “name = first+ last.”
- Keep it simple, concise, and readable.

<img src="https://i.imgur.com/6R5SFA0.png">


### Making A Cup Of Tea

Think about the steps needed to make a cup of tea. Of course after watching how to make a peanut butter sandwich we know that more instructions need to be provided, but let's start with the below.

```
Put water into a kettle
Turn on stove
Place kettle onto stove
Put teabag in cup
Wait for kettle to boil
Remove kettle from stove
Add water from kettle to cup
Add milk and/or sugar
```

The first thing we need to do is indicate that this is a program and all the code should be run when making a cup of tea. 

```
PROGRAM
    Put water into a kettle
    Turn on stove
    Place kettle onto stove
    Put teabag in cup
    Wait for kettle to boil
    Remove kettle from stove
    Add water from kettle to cup
    Add milk and/or sugar
END PROGRAM
```

#### Selection

Let's take a moment to update the code to include the need to make a selection such as adding sugar.  This is a condition and the structure for writing one in pseudocode.

```
IF (condition)
 THEN (statement)
 ELSE (statement)
END IF
```

Now apply that to adding sugar.

```
PROGRAM
    Put water into a kettle
    Turn on stove
    Place kettle onto stove
    Put teabag in cup
    Wait for kettle to boil
    Remove kettle from stove
    Add water from kettle to cup
    Add milk 
    IF sugar is required
        THEN add sugar
        ELSE do nothing
    END IF
END PROGRAM
```

Of course we could apply the same logic to adding milk as well. 

<hr>

:question: Where else could we apply conditional logic? 

<hr>

**:alarm_clock: Activity** - 2min

Write a condition that prints the larger of 2 numbers.

<!-- ```
IF A > B
    THEN PRINT A
    ELSE PRINT B
END IF
``` -->

<hr>


#### Iteration

I'm sure we have made the assumption that the user knows when the kettle is full of water but that's not so for a computer.  So let's add an **iteration** step to our code base. 

This is a iteration and the structure for writing one in pseudocode.

```
WHILE (condition)
 DO (stateement)
END WHILE
```

Now apply that to filling the kettle with water.

```
PROGRAM
    WHILE kettle is not full
        DO keep adding water
    END WHILE
    Turn on stove
    Place kettle onto stove
    Put teabag in cup
    Wait for kettle to boil
    Remove kettle from stove
    Add water from kettle to cup
    Add milk 
    IF sugar is required
        THEN add sugar
        ELSE do nothing
    END IF
END PROGRAM
```

<hr>

:question: Where else could we apply iterative logic? 

<hr>

**:alarm_clock: Activity** - 2min

Write a loop to print out the numbers from 1 to 5.

<!-- ```
SET A = 1
WHILE A < 5
    DO PRINT A
    INCREMENT A by 1
END WHILE
``` -->

<hr>


<!-- 
Think about when you cross the street and all the actions that you take to make it to the other side safely.  

```text
WAIT for the light to turn red
IF all cars have stopped
  CROSS the street
ELSE IF some cars are coming to a stop
  WAIT for them to stop before deciding to cross the street
END IF

``` -->

<!-- Problem: 
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
``` -->

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


<!-- ### Sequence
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
``` -->

## Practice 


### isOddOrEven
Write a function called **isOddOrEven** that checks if a number is **odd** or **even** and returns that value. 

### isLargest
Write a function called **isLargest** that takes in two numbers and returns the largest of the two. 

### allNumbersBefore
Write a function called **allNumbersBefore** that takes in a number returns an array of all the numbers starting from 1 that come before it. 

### sumOfAllNumbers
Write a function called **sumOfAllNumbers** that takes in a number returns a number that represents the sum of all numbers starting from 1 up to, and including, the input number. 

### Bonus #1
Write a function called **isPalindrome** that given a string returns true if it is a palindrome. 

> A string is said to be palindrome if reverse of the string is same as string. For example, “radar” is palindrome, but “radix” is not palindrome.

### Bonus #2
FWrite a function **vowelCount** take given a string returns the number of vowels the string contains 

> (ie. "All cows eat grass" would return 5).

### Resources 

- [Pseudocode 101](https://towardsdatascience.com/pseudocode-101-an-introduction-to-writing-good-pseudocode-1331cb855be7)
- [Intro To Pseudocode](https://www.slideshare.net/DamianGordon1/pseudocode-10373156)
- [GA Algos](https://git.generalassemb.ly/wdi-nyc-algorithms/whiteboarding-meetup/blob/master/algorithms.md)
- [js-algorithms-and-data-structures-masterclass](https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass)
