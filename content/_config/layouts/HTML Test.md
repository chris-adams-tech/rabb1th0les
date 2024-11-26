---
draft: true
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ page.title }}</title>
    <link rel="stylesheet" href="{{ '/assets/css/styles.css' | relative_url }}">
</head>
<body>
    <header>
        <h1>Chris' Cyber Garden</h1>
        <nav>
            <ul>
                <li><a href="/index.html">Home</a></li>
                <li><a href="/about/about-me.html">About Me</a></li>
                <li><a href="/about/build-for-my-website.html">Build for this website</a></li>
                <li><a href="/about/how-to-use-this-website.html">How to Navigate this Website</a></li>
                <li><a href="/selfcreated.html">Self Created Pages</a></li>
                <li><a href="/about/writeup-created-by-info.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        {{ content }}
    </main>
    <footer>
        <p>&copy; 2024 Chris Adams. All rights reserved.</p>
        <nav>
            <ul>
                <li><a href="/terms-and-conditions.html">Terms of Service</a></li>
                <li><a href="/about/writeup-created-by-info.html">Contact</a></li>
            </ul>
        </nav>
    </footer>

