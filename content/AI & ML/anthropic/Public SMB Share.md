---
tags:
  - network-security
  - windows
  - smb
  - file-sharing
  - lateral-movement
created: 2024-01-20
modified: 2024-01-20
severity: High
platform: Windows
mitre-attack: T1021.002
type: Misconfiguration
---
## Overview
Public SMB shares represent a significant security risk in network environments where file sharing permissions are misconfigured or overly permissive. These shares can expose sensitive data and provide attackers with opportunities for lateral movement within networks.

| Attribute | Details |
|-----------|---------|
| Definition | A network file share using Server Message Block (SMB) protocol that allows unrestricted or poorly restricted access |
| Affected Systems | Windows-based systems, Samba implementations on Linux/Unix |
| Severity | High - Can lead to data exposure and lateral movement |
| First Known Exploitation | Late 1990s |
| Common Ports | TCP 445 (Modern SMB), TCP 139 (NetBIOS) |

## Technical Details

### How SMB Shares Work
SMB (Server Message Block) operates as a client-server protocol that provides:
- File sharing
- Printer sharing
- Network browsing
- Inter-process communication

```powershell
# Example command to list shares
net share

# Example command to view specific share permissions
icacls "\\server\share"
```

### Common Misconfigurations
1. Anonymous access enabled
2. Everyone group with full control
3. Default administrative shares exposed
4. Null session access

## Notable Incidents
- **WannaCry Ransomware (2017)**: Exploited SMB vulnerabilities to propagate
- **NotPetya Attack (2017)**: Leveraged open SMB shares for lateral movement
- **Numerous data breaches**: Resulted from exposed sensitive data on public shares

## Security Implications

### Potential Impacts
- Data theft
- Malware propagation
- Lateral movement
- Information disclosure
- Privilege escalation opportunities

## Detection Methods

### Network Monitoring
```bash
# Nmap scan for open SMB shares
nmap -p 445 --script smb-enum-shares <target>
```

### Windows Event Logs
Monitor for:
- Event ID 5140 (Network share access)
- Event ID 5145 (Detailed file share access)

## Mitigation Strategies

### Preventive Measures
1. **Access Control**
   - Implement least-privilege access
   - Regular permission audits
   - Remove anonymous access

2. **Network Security**
   - Segment networks
   - Block SMB at perimeter
   - Enable SMB signing

3. **Configuration Hardening**
   ```powershell
   # Disable SMBv1
   Set-SmbServerConfiguration -EnableSMB1Protocol $false
   ```

### Response Procedures
1. Identify exposed shares
2. Document legitimate business needs
3. Remove unnecessary access
4. Implement proper authentication
5. Monitor for suspicious activity

## Further Reading
1. [Microsoft Security Blog - Securing SMB](https://www.microsoft.com/security/blog/2017/05/17/securing-smb-against-attacks/)
2. [NIST Guide to Securing Windows File Shares](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-179.pdf)
3. [MITRE ATT&CK - SMB/Windows Admin Shares](https://attack.mitre.org/techniques/T1021/002/)

## Related Topics
- [[Windows File Permissions]]
- [[Lateral Movement Techniques]]
- [[Network Security Hardening]]
- [[SMB Protocol Security]]