---
Owner: Chris Adams
date: 2024-10-29
edited: 
layout: new_page
tags:
  - labs/htb
  - cybersecurity/detectionengineering
  - cybersecurity/log-analysis
  - security-engineer/active-directory
  - os/windows
draft:
---
# Detection Opportunities

Golden ticket attacks can be tough to detect. This is because an actor can craft the ticket offline, thus not leaving a trace of the tool used to craft the ticket. 

Instead, we can focus on the extraction methods of the `krbtgt` hash. These can stem from the below attacks:

* **DCSync attack**
* **NTDS.dit file access**
* **LSASS memory read on domain controller** (Sysmon Event ID 10)

*Event ID 4720* can be used to detect newly created users. If a user was created in the process of either a Golden ticket or Silver ticket, that event ID will be generated. 

With these created users there is no validation of user permissions, and thus can be granted with admin privileges. 

*Event ID 4672* can be monitored to detect anomalous assigned privileges.

#### Created on: Oct 29 2024
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
