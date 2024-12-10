---
tags:
  - attack/lateral_movement
  - attack/credential_access
  - mitre/T1550.002
  - windows
  - active_directory
created: 2024-01-10
modified: 2024-01-10
severity: High
platform: Windows
type: Active Directory
---
## Overview
Overpass-the-Hash (OPtH) is an advanced variant of Pass-the-Hash that converts NTLM hashes into valid Kerberos tickets. This technique allows attackers to escalate from having a password hash to obtaining a full Kerberos Ticket Granting Ticket (TGT), enabling broader access within a Windows domain.

| Attribute | Details |
|-----------|---------|
| Definition | A technique that converts a password hash into a valid Kerberos ticket, allowing lateral movement without knowing the plaintext password |
| Affected Systems | Windows domains, Active Directory environments |
| First Known Use | ~2009 (Became widely known through Mimikatz) |
| MITRE ATT&CK | T1550.002 - Use Alternate Authentication Material |
| Severity | High |
| Required Access | Local admin or SYSTEM privileges on compromised host |

## Technical Details

### How It Works
1. Attacker obtains NTLM hash through various methods (mimikatz, credential dumping)
2. Hash is used to request a Kerberos TGT from the Domain Controller
3. DC validates the hash and issues a TGT
4. Attacker can now use the TGT to request service tickets for any resource

```powershell
# Example using Mimikatz
sekurlsa::pth /user:administrator /domain:contoso.local /ntlm:hash /run:powershell.exe
```

### Key Components
- NTLM hash
- Kerberos authentication protocol
- Domain Controller
- Service Principal Names (SPNs)

## Impact and Consequences
- Lateral movement across domain
- Privilege escalation
- Persistence
- Bypass of certain authentication controls
- Potential domain compromise

## Detection Methods

### Event Logs
Monitor for:
- Event ID 4624 (Account Logon)
- Event ID 4768 (Kerberos Authentication)
- Event ID 4769 (Service Ticket Requested)

### Network Detection
Look for:
- Abnormal Kerberos TGT requests
- Multiple logons from single account across different hosts
- Unusual service ticket requests

## Mitigation Strategies

### Prevention
1. Implement Credential Guard
2. Use Protected Users Security Group
3. Enable PAA (Protected Admin Accounts)
4. Restrict local admin privileges

### Response Procedures
1. Isolate affected systems
2. Reset compromised account credentials
3. Review authentication logs
4. Implement network segmentation
5. Deploy EDR solutions

## Notable Tools and Exploits
- Mimikatz
- Rubeus
- Impacket
- PowerSploit

## Further Reading
1. [MITRE ATT&CK - T1550.002](https://attack.mitre.org/techniques/T1550/002/)
2. [Microsoft Security Documentation - Credential Guard](https://docs.microsoft.com/en-us/windows/security/identity-protection/credential-guard/credential-guard)
3. [Red Canary - Detecting Overpass-the-Hash Attacks](https://redcanary.com/blog/overpass-the-hash/)

## Related Techniques
- [[Pass the Hash (PtH)]]
- [[Pass-the-Ticket]]
- [[Silver Ticket Attack]]
- [[Golden Ticket Attack]]

#windows #active_directory #lateral_movement #credential_access