---
Owner: Chris Adams
date: 2024-10-25
edited: 
tags:
  - linux
  - Type/guides
  - cli
draft:
---

At times, you may want to hide your username and host name. There are some commands we can put into the `~/ .bashrc` file that will hide this information

### To display only the username and the current working directory

```bash
PS1='\u@\w \$ '
```

If you would just like the Current Working directory, just remove the `\u` and all done!

To ensure this persists after reboots, this line needs to be added to the `~/ .bashrc` file.

Open the file with vim or nano. I'm a lame nano user 😜

```bash
nano ~/ .bashrc
```

Add the line on a new line in the file and save. Reopen the terminal prompt and good to go!

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

