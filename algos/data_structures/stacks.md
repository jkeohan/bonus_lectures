# Intro To Stacks

In computer science, a stack is an abstract data type that serves as a collection of elements, with two principal operations which implement a LIFO (last in, first out) approach:

- push, which adds an element to the collection
- pop, which removes the most recently added element 


The name **stack** for this type of structure comes from the analogy to a set of physical items stacked on top of each other, which makes it easy to take an item off the top of the stack. 

<!-- You can think of a stack like a physical stack of books: to add a new book to the stack you simply place the book on top, and then when you want to make the stack smaller you start removing books from the top of the stack. -->

## Stack as a  Data Structure

A stack is a common Data Structure. It is named stack as it behaves like a real-world stack, for example – a deck of cards, a pile of plates or a stack of books.

<img src="https://i.imgur.com/EyHgbUH.png" />


A stack works on a LIFO (last in, first out) approach which provides operations like push and pop for the users to interact with the data. 

As elements are **pushed** they added one on top of the other.  As they are **popped** they are removed from the very top of the stack, hence LIFO. 

<!-- <img src="https://i.imgur.com/yPki75Q.png" /> -->

<img src="https://i.imgur.com/rhhaE5e.png" />


## Applications of a Stack 

Here are several use cases for a stack.

- Call stack (which you might have already seen learning recursion)
- Undo - such as in undoing the last bank transaction
- Backtracking  - such as undoing several moves in a game
- Navigating Browser History - such as using the back and forward buttons in your browser

### Stack Implementations

Let's take a moment to discuss the different approaches that can be taken when creating a stack, the Big O time complexity and what additional methods we might want to include in the stack.

#### Approaches
A Stack is data structure that is meant to keep track of LIFO therefor any approach we take must accomplish this one requirement.  

On the surface it makes sense to use an **array** as it already has methods to push/pop elements but we can achieve the same result using an **object** or an object structured as a **linked list** (singly or doubly). 

In any implementations, the user will be able to use operations like push and pop without knowing the underlying approach that was taken to implement those methods.

#### Big O
Either approach will also need to implement **insertion (push)** and **removal (pop)** as **O(1)** constant time. 

#### Stack methods

We've discussed both push/pop as the standard actions to be performed on a stack but there are also a few additional methods we might consider including: 

