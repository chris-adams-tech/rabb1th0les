---
date: 2024-10-24
title: PowerSploit MITRE and Cyber Kill Chain mapping
type: Technical Guide
topic: MITRE & Cyber Kill Chain
---
### PowerSploit Modules Mapped to MITRE ATT&CK Framework & Cyber Kill Chain

The MITRE ATT&CK framework is a knowledge base of adversary behavior based on real-world observations. Below is a mapping of some key PowerSploit modules to the relevant MITRE ATT&CK techniques.

| **PowerSploit Module**           | **MITRE ATT&CK Tactic | **MITRE ATT&CK Technique**                                   | **Technique ID** | **Cyber Kill Chain Phase** | **Description**                                    |
| -------------------------------- | --------------------- | ------------------------------------------------------------ | ---------------- | -------------------------- | -------------------------------------------------- |
| **Exfiltration**                 |                       | Exfiltration Over Command and Control Channel                | T1041            | Action on Objectives       | Extracting data from the target environment.       |
| **Invoke-ReflectivePEInjection** |                       | Reflective PE Injection                                      | T1055.001        | Exploitation               | Injecting malicious code into running processes.   |
| **Invoke-MaliciousShell**        |                       | Remote Services - SSH Hijacking                              | T1571            | Action on Objectives       | Cleaning up after an exploit.                      |
| **Invoke-PowerShellTcp**         |                       | Remote Access - Remote Services                              | T1021.001        | Delivery                   | Setting up a reverse shell for exploitation.       |
| **Get-UserInfo**                 |                       | Account Discovery                                            | T1087            | Reconnaissance             | Gathering user information.                        |
| **Get-LocalUser**                |                       | Account Discovery                                            | T1087            | Reconnaissance             | Enumerating local user accounts.                   |
| **Invoke-Mimikatz**              | Credential Access     | Credential Dumping                                           | T1003            | Exploitation               | Extracting credentials from memory.                |
| **Invoke-ExpressCredential**     | Credential Access     | Credentials from Password Stores: Windows Credential Manager | T1555.004        | Exploitation               |                                                    |
| **Invoke-AccessToken**           |                       | Access Token Manipulation                                    | T1134            |                            |                                                    |
| **Get-Process**                  |                       | Process Discovery                                            | T1057            |                            |                                                    |
| **Invoke-Shellcode**             |                       | Command and Scripting Interpreter                            | T1059.001        | Exploitation               | Executing payloads directly for command execution. |
| **Invoke-Invoke-DownloadCradle** |                       | Download and Execute                                         | T1203            |                            |                                                    |

### Conclusion

Mapping PowerSploit modules to the MITRE ATT&CK framework and the Cyber Kill Chain can greatly improve your understanding of adversarial tactics and techniques. This knowledge can help you enhance your penetration testing strategies and make better-informed decisions during security assessments.

Feel free to ask if you need further details on any specific module or mapping!

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