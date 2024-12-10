---
tags:
  - vulnerability
  - windows
  - active-directory
  - authentication
  - CVE
created: 2024-01-10
modified: 2024-01-10
severity: Critical
status: Active
type: Authentication
---
## Overview
Zerologon is a severe vulnerability that allows an unauthenticated attacker with network access to a domain controller to completely compromise the Windows domain. The vulnerability received its name because it involves setting the computer password of the domain controller account to zero through the Netlogon protocol.

| Attribute | Details |
|-----------|---------|
| Definition | A critical vulnerability in Microsoft Windows Netlogon Remote Protocol (MS-NRPC) allowing attackers to establish a vulnerable Netlogon secure channel connection to a domain controller |
| CVE | CVE-2020-1472 |
| Affected Systems | Windows Server 2008 R2 - Windows Server 2019 Domain Controllers |
| CVSS Score | 10.0 (Critical) |
| Discovery Date | August 2020 |
| Patch Available | Yes (August 2020 Security Update) |

## Technical Details
### How It Works
The vulnerability exists in the cryptographic authentication scheme used by the Netlogon Remote Protocol:

1. The flaw lies in Microsoft's implementation of AES-CFB8
2. When establishing a secure Netlogon channel, the protocol uses a custom authentication scheme:
```python
# Vulnerable initialization vector handling
IV = 16 bytes of zeros
plaintext = ComputerPassword
ciphertext = AES-CFB8(key, IV, plaintext)
```

3. Due to the predictable initialization vector (IV) of zero and other cryptographic weaknesses:
   - Attackers can bypass authentication
   - Set computer account passwords to empty strings
   - Establish rogue secure channels

### Attack Process
1. Attacker sends specially crafted Netlogon messages
2. Exploits the cryptographic flaw to bypass authentication
3. Changes the computer account password
4. Gains domain controller privileges

## Notable Incidents
- Multiple state-sponsored APT groups actively exploited this vulnerability
- NSA included Zerologon in its top 25 vulnerabilities actively exploited by Chinese state-sponsored actors
- Numerous ransomware campaigns leveraged this vulnerability for initial access

## Impact
- Complete domain compromise
- Ability to:
  - Reset domain controller passwords
  - Modify domain objects
  - Execute arbitrary code
  - Deploy ransomware across domain
  - Exfiltrate sensitive data

## Detection & Mitigation
### Detection Methods
- Monitor event IDs:
  - 4742 (Computer Account Changed)
  - 4624 (Account Logon)
  - 4625 (Failed Logon)
- Deploy Sigma rules for Zerologon detection
- Monitor Netlogon secure channel connections

### Prevention
1. Apply Microsoft security updates immediately
2. Enable enforcement mode:
```powershell
# Check current enforcement mode
Get-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\Netlogon\Parameters" -Name "FullSecureChannelProtection"
```

3. Monitor domain controller security logs
4. Implement network segmentation
5. Use EDR solutions with Zerologon detection capabilities

### Incident Response
1. Immediately patch affected systems
2. Reset computer account passwords
3. Audit domain controller logs
4. Review authentication attempts
5. Scan for indicators of compromise

## Further Reading
- [Microsoft Security Advisory](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2020-1472)
- [Secura's Technical Deep Dive](https://www.secura.com/blog/zero-logon)
- [CISA Alert](https://www.cisa.gov/news-events/cybersecurity-advisories/aa20-283a)
- [MITRE ATT&CK Entry](https://attack.mitre.org/techniques/T1557/)

#vulnerability #windows #active-directory #authentication