# CSS GRID RESPONSIVE IMAGE GALLERY 

## Image Galleries

Images galleries are used quite extensively on the web and are a great way to viusally show a collection of images. Many sites such as Pinterest, Instagram, Unsplash and Pexels use image galleries as the main display for content.

Our goal today is to build a photo gallery using CSS Grid and orgnaize responsive layouts. Here is what we will be building and a working solution: [CSS Grid Responsive Image Gallery](https://codepen.io/jkeohan/live/WNrYvow)



![](https://i.imgur.com/GBfIEEK.jpg)


### Getting Started

Fork the starter CodePen: [CSS Grid Responsive Image Gallery - Starter](https://codepen.io/jkeohan/pen/zYrMrmZ?editors=1100)

### Initial Setup

Start by assigning the .`gallery` as the main grid container with a `grid-gap` of `10px`. 

```css
.gallery {
  display: grid;
  grid-gap: 10px;
}
```

![](https://i.imgur.com/0VWPaRZ.jpg)

As you can see we have a grid with one column and a gap of 10px. The items on the grid get their heights from the images inside them and when needed will stritch to occupy the full grid width. 

Since the images are of different widths lets try to standardize the display by setting the `width` of each image to `100%`

```css
.item {
  width: 100%;
}
```

![](https://i.imgur.com/FQuOjtQ.jpg)

### View All Images

The images look great but it would be better to see as many of them in one view on the page. That means we need to create additional columns so let's make a layout with 4 equal columns.

```css
.gallery {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(4, 1fr);
}
```

![](https://i.imgur.com/urnRt2y.jpg)

The images are responsive however on a smaller viewport the images would scale down too much to see.

Let's add CSS Grid `minmax()` to force the images to be a specific min width but also expand on larger viewports.

```css
.gallery {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
}
```

![](https://i.imgur.com/gK4ozYN.jpg)

It's an improvement but now on a smaller viewport some photos are moved to the right and our of view.  A much better approach would be to move the image to the next row once it no longer fits.  The images should also stretch to occupy the space available once moved to the new row.

#### Auto-Fill

CSS Grid has two really powerful properties that allow the grid to calculate how many to fit in the available space. They are `auto-fill` and `auto-fit`

> auto-fill: With a given minimum track size, the number of track repetitions is the largest possible that does not cause the grid to overflow the container.

> auto-fit: Initial behaviour is the same as auto-fill.
> After all items are placed, if there are any empty tracks, those tracks are collapsed. This means those tracks are treated as having a track sizing function of 0px and the gutters (or any other automatic spacings) around them are collapsed as well.

`Auto-fill` will create empty tracks because it will create as many tracks as possible in the available space. Auto-fill will remove the empty tracks and allow the others to expand and occupy the remaining space.

```css
.gallery {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
```

![](https://i.imgur.com/fmA6ub1.jpg)

Now we have a nice responsive behaviour for several screen widths without using any media queries.

### Standardize Image Heights

One thing to make note of is that the images have different proportions which leaves empty space inside their containers. We can fix that by using `grid-auto-rows` for the grid and by assigning `height` and `object-fit` to the images.

#### Grid-Auto-Rows

With `grid-auto-rows` we can set different heights for each row which will then be implicitly created every time a new row is dynamically added.

```css
.gallery {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 250px 150px;
}
```

![](https://i.imgur.com/EmCaGwD.jpg)

#### Object-Fit: Cover

Setting images to use `cover` will fill their entire container without leaving blanks nor distorting the image. This is why we defined heights for the tracks; we want the photos to adjust to the container and not the other way around!

```css
.item {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

![](https://i.imgur.com/p0b7Bhy.jpg)

### Highlighting Specific Pictures

There maybe an instance, say for larger viewports, where one or more images should stand out by increasing their height/width and making them occupy two lines and two rows. We could also extend the design and make every third picture use two columns.


#### Media Queries

This type of functionality does requires that we make use of media queries.  We will set the query to take effect only when `min-width: 480px` and then only target the first and every other third image. 

```css
@media (min-width: 480px) {
  .item:first-child {
    grid-area: 1 / 1 / span 2 / span 2;
  }
  .item:nth-child(3n) {
    grid-column: span 2;
  }
}
```

![](https://i.imgur.com/zGUfUz2.jpg)

### Filling In The Gaps

The design works but at the expense of adding a lot of holes and empty space. In order to resolve this we can use the `grid-auto-flow` property to change the order by which the items are placed on the grid.


#### Grid-Auto-Flow
 There are three values available:

- row (default) - fills horizontally
- column - fills vertically
- dense - grid attempts to fill in the holes with smaller items

Using `dense` does the job even though the order of the pictures might change. We have to give CSS Grid some credit as it is trying it's best to make the layout as responsive as possible while keeping our original vision of the layout intact. 

```css
.gallery {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 250px 150px;
  grid-auto-flow: dense;
}
```

![](https://i.imgur.com/TywW7da.jpg)

Complete solution: [CSS Grid Responsive Image Gallery](https://codepen.io/jkeohan/pen/WNrYvow)

### References

- [The Complete CSS Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [CSS Grid Responsive Layouts](https://medium.com/deemaze-software/css-grid-responsive-layouts-and-components-eee1badd5a2f)
