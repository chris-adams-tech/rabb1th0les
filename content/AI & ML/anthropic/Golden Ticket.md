---
tags:
  - attack
  - kerberos
  - lateral-movement
  - persistence
  - privilege-escalation
  - windows
created: 2024-01-20
modified: 2024-01-20
author: AI Assistant
mitre_id: T1558.001
severity: Critical
type: Privilege Escalation
---
## Overview
A Golden Ticket attack is a severe privilege escalation and persistence technique that exploits Kerberos authentication in Windows domains. By obtaining the KRBTGT account's NTLM hash, attackers can forge valid Ticket Granting Tickets (TGTs) for any user, effectively granting themselves unlimited domain access.

| Attribute | Details |
|-----------|---------|
| Definition | A Kerberos authentication abuse technique where attackers create forged TGTs using the domain's KRBTGT account hash |
| First Known Occurrence | ~2014 (Popularized by Mimikatz) |
| Affected Systems | Windows domains using Kerberos authentication |
| MITRE ATT&CK | T1558.001 - Golden Ticket |
| Severity | Critical - Complete domain compromise |
| Primary Impact | Unrestricted domain access and persistence |

## Technical Details

### How It Works
1. Attacker obtains the KRBTGT account hash (typically through DCSync or domain controller compromise)
2. Using tools like Mimikatz, attacker creates forged TGTs:
```powershell
mimikatz # kerberos::golden /domain:contoso.local /sid:S-1-5-21-... /krbtgt:<hash> /user:admin
```
3. Forged tickets can specify:
   - Any username
   - Any group membership
   - Extended validity periods (beyond normal 10-hour limit)
   - Domain admin privileges

### Key Components
- `KRBTGT Account`: Domain service account used to encrypt/sign all TGTs
- `Ticket Granting Ticket (TGT)`: Kerberos authentication ticket proving identity
- `Key Distribution Center (KDC)`: Domain service validating tickets

## Notable Incidents
- APT29 (Cozy Bear) has utilized Golden Ticket attacks in multiple campaigns
- Several major ransomware groups incorporate Golden Ticket creation for persistence
- Used in the SolarWinds supply chain attack for lateral movement

## Impact and Consequences
- Complete domain compromise
- Persistent backdoor access
- Bypass of most security controls
- Difficult to detect and remove
- Potential for long-term stealth presence

## Detection and Mitigation

### Prevention
1. Protect Domain Controllers
   - Strict access controls
   - Regular password rotations
   - Secure administrative workflows

2. Monitor Critical Accounts
   - KRBTGT account changes
   - Domain Admin activity
   - Unusual authentication patterns

### Detection Methods
1. Event Log Monitoring
```
Event ID 4769 - Unusual TGT requests
Event ID 4624 - Logon events with suspicious patterns
```

2. Network Analysis
- Abnormal Kerberos traffic
- Ticket anomalies (extended validity, unusual privileges)
- Off-hours authentication

### Incident Response
1. Reset KRBTGT password twice
```powershell
# First reset
Reset-DomainKRBTGTAccount -DomainController DC01
# Wait for replication
# Second reset
Reset-DomainKRBTGTAccount -DomainController DC01
```

2. Monitor for:
- New Golden Ticket creation attempts
- Residual access attempts
- Suspicious admin activity

## Further Reading
1. [MITRE ATT&CK - Golden Ticket](https://attack.mitre.org/techniques/T1558/001/)
2. [Microsoft Security Blog - Detecting Kerberos Golden Tickets](https://www.microsoft.com/security/blog/2022/09/07/detecting-and-preventing-kerberos-golden-ticket-attacks/)
3. [SANS Institute - Golden Ticket Attack Analysis](https://www.sans.org/white-papers/36487/)

#kerberos #windows-security #lateral-movement #persistence