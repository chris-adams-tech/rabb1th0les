---
tags:
  - attack
  - credential-theft
  - active-directory
  - windows
  - mitre
created: 2024-01-20
modified: 2024-01-20
severity: High
platforms: Windows
mitre_id: T1003.006
author: SecurityBot
type: Active Directory
---
## Overview
DCSync is a sophisticated attack technique that exploits Active Directory's domain replication feature to steal credential information. By impersonating a domain controller, an attacker can request account password data from a legitimate DC through standard replication protocols.

| Attribute | Details |
|-----------|---------|
| Definition | A credential theft technique that simulates domain controller behavior to retrieve password data |
| CVE | N/A (Abuse of legitimate AD replication process) |
| Affected Systems | Windows Domain Controllers, Active Directory |
| Severity | High |
| First Known Use | 2015 (Introduced in Mimikatz) |
| MITRE ATT&CK | T1003.006 - OS Credential Dumping: DCSync |

## Technical Details

### How DCSync Works
1. The attacker uses compromised credentials with specific AD permissions
2. They simulate a domain controller requesting replication
3. A legitimate DC responds with sensitive data including password hashes
4. The attack leverages the Directory Replication Service (DRS) Remote Protocol

```powershell
# Common Mimikatz DCSync command
lsadump::dcsync /domain:contoso.local /user:Administrator
```

### Required Permissions
To execute DCSync, an attacker needs accounts with the following rights:
- Replicating Directory Changes
- Replicating Directory Changes All
- Replicating Directory Changes in Filtered Set

## Notable Incidents
- Used in several APT campaigns including NOBELIUM operations
- Frequently observed in ransomware attacks for privilege escalation
- Documented use in various red team assessments and penetration tests

## Impact and Consequences
- Complete compromise of domain credentials
- Ability to create Golden Tickets
- Potential for complete domain takeover
- Stealth - difficult to detect as it mimics legitimate behavior

## Detection and Mitigation

### Prevention
1. Implement least privilege access
2. Regular audit of AD permissions
3. Protected Users security group implementation
4. Tier model implementation for AD administration

### Detection Methods
```yaml
# Example Sigma Rule
title: DCSync Attack Detection
detection:
    selection:
        EventID: 4662
        Properties:
            - '1131f6aa-9c07-11d1-f79f-00c04fc2dcd2'
        AccessMask: '0x100'
```

### Monitoring Points
- Directory Service Access (Event ID 4662)
- Replication traffic patterns
- Unusual DC-to-DC communication
- Suspicious account permission changes

## Response Procedures
1. Isolate affected domain controllers
2. Reset compromised credentials
3. Review and revoke unnecessary replication rights
4. Implement enhanced monitoring
5. Consider forest recovery in severe cases

## Further Reading
1. [MITRE ATT&CK - DCSync](https://attack.mitre.org/techniques/T1003/006/)
2. [Microsoft - Securing Active Directory Replication](https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/securing-domain-controllers-against-attack)
3. [ADSecurity - DCSync Attack Explained](https://adsecurity.org/?p=1729)

## Related Topics
- [[Mimikatz]]
- [[Active Directory Security]]
- [[Domain Controller Protection]]
- [[Credential Theft]]