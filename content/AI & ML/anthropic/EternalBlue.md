---
tags:
  - vulnerability
  - exploit
  - windows
  - smb
  - malware
created: 2024-01-10
severity: Critical
status: Active
platform: Windows
type: Active Directory
---
## Overview
EternalBlue is a critical exploit that targets Microsoft's Server Message Block (SMB) protocol. Initially developed by the NSA, it was leaked by the Shadow Brokers group and subsequently became one of the most notorious cyber weapons in recent history.

| Attribute | Details |
|-----------|---------|
| Definition | A critical vulnerability in Microsoft's SMB protocol allowing remote code execution |
| CVE | CVE-2017-0144 |
| Affected Systems | Windows Vista, 7, 8.1, 10, Server 2008, 2012, 2016 |
| Severity | CVSS 9.3 (Critical) |
| Discovery | March 14, 2017 |
| Patch | MS17-010 |

## Technical Details
### Exploitation Mechanism
The vulnerability exploits a buffer overflow in SMBv1's handling of specially crafted packets:

1. Attacker sends malformed SMB packets to target system
2. Buffer overflow occurs in `srv2.sys` driver
3. Arbitrary code execution achieved in kernel space
4. Shell access established on compromised system

```powershell
# Common network signature
445/tcp open  microsoft-ds
139/tcp open  netbios-ssn
```

### Attack Chain
1. Initial connection to SMB service
2. Memory corruption via malformed packet
3. Shellcode injection
4. Privilege escalation to SYSTEM
5. Payload execution

## Notable Incidents
- **WannaCry Ransomware (2017)**
  - Infected over 230,000 computers globally
  - Caused estimated damages of $4 billion
  
- **NotPetya Attack (2017)**
  - Targeted Ukrainian infrastructure
  - Caused over $10 billion in damages worldwide

## Impact and Consequences
- Remote code execution with SYSTEM privileges
- Network propagation capabilities
- Data theft and destruction
- System compromise without user interaction
- Potential for ransomware deployment

## Mitigation Strategies

### Prevention
1. Disable SMBv1:
```powershell
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\LanmanServer\Parameters" SMB1 -Type DWORD -Value 0 -Force
```

2. Apply security patches:
- Install MS17-010 security update
- Keep systems updated with latest patches

3. Network segmentation:
- Block TCP ports 445 and 139
- Implement strict firewall rules

### Detection Methods
1. Network Monitoring:
```yaml
alert tcp $EXTERNAL_NET any -> $HOME_NET 445 (
    msg:"ETERNAL BLUE SMB EXPLOIT";
    flow:established,to_server;
    content:"|FF|SMB|75|";
    content:"|00 00 00 00|";
    distance:1; within:4;
    classtype:attempted-admin;
    sid:1000001;
    rev:1;
)
```

2. System Indicators:
- Unexpected SYSTEM-level processes
- High CPU usage from SMB services
- Anomalous network traffic on port 445

### Incident Response
1. Isolate affected systems
2. Block SMB traffic at network boundaries
3. Apply emergency patches
4. Conduct forensic analysis
5. Implement recovery procedures

## Further Reading
1. [Microsoft Security Bulletin MS17-010](https://docs.microsoft.com/en-us/security-updates/SecurityBulletins/2017/ms17-010)
2. [CERT Vulnerability Note VU#867968](https://www.kb.cert.org/vuls/id/867968)
3. [Symantec EternalBlue Analysis](https://www.symantec.com/blogs/threat-intelligence/wannacry-ransomware-attack)

#vulnerability #windows #smb #malware #ransomware