---
tags:
  - attack/credential-access
  - attack/lateral-movement
  - windows
  - active-directory
  - kerberos
created: 2024-01-10
modified: 2024-01-10
severity: High
framework: MITRE ATT&CK
technique_id: T1558.004
type: vulnerability
---
## Overview
AS-REP Roasting is an attack technique that targets Active Directory user accounts that have Kerberos preauthentication disabled. This vulnerability allows attackers to request authentication data for these accounts and attempt offline password cracking.

| Attribute        | Details                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Definition       | An attack technique targeting Kerberos authentication where accounts with "Do not require Kerberos preauthentication" enabled are exploited |
| Affected Systems | Windows Active Directory environments                                                                                                       |
| First Known Use  | 2014                                                                                                                                        |
| Severity         | High                                                                                                                                        |
| MITRE ATT&CK     | T1558.004 - Steal or Forge Kerberos Tickets: AS-REP Roasting                                                                                |
| Tools Used       | Impacket, Rubeus, GetNPUsers.py                                                                                                             |
## Technical Details

### How It Works
1. Attacker identifies accounts with "Do not require Kerberos preauthentication" enabled
2. Requests AS-REP ticket for target account without authentication
3. Extracts encrypted portion of AS-REP message
4. Performs offline brute-force attack against the encrypted data

```powershell
# Example Rubeus command
Rubeus.exe asreproast /format:hashcat /outfile:hashes.txt
```

### Attack Flow
1. Initial enumeration of vulnerable accounts
2. AS-REP ticket request
3. Extraction of encrypted data
4. Offline password cracking
5. Credential compromise

## Impact and Consequences
- Unauthorized access to user credentials
- Potential lateral movement within network
- Privilege escalation opportunities
- Persistent access to Active Directory environment

## Detection Methods

### Event Logs
Monitor for:
- Event ID 4768 (Kerberos Authentication Ticket Requested)
- Event ID 4769 (Kerberos Service Ticket Requested)

### Network Traffic
Look for:
- Unusual Kerberos TGT requests
- Multiple failed authentication attempts
- Suspicious timing patterns

## Mitigation Strategies

### Preventive Measures
1. Enable Kerberos preauthentication for all accounts
2. Regular audit of account settings
3. Implement strong password policies

### Configuration Changes
```powershell
# PowerShell command to check for vulnerable accounts
Get-ADUser -Filter {DoesNotRequirePreAuth -eq $True} -Properties DoesNotRequirePreAuth
```

### Response Procedures
1. Identify compromised accounts
2. Reset affected account passwords
3. Enable preauthentication
4. Review security logs
5. Implement additional monitoring

## Further Reading
- [MITRE ATT&CK: AS-REP Roasting](https://attack.mitre.org/techniques/T1558/004/)
- [Microsoft: Kerberos Preauthentication](https://docs.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview)
- [HackTricks: AS-REP Roasting](https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/as-rep-roasting)

## Related Techniques
- Kerberoasting
- Pass-the-Hash
- Golden Ticket attacks

## Tools and Commands
```bash
# Impacket example
GetNPUsers.py domain.local/ -usersfile users.txt -format hashcat -outputfile hashes.txt

# Hashcat crack
hashcat -m 18200 hashes.txt wordlist.txt
```