- pop (remove top element)
- push (append new element)
- peek (return the top element but don't pop it from the Stack)
- isEmpty(return True or False) Used to check whether the stack contains items
- clear (remove all elements from the Stack, leaving an empty Stack)
- count (return the number of items currently in the stack)


### Creating a Stack

##### Array Apprroach

If we opted for an array approach we would use push and pop.   This would allow us to maintain constant time or O(1) as there would be no need to re-index the items as we are adding/removing them from the end. 

```js
let arr = []
arr.push('a') => [a]
arr.push('b') => [a, b]
arr.push('c') => [a, b, c]
```

##### Basic Object

If we opt to use an object then we won't have the array methods of push/pop to work with and will have to work out that logic ourselves. 

One approach is to assign the key a numeric value that represents the position of that element in the stack. 

```js
{1: a}
{1: a, 2: b}
{1: a, 2: b, 3: c}
```

##### Linked List

A linked list is also another object based approach where each element addded to the stack is it's own object and includes a pointer to the next item that is linked in the list, hence the title **linked list**. 

```
c => b => a

{val: 'a', next: null}
{val: 'b', next: {val: 'a', next: null}}
{val: 'c', next: {val: 'b', next: {val: 'a', next: null}}}
```

In this approach we would place the new element at the front of the list and assign the **next** key a value that points to the element that it just replaced as the last element in the stack. 

<!-- This would require that we cycle through all the elements until we have reached the end and would force us to use **O(n)**. -->

<!-- A better approach is to to flip the order and push the most recent addition to the front.  That way we can remove the last in, which will also have a pointer to the next one in line which we can then assign as the **new** last element. 

```
d => c => b => a
``` -->

### Stack as a Class

Just as there are several approaches to take when we consider how to structure the we also have several approaches as to wrap that structure such as a function, constructor function, object or an ES6 class.  

#### Function



For this demo we will opt to use an ES6 classes as they are meant to convey structure and allow us to **instantiate** new instances of the class.  

Let's create our class and define **first**, **last** and **length** variables. 

```
class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0
    }
}
```

#### Push and Pop Stack Methods

Let's assign the methods for **push** and **pop**. 

```
class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0
    }
    push(val) {

    }

    pop() {

    }
}
```

##### Push

Here are the requirements which have been translated into pseudocode for push

```
SET a variable called node to an object with two keys: val and next. 
IF FIRST is null
    SET first equal to the node
    SET last equal to the node
ELSE 
    SET a variable called temp to the current first element
    REASSIGN first to the new node
    ASSIGN first.next to temp
END IF
INCREASE length by 1
RETURN length
```

Now let's translate that into actual code. 
```js
push(val){
   let node = {val, next: null}
   if(!this.first) {
     this.first = node
     this.last = node
   } else {
     let temp = this.first
     this.first = node
     this.first.next = temp
   }
   this.length += 1
   return this.length
}
```

##### Pop

Once again let's define the requirements as pseudocode for pop:

```
IF length is 0 RETURN null
SET a temp variable to the element that is first
IF first is equal to last
    SET last to null
END IF
SET first equal to first.next
DECREASE length by 1
RETURN temp.val
```

Now let's translate that into actual code. 

```js
pop(){
    if(!this.length) return null
    let temp = this.first
    if(this.first == this.last) {
        this.last = null
    }
    this.first = this.first.next
    this.length -= 1
    return temp.value
}
```

Of course the true test is to text our code. 

```js
let stack = new Stack()
stack.push('a')
stack.push('b')
stack.push('c')

console.log('stack', stack)
/*
stack Stack {
  first: { val: 'c', next: { val: 'b', next: [Object] } },
  last: { val: 'a', next: null },
  length: 3
}
*/

console.log('pop', stack.pop())
// => pop c

console.log('stack', stack)
/*
stack Stack {
  first: { val: 'b', next: { val: 'a', next: null } },
  last: { val: 'a', next: null },
  length: 2
}
*/
```
<hr>

##### <g-emoji class="g-emoji" alias="alarm_clock" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/23f0.png">⏰</g-emoji> Activity - Add Additional Methods

Try your hand at extending the class to include the following methods: 

- peek (return the top element but don't pop it from the Stack)
- isEmpty(return True or False) Used to check whether the stack contains items
- clear (remove all elements from the Stack, leaving an empty Stack)

<hr>

#### Problems

Try your hand at using a stack to solve the following algos:

<hr> 
##### Valid Openers To Closers

Given a string containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.

Note that an empty string or a string with only a single value should be considered invalid.

Input: '()'
Output: true

Input: '({}){}'
Output: true

Input: '('
Output: false

Input: '(){'
Output: false


<hr>



##### Factoial

Given a number, print its factorial.

Input: 5

Output: 120 = (5 X 4 X 3 X 2 X 1)

Given a number multiply all the previous numbers

<hr>

##### Pez Dispenser

Imagine that your virtual Pez dispenser is filled with red, yellow, and white colors and you don’t like the yellow ones. Write the code that uses a stack  to remove the yellow ones and replace them with red without changing the order of the other candies in the dispenser.


Input: ['red','yellow','white,'yellow','white']

Output: ['red','red','white,'red','white']

<hr>

[Starter Repl](https://replit.com/@jkeohan/algo-bonus-lecture-stack)


#### References

- [data-structures-with-javascript-stack-and-queue](https://code.tutsplus.com/articles/data-structures-with-javascript-stack-and-queue--cms-23348)
- [Use Cases For Implementing A Stack](https://javascript.plainenglish.io/algorithm-in-javascript-few-use-cases-implementing-stack-data-structure-2f46f975a8ba)
- [More Use Cases For Stack](https://medium.com/swift2go/stacks-and-lifo-structures-implementation-and-use-cases-7ada8f8c400)
- [stack-data-structure](https://www.geeksforgeeks.org/stack-data-structure/)
- [Stack as constructor function](https://replit.com/@jkeohan/algo-stack-constructor-function)
- [Solving Algos Using Stack](https://www.oreilly.com/library/view/data-structures-and/9781449373931/ch04.html)
