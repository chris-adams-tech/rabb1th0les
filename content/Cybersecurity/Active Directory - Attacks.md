---
Owner: Chris Adams
date: 
edited: 
tags:
  - windows
  - active-directory
draft: false
---

# Attacks

Active Directory exists nearly in every enterprise network today to some extent and continues to grow with the increasing amount of Azure products. As a defender, I believe it is important to know both the attack vectors threat actors may use, as they are constantly changing. I have found myself diving down quite a few rabbit holes around Active Directory and have found it to be an extremely rewarding learning experience. 

With that in this page I'd like to discuss some common Active Directory attacks and show some examples of executing them in a controlled environment, then reviewing the output in a SIEM. 


> [!INFO] My Lab Environment
> A majority of my content will be run in localized virtual environments, using Wazuh as the SIEM https://wazuh.com/ for the detections. I have grown to really like Wazuh and ELK stack. As of right now, I am using only the Wazuh dashboard and at some point will begin messing around with the other integrations.
> 
> For my hypervisor, I use KVM/Qemu utilizing virt-manager to execute vm execution and sometimes the GUI.

Alright, so on to the Active Directory attacks...


Here are some common Active Directory attacks broken down by 
## Credential Attacks
<div class="neon-line"></div>
### Pass-the-Hash

![[pass-the-hash.svg]]

1. Initial System Compromise:
    - Attacker gains elevated access
	    - This attack requires administrative access
    - Extracts credentials from LSASS process
	    - uses tools such as mimikatz
    - Accesses SAM database for stored hashes
	    - obtains NTLM hash
1. Hash Exploitation:
    - Attacker obtains NTLM hash
    - No need for plaintext password
    - Hash can be used for authentication
2. Lateral Movement:
    - Attacker uses hash for network authentication
    - Connects to other systems
    - Domain Controller validates hash without password
3. Privilege Escalation:
    - Uses compromised admin hashes
    - Gains elevated access on target systems

The diagram also includes:

5. Common Attack Vectors:
    - Tools used (Mimikatz, WCE, PSExec)
    - Vulnerable components
    - Success factors
6. Prevention Methods:
    - Credential Guard
    - LSA Protection
    - Privileged Access Management
    - Multi-Factor Authentication
    - System hardening measures

Color coding is used to distinguish different phases:

- Red: Initial compromise
- Blue: Hash exploitation
- Green: Lateral movement
- Purple: Privilege escalation
- Yellow: Attack vectors
- Cyan: Prevention methods

### Password Spraying
*Work in progress*
### Kerberoasting

> [!INFO] What is Kerberoasting?
> Kerberoasting is an attack technique that involves an attacker abusing the privilege given to authenticated users to request a Ticket Granting Service (TGS) ticket for any servicePrincipalName (SPN) from a domain controller. -- From [[https://wazuh.com/blog/how-to-detect-active-directory-attacks-with-wazuh-part-1-of-2/|Wazuh]]
> 

![[kerberoast.svg]]
## Replication Attacks
<div class="neon-line"></div>
### DCSync

> [!INFO] What is DCSync
> In enterprise networks, all domain controllers and sites with an organization's network must synchronize with each other. An adversary can abuse Directory Replication Service (DRS) by simulating this replication action and therefore, retrieving the password/hash information via domain replication.

Note: This is also used to obtain the `KRBTGT` hash to perform the **Golden Ticket** attack. See below for more information.

In order to successfully obtain the `krbtgt` ticket successfully, the unauthorized user must have access to a *domain user* account with *Replicating Directory Changes* and *Replicating Directory Changes All* privileges. 

I did a little digging into this and users with this control typically fall into the following categories:

* **Domain admin permissions**
* **belongs to Domain Administrator group**
* **explicitly granted replication permissions**

*Source: https://learn.microsoft.com/en-us/troubleshoot/windows-server/windows-security/grant-replicating-directory-changes-permission-adma-service

Here is an example below from my local environment:

After executing this, we can check in Wazuh to verify that we captured the events. 
![[wazuh-dcsync1.png]]
![[wazuh-dcsync.png]]


*Sources: https://blog.netwrix.com/2021/11/30/what-is-dcsync-an-introduction/
https://wazuh.com/blog/how-to-detect-active-directory-attacks-with-wazuh-part-1-of-2/


### DCShadow
*Work in progress*

## Privilege Escalation
<div class="neon-line"></div>
### Golden Ticket


> [!INFO] What is a Golden Ticket attack?
> Golden tickets are a type of attack where an adversary creates a forged ticket via the Kerberos protocol. Since they have a valid hash (see DCSync), Kerberos will encrypt and sign messages using shared secrets.

Note: Kerberos tickets are generated using the password hash of the `KRBTGT` user account. Since this is a high-privilege account, this can allow a threat actor to gain access to sensitive systems and data.

![[golden-ticket.png]]

Now, we can see from running the `misc::cmd` command while in the *mimikatz* module, that we successfully opened a command shell prompt with the forged Kerberos ticket.

![[mimikatz-cmd.png]]

By running this command, within *Wazuh*, we get a detection with the **rule.description** `Windows command prompt started by an abnormal process`.

![[cmd-detection 1.png]]

Cool! So it's detecting the `cmd` spawn from `mimikatz`, let's check out what we see in the fields within the event log data.

![[mimikatz-cmd-spawn.png]]

After reviewing the above, we can see that `mimikatz` is spawning the `cmd` shell and was detected by Windows event logs. 


> [!INFO] Log Sources in Wazuh
> When viewing fields within the Wazuh Discover dashboard, the field `data.win.system.channel` will show the source of the data. For example in Sysmon logging, the `data.win.system.channel` appears as `Microsoft-Windows-Sysmon/Operational`.


After running the command `klist`, we will see that the ticket that is currently loaded, is the ticket we previously generated for the user "notJohn".

![[mimikatz-klist.png]]
### AdminSDHolder and SDProp Abuse
*Work in progress*

## Reconnaissance and Mapping
<div class="neon-line"></div>

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