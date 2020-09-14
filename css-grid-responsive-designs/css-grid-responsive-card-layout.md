# CSS GRID RESPONSIVE CARD LAYOUT


## Cards

Cards are used extensively on the web and are a great way to viusally display an image along with content relevant to the image. Many sites such as Pinterest, Instagram, Unsplash and Pexels use cards in this fashion. 

For this example, we’re going to make a card with more details about a certain photograph: author’s name and avatar, the photo description, date and a like button.

Here is the design we will be building and a working solution: [CSS Grid Responsive Card](https://codepen.io/jkeohan/pen/bGEQpNN)

![](https://i.imgur.com/0qQYWMZ.png)



### Getting Started

Fork the starter CodePen: [CSS Grid Responsive Image Gallery - Starter](https://codepen.io/jkeohan/pen/gOPQRZG?editors=0100)

### Building The Grid

Lets start by building a grid for this horizontal layout, which works on tables and desktops. Afterwards, we’ll adapt it to mobile by making its content distribute vertically.

#### Grid-Template-Areas

Here is the grid we will be using. Our `grid-template-columns` include two additional keywords `min-content` and `max-content`. Each will respectively adjust the width of the column based on the content.

We are also making use of `grid-template-areas` so we can assign each element a specific spot on the grid by using simple naming conventions.

```css
.card {
  display: grid;
  grid-template-columns: 50% min-content 1fr max-content;
  grid-template-rows: min-content 1fr min-content;
  grid-gap: 10px;
  grid-template-areas:
    "photo avatar author author"
    "photo . description description "
    "photo . . like";
}
```

<img src="https://i.imgur.com/EOYwdNo.png" alt="" width=500/>

Right now, we’ve only told our container how many rows and columns we want, and their sizing functions. The items have been distributed automatically, one in each cell which doesn't quite align with our design.

#### Grid-Area

Lets now assign the elements their specific grid areas.

```css
.photo {
  grid-area: photo;
}

.avatar {
  grid-area: avatar;
}

/*  all remainin elements... */
```

<img src="https://i.imgur.com/LR8mHgc.png" alt="" width=500/>


The only other subtle adjustment we can make is to vertically center the author and date along with horizontally moving the heart icon to the right.

#### Aligning Content

This can be done by targeting those child elements using `align-self` and `justify-self`

```css
.author,
.date {
  align-self: center;
}

.like {
  grid-area: like;
  justify-self: end;
}
```

<img src="https://i.imgur.com/eyeQZpv.png" alt="" width=500/>

### Adding Responsive

There are two steps to achieve the responsive layout we are looking for:

- Define your mobile grid. In our case, we want a grid with only 3 columns instead of 4.
- Redefine your grid-template-areas for the new layout.

```css
@media (max-width: 600px) {
  .card {
    grid-template-columns: min-content 1fr 1fr;
  }
}
```

<img src="https://i.imgur.com/GSlX0WG.png" alt="" width=500/>

We’ve defined a grid with 3 columns for screens smaller than 600px. However you probably noticed that the photo disappears and since the photo is the centerpiece of this display we need to get it back.


This is happening because the placement of the photo item is based on the grid areas defined for a grid with 4 columns, not 3! We have to finish the second step: adapt the grid areas to its new structure.

```css
@media (max-width: 600px) {
  .card {
    grid-template-columns: min-content 1fr 1fr;
    grid-template-areas:
      "avatar author author"
      "photo photo photo"
      "description description description"
      "date date like";
  }
}
```

<img src="https://i.imgur.com/D70gCnv.png" alt="" width=500/>

When the screen shrinks, the grid structure and areas are changed; but items are always matched to an area, so they reposition themselves based on the assigned grid-areas.

### References

- [The Complete CSS Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [CSS Grid Responsive Layouts](https://medium.com/deemaze-software/css-grid-responsive-layouts-and-components-eee1badd5a2f)
