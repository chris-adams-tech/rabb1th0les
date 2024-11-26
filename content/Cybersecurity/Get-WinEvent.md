---
date: 2024-10-24
title: Get-WinEvent
---

The `Get-WinEvent` command is a PowerShell tool that assists in querying for Windows Event Logs.

### To list all the logs and display essential properties
```Powershell
Get-WinEvent -ListLog * | Select-Object LogName, RecordCount, IsClassicLog, IsClassicLog, IsEnabled, LogMode, LogType | Format-Table -Autosize
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