---
Owner: Chris Adams
date: 2024-11-19
Edited: 
layout: new_page
tags:
  - security-engineer/active-directory
  - security-engineer/powershell
cssclasses: 
title: Automating Active Directory Administration
type: Technical Guide
topic: Active Directory
---
In this page, we will dive into some helpful `Powershell` commands to automate and be efficient with administration.


> [!info] Note on PowerShell ISE
> PowerShell ISE will show the list of commands on the right hand side.

<div class="neon-line"></div>
## Using the `Get` and `Help` commands

> - To go back a directory use the `\` key in the CLI
> - If you are unsure of the command to use type `Get-` then by pressing `TAB`, it will being showing the options available. 
> - Alternatively, the `Get-Command` will dump the list of available commands.

The command below will display the information related to that function.
`get-help add-printer -examples`

Syntax for adding a printer
```powershell
Add-Printer -ConnectionName \\printerServer\printerName
```


> [!info] Filtering output
> By doing a pipe, `| more` , this will allow you to page through the output, rather than displaying everything at once. 

<div class="neon-line"></div>
### Creating an alias

```powershell
new-alias <alias-name> <command-name>
```

To display the available alias

```powershell
get-alias | more
```

This will display the active alias within your environment.

<div class="neon-line"></div>
# Creating PowerShell scripts

Scripts can be created by using the `PowerShell` ISE or `VScode`, there are also many other options. The script can be created then must be saved as a `.ps1` file. 

When executing, the present working directory needs to be in the directory the `ps` script resides. 

If running a large script, it can be tough to view in a terminal window. In these cases, it is better to forward the output to a new file. See below:

```Powershell
./test.ps1 > c:\testscript.txt
```

If you want to interact with `Active Directory` but are not on a domain controller, run this command:

```powershell
import-module -name activedirectory
```

<div class="neon-line"></div>
### To get all Active Directory users

```powershell
get-aduser -filter * | more
```


Source: LinkedIn Learning: Advanced PowerShell: Automating Active Directory Administration - Robert McMillen

#### Created on: Nov 19, 2024
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






