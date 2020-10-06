# Intro To D3.js

## Learning Objectives

- Introduce d3.js and discuss it's place in data visualization
- Use D3 to manipulate the DOM
- Bind and updating data in the DOM
- Scale data to fit the viewport

## Framing (5 minutes / 0:05)

### What Is D3?

D3 stands for Data-Driven Documents. The word "document" in D3 refers to the DOM. Javascript can manipulate the DOM, creating and deleting pieces of it. Building data visualizations, however, with tools that are suited for GUI programming is difficult and verbose. Enter D3.

> D3 allows you to bind arbitrary data to the DOM and then apply data-driven transformations to the document. For example, you can use D3 to generate an HTML table from an array of numbers. Or, use the same data to create an interactive SVG bar chart with smooth transitions.

Mike Bostock built the library and continues to develop it and additional javascript applications. You can view the documentation and working examples on [d3js.org](https://d3js.org/)

### What It's Not

D3 doesn't come with any prebuilt visualizations. D3 aims to be low-level and flexible. There are however many excellent high-level charting libraries out there built on D3 such as [NVD3](http://nvd3.org/) or [Dimple](http://dimplejs.org/).

There are also plenty of other charting tools not built on D3 such as [highchartJS](http://www.highcharts.com/), [chartJS](http://www.chartjs.org/) or [dygraphs](http://dygraphs.com/).

### The Possibilities Are Endless

For those new to data visualization one of the hardest things to conceptualize is what can you actually how do you visualize data. 

- [Obama 2013 Budget](https://archive.nytimes.com/www.nytimes.com/interactive/2012/02/13/us/politics/2013-budget-proposal-graphic.html)
- [Inequality on NYC Subways](https://projects.newyorker.com/story/subway/)
- [Films and FLowers](http://bl.ocks.org/sxywu/raw/d612c6c653fb8b4d7ff3d422be164a5d/)

My own personal projects:

- [Australian Income](https://codepen.io/jkeohan/project/full/AnORMr)
- [Best States to Raise A Child](https://codepen.io/jkeohan/project/full/XzBjYM)
- [Streetball Mecca](https://codepen.io/jkeohan/project/full/ZvKkKE)

D3 Meetup 
- [D3 Meetup](http://d3meetup.surge.sh/pages/meetup.html)

### What We Are Building

This lecture is meant to introduce the fundamental building block of working with D3 and so we will be building out a small visualization to animate random letters being added and removed from an svg element.

- [D3 - Alphabet - Mini Lecture - Solution](https://codepen.io/jkeohan/pen/abNOyMZ)

### Starter Code

We will be using the following CodePen as our starter code:

- [D3 - Alphabet - Mini Lecture - Starter ](https://codepen.io/jkeohan/pen/XWdmerJ?editors=0010)

## Importing CDN

In CodePen we will need to add a CDN link for the latest version of D3. Click on the `gear icon` in the JS section, search for `D3` and then click `enter`.

<img src="https://i.imgur.com/OwMZfoO.png" width=400/>

Once that is complete click `Save & Close` and were ready to start working with the library.

## Review Starter Code

The `HTML, CSS & JS` sections all contain starter code so let's first review and examine the code.

#### HTML

The parent container div contains a `viz` element that will render the svg element and all supporting D3 elements. The buttons will allow us to start and pause the visualization.

```html
<div class="container">
  <div id="viz"></div>
  <button id="start" type="button" class="btn btn-success">Start</button>
  <button id="stop" type="button" class="btn btn-secondary">Pause</button>
</div>
```

#### CSS

Here some basic css has been added for 2 elements, only 1 of which currently exists in the HTML. We will be creating and appending the SVG when we start working with D3.

```css
svg {
  border: 1px lightgray solid;
  height: 200px;
  margin-bottom: 10px;
  width: 750px;
}
button {
  font-size: 20px !important;
  height: 40px;
  width: 80px;
}
```

#### JavaScript

D3 is meant to visualize data and the data set we will work with is an array of the letters of the alphabet. The `render` method is where we will write all of our D3 code and render the elements. 

```js
console.log('this is d3:', d3)

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

render(alphabet);

function render(dataSet) {
  console.log("inside render - dataSet", dataSet);
  // DATA BINDING

  // ENTER 

  // UPDATE 

  // EXIT 
}
```


The `start` and `shuffle` methods will be used to start and update the visual with new data. 

```js

function start() {
  var sI = setInterval(() => {
    render(shuffle());
  }, 2000);
}

function shuffle() {
  let rand = d3
    .shuffle(alphabet)
    .slice(0, Math.floor(Math.random() * 17))
    .sort();
  return rand;
}
```

Examine the console in Dev Tools and you will see the following:

- the D3 object
- An array of individual letters.

<img src="https://i.imgur.com/kfZQeB1.png" width=300/>

### The D3 Object

D3 offers many useful methods that align themselves with building out a specific visualization from the ground up but also methods to help format the data as well. 

<img src="https://i.imgur.com/vQJDVqu.png" width=200/>

### The D3 API Docs

Two of the methods that you will most certainly use when working with D3 are:`d3.select()` and `d3.selectAll()`.  So let's take a minute to look at the API docs for [D3 Selections](https://github.com/d3/d3/blob/master/API.md#selections-d3-selection) 

<!-- <img src="https://i.imgur.com/3GLnrBb.png" /> -->

## Create And Render An SVG

D3 works in a similar fashion to jQuery in that we can with the DOM by creating, appending, editing or removing elements. D3 will also be used to add and respond to event listeners.

The first DOM elements that we will render is an `svg`. SVG stands for `Scalable Vector Graphic` and is used to draw elements on the screen. The second element is a `g` element which is used to group several elements together.

Let's use D3 to select the `#viz` element and `append` both an svg and a nested `g` element.

#### Select the chart


```js
let svg = d3.select("#viz").append("svg").append("g");

render(alphabet);
```

If we examine the DOM in Developer Tools we should now see the following:

<img src="https://i.imgur.com/xc27l0k.png"/>

One thing to note about rendering elements within an SVG is that they need to be provided an `x & y` position. If we look at the `g` in dev tools you will notice that it is at position 0,0 which means the top left.

<img src="https://i.imgur.com/izEMfAo.png" width=150 />

So let's reposition it on both it's x/y axes using the `.attr()` method and `transform/translate` property:value pairs.

```js
let svg = d3
  .select("#viz").append("svg").append("g")
  .attr("transform", "translate(50,100)");
```

Hovering over the element now we should see it has moved 50px left and 100px down from the top.

<img src="https://i.imgur.com/ncIb2Jw.png" width=200/>

### Binding To The Data

Although D3 can grab, create and append elements one of it's major strengths is to bind to a dataset and create specific elements as needed. To do so it uses the `.data()` method.

Now before it binds to the data it needs to know what elements it's going to create, update or delete. In our example we will be initially creating svg `text` elements which will the be updated or removed from the DOM. Since it's quite possible that the elements in the dataSet already exist in the DOM we first need to grab all those elements and then bind the data.


```js
const letters = svg.selectAll("text").data(dataSet);
```

Let's console `letters` and see what it returns. As we can it returns an object. The keys to make note of here are `enter` and `exit`. Enter contains an array of 26 elements and exit an empty array. That is because none of the elements existed in the DOM and considered to be `entering`.

<img src="https://i.imgur.com/02YnjS7.png" />

### Creating The Elements

Creating and visualizing the elements requires the following D3 methods:

- .enter() - binds new data to the elements 
- .exit() - indicates which elements are no longer bound to data
- .append() - appends the type of element to be rendered
- .text() - because we are rendering text we need to provide the actual text to display
- .attr() - so that we can assign attributes and css
- .style() - if we want to assign css specifically

So let's start by appending the elements using `enter`

```js
letters.enter().append('text)
```


Although nothing appears on the screen 26 text elements have been created.

<img src="https://i.imgur.com/6EVR1w1.png" />

They don't however yet contain any text so let's add that.  The `.text()` method takes in a callback where the first argument is the element itself.  In this case a specific letter. 

```js
letters.enter().append('text)
 .text( d => d)
```

Although we have rendered all the text:

<img src="https://i.imgur.com/RIhQ3w9.png" />

It seems they are positioned them at the same x/y coordinate space. 

<img src="https://i.imgur.com/VtDSekH.png" />

As we want the to render horizontally we need to assign each one a unique x position.  To do this we need to use the `attr()` method.  Here we specific the `x` attribute and in callback we provide both the element and it's index.  This works similar to .forEach(), .map() and .filter() in that the element at the first position represent the data and the second position being the index. 

```js
letters.enter().append('text)
 .text( d => d)
 .attr('x', (d,i) => i * 25) 
```

#### Styling

Let's add some styling to the letters using `style()`

```js
letters.enter().append('text)
 .text( d => d)
 .attr('x', (d,i) => i * 25) 
 .style('font-size', 30)
```

One thing to note about svg elements is that they aren't the same DOM elements you have been used to working with in the past.  One such example adding color to the text elements.  At first you might be inclined to use `color` however that won't work.  Being that these text elements are being drawn on the screen they need to be filled with color hence they use `fill`

```js
letters.enter().append('text')
 .text( d => d)
 .attr('x', (d,i) => i * 25) 
 .attr('fill', 'green')
 .style('font-size', 30)
 ```

 ### Updating Elements

What we have rendered so far might not seem to impressive but these are the fundamental building blocks of D3.  

Since we are working with data there might be an instance where the data set changes, such as adding, removing or updating elements.  Regardless of the change the corresponding DOM elements need to be updated as well. 

In order to update all we need to do is reference the original letters variable

```js
// ENTER
letters.enter().append('text')
// ... more code

// UPDATE
letters.attr('fill','blue').attr('x',(d,i) => i * 25)
 ```

Now we have to trigger an update which we can do by using the `start` and `shuffle` helper methods that were included in the code base.  In order to have more control let's use the `Start` and `Pause` buttons.  In order to assign event listeners in d3 we can do the following.

```js
d3.select("#start").on("click", start);
```

And inside of the `start` method let's add the ability to clear the interval.

```js
function start() {
  var sI = setInterval(() => {
    render(shuffle());
  }, 2000);
  d3.select('#stop').on('click', () => clearInterval(sI))
}
```

Now click start and watch the elements update a few times. The green represents elements that are new and being introduced into the data set and blue those elements that already exist and are merely being updated. 

<img src="https://i.imgur.com/vyDQXI2.png" width=400/>

If we examine the console in dev tools we should see the `enter` and `exit` array values have also been updated. 

<img src="https://i.imgur.com/OUFWqML.png"/>

One thing to notice in the visualization is that there is a clear sepraration of of blue and green with all the blue characters at the front followed by green.  We know that the random function should be creating a new data set with random letters so we should expect to see those colors mixed a bit.  

D3 by default uses the elements position in the array to determine if there has been any change and since we want the actual value to be inspected we need to make one change to the `data()` method.

```js
const letters = svg.selectAll("text").data(dataSet, d => d);
```

Ok so now they look like they are updating and the it's clear which ones are entering and updating. Although if we leave the visual running long enough eventually we will see all blue as no elements actually were removed. 

<img src="https://i.imgur.com/rnPYjUA.png" width=400>

It's time to remove letters that are no longer in the DOM nor in the dataset. To do this we use `.exit()` to target those elements and `.remove()` to remove them. 

```js
letters.exit().remove()
```

Not that they are being removed it seems letters are overlapping  and there are gaps in between. 

<img src="https://i.imgur.com/tVzBQGL.png" width=200>

 In order to fix this we need to tell D3 to update the position of the existing elements. 

```js
letters.attr("fill", "blue").attr("x", (d, i) => i * 25)
```

This moves our visualization in the right direction but in order to convey the full story and add some pizazz it would be nice to transition the elements into their assigned positions. For that we move onto transitions. 

### Transitions

The most obvious transition here would be to move the existing elements into their new positions.  This is possible by using both the `transition()` and `duration()` methods.  

`transition` initiates the transition and `duration` sets the time for the length of time for the transition to occur. Since the elements already know their current x cords we can just assign new ones. 

Duration accepts time in milliseconds and so 1000ms = 1sec

```js
  letters.attr("fill", "blue")
    .transition().duration(1000)
        .attr("x", (d, i) => i * 25)
```

#### Transitioning Entering Elements

Looks pretty cool but what about transitioning the new elements.  If we take a look at the working solution we see that those elements come in from the top and then drop into place. Let's try and make them drop into place.  

Here we add 2 transitions.  One for placing the elements on an initial x/y axis and then dropping them into place.  

```js
 letters.enter().append("text").text((d) => d)
    .attr("x", -20).attr("y", -30)
    .attr("fill", "green").style("font-size", 30)
    .transition().duration(1000)
        .attr("x", (d, i) => i * 25)
    .transition().duration(1000)
        .attr("y", 0);
```

#### Transitioning Exiting Elements

The last final touches we need to make in order to recreate the working solution is to transition the exiting elements. Here we will drop them on the y and then slide them off the page on the x. 

```js
letters.exit().attr('fill','red')
    .transition().duration(500).attr('y',20)
    .transition().duration(500).attr('x', 1000)
    .remove()

```


## Closing / Questions


## Resources

- [D3 Documentation](https://github.com/d3/d3/blob/master/API.md)
- [D3.js has just got easier](https://www.createwithdata.com/d3-has-just-got-easier/)
- [React + D3 and their ecosystems](https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/)
- [React Animation Comparison](https://github.com/aholachek/react-animation-comparison)

## Tutorials

- [Scatterplot Workshop](https://github.com/jkeohan/scatterplot-workshop)
