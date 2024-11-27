---
type: article_review
title: "Verification Phishing and Cross-IdP Impersonation: Unmasking the Next Generation of Phishing Attacks"
topic: Identity-based attacks
author: Luke Jennings
reference: https://pushsecurity.com/blog/a-new-class-of-phishing-verification-phishing-and-cross-idp-impersonation/
relevance: phishing
date_published: 
date_reviewed: 2024-11-25
tags:
  - article_review
  - phishing
  - mfa-bypass
  - cyber-trends
review_rating:
---
# Article Review: **Verification Phishing and Cross-IdP Impersonation: Unmasking the Next Generation of Phishing Attacks**

## Summary

In this Push Security article, Luke introduces a new class of phishing attacks called **verification phishing**, often combined with **cross-IdP impersonation**, which poses significant risks to organizations relying on strong SSO controls.

**Understanding the Threat**

In the world we live in today, authenticating to so many different applications and services, it can be very easy to just push the "Authorize" button. Though, as annoying as it can be, that is quickly becoming a popular entry point for threat actors, enabling them to gain access without a password, or MFA. Though being convenient, SSO can have it's downsides. Now, to me this doesn't mean that SSO is faulty or insecure, it really just comes down to the implementation and configuration of it.

Here are a couple of related attack types:

- **Verification Phishing:** Targets users to verify accounts on applications they don't use, often using legitimate-looking emails with links or verification codes. Attackers exploit the user's trust in familiar platforms and the seemingly low risk associated with verification actions.
- **Cross-IdP Impersonation:** Exploits the flexibility of SaaS applications that support multiple login methods. Attackers authenticate using an IdP (Identity Provider) different from the organization's primary IdP, bypassing SSO controls and accessing downstream SaaS applications.

**Attack Scenarios and Sophistication Levels**

- **Pretext Emails:** Attackers send emails creating a false pretext, leading users to believe they should expect a verification email, increasing trust in the subsequent legitimate-looking verification email.
- **IM Phishing:** Leverages the trust users place in instant messaging platforms like Slack and Teams. Attackers engage in real-time social engineering efforts to obtain verification codes, capitalizing on the immediacy of the communication.
- **AiTM Verification Phishing:** Represents a highly sophisticated approach using tools like Evilginx to create interactive phishing websites that automate the verification process, making the attack more effective and scalable.

Essentially, these threat actors are trying to capture the verification codes in order to create a new account under a different SSO provider, that may or may not be accounted for in the enterprise organization.

### Technical Explanation of Cross-IdP Impersonation

- **Exploiting Multiple Login Methods:** Many SaaS applications offer various authentication options, such as logging in with Google, Apple, or Microsoft accounts, to accommodate diverse user preferences.
- **Bypassing Primary IdP:** Attackers can exploit this flexibility by creating an account using the target user’s email address on an IdP **different** from the organization’s primary IdP. This allows them to log in directly to the SaaS application without ever interacting with the organization’s secure SSO system. For example, if an organization uses Microsoft Entra for SSO, an attacker could create an Apple account with the target's email address and then log in to a vulnerable SaaS application using "Login with Apple."
- **Lack of Centralized Logs:** Because the login occurs through the attacker's external IdP account, there are no logs generated in the organization's primary IdP to indicate this unauthorized access. The only logs would exist within the compromised SaaS application itself, making detection more difficult.

### Technical Explanation of Verification Phishing

- **Targeting Unused Applications:** The attack focuses on registering accounts on applications the target user (and their organization) does not currently use. This exploits the lower priority organizations place on preventing account creation on non-business applications.
- **Exploiting Verification Mechanisms:** SaaS vendors often use email verification to prevent spam and abuse. Attackers exploit this by setting up the account and then using phishing or social engineering to trick the user into clicking a verification link or providing the verification code sent to their email.
- **Social Engineering Techniques:** The article describes three technical approaches for verification phishing, each with varying levels of sophistication:
    - **Pretext Emails:** Prepare the user for the incoming verification email by creating a false sense of legitimacy and expectation.
    - **IM Phishing:** Uses the real-time nature and perceived trustworthiness of instant messaging platforms to manipulate users into revealing verification codes.
    - **AiTM Verification Phishing:** Leverages advanced tools like Evilginx to automate the phishing process, creating interactive websites that mimic legitimate verification flows.

### Technical Details of AiTM Verification Phishing

![[quartz/content/img/idp-access.svg]]

