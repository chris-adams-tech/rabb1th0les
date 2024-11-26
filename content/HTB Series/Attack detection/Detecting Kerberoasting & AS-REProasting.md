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
draft:
---
# What is Kerberoasting?

Kerberoasting is a hacking method that focuses on stealing and cracking the passwords of service accounts in Active Directory systems. The attack takes advantage of how Kerberos service tickets are encrypted and often relies on weak passwords. If an attacker cracks these passwords, they can get into service accounts and can move around more freely within the network.

A common tool used for Kerberoasting is Rubeus a C# toolset. Link to the Github repo: https://github.com/GhostPack/Rubeus

## Attack Steps

In an Active Directory environment, there are a variety of services that have service accounts. These service accounts are associated with a *Service Principal Name* or *SPN*. Common services running in enterprise networks:

* SQL Server
* Exchange server
* other applications

The first step then for the attacker is to enumerate services with an *SPN*.

1. Identify Target Service Accounts

After the service account is identified, a request for a *TGS* ticket from the *KDC* is executed

2. Request TGS Tickets

With the noted service account, the request is made to the *KDC*. The provided ticket contains the encrypted service account password hashes. Attempts to crack the hash are in the next step.

3. Offline Brute-Force Attack

Password cracking tools are used such as *Hashcat* or *John the Ripper*, to attempt to crack the password hashes.

# User connecting to service account

These are the steps when a user is connecting to a service account with an SPN. This shows the Kerberos authentication process.

* **TGT Request** - actor requests *TGT* from *KDC* (KDC is usually part of DC)
* **TGT Issue** - KDC verification with password hash, usually; TGT is encrypted with user's secret key; allows service ticket requests without re-auth.
* **Service Ticket Request** - actor sends *TGS-REQ* to *KDC* using obtained *SPN* and obtained *TGT* for the enumerated service.
* **Service Ticket Issue** - *KDC* validates actor's *TGT*, if successful, *TGS* (service ticket) encrypted with service account's secret key is issued
* **Client Connection** - actor connects to server; send *TGS* to server as part of auth process
* **Server Validates TGS** - server decrypts *TGS* and validates data; if valid, access is granted to the actor

## Notable Event IDs for Kerberos Ticket Operations


| Event ID | Name                            | Description                                                              |
| -------- | ------------------------------- | ------------------------------------------------------------------------ |
| 4768     | Kerberos TGT Request            | client requests TGT from KDC; generated in Security log on DC            |
| 4769     | Kerberos Service Ticket Request | client receives TGT and request TGS from server's SPN                    |
| 4624     | Logon                           | In Security log on server; indicates successful logon to service account |

## Kerberos Pre-authentication

This is an additional security mechanism for Kerberos.

When user tries to access a network resource or service, client sends an authentication request *AS-REQ* to the *KDC*.

**If pre-auth is enabled** there will be an encrypted timestamp *pA-ENC-TIMESTAMP*. The *KDC* will decrypt and is successful, actor is issues the *TGT*.
**If pre-auth is disabled** there is no timestamp validation by the *KDC*.

# AS-REProasting Detection

*Event ID 4768* contains a `PreAuthType` attribute that indicates whether pre-auth is enabled or not.

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