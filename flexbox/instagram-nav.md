![](/ga_cog.png)

---
Title: Flexbox For Navigation<br>
Duration: "60min"+<br>
Competencies: CSS, Flexbox<br>
Prerequisites: HTML, CSS basics<br>

---

<img src="https://i.ytimg.com/vi/JVYVDpdvdMo/maxresdefault.jpg" width=500/>

### Flexbox For Navigation

When building a web site it's important to distinguish layout from content.  Layout is used to design the overall structure of the site and of course content is then added to those structural elements.  Technologies such as CSS Grid or a front end framework like Bootstrap are often used implement the layout design and Flexbox used for content 

Every website I can think about has included a navigation in one way shape or form.  It's almost impossible to create a site without one.  Although the nav is part of the layout, the elements it's renders are clearly content. So nav content is a great place to use Flexbox.  


### Most Popular Navs

For this lecture we will rebuild the navigation from one of the most popular websites of our time, Instagram.  of our We will be building the twitter navigation, one of the most popular web sites in use today.  

Here is what what we are looking to build:

<img src="https://i.imgur.com/bv7PS8a.png" />

### Design Ideas

Before we add any code let's think about the organization of the content and the content itself. There clearly are 3 separate groups of content separated equidistantly by the available free space.  

As we all know Flexbox has a great property to do just that: `justify-content:space-between`

<img src="https://i.imgur.com/JyIEzWQ.png" />

In order to work through the actual elements we should use try and answer the following questions:

- What elements do you see that you haven't yet worked with?
- What HTML elements could we use to structure the content? 
- How should we handle working with icons?

### Getting Started
Now that we have worked through the questions let's add some code.  We will start will adding basic elements to help structure our navigation.

```html
  <header>
    <nav>
      <ul>
        <li>Instagram</li>
        <li>
          <form><input placeholder="search" /></form>
        </li>
        <li>Home</li>
        <li>Inbox</li>
        <li>Explore</li>
        <li>Activity</li>
        <li>User Profile</li>
      </ul>
    </nav>
  </header>
```

As you can see there are no fancy icons or any CSS added as of yet so our output is rather basic. 

<img src="https://i.imgur.com/oYiQ45J.png" width=200/>

#### Header

Let's add some css to the header.

```css
header {
  padding: 40px 20px;
  border-radius: 5px;
  box-shadow: 5px 55px 50px -20px #b6b6b6;
}
```

<img src="https://i.imgur.com/zJKfupE.png" width=400/>

Ok. So this isn't much better but it helps show where the nav is in relation to the header and adds some new styling that you may not have used before like `box-shadow` or `border-radius`.


#### Font Awesome Icons

It's time to really jazz this up with some icons. Lucky for us there are many free icon based libraries to choose from and we have decided to go with [Font Awesome](). 

Let's work with the right group of elements for now and do a search for `home`. 

<img src="https://i.imgur.com/YlruUNh.png" width=400/>
<br>

Wow. Looks like there are so many `home` icons to work with, and there are if your willing to pay for all of them.  Filter the icons based on `free` and now it looks like we limited our selection down significantly. 

<img src="https://i.imgur.com/9OTFWov.png" width=400/>

So let's click on `home` and see where that leads us. 

<img src="https://i.imgur.com/MpIaNwY.png" width=400/>

Font awesome icons are rendered using `<i>` tags, which as you can imagine is short for icon.  Let's copy that and nest it within the `Home` element and remove the `Home` text

```html
<li><i class="fas fa-home"></i></li>
```

<img src="https://i.imgur.com/PAhyExp.png" width=400/>

Nothing seemed to happen.  That's because we need to import the Font Awesome CSS stylesheet.  Inside the head element add the following:

```html
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
```


**Activity:** Take a moment to search and add the following free icons, as well as remove the text that describes the element

- Inbox
- Explore
- Activity
- User Profile

<details>
<summary>Solution</summary>


```html
<ul>
    <li>Instagram</li>
    <li>
        <form><input placeholder="search" /></form>
    </li>
    <li><i class="fas fa-home"></i></li>
    <li><i class="far fa-paper-plane"></i></li>
    <li><i class="far fa-compass"></i></li>
    <li><i class="far fa-heart"></i></li>
    <li><i class="far fa-user-circle"></i></li>
 </ul>
```