- **Interactive Phishing Website:** The attacker creates a fake website that closely resembles the legitimate application's registration process.
- **Automated Account Registration:** When the user clicks a verification button, the AiTM tool automatically registers a new account using the target's email address.
- **Verification Code Prompt:** The website prompts the user to enter the verification code they receive in their email inbox.
- **Account Verification:** The AiTM tool uses the supplied code to verify the account, granting the attacker access.

**Impact and Persistence**

* Bypasses Strong SSO Controls: Cross-IdP impersonation allows attackers to circumvent strong password requirements, MFA, phishing-resistant authentication, IP/location restrictions, and authentication logs enforced by the organization's primary SSO.
- Powerful Persistence Mechanism: Attackers can create ghost logins on downstream SaaS applications by registering accounts with other IdPs using the compromised user's email address. This maintains access even if the original SSO or email compromise is detected and remediated.

### Persistence Techniques

- **Ghost Logins:** Attackers often create multiple access points (ghost logins) to maintain access to compromised accounts.
- **Cross-IdP Impersonation for Persistence:** The article highlights how cross-IdP impersonation acts as a powerful ghost login method. By registering an account with another IdP using the target's email, attackers can maintain access to vulnerable SaaS applications even if their initial access is revoked.


**Mitigation Recommendations**

- **Lock Your Domain with Other IdPs:** Register and lock your domain with major IdPs like Apple and Google to prevent the creation of personal accounts using your organization's email domain.
- **Detect Verification Emails from IdPs:** Implement detection rules in your security monitoring systems to alert on verification requests from IdP vendors outside your organization's primary IdP.
- **Audit SaaS Applications:** Identify all SaaS applications in use, their login methods, and potential vulnerabilities to cross-IdP impersonation. Restrict authentication options in application settings where possible, and pressure vendors to implement stronger security controls.
- **Red Team Simulations:** Include cross-IdP impersonation and verification phishing scenarios in red team exercises to assess your organization's vulnerability and the effectiveness of detection and response controls.

### SaaS Application Vulnerabilities and Controls

The article provides a technical analysis of different SaaS application behaviors and configurations that influence the effectiveness of cross-IdP impersonation:

- **Default Allow:** Vulnerable by default, allowing any sign-in method after account creation. The article specifically mentions Atlassian as an example, but emphasizes that this issue is widespread.
- **Email Verification:** Offers some mitigation by requiring additional email verification for new login methods. Examples include Adobe and HubSpot.
- **Device Verification:** Triggers verification for logins from new devices, again adding an extra layer of protection.
- **Pinned Authentication:** The most effective control, restricting authentication to the method used during initial account creation. The article cites Mailchimp as an example.
- **Configurable Controls:** Allows administrators to disable specific login methods, enhancing security. Examples include Atlassian Guard and Datadog.

---

This article goes into great detail into the mechanisms that could potentially enable an organization to be vulnerable to this type of attack. As always, it's best to ensure that your organization has the proper security controls in place to mitigate these types of attacks. With the rise of AI, and other types of tools enabling the ease of these phishing attacks, it is crucial to stay on top of current trends in order to ensure we are best protected. 

Beyond what is mentioned for the technical controls, one of our primary defenses can be implementing user security awareness training, one that is simple and consistent. Keeping your employees informed about the latest types of attacks can greatly reduce the likelihood of such events occurring. 


## Personal Analysis

### Strengths:

- **What did you find most compelling or well-done?**
- Highlight any unique perspectives, clarity, or data points.

### Weaknesses:

- **Where does the article fall short?**
- Note any logical fallacies, unsupported claims, or missing context.

---

## Key Quotes

- "Copy and paste important quotes here, along with your thoughts or why they matter."
    - **Example**: _"Cybersecurity is no longer a siloed field; it's the backbone of all digital innovation."_ – How this frames the importance of cybersecurity as a universal concern.

---

## Application to Cybersecurity (or Field of Interest)

> Discuss how this article connects to your current work, goals, or knowledge.

### Connections to Other Topics:

- **Relate this article to similar trends or articles you've reviewed.**

### How Will You Use This Information?

- Will you change how you approach a problem?
- Does this inform a project, workflow, or decision?

---

## Conclusion

- Final thoughts on the article.
- How would you rate its usefulness (1–5 stars) and credibility?
- Would you recommend it to others in your field?

If you want to check out the attack sequence, see this related page [[Verification Phishing and Cross-IdP Impersonation Attack Sequence]]

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