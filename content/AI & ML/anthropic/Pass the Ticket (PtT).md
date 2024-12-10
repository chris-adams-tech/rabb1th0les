---
tags:
  - attack/lateral-movement
  - mitre/T1550.003
  - windows
  - active-directory
  - kerberos
created: 2024-01-10
modified: 2024-01-10
severity: High
platform: Windows
mitre_url: https://attack.mitre.org/techniques/T1550/003/
type: Active Directory
---
## Overview
Pass the Ticket (PtT) is a lateral movement technique where attackers leverage stolen or forged Kerberos tickets to authenticate across a Windows domain without requiring direct password access. This attack exploits the Kerberos authentication protocol's ticket-based system.

| Attribute | Details |
|-----------|---------|
| Definition | A technique where an attacker steals or forges Kerberos tickets to move laterally within a network |
| Associated MITRE ID | T1550.003 |
| Affected Systems | Windows domains using Kerberos authentication |
| Severity | High |
| First Known Use | ~2000s with the rise of Active Directory attacks |
| Common Tools | Mimikatz, Rubeus, Impacket |

## Technical Details

### How It Works
1. **Ticket Acquisition**
   - Extracting tickets from LSASS memory
   - Creating forged tickets (Golden/Silver tickets)
   - Harvesting from legitimate sessions

2. **Ticket Types**
```plaintext
- TGT (Ticket Granting Ticket)
- TGS (Ticket Granting Service)
- Silver Tickets (forged service tickets)
- Golden Tickets (forged TGTs)
```

### Common Attack Flow
1. Attacker gains initial access to a system
2. Extracts Kerberos tickets using tools like Mimikatz
3. Injects stolen tickets into current session
4. Moves laterally using the compromised tickets

## Notable Examples
- **APT29** extensively used PtT techniques in their campaigns
- The **SolarWinds** attack utilized PtT for lateral movement
- **NOBELIUM** operations frequently leverage ticket-based attacks

## Impact and Consequences
- Undetected lateral movement
- Privilege escalation
- Persistent access to network resources
- Bypass of traditional authentication controls

## Detection and Mitigation

### Prevention
- Implement Protected Users security group
- Enable PAC validation
- Use time-limited service accounts
- Deploy Advanced Threat Analytics (ATA)

### Detection Methods
```powershell
# Example Event IDs to monitor
4624 - Successful account logon
4768 - Kerberos TGT requested
4769 - Kerberos service ticket requested
4771 - Kerberos pre-authentication failed
```

### Response Procedures
1. **Immediate Actions**
   - Isolate affected systems
   - Reset compromised account credentials
   - Review authentication logs

2. **Long-term Measures**
   - Implement privileged access workstations
   - Deploy EDR solutions
   - Regular security assessments

## Further Reading
1. [Microsoft - Kerberos Authentication Overview](https://docs.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview)
2. [MITRE ATT&CK - Pass the Ticket](https://attack.mitre.org/techniques/T1550/003/)
3. [Red Canary - Detecting Pass the Ticket Attacks](https://redcanary.com/blog/detecting-pass-the-ticket-attacks/)

## Related Techniques
- Pass the Hash
- Overpass the Hash
- Silver Ticket Attack
- Golden Ticket Attack

#kerberos #lateral-movement #active-directory #windows-security