<img src="https://i.imgur.com/Q2A8gPh.png" width=200/>

</details>
<br>

Lastly let's add the `search icon`.

```html
<li>
    <form><input placeholder="search" /><i class="fa fa-search"></i></form>
</li>
```

### Flexbox Time

With our icons in place let's add some flexbox.  Since the `ul` contains all the nav elements it makes sense that this is where we should state.  Were also going to add a few additional css rules here to remove padding and those dots before each li.

```css
ul {
/* FLEXBOX SPECIFIC   */
  display:flex;
  align-items: center;
/* GENERAL STYLING   */
  height: 46px;
  padding: 0 10px;
  list-style: none;
  border-radius: 5px;
  color: rgba(117,117,117 ,1);
  box-shadow: 5px 10px 20px -20px rgba(85,172,238 ,1);
}
```

<img src="https://i.imgur.com/s0Yuduq.png" />

### Defining The Groupings

It was clear from the design that we need to create space between the `logo - search - main icon set`.  We can do that by targeting the search bar and working with margin. 


This setting is applied to the li containing the form so let's add a class called `search` to that li. 

```html
<li class='search'>
 <form><input placeholder="search" /><i class="fa fa-search"></i></form>
</li>
```

The css that we need to add is used anytime you want to center an element that has a width less then the full width of it's parent element. 

```css
li.search {
  margin: 0 auto;
}
```

<img src="https://i.imgur.com/B1p4wUx.png" />

#### Giving Some Space

The icons to the right need a little space between them and for this we will use margin. Since all the nav elements are li's and we only want to target those specific icons we will use the css [:not](https://www.w3schools.com/cssref/sel_not.asp) selector to target all li's but NOT the `last-child` or `.search`

```css
li:not(:last-child):not(.search) {
  margin-right: 10px;
}
```

#### Instagram Title

In order to achieve the styling for the Instagram title in the nav we would have to do some exploring.  The best place to do that would be to investigate the Instagram site in DevTools and examine the css.  

If you browse all the way to the actual text you will find it's not text at all but an image.

<img src="https://i.imgur.com/1xI4NDb.png" width=500/>

It is an asset stored in /static/images/web which we could easily see if we went to the `Sources` tab.

<img src="https://i.imgur.com/wFKYiVx.png" width=400/>

We could download it but since it's just an image we can just right click the image and `copy image url`

<img src="https://i.imgur.com/bsIczlt.png" width=200/>

Then we can update our HTML to include an image tag and add the image there.  Were also going to add a class of `title` so we can target that in CSS as the image will render way too big. 

```html
<li class='title'><img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" /></li>
```
<img src="https://i.imgur.com/UgUVkpP.png" >

And the css for title.  

```css
li.title img {
  width: 125px;
  display: flex;
}
```
This is an example of turning flexbox on an element that is already a flexbox child. 


<img src="https://i.imgur.com/ipoFmt9.png" />

#### Search Bar

The search bar could use a few tweaks.  Although we won't aim to match it exactly like Instagram as that would involve a few new topics that require a much more in depth discussion let's clean it up.

First let's add flexbox to the form.  This is another example of turning flexbox on an element that is already a flexbox child. 

```css
li.search form {
  display: flex;
  align-items: center;
}
```

And now for the input.

```css
li.search input {
   height: 20px;
   margin-right: 5px;
   font-size: 16px;
}
```

<img src="https://i.imgur.com/7KA5nHX.png" width=300/>


#### Final Touches

Let's remove the border around all the elements as see how it looks and increase the font icon size just a bit.

```css
li {
   font-size: 1.3em;
}
```

<img src="https://i.imgur.com/SpSMk4C.png" />

Now that looks pretty nice so congrats on creating your first official nav rebuild of one of the most famous sites out there. 



<!-- <img src="https://i.imgur.com/dY878O7.png" />

<img src="https://i.imgur.com/wQZgKtb.png" /> -->

### References

- [The Most Popular Nav Bars Created With Flexbox](https://medium.com/flexbox-and-grids/the-most-popular-navigation-bars-created-with-flexbox-6c0f59f55686)
