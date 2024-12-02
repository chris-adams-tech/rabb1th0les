---
title: XSS Example
date: 2024-11-20
type: Technical Guide
topic: Web-Based
---


Cross-Site Scripting (XSS) vulnerabilities in modern frameworks like React are generally harder to exploit than in traditional frameworks because React implements strong protections against XSS by default. However, improper use of React features and JavaScript functions can reintroduce these vulnerabilities. Below are some vulnerable functions or practices that can lead to XSS in a React-based application:

---

## 1. Dangerous Functions and Methods
#### 1. **`dangerouslySetInnerHTML`**
   - **What it does**: Directly injects raw HTML into a DOM element.
   - **Why it's dangerous**: If the input isn't sanitized, attackers can inject malicious scripts.

   - Example of Vulnerable Code:
     ```javascript
     const userInput = '<img src=x onerror=alert(1)>';
     function App() {
         return <div dangerouslySetInnerHTML={{ __html: userInput }} />;
     }
     ```
   - **Safe Practice**: Use libraries like `DOMPurify` to sanitize the input before setting it.

#### 2. Unsanitized use of `innerHTML` (if bypassing React for direct DOM manipulation)
   - **What it does**: Injects raw HTML directly into the DOM.
   - **Why it's dangerous**: If user input is used without proper sanitization, XSS becomes trivial.

   - Example of Vulnerable Code:
     ```javascript
     document.getElementById('app').innerHTML = userInput; // User-controlled input
     ```

#### 3. **Dynamic attribute values in JSX**
   - **What it does**: Dynamically sets attributes like `href`, `src`, or `event handlers`.
   - **Why it's dangerous**: If user input is not properly escaped, an attacker can inject scripts or malicious URLs.

   - Example of Vulnerable Code:
     ```javascript
     const userLink = "javascript:alert('XSS')";
     function App() {
         return <a href={userLink}>Click Me</a>;
     }
     ```

---

## 2. JavaScript Functions
#### 1. **`eval`**
   - **What it does**: Executes strings as JavaScript code.
   - **Why it's dangerous**: Can execute arbitrary code if user-controlled input is passed.
   - **Example of Vulnerable Code**:
     ```javascript
     eval(userInput);
     ```

#### 2. **`Function` Constructor**
   - **What it does**: Creates a new function from a string.
   - **Why it's dangerous**: Executes arbitrary JavaScript from user input.
   - **Example of Vulnerable Code**:
     ```javascript
     const fn = new Function(userInput);
     fn();
     ```

#### 3. **`setTimeout` and `setInterval`**
   - **What they do**: Evaluate code strings or function references after a specified time.
   - **Why they're dangerous**: Using user-controlled strings instead of function references can lead to XSS.
   - **Example of Vulnerable Code**:
     ```javascript
     setTimeout(userInput, 1000); // User input is a string like "alert('XSS')"
     ```

#### 4. **`window.location` and DOM APIs**
   - **What they do**: Directly manipulate or inject HTML or URLs.
   - **Why they're dangerous**: If user-controlled values are used, attackers can exploit them to redirect users or execute scripts.
   - **Example of Vulnerable Code**:
     ```javascript
     window.location = userInput; // Redirect to malicious URL
     ```

---

### **3. Common Misconfigurations**
1. **Improper escaping in JSX**
   - **Scenario**: Rendering raw user input without escaping special characters.
   - **Why it's dangerous**: React escapes content by default, but bypassing this can reintroduce XSS.

   - **Example of Vulnerable Code**:
     ```javascript
     function App() {
         return <div>{userInput}</div>; // No escaping of input
     }
     ```

2. **Improper Content Security Policy (CSP)**
   - **Scenario**: Weak CSP headers allowing unsafe-inline JavaScript execution.
   - **Why it's dangerous**: If attackers find XSS vulnerabilities, a weak CSP amplifies impact.
   - **Solution**: Use a strong CSP that disables `unsafe-inline` and enforces `strict-dynamic`.

3. **Third-party libraries**
   - **Scenario**: Including libraries that aren't properly sanitized or are outdated.
   - **Why it's dangerous**: These can introduce vulnerabilities that attackers exploit.
   - **Example**: Using outdated versions of libraries that reintroduce raw HTML into React apps.

---

### **Mitigations for XSS in React**
1. **Use React's Built-In Protections**:
   - React escapes user input by default when rendering in JSX.

2. **Sanitize User Input**:
   - Use libraries like `DOMPurify` for sanitizing raw HTML if you must use `dangerouslySetInnerHTML`.

3. **Avoid Dangerous Functions**:
   - Refrain from using `eval`, `new Function`, or `dangerouslySetInnerHTML`.

4. **Apply a Strong CSP**:
   - Use a strict Content Security Policy to mitigate script injection.

5. **Use Trusted Libraries**:
   - Ensure third-party dependencies are up-to-date and secure.

6. **Validate and Escape Input**:
   - Validate input server-side and escape it where necessary.

7. **Static Analysis**:
   - Use static analysis tools like `eslint-plugin-react` to catch potential vulnerabilities.

---

### Example Attack Payloads
1. **For `dangerouslySetInnerHTML`:**
   ```html
   <img src="x" onerror="alert('XSS')">
   ```

2. **For `eval` or `Function`:**
   ```javascript
   alert('XSS');
   ```

Understanding these risks and avoiding improper practices helps secure your React applications from XSS vulnerabilities.

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