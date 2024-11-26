---
Owner: Chris Adams
title: Escaping strings in Javascript
tags:
  - coding/javascript
  - html
  - application-security
cssclasses: 
date: 2024-11-19
---
<div class="neon-line"></div>





```

Strings are used to represent text-based data and are mostly defined using either single quotes (') or double quotes (").

For example:
```javascript
let name1 = 'The Dude';
let name2 = "The Dude";
```

This identifies the data in between the `' '` or `" "` as the string `The Dude`.

If we wanted to encapsulate another string inside of that string, there are 3 different methods to accomplish this. Otherwise, an error gets thrown because it is reading it as the string is over and continues to read, as if it were code.

```javascript
let quote = "He said, "I learned from freeCodeCamp!"";

Uncaught SyntaxError: Unexpected identifier 'I'
```

As you can see, it is reading the line `"He said, "` as the entirety of the string, processing the rest of the line as code, resulting in an error.

One way to combat this is to use the **Opposite string**, meaning if you are using `' '`, then on either the inside or outside of that clause, place the opposite, either `'` or `"`.

Here's an example:
```javascript
let quote = 'He said, "I learned from freeCodeCamp!"';
console.log(quote); // He said, "I learned from freeCodeCamp!"

let apostrophe = "It's a beautiful day";
console.log(apostrophe); // It's a beautiful day
```

This can also be done by using an **escape** character.

Here's an example:
```javascript
let quote = "He said, \"I learned from freeCodeCamp!\"";
console.log(quote); // He said, "I learned from freeCodeCamp!"

let apostrophe = 'It\'s a beautiful day';
console.log(apostrophe); // It's a beautiful day
```

**Template Literals** can also be used, using syntax `${expression}`

```javascript
let quote = `He said, "I learned from freeCodeCamp!"`;
console.log(quote); // He said, "I learned from freeCodeCamp!"
```

With Template Literals, you don't need to use backslashes to escape characters. Instead, you simply wrap the string in `backticks`.


> [!info] More information
> To read further on why it's important to escape strings, check out this page: [[quartz/content/Cybersecurity/Javascript Obfuscation]]


<div class="neon-line"></div>

Source: https://www.freecodecamp.org/news/how-to-escape-strings-in-javascript/

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

