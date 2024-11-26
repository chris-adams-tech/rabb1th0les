---
Owner: Chris Adams
title: Verification Phishing and Cross-IdP Impersonation Attack Sequence
type: article_review
topic: Identity-based attacks
date: 2024-11-25
tags: 
draft: false
reference: https://www.youtube.com/watch?v=53JMEmZV6ck
---
Here is a detailed sequence of events illustrating a verification phishing attack combined with cross-IdP impersonation, drawing specifically on the YouTube video demonstration:

**Target Environment:**

- The victim organization uses **Microsoft Entra** as their primary Identity Provider (IdP) for Single Sign-On (SSO).
- User accounts are strongly protected with **passkeys**, requiring a physical security key and PIN for authentication.
- The organization uses **Atlassian** as a downstream SaaS application, accessed via SSO with Microsoft credentials.

**Attacker's Actions:**

1. **Target Identification:** The attacker identifies a target user within the organization whose Atlassian account they wish to compromise. They obtain the target user's email address (e.g., user@example.com).
    
2. **Account Creation on Alternate IdP:** The attacker creates an account using the target user's email address on a different IdP, such as **Apple**. This is possible because the organization might not have control over account creation on IdPs they do not use.
    
3. **Verification Phishing:** The attacker initiates the account verification process for the newly created Apple account. This typically involves Apple sending a verification code to the target user's email address. The attacker must now convince the target user to provide this code. The video assumes a successful phishing attempt and does not show the specific tactics used.
    
    - **Possible Phishing Scenarios:**
        - The attacker could send a pretext email, disguised as a legitimate communication from Apple, urging the user to click a link and verify their account.
        - They could use IM phishing, leveraging a platform like Slack or Teams to engage in a real-time conversation and manipulate the user into sharing the code.
        - A more sophisticated approach would involve AiTM (attacker-in-the-middle) verification phishing, using a tool like Evilginx to create an interactive phishing website that mimics the genuine Apple verification flow.
4. **Account Verification:** The attacker enters the obtained verification code into the Apple account registration process, successfully verifying the account. At this point, the attacker has full control over this Apple account associated with the target user's email address.
    
5. **Cross-IdP Impersonation:** The attacker navigates to the Atlassian login page and chooses the "Login with Apple" option. They enter the credentials for the newly created Apple account (using their own phone number and password for any additional security checks from Apple).
    
6. **Unauthorized Access:** Since Atlassian allows logins from multiple IdPs, it accepts the Apple credentials and grants the attacker access to the target user's Atlassian account. This bypasses the organization's strong SSO protections in Microsoft Entra, as the login occurs through an external IdP.


**Consequences:**

- **Circumvention of Security Controls:** The attack successfully bypasses the organization's strong authentication measures (passkeys) and SSO implemented through Microsoft Entra.
- **Limited Logging:** No logs are generated in Microsoft Entra, making detection more difficult. Only logs within Atlassian would show the unauthorized access, but these logs might be overlooked or difficult to analyze without proper security monitoring.
- **Data Breach:** The attacker gains access to the target user's data and potentially sensitive information within the Atlassian application.

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
