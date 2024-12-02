---
date: 2024-11-21
title: DOM Manipulation in Javascript
type: Technical Guide
topic: Web Apps
---

<div class="neon-line"></div>

"**Document Object Model** (DOM) is a programming interface for web documents that allows to edit structure, style and content of web pages in **Javascript**".

## Accessing DOM elements

In order to make any changes, the `document` object is called.

```javascript
// Accessing an element by its ID
const headerElement = document.getElementById('header');

// Accessing elements by class name
const paragraphs = document.getElementsByClassName('paragraph');

// Accessing elements by tag name
const images = document.getElementsByTagName('img');
```

Source: https://www.freecodecamp.org/news/dom-manipulation-in-javascript/

##### This retrieves the data needed, in order to modify the 3 elements that were pulled. `getElementById`, `getElementsByClassName` , `getElementsByTagName`.

Then, the modifications can happen.

```javascript
// Modifying the content of an element
headerElement.innerHTML = 'New Header Text';
```

# Events and Event Handling
These events are similar to a *conditional clause* where is a user does a certain action, the script executes code in response, such as when a user clicks a button, a new window opens.

### Event Listeners

In order to get a response from the action, such as clicking a button, **event listeners** are implemented to "listen" for specific types of events. 

Here's an example:

```javascript
// Accessing a button element
const myButton = document.getElementById('myButton');

// Adding a click event listener
myButton.addEventListener('click', function() {
    alert('Button Clicked!');
});
```


> [!info] Info on Event Listeners
> This provides a way to execute customer code based on user interactions.

Above is a general overview of DOM manipulation, if you would like to get deeper into the topic, check out `freeCodeCamp` for the full article

https://www.freecodecamp.org/news/dom-manipulation-in-javascript/


#### This brings us to why is it important in Cyber security?

`DOM Based XSS` is the focus of a vulnerability that can be present in these environments. 

##### In this attack, that attack **payload** is executed from modifying the `DOM` environment in the victim's browser (**client-side vulnerability**).

---
<div style="text-align: center;">
	<div class="gradient-text">👾 2024 rabb1th0les (Chris A)dams 👾</div> 
	🌴☀Thanks for supporting my page ☀🌴
	<nav>
		<ul style="list-style: none; padding: 0;">
			<div style="text-align: center;">
				<li><a href="index.html">Home</a> | <a href="Contact.html">Contact</a></li>
			</div>
		</ul>
	</nav>	
</div>