# useReducer Hook

## Objectives
- Discuss the concept of a `reducer` in JavaScript
- Implement a basic example of a `reducer`
- Implement a basic example of the `useReducer` hook
- Explain when and where to use `useState` vs `useReducer`


## What is a reducer?

A `reducer` is a fancy word for a function that takes 2 values and returns 1 value back.

In fact you may have already worked with a `reducer` it you have ever used the `Array.reduce()` method.  

```sh
Array.reduce( (acc, val) => { return acc }, init)
```

The parameters that `reduce()` takes in are:

- a callback function that takes in an accumulator (acc) and the current element in the loop (val)
- an optional starting value (init)

The `accumulator` will determine if it has been assigned a starting value otherwise it will use the element at the first position in the array. 

### Working Through Some Examples
Let's work through a few examples of `Array.reduce()` so we are all up to speed on what the method is meant to do. 

We will be using this [reduce-examples-starter repl](https://repl.it/@jkeohan/reducer-examples-starter#main.js) and working through the problems below.

#### Sum An Array
How would you use `.reduce()` to return a single value that is the sum of all numbers in the following array?


```sh
INPUT: [1,2,3]
OUTPUT: 6
```


#### Counting Duplicates

Another use case for `.reduce()` would be to count duplicates.  Say you had the following and wanted to count how many instances there were of each. 

```sh
INPUT: ['banana', 'cherry', 'orange', 'apple', 'cherry', 'orange', 'apple', 'banana', 'cherry', 'orange', 'fig' ]
OUTPUT: { banana: 2, cherry: 3, orange: 3, apple: 2, fig: 1 }
```

In both cases we reduced the input of many things to a single thing, be it a number or agit pun object. 

[reduce-examples-solution repl](https://repl.it/@jkeohan/reducer-examples-solution)

## Creating A Reducer

So now that you've worked through a few examples of `.reduce` and we will apply this knowledge and create a `reducer`. 

For this small demo we will be using the following starter code:

[CodeSandbox - Counter Reducer - Starter](https://codesandbox.io/s/counter-class-to-functional-usestate-starter-jdj6f?file=/src/components/Counter.js)

So the concept of a `reducer` has been around for sometime in JavaScript above and beyond the application of using it with `Array.reduce`. 

When applied to building an application is becomes a tool which we use to manage the state of an application.  

So a `reducer` is essentially a function that takes in the following params and returns a new version of state

- current state 
- an action to be performed that updates state


```sh
(state, action) => returns a new version of state
```

As mentioned it returns a new version of state as it takes the approach that state is immutable, just as it is in React.  

Although we already have a working example of a `Counter` component, lets give the code a once over so were all on the same page. 

Here is the state of the Counter.

```sh
const [count,setCount] = useState(0)
```

Here are our supporting functions

```sh
const handleIncrement = () => setCounter(count + 1)
const handleDecrement = () => setCounter(count - 1)
const handleReset = () => setCounter(0)
```

And of course the buttons that call the functions that update state.

```sh
<>
 <h2>Count:{count}</h2>
 <button onClick={handleIncrement }>+</button>
 <button onClick={handleDecrement}>-</button>
 <button  onClick={handleReset}>Reset</button>
</
```

### Our First Reducer

Let's refactor this a bit to use a `reducer` function.  The idea here is to aggregate all the logic to update state into one single function which takes in the following:

- current state
- an action to perform that will update state

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

One thing to note about the above code is that the `action` being passed is expected to be uppercase.  This is by convention and is used to help highlight the action being performed and something that you will see implemented in Redux.  

If the `action type` doesn't match any condition, we default to return the unchanged state. It's very clear in the function that the `action` determines how state is to be updated.  

And of course the buttons need a bit of refactoring as well.  Once again we are passing in the current state and the action to be performed. 

```sh
<button onClick={() => setCount(counterReducer(count, 'INCREMENT'))}>+</button>
<button onClick={() => setCount(counterReducer(count, 'DECREMENT'))}>-</button>
<button onClick={() => setCount(counterReducer(count, 'RESET'))}>Reset</button>
```

### Switch Statements

For the sake of readability `switch statements` have become the defacto conditional logic for reducers as it allows for easier readability of the conditional logic. 

So we would rewrite the above code as follows:

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

From the looks of it the switch statement does make it easier to read. 

## useReducer Hook

The two hooks that are used for state management in React are: `useState` and `useReducer`.  

I'm sure it's safe to say that you are more than familiar with `useState` so we won't be discussing that here and will focus all our attention on the `userReducer` hook. 

In order to work with the `useReducer` hook we need to first import it and since it essentially becomes our state we can remove `useState`

```sh
import React, { useReducer } from 'react';
```

`useReducer` works very similar to `useState` but with some differences. Like useState it returns a tuple `[state, dispatch]` with the first element in the array being `state` and the second a method that allows us to update state.  

It almost seems like the two are the same at this point.  But here is the difference. `useReducer` takes in a `callback` as the first argument and the initial `state value` as the second. 

```sh
const [count, dispatch] = useReducer((state, action) => { }, 0)
```

Also take note that the method used to update state is called `dispatch`.  Although you are free to rename this method to whatever you like it is common practice to use the term `dispatch` in the naming of this function.  

With `useReducer` in place we can now replace the callback with the `counterReducer` function that we created earlier

```sh
const [count, dispatch] = useReducer(counterReducer, 0)
```

Now all that is left is to update the buttons.  Although `dispatch` is calling the `counterReducer` function, which takes in two params: state, action, we only need to pass dispatch a single argument of action. 

This is because `useReducer` will be executing the callback function and it takes on the responsibility of passing in the current state, along with the action provided. 

```sh
<button onClick={() => dispatch('INCREMENT')}>+</button>
<button onClick={() => dispatch('DECREMENT')}>-</button>
<button onClick={() => dispatch('RESET')}>Reset</button>
```

## Our Last Refactor

If choosing to go with `useReducer` there's a good chance your working with a more complicated state object and not a single primitive value like in this example. 

In most cases you will be working with an object so let's start with the buttons.


### Action

The convention for writing an `Action` is to have both a `type` and a `payload`. While the type is the action to be performed, the payload is the value used to update state. 

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

[CodeSandbox - Counter Reducer - Solution](https://codesandbox.io/s/counter-class-to-functional-usestate-solution-rlhj9?file=/src/components/Counter.js)

## Why useReducer over useState?

Whenever there are two things that seem do the same thing, people inevitably ask: "When do I use one over the other?" Since we can manage state with useState, why do we need useReducer at all? 

Kent C. Dodds wrote up a explanation (article linked in references) of the differences between the two and, while he often reaches for setState, he provides a good use case for using useReducer instead:

> If one element of your state relies on the value of another element of your state, then it’s almost always best to use useReducer

The example he works through in his article is a bit advanced but the gist of it is that he is implementing a state that includes a `past`, `present` and `future` and is a more complex version of state than we are used to working with. 


### References

- [What is a Reducer in JavaScript/React/Redux](https://www.robinwieruch.de/javascript-reducer)
- [How to useReducer in React?](https://www.robinwieruch.de/react-usereducer-hook)
- [Getting to Know the useReducer React Hook](https://css-tricks.com/getting-to-know-the-usereducer-react-hook/)
- [Should I useState or useReducer?](https://kentcdodds.com/blog/should-i-usestate-or-usereducer)
- [Examples of the useReducer Hook](https://daveceddia.com/usereducer-hook-examples/)
