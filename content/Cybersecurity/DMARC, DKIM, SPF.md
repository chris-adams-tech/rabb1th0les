---
title: DMARC, DKIM, SPF
date: 2024-11-21
---
# DKIM & SPF

#### `DKIM` and `SPF` are email authentication protocols. 
* they help prevent spammers, phishers, and unauthorized parties from sending emails on behalf of a domain they do not own.

#### `DMARC` on the other hand tells the mail server what to do if `DKIM` and `SPF` fail.
* this mechanism is what takes action on the email itself
	* marking as "spam", delivering the emails, or dropping the email

---
# Sender Policy Framework (SPF)
* way for a domain to list all servers email is sent from

**Analogy**: Publicly available employee directory that helps someone confirm if an employee works for an organization

> [!info] SPF Records
> These records list all of the IP addresses that are allows to send emails from the domain.

##### In the email transactions, the email would be checked and verified against these records before sending to the recipient's inbox.

---
# DomainKeys Identified Mail (DKIM)
* `DKIM` is the digital signing mechanism for a configured domain.

**Analogy**: When writing a check, a signature verifies the person that signed said check. This is similar to digital signatures, in that the authorized authority creates a cryptographically secure signature that can be verified in the authorized domain.


> [!info] Verification process
> The `DKIM` record stores the domain's public key. When a user sends an email, the *private key* is used to sign the email header. The domain verifies by applying the *public key* and verifying there is a match.

# Domain-based Message Authentication and Reporting and Conformance (DMARC)
* This is the final stage of the email authentication checks.
* It notifies the mail server of the action to take based on results from `SPF` and `DKIM`.
* DMARC policy can be adjusted to the organizational needs.
* Reports can be configured to audit email servers
	* it's crucial for administrators to confirm not only that there are not malicious email senders, but also that employees in their organization are not getting blocked and sent to the intended recipients.


# Where are all these records kept?
* All of the records mentioned above are stored in the `DNS` server (**publicly available**)
* `DNS` also stores many other types of records; `CNAME`, `A records`, `AAAA records`, `PTR records` (**reverse DNS lookups**).
* Records are all kept as `DNS TXT records`.
	* These records can contain any arbitrary text, which is commonly an attack vector. See this page for more information: [[quartz/content/Cybersecurity/Abusing DNS Text Records]]

<div class="neon-line"></div>

Source: https://www.cloudflare.com/learning/email-security/dmarc-dkim-spf/


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


