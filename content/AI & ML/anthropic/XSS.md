---
tags:
  - web-security
  - vulnerability
  - OWASP-Top-10
  - injection
created: 2024-01-10
modified: 2024-01-10
severity: High
category: Web Application Security
mitre-attack: T1059.007
type: OWASP
---
## Overview
Cross-Site Scripting (XSS) is one of the most prevalent web application security vulnerabilities. It occurs when an application includes untrusted data in a web page without proper validation or escaping. This allows attackers to execute malicious scripts in victims' browsers.

| Attribute | Details |
|-----------|---------|
| Definition | A web security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users |
| Types | Reflected XSS, Stored XSS, DOM-based XSS |
| Affected Systems | Web applications, browsers |
| Severity | High (CVSS Base Score: 6.1-8.8) |
| First Known Occurrence | Late 1990s |
| OWASP Ranking | #3 in OWASP Top 10 (2021) |

## Types of XSS

### 1. Reflected XSS
```html
// Example of vulnerable code
<input type="text" value="<?php echo $_GET['user']; ?>">
```
- Non-persistent attack
- Malicious script is reflected off the web server
- Typically delivered via malicious links
- Executes immediately when the victim clicks the link

### 2. Stored XSS
```html
// Example of stored XSS in a comment system
<div class="comment">
    <?php echo $comment; ?>  // Unfiltered user input
</div>
```
- Persistent attack
- Malicious script is stored on the target server
- Affects any user viewing the infected page
- More dangerous than reflected XSS

### 3. DOM-based XSS
```javascript
// Vulnerable DOM manipulation
document.getElementById('greeting').innerHTML = location.hash.substring(1);
```
- Occurs in client-side JavaScript
- Modifies the DOM environment
- Can bypass server-side protections

## Notable Incidents
1. MySpace Samy Worm (2005)
   - First major XSS worm
   - Infected over 1 million users
   - Created by Samy Kamkar

2. Twitter StalkDaily Worm (2009)
   - Exploited stored XSS vulnerability
   - Forced users to retweet malicious content
   - Affected thousands of users

## Potential Impacts
- Session hijacking
- Credential theft
- Data exfiltration
- Malware distribution
- Website defacement
- Keylogging

## Mitigation Strategies

### Prevention
1. Input Validation
```javascript
// Example of input sanitization
const sanitizedInput = DOMPurify.sanitize(userInput);
```

2. Output Encoding
```javascript
// Example of output encoding
const encodedOutput = he.encode(userContent);
```

3. Content Security Policy (CSP)
```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.com
```

### Detection Methods
- Web Application Firewalls (WAF)
- Regular security scanning
- Code analysis tools
- Runtime application monitoring

### Response Procedures
1. Immediate containment
   - Remove malicious content
   - Block affected endpoints
2. Investigation
   - Review logs
   - Identify attack vector
3. Remediation
   - Patch vulnerabilities
   - Update security controls

## Further Reading
1. [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
2. [PortSwigger XSS Learning Materials](https://portswigger.net/web-security/cross-site-scripting)
3. [Mozilla Web Security Guidelines](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#Cross-site_scripting_(XSS))

#