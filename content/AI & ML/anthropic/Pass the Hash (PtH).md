---
type: Active Directory
tags: attack/lateral_movement, attack/credential_access, mitre/T1550.002, windows, active_directory
created: 2024-01-10
modified: 2024-01-10
severity: High
platform: Windows
mitre_url: https://attack.mitre.org/techniques/T1550/002/
---
## Overview
Pass the Hash (PtH) is a lateral movement technique that exploits the way Windows handles NTLM authentication. Instead of requiring the actual password, attackers can use the password hash to authenticate to remote systems, effectively bypassing the need to crack or know the original password.

| Attribute | Details |
|-----------|---------|
| Definition | A technique where an attacker captures NTLM password hashes and reuses them to authenticate without knowing the plain-text password |
| MITRE ATT&CK | T1550.002 - Use Alternate Authentication Material: Pass the Hash |
| Affected Systems | Windows systems, particularly in Active Directory environments |
| First Known Use | 1997 |
| Severity | High |
| Common Tools | Mimikatz, Impacket, CrackMapExec |

## Technical Details

### How It Works
1. Attacker obtains NTLM hashes through various means:
   ```powershell
   # Example Mimikatz command to extract hashes
   privilege::debug
   sekurlsa::logonpasswords
   ```

2. The captured hash is then used for authentication:
   ```bash
   # Example using Impacket's psexec.py
   psexec.py -hashes [LM hash]:>[NTLM hash] [domain]/[username]@[target]
   ```

### Common Attack Vectors
- Memory dumping of LSASS process
- Extraction from SAM database
- Man-in-the-middle attacks
- Compromised domain controllers

## Notable Incidents
- The NotPetya malware (2017) used PtH for lateral movement
- The SolarWinds attack (2020) leveraged PtH techniques
- Multiple APT groups regularly employ PtH in their campaigns

## Impact and Consequences
- Lateral movement through networks
- Privilege escalation
- Complete domain compromise
- Data exfiltration
- Persistence establishment

## Detection and Mitigation

### Prevention
1. Implement Credential Guard
2. Enable LSA Protection
3. Use strong passwords and rotate regularly
4. Implement PAM (Privileged Access Management)

### Detection Methods
- Monitor for:
  - Event ID 4624 (Type 3 logons)
  - Event ID 4625 (failed logons)
  - Suspicious ADMIN$ share access
  - Unusual remote execution patterns

### Response Procedures
1. Isolate affected systems
2. Reset compromised credentials
3. Enable Network Level Authentication
4. Review and update access controls
5. Implement network segmentation

## Recommended Tools and Controls
- Microsoft LAPS
- Windows Defender Credential Guard
- Network Level Authentication (NLA)
- Protected Users Security Group
- PAW (Privileged Access Workstations)

## Further Reading
1. [MITRE ATT&CK - Pass the Hash](https://attack.mitre.org/techniques/T1550/002/)
2. [Microsoft Security Documentation - Credential Protection](https://docs.microsoft.com/en-us/windows-server/security/credentials-protection-and-management/credentials-protection-and-management)
3. [SANS Institute - Pass-the-Hash Detection](https://www.sans.org/reading-room/whitepapers/detection/pass-the-hash-detection-33283)

#attack #lateral_movement #windows #active_directory #credential_access