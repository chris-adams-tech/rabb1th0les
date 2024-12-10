---
Owner: Chris Adams
date: 2024-10-07
Edited: 2024-10-16T01:13:00
tags:
  - automation
  - automation/scripting
  - devsecops
cssclasses: 
title: Selenium
---
# What is Selenium?

Selenium is an open-source tool for automating web browsers. It is primarily used for web application testing.

To begin testing, the **Selenium WebDriver** needs to be installed

> [!NOTE] Info
> Allows control of the browser programmatically. Download the appropriate driver executable for your preferred browser and add it to your system path.

Supported Languages:

> Java, Python, C#, Ruby, and JavaScript

### Setting up the Development environment

* Must have an Integrated Development Environment (IDE) and build tool.
	* Popular tools include; IntelliJ IDEA, Eclipse, and Visual Studio Code

Basic example in Java that navigates to Google and performs a search

```
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class FirstSeleniumTest {
    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.google.com");

        WebElement searchBox = driver.findElement(By.name("q"));
        searchBox.sendKeys("Selenium");
        searchBox.submit();

        WebElement searchResult = driver.findElement(By.cssSelector("#search h3:first-child"));
        assert searchResult.getText().contains("Selenium");

        driver.quit();
    }
}
```

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