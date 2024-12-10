---
Owner: Chris Adams
date: 2024-10-29
edited: 
layout: new_page
tags:
  - labs/htb
  - os/windows
  - labs
draft:
---
# Detecting Common User/Domain Recon

During an *Active Directory domain reconnaissance*, an adversary attempts to gather as much information about their target environment as possible.

Information threat actors tend to seek:

* environment architecture
* network topology
* security measures (or gaps of)
* potential vulnerabiltiies

Threat actors will focus on more sensitive account, where they are able to execute with more privileges. These can include:

* Domain Controllers
* user accounts
* groups
* trust relationships
* organizational units (OUs)
* group policies
* other vital objects

When a threat actor has a better understanding of a target's environment, it gives them the ability to specify high-value accounts, which can allow them to escalate and move laterally.

## Reconnaissance using Windows Native Executables

The command `net group` will enumerate users within a group. If a threat actor has access to the domain, they could run the command below, which would return a list of *Domain Admins*, or whichever group they are querying.

```cmd
net group "Domain Admins" /domain
```

### Native Windows commands utilized for domain recon

```cmd
whoami /all
wmic computersystem get domain
net user /domain
net group "Domain Admins" /domain
arp -a
nltest /domain_trusts
```

#### Created on: Oct 29, 2024
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