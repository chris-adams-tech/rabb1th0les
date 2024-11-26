---
Owner: Chris Adams
date: 
edited: 
tags: 
layout:
---

# Skills Assessment

In this scenario, we are hired as a SOC Tier 1 Analyst at a company named Eagle. Yesterday was onboarding, today we will get familiar with the SOC. 

By the end of the day, we'll begin monitoring alerts and security events. 

#### Here are the provided notes for beginning your analysis


* The organization has moved all hosting to the cloud; the old DMZ network is closed down, so no more servers exist there.
	* *We should not expect any traffic in DMZ, if we do, that should raise suspicions*

* The IT operation team (the core IT admins) consists of four people. They are the only ones with high privileges in the environment.
	* *Note these users, any elevated privs for users outside of this scope, should be investigated.*

* The IT operation team often tends to use the default administrator account(s) even if they are told otherwise.
	* *Thoroughly investigate this user account and implement a policy to mitigate this.*

* All endpoint devices are hardened according to CIS hardening baselines. Whitelisting exists to a limited extent.
	* *Good to note devices are hardened*

 * IT security has created a privileged admin workstation (PAW) and requires that all admin activities be performed on this machine.
	 * *Any admin activities outside of this device should be noted.*

* The Linux environment is primarily 'left over' servers from back in the day, which have very little, if any, activity on a regular day. The root user account is not used; due to audit findings, the account was blocked from connecting remotely, and users who require those rights will need to escalate via the sudo command.
	* *Verify activity if any*

* Naming conventions exist and are strictly followed; for example, service accounts contain '-svc' as part of their name. Service accounts are created with long, complex passwords, and they perform a very specific task (most likely running services locally on machines).
	* *Investigate accounts without naming convention. Scrutinize service accounts.

# Questions

> Review the "Failed logon attempts [All users]" visualization of the "SOC-Alerts" dashboard. Choose one of the following as your answer: "Nothing suspicious", "Consult with IT Operations", "Escalate to a Tier 2/3 analyst" 

We are presented with this dashboard:
![[Pasted image 20241029070252.png]]

There is one more administrator, *eagleAdministrator* below.

There are a few things to note here. 

* We see some failed logins for *administrator* accounts, but nothing that would indicate a brute force attempt.
* There is a login for *anni* which is a disabled account
* Most notably, we see a network login for `sql-svc1`, which should be consulted with the IT operations team to validate, if this was expected.
	* Typically, SQL services are hosted locally on a server and network logins would not be expected.
	* Failed login raises suspicions in itself as passwords do not frequently change. 


> Review the "Failed logon attempts [Disabled user]" visualization of the "SOC-Alerts" dashboard. Choose one of the following as your answer: "Nothing suspicious", "Consult with IT Operations", "Escalate to a Tier 2/3 analyst"

![[Pasted image 20241029071456.png]]


Reviewing the dashboard, there is a failed login attempt for *anni*, whose account is disabled. 

Having failed attempts on a disabled account raises suspicions.

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

