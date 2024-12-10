---
tags: 
created: 2024-01-10
modified: 2024-01-10
type: Active Directory
platform: Windows
mitre-id: T1558.003
---
## Overview
Silver Ticket forging is a sophisticated post-exploitation technique that allows attackers to maintain persistent access to specific services within a Windows domain environment. Unlike Golden Tickets which require Domain Controller (DC) compromise, Silver Tickets can be created with just a service account's password hash.

| Attribute | Details |
|-----------|---------|
| Definition | A Kerberos-based attack where an adversary creates a forged service ticket using a compromised service account's NTLM hash |
| Affected Systems | Windows domains using Kerberos authentication |
| Severity | High |
| First Known Use | ~2014 |
| MITRE ATT&CK | T1558.003 - Steal or Forge Kerberos Tickets: Kerberoasting |
| Detection Difficulty | Medium-High |

## Technical Details

### How It Works
1. Attacker obtains a service account's password hash (typically through compromise)
2. Using tools like Mimikatz, the attacker generates a forged service ticket
3. The ticket is crafted with:
   - Target service SPN
   - Compromised service account hash
   - Custom user privileges
   - Extended validity period

```powershell
# Example Mimikatz command for Silver Ticket creation
kerberos::golden /domain:<domain> /sid:<domain-sid> /target:<service-hostname> /service:<service-type> /rc4:<ntlm-hash> /user:<fake-username> /ptt
```

### Key Differences from Golden Tickets
- Only works for specific services
- Doesn't require Domain Controller compromise
- More stealthy due to reduced domain traffic
- Limited to services associated with compromised account

## Impact and Consequences
- Persistent access to specific services
- Bypass of standard authentication mechanisms
- Potential for privilege escalation
- Difficult to detect due to valid-appearing tickets

## Detection Methods

### Event Log Monitoring
- Event ID 4624: Account Logon
- Event ID 4634: Account Logoff
- Event ID 4672: Special privileges assigned

### Anomaly Detection
- Tickets with unusual validity periods
- Authentication from unexpected sources
- Off-hours service access
- Mismatched service/account relationships

## Mitigation Strategies

### Preventive Measures
1. Implement strong service account password policies
2. Use managed service accounts (MSAs)
3. Regular rotation of service account credentials
4. Limit service account privileges

### Response Procedures
1. Reset compromised service account credentials
2. Audit service account permissions
3. Review and validate service ticket configurations
4. Implement monitoring for suspicious ticket creation

## Incident Response Steps
1. Identify affected service accounts
2. Reset compromised credentials
3. Review security logs for unauthorized access
4. Document incident timeline and impact
5. Implement additional monitoring controls

## Further Reading
- [Microsoft: Detecting Kerberos Attacks](https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/manage/component-updates/tgt-delegation-across-forests)
- [MITRE ATT&CK: Silver Ticket](https://attack.mitre.org/techniques/T1558/003/)
- [Detecting Silver Ticket Attacks - Active Directory Security](https://adsecurity.org/?p=2011)

## Related Topics
- Kerberos Authentication
- Golden Ticket Attacks
- Pass-the-Hash
- Service Account Security