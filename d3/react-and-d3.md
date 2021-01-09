# D3 & React

D3 is a great tool to build out interactive data visualizations and React has become one the defacto front end frameworks.  Together they are quite powerful however they both want to control the DOM.  They both take control of user interface elements and do so in different ways.  

## The React & D3 Ecosystem

There are so many React charting libraries out today that are built on D3.  To name a few there there:

- [Semiotic (Netflix)](https://semiotic.nteract.io/guides/bar-chart)
- [Visx (AirBnB)](https://airbnb.io/visx/bars)
- [React VX](https://vx-demo.now.sh/)
- [Britecharts](https://britecharts.github.io/britecharts/)

Here is a small [CodeSandbox demo](https://codesandbox.io/s/late-tree-ix7eh?file=/src/App.js) of a few of those libraries.

## What We Are Building

For our demo we will be taking some D3 code and refactor it to work within a React Component. This will involve importing and using:

- useState
- useEffect
- useRect

Here is the [Alphabet Solution](https://codesandbox.io/s/alphabet-d3react-d3-within-react-95ueg?file=/src/Components/Letters.js) we will aim to complete. 

## Approaches

If you have worked with React then you know that it takes on the responsibility to update all DOM elements and takes ownership in responding to all events.  DOM elements are updated when there is a change in state.  

If you have worked with D3 then you know that it takes on the same responsibility as React and updates DOM elements based on it's own enter-update-exit methodology

So how do we coerce these two powerful tools to work together? 

There are several approaches we can take:

- D3 within React
- React for the DOM, D3 for Math
- React/D3 Libraries


## D3 Within React

The first approach is to give our D3 code as much DOM control as possible.  It uses a React component to render an empty SVG element that React then provides D3 access to as a reference or `ref`

It then uses lifecycle methods to create the and update the chart. 

### Getting Started

We will be using the following starter code:
- [D3 - Alphabet - Mini Lecture - Starter](https://codesandbox.io/s/alphabet-d3react-d3-within-react-starter-v69le)


We will also import some of the code from the previous D3 only build: 

- [D3 - Alphabet - Mini Lecture - Solution](https://codesandbox.io/s/alphabet-d3react-d3-within-react-solution-fxluj)

### App.js

App.js has been updated to render a `Letter` Component.

```js
export default function App() {
  return (
    <div className="App">
      <>
        <Letters />
      </>
    </div>
  );
}

```

### Letter.js
A `Letter` Component has been created to give us a head start along with the following:

- `importing d3`
- `alphabet` array
- `renderAlphabet` function.
- `start` & `shuffle` functions


<img src="https://i.imgur.com/Kh62bFe.png"  width=400/>

<br>
<br>
We will need to make a few edits to the `render` method as well.  Since the svg and g are already in place there is no need to create them so we only need to select them. 

```js
const letters = d3
  .select('svg')
  .select('g')
  .selectAll('text')
  .data(dataSet, (d) => d);
```

The Component will also render the html from the previous example however we've gone ahead and added the svg and g elements so React can render them right from the start. 

You will also notice that both the Start button has been refactored to use React's `onClick` event. 

```js
  return (
    <>
      <div class="container">
        <div id="viz">
          <svg>
            <g transform="translate(50 100)"></g>
          </svg>
        </div>
        <button id="start" type="button" onClick={start}>Start</button>
        <button id="stop" type="button">Pause</button>
      </div>
    </>
  );
```

At this point we should see the following rendered on the page:

<img src="https://i.imgur.com/pEaCMBW.png" width=400>

### React Setup

Although we are allowing D3 to control the DOM we will still leverage React and it's ability to re-render the Component when state has been updated. 

So let's import the following Hooks to get us started, one of which you might not have yet been exposed to:

- useState
- useEffect
- useRef

```js
import React, { useState, useEffect, useRef } from 'react';
```

#### useState
Let's setup up state to use the alphabet array.

```js
const [dataSet, setDataSet] = useState(alphabet);
```

#### useEffect

The first useEffect that we will need will be used to call the `render` method on componentDidMount lifecycle, however we also need this effect to run on componentDidUpdate lifecycle as well so we will add `dataSet` as a dependency.

```js
useEffect(() => {
  render(dataSet);
}, [dataSet]);
```

If we refresh the page we should see the letters render for the first time.

<img src="https://i.imgur.com/mk2SPUV.png" width=500 >


Also try starting and pausing the transitions as they should work as well. 

### Refactor For React

Although we are allowing D3 to to update the DOM we still want to refactor our code a bit to respect the React environment.  The first refactor is to `reference` the svg instead of grabbing it directly. 

Let's create the ref.

```js
  const ref = useRef();
```

Assign the ref

```js
<svg ref={ref}>
  <g transform="translate(50 100)"></g>
</svg>

```

Update D3 to se the svg reference.

```js
const letters = d3
  .select(ref.current)
  .select('g')
  .selectAll('text')
  .data(dataSet, (d) => d);

```

### React To Control Pause

If we look at the `start` function we can see that D3 is still controlling clearing the interval.  clearInterval has been added to the start function in order to provide access to the sI variable and make it available within it's scope. 

```js
  const start = () => {
    var sI = setInterval(() => {
      shuffle();
    }, 3000);
    d3.select('#stop').on('click', () => clearInterval(sI));
  };
```

We now are going to replace all that code with a useEffect that uses a dependency. Let's create the dependency first.

```js
const [timer, setTimer] = useState(false);
```

Now let's use useEffect in a way that you haven't yet seen.  As you know useEffect runs whatever code you provide and can rerun depending on wether it's dependency has changed.  What might be new here is that it also can return a callback.  The callback here is used to clean up whatever had been created by the component but is no longer needed, hence the `setInterval`

```js
 useEffect(() => {
    if (timer) {
      var sI = setInterval(() => {
        shuffle();
      }, 3000);
    }
    return () => clearInterval(sI);
}, [timer]);
```

Now let's update the `start` method.

```js
const start = () => {
  const newTimer = !timer;
  setTimer(newTimer);
}
```

And of course update the Pause button so that it now calls the start function

```js
<button id="stop" type="button" onClick={start}>Pause</button>
```

And there you have it. 

### Resources

- [react-d3-ecosystem](https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/)
- [settimeout-in-react-components-using-hooks](https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks)
