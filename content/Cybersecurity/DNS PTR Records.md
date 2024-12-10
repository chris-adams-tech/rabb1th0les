---
tags:
  - security-engineer/dns
  - security-engineer/email
  - security-engineer/networking
date: 2024-11-21
title: DNS PTR Records
type: Technical Guide
topic: DNS
---
In a regular `DNS` transaction, domain names are resolved to IP addresses and stored under the domain name.
* when typing `google.com` into a browser, the `DNS` server will resolve to an IPv4 (**A record**)/IPv6 (**AAAA record**) address the server can send back to the user to connect.

##### With PTR records **reverse DNS lookups** are used. It is the exact opposite of the **A record** transaction. It starts with an **IP address** then is resolved to the **domain** name. 

`DNS PTR records` are stored under the **IP address** with the syntax `.in-addr.arpa` for **IPv4** and `.ip6.arpa` for **IPv6** addresses.

## PTR records are mainly used in **reverse DNS lookups**

##### Use cases:
* Anti-spam
* Troubleshooting email delivery issues
* Logging


> [!info] Interesting Fact
> `.arpa` was the first top-level domain ever created for the internet!


Source: https://www.cloudflare.com/learning/dns/dns-records/dns-ptr-record/

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