# useReducer Hook

## Objectives

- Discuss the concept of a `reducer` in JavaScript
- Implement a basic example of a `reducer`
- Implement a basic example of the `useReducer` hook
- Explain when and where to use `useState` vs `useReducer`

## What is a reducer?

A `reducer` is a fancy word for a function that reduces a given input.  What that reducing entails is dependent on what was passed and expected output. 

In fact you may have already worked with a `reducer` it you have ever used the `Array.reduce()` method.  

```js
Array.reduce((acc, val, index) => {
	return acc;
}, init);
```

`Array.reduce()` works in a similar fashion to `.forEach()`.`map()` and `.filter()` in that they all look over an array and take in a callback, however `.reduce` takes in an additional `accumulator` argument. 

The parameters that `reduce()` takes in are:

- a callback function that takes in an accumulator (acc), the current element in the loop (val) and its index position
- an optional starting value (init) that will be assigned to the accumulator

The `accumulator` will determine if it has been assigned a starting value otherwise it will use the element at the first position in the array.

### Working Through Some Examples

Let's work through a few examples of `Array.reduce()` so we are all up to speed on what the method is meant to do.

<!-- original starter code: https://repl.it/@jkeohan/reducer-examples-starter#main.js -->

We will be using this [reduce-examples-starter repl](https://repl.it/@jkeohan/reducer-examples-starter-rctr-9-8-20) and working through the problems below.

#### Sum An Array

How would you use `.reduce()` to return a single value that is the sum of all numbers in the following array?

```js
INPUT: [1, 2, 3];
OUTPUT: 6;
```

#### Counting Duplicates

Another use case for `.reduce()` would be to count duplicates. Say you had the following and wanted to count how many instances there were of each.

```js
INPUT: ['banana', 'cherry', 'orange', 'apple', 'cherry', 'orange', 'apple', 'banana', 'cherry', 'orange', 'fig' ]
OUTPUT: { banana: 2, cherry: 3, orange: 3, apple: 2, fig: 1 }
```

In both cases we reduced the input of many things to a single thing, be it a number or agit pun object.

<!-- [reduce-examples-solution repl](https://repl.it/@jkeohan/reducer-examples-solution)  -->

[reduce-examples-solution repl]() - provided after the codealong

 :question: In your own words explain why you would use `[].reduce()` vs `[].forEach` or even a `for()` loop?

  <!-- :question: In your own words explain why you would use `[].reduce()` vs `[].forEach` or even a `for()` loop? -->

## Creating A Reducer

So now that we have worked through a few examples of `[].reduce()` let's apply this knowledge and create an actual `reducer` function of our own. 

For this small demo we will be using the following starter code:


<!-- original starter: https://codesandbox.io/s/counter-class-to-functional-usestate-starter-jdj6f?file=/src/components/Counter.js -->

<!-- STARTER -->
[CodeSandbox - Counter Reducer - Starter](https://codesandbox.io/s/counter-usereducer-starter-268mx)

<!-- SOLUTION -->
<!-- [CodeSandbox - Counter Reducer - Starter](https://codesandbox.io/s/counter-usereducer-starter-luru8?file=/src/components/Counter.js) -->

So the concept of a `reducer` has been around for sometime in JavaScript, long before the introduction of `Array.reduce`.

When applied to building an application it becomes a tool which we use to manage both the `state` of an application and its `business logic` as well.

So the `reducer` is essentially a function that accepts the following params:

- an initial starting state
- an action to be performed on state

It then `returns` a new version of state

```js
(state, action) => returns a new version of state
```

This follows one of the golden rules when working with React state which is: 

**:oncoming_police_car: -  Never update the state value directly**

Although we already have a working example of a `Counter` component, lets give the code a once over so were all on the same page.

Here is the state of the Counter.

```js
const [count, setCount] = useState(0);
```

Here are our supporting functions

```js
const handleIncrement = () => setCounter(count + 1);
const handleDecrement = () => setCounter(count - 1);
const handleReset = () => setCounter(0);
```

And of course the buttons that call the supporting functions.

```js
<section>
	<h2>Count:{count}</h2>
	<button onClick={handleIncrement}>+</button>
	<button onClick={handleDecrement}>-</button>
	<button onClick={handleReset}>Reset</button>
</section>
```

### Our First Reducer

Let's refactor this a bit to use a `reducer` function. The idea here is to aggregate all the logic needed to update state in single function. 

It will take in the following:

- an initial state value
- an action to perform that will update state

Since some `action` is passed, which determines how state is updated, we will use conditional logic to make that decision. 

```sh
function counterReducer(state, action){
    if(action === 'INCREMENT') {
        return state + 1
    } else if (action === 'DECREMENT') {
        return state - 1
    } else if (action === 'RESET') {
        return 0
    }
    return state
}
```

One thing to note about the above code is that the `action` being passed is expected, by convention, to be uppercase. This convention is meant to highlight the action being performed and a convention that is expected when using `Redux`.

If the `action` doesn't match any condition, we default to return the unchanged state. It's very clear in the function that the `action` determines how state is to be updated.

#### Refactor Buttons

And of course the buttons need a bit of refactoring as well. We are passing in the current state and the action to be performed.

```sh
<button onClick={() => setCount(counterReducer(count, 'INCREMENT'))}>+</button>
<button onClick={() => setCount(counterReducer(count, 'DECREMENT'))}>-</button>
<button onClick={() => setCount(counterReducer(count, 'RESET'))}>Reset</button>
```

### Switch Statements

For the sake of readability `switch` statements have become the defacto conditional logic for reducers.

So let's rewrite the above code as follows:

```sh
function counterReducer(state, action) {
    switch(action) {
        case 'INCREMENT': return state + 1
        case 'DECREMENT': return state - 1
        case 'RESET': return 0
        default: return state
    }
}
```

From the looks of it the switch statement does indeed make it easier to read.

#### :question: What are the benefits of managing the applications state using a `reducer` function?

## useReducer Hook

The two basic hooks that are used for state management in React are: `useState` and `useReducer`, with the addition of `useContext` for managing a more global form of state.

Let's take a moment to look at the [official React Docs on Hooks](https://reactjs.org/docs/hooks-reference.html)

In order to work with the `useReducer` hook we need to first import it and, since it essentially replaces `useState` we can remove that.

```js
import React, { useReducer } from 'react';
```

`useReducer` works very similar to `useState` but with some differences. Like useState it returns a tuple `[state, dispatch]` with the first element in the array being `state` and the second a `set function`

It almost seems like the two are the same at this point. But there is a difference.

`useReducer` takes in a `callback` as the first argument and the initial `state value` as the second.

```sh
// const [count, dispatch] = useReducer( callback function, initial state)
const [count, dispatch] = useReducer((state, action) => { }, 0)
```

Also take note that the name assigned to the method used to update. Just as `switch` statements are the standard conditional logic, the term `dispatch` is the convention used for the naming of this function.

With `useReducer` in place we can now replace the callback with the `counterReducer` function that we created earlier

```js
const [count, dispatch] = useReducer(counterReducer, 0);
```

Now all that is left is to update the buttons. Although `dispatch` is calling the `counterReducer` function, which takes in two params: state, action, we only need to pass dispatch a single argument.

This is because `useReducer` will be executing the callback function and it takes on the responsibility of passing in the current state, along with the action provided.

```sh
<button onClick={() => dispatch('INCREMENT')}>+</button>
<button onClick={() => dispatch('DECREMENT')}>-</button>
<button onClick={() => dispatch('RESET')}>Reset</button>
```

## Working With More Complex State


If choosing to go with `useReducer` there's a good chance your working with a more complicated state and/or your business logic is getting more complex and hard to manage. 


Let's assume our application may need to increment or decrement by more than just a single digit. Perhaps we are creating a game that allows the user to perform an action and based on that action they will increase their score by varying amounts. 


### Action

The convention for writing an `Action` is to have both a `type` and a `payload`. While the `type` is the action to be performed, the `payload` is the value used to update state. 

Our first refactor is to send an object as a payload which includes the `type` of action to perform and the `value` by which to update state.

```sh
<button onClick={() => dispatch({type: 'INCREMENT', value: 1})}>+</button>
<button onClick={() => dispatch({type: 'DECREMENT', value: 1})}>-</button>
<button onClick={() => dispatch({type: 'RESET', value: 0})}>Reset</button>
```

Our second refactor is on counterReducer and here we update the code to reference either `action.type` or `action.value`.

```sh
function counterReducer(state, action) {
    switch(action.type) {
     case 'INCREMENT':
        return (state += action.value);
      case 'DECREMENT':
        return (state -= action.value);
      case 'RESET':
        return (state = action.value);
      default:
        return state;
    }
}
```

#### Final Solution Code

Here is the final solution code:

<!-- [CodeSandbox - Counter Reducer - Solution](https://codesandbox.io/s/counter-class-to-functional-usestate-solution-rlhj9?file=/src/components/Counter.js) -->

[CodeSandbox - Counter Reducer - Solution](https://codesandbox.io/s/counter-usereducer-starter-luru8?file=/src/components/Counter.js:487-488) - Provided after the lecture

##### :question: How does working with `useReducer` improve the readability and organization of our code?

<!-- ### What About Redux?

As we all know React is all about state management and so Redux has became the state management tool of choice, which employs...you guessed it... `reducers`.

Kent C. Dodds wrote up a explanation (article linked in references) of the differences between the two and, while he often reaches for setState, he provides a good use case for using useReducer instead:

Many peoples’ first thought upon seeing the useReducer hook went something like… “well, React has reducers built in now, and it has Context to pass data around, so Redux is dead!” I wanted to give some thoughts on that here, because I bet you might be wondering.

Redux still does more than useContext + useReducer combined – it has the Redux DevTools for great debugging, and middleware for customizability, and a whole ecosystem of helper libraries. -->


### Why useReducer over useState?

Whenever there are two things that seem do the same thing, people inevitably ask: "When do I use one over the other?" Since we have useState, why do we need useReducer at all?

The React team advises the following:

> useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. useReducer also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks . — React Team

Also Kent C. Dodds wrote up a explanation (article linked in references) of the differences between the two and, while he often reaches for setState, he provides a good use case for using useReducer instead:

> If one element of your state relies on the value of another element of your state, then it’s almost always best to use useReducer

The example he works through in his article is a bit advanced but the gist of it is that he is implementing a state that includes a `past`, `present` and `future` and is a more complex version of state than we are used to working with.


### References

- [What is a Reducer in JavaScript/React/Redux - Robin Wieruch](https://www.robinwieruch.de/javascript-reducer)
- [How to useReducer in React? - Robin Wieruch](https://www.robinwieruch.de/react-usereducer-hook)
- [Getting to Know the useReducer React Hook - CSS Tricks](https://css-tricks.com/getting-to-know-the-usereducer-react-hook/)
- [Should I useState or useReducer? - Kent Dodds](https://kentcdodds.com/blog/should-i-usestate-or-usereducer)
- [Examples of the useReducer Hook - David Ceddia](https://daveceddia.com/usereducer-hook-examples/)
