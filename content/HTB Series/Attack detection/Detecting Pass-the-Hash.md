---
Owner: Chris Adams
date: 2024-10-29
edited: 
layout: new_page
tags:
  - labs/htb
  - active-directory
  - windows
  - detections
  - log-analysis
  - analysis/event-logs
draft:
---
# What is a Pass-the-Hash attack?

Pass-the-Hash is a method employed by attackers to gain access to a networked system by using the NTLM hash of a user's password instead of the actual plaintext password. This technique exploits how Windows keeps password hashes in memory, allowing attackers with administrative privileges to capture the hash and use it for moving laterally within the network.

## Attack Steps

A common tool used is *Mimikatz* to extract the *NTLM* hash of a user that's currently logged onto the compromised system.


> [!NOTE] Privs
> Local admin privileges are required to extract user's hash.

* Capturing this hash allows an attacker to authenticate as the targeted user on other systems or network resources without needing the password. 

* With this authenticated session, the actor is able to move laterally within a network.

```cmd
C:\Windows\system32>dir \\dc01\c$
```

![[Screenshot from 2024-10-29 14-02-31.png]]

*Image sourced from HacktheBox: Detecting Pass-the-Hash module*

# Window Access Tokens & Alternate Credentials

* **Access Token** - contains info about user account's identity and privileges
	* access tokens are generated during successful user logons
	* any process executed on behalf of that user possesses a copy of this access token
		* any process executed on behalf of that user
		* https://learn.microsoft.com/en-us/windows/win32/secauthz/access-tokens
* **Alternate Credentials** - enables different login credentials for specific actions without altering user's primary login session.
	* "The runas command is a Windows command-line tool that allows users to execute commands as another user." - Source:https://academy.hackthebox.com/module/233/section/2527
		* Consequently, when `runas` is executed, a new access token is generated.

# Reviewing Pass-the-Hash Events

When reviewing login events, specifically the Event ID `4624` for a successful login, a normal login will have a *LogonType* as `2` or `Interactive`, whereas in a Pass-the-Hash event, the *LogonType* appears as a `9` or `NewCredential`

The *LogonProcess* will always be `seclogo`


Below is normal NTLM authentcation:

| **Source Host**                                            | **Target Host**                                                  | **Domain Controller**                                                     |
| ---------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------- |
| 4648 – A logon was attempted using explicit credentials.   | 4624 – An account was successfully logged on. Logon Type 3, NTLM | 4768 – A Kerberos authentication ticket (TGT) was requested.              |
| 4624 – An account was successfully logged on. Logon Type 2 | 4672 – Special privileges assigned to new logon.                 | 4769 – A Kerberos service ticket was requested.                           |
| 4672 – Special privileges assigned to new logon.           |                                                                  | 4776 – The computer attempted to validate the credentials for an account. |
Below is when a Pass-the-Hash is executed

| **Source Host**                                                                          | **Target Host**                                                  | **Domain Controller**                                                     |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------- |
| 4648 – A logon was attempted using explicit credentials.                                 | 4624 – An account was successfully logged on. Logon Type 3, NTLM | 4776 – The computer attempted to validate the credentials for an account. |
| 4624 – An account was successfully logged on. (Logon Type 9; Logon Process “Seclogo”)    | 4672 – Special privileges assigned to new logon.                 |                                                                           |
| 4672 – Special privileges assigned to new logon. (Logged-on user, not impersonated user) |                                                                  |                                                                           |

# Detecting with Sysmon

Monitoring process access events in Sysmon can effectively detect Pass-the-Hash attacks. 

*Event ID 10* showing *LSASS* process access from *Mimikatz* or other similar tool.

## Building Detections for PtH

```
4624 events on your workstations with:
	Logon Type = 9
    Authentication Package = Negotiate
    Logon Process = seclogo
Sysmon 10 events for LSASS process access
```

### Customer Event Filter

```
<QueryList>
  <Query Id="0" Path="Security">
    <Select Path="Security">
     *[System[(EventID='4624')]
      and
     EventData[Data[@Name='LogonType']='9']
      and
     EventData[Data[@Name='LogonProcessName']='seclogo']
     and
     EventData[Data[@Name='AuthenticationPackageName']='Negotiate']
     ]
     </Select>
  </Query>
  <Query Id="0" Path="Microsoft-Windows-Sysmon/Operational">
    <Select Path="Microsoft-Windows-Sysmon/Operational">
    *[System[(EventID=10)]]
    and
    *[EventData[Data[@Name='GrantedAccess'] and (Data='0x1010' or Data='0x1038')]]
</Select>
  </Query>
</QueryList>
```


Source: https://blog.netwrix.com/2021/11/30/how-to-detect-pass-the-hash-attacks/

#### Created on: 
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
