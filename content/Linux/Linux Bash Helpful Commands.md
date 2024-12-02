---
cssclasses: 
title: Linux Bash Helpful Commands
date: 2024-11-12
---

**Data Stream for Input**
        STDIN – 0
**Data Stream for Output**
        STDOUT – 1
**Data Stream for Output that relates to an error occurring.**
        STDERR – 2

Now, what does this mean? And how do we use it?
## Redirecting data

Let's take an example looking for the string `shadow` in the `/etc/` directory. 

![[_attachments/lin-bash.png]]
* `find /etc/ -name shadow` - STDIN - 0
* `/etc/shadow` - STDOUT - 1
* `Permission denied` - STDERR -2

Let's say for the output, we don't want to see any of the errors (`STDERR - 2`).

The following code can be run to output and errors to `/dev/null`, essentially just getting rid out the output and not saving it anywhere.

```bash
find /etc/ -name shadow 2>/dev/null
```

![[_attachments/lin-bash1.png]]

This will only output the `STDOUT -1` or the `/etc/shadow` file, removing any extra noise from the errors that are produced.

The output can also be redirected to files, as seen below:

```bash
find /etc/ -name shadow 2> stderr.txt 1> stdout.txt
```

Using a `>` to redirect `STDOUT` will create a new file automatically, if it does not exist. If it does exist, it will be overwritten without asking for confirmation.

If the goal is to *append* `STDOUT` to the existing file, use the `>>` sign.

```bash
find /etc/ -name passwd >> stdout.txt 2>/dev/null
```

### Redirecting `STDIN` Stream to a file

```bash
cat << EOF > stream.txt
```

![[_attachments/lin-bash2.png]]
Notice from the screenshot below that the script will continue to go, until the command `EOF` is entered. Additionally, if the command is run multiple times, as we've discussed previously, the data will be overwritten.

![[_attachments/lin-bash3.png]]

<div class="neon-line"></div>

### Using Pipes in Bash

Piping commands is extremely helpful for chaining tasks together, or in other words, when we want the `STDOUT` from one program to be processed by another. 

Let's say that you are using the `ls` command to list files in a directory. If there are tons of files, it can be hard to sort through. This is where the `|` (**Pipe**) comes in handy.

#### Another example piping commands together:

```bash
find /etc/ -name *.conf 2>/dev/null | grep systemd | wc -l
```

# Shortcuts

|**Category**|**Shortcut**|**Description**|
|---|---|---|
|**Auto-Complete**|`[TAB]`|Initiates auto-complete to suggest options like directories, commands, or options based on input.|
|**Cursor Movement**|`[CTRL] + A`|Move the cursor to the beginning of the current line.|
||`[CTRL] + E`|Move the cursor to the end of the current line.|
||`[CTRL] + [←]/[→]`|Jump to the beginning of the current/previous word.|
||`[ALT] + B/F`|Jump backward/forward one word.|
|**Erase The Current Line**|`[CTRL] + U`|Erase from cursor position to the beginning of the line.|
||`[CTRL] + K`|Erase from cursor position to the end of the line.|
||`[CTRL] + W`|Erase the word preceding the cursor.|
|**Paste Erased Contents**|`[CTRL] + Y`|Pastes erased text or words.|
|**Ends Task**|`[CTRL] + C`|Ends the current task/process by sending the SIGINT signal (e.g., stop a running scan).|
|**End-of-File (EOF)**|`[CTRL] + D`|Closes STDIN pipe (EOF or End-of-Transmission).|
|**Clear Terminal**|`[CTRL] + L`|Clears the terminal (alternative to `clear` command).|
|**Background a Process**|`[CTRL] + Z`|Suspend the current process by sending the SIGTSTP signal.|
|**Search Through Command History**|`[CTRL] + R`|Search through command history for commands matching patterns.|
||`[↑]/[↓]`|Navigate to the previous/next command in command history.|
|**Switch Between Applications**|`[ALT] + [TAB]`|Switch between opened applications.|
|**Zoom**|`[CTRL] + [+]`|Zoom in.|
||`[CTRL] + [-]`|Zoom out.|

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