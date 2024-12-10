---
tags:
  - security
  - windows
  - winrm
  - permissions
  - lateral-movement
created: 2024-01-20
modified: 2024-01-20
severity: High
platform: Windows
mitre_id: T1021.006
type: Misconfiguration
---
## Summary
Bad WinRM permissions represent a significant security misconfiguration where Windows Remote Management service permissions are improperly configured, potentially allowing unauthorized remote access and command execution on Windows systems.

| Attribute | Details |
|-----------|---------|
| Definition | Misconfigured Windows Remote Management (WinRM) permissions allowing unauthorized remote access |
| CVE | N/A (Configuration Issue) |
| Affected Systems | Windows Server 2008 R2 and later, Windows 7 and later |
| Severity | High |
| First Known Occurrence | 2009 (WinRM Introduction) |
| MITRE ATT&CK | Lateral Movement: Remote Services |

## Technical Details

### How It Works
WinRM operates as a Windows service that enables remote management of Windows systems using the WS-Management protocol. When permissions are misconfigured, attackers can:

1. Establish unauthorized remote connections
2. Execute commands with elevated privileges
3. Move laterally through the network
4. Access sensitive system resources

```powershell
# Example of checking WinRM configuration
winrm get winrm/config
```

### Common Misconfigurations
- Overly permissive group memberships in Remote Management Users
- Unencrypted HTTP transport allowed
- Basic authentication enabled without SSL/TLS
- Unrestricted remote shell access

## Impact and Consequences

- Unauthorized remote system access
- Privilege escalation opportunities
- Lateral movement within networks
- Data exfiltration capabilities
- Remote code execution potential

## Detection Methods

### Event Log Monitoring
```powershell
# Key Event IDs
- 4624: Successful logon
- 4625: Failed logon
- 5985: WinRM session created
- 5986: WinRM over HTTPS session created
```

### PowerShell Monitoring
Monitor for suspicious WinRM connections and session creation:
```powershell
Get-WinEvent -LogName "Microsoft-Windows-WinRM/Operational"
```

## Mitigation Strategies

### Preventive Measures
1. Implement least-privilege access
2. Enable HTTPS (Port 5986) instead of HTTP (Port 5985)
3. Configure proper authentication methods:
```powershell
winrm set winrm/config/service/Auth @{Basic="false"}
winrm set winrm/config/service @{AllowUnencrypted="false"}
```

### Configuration Hardening
1. Restrict Remote Management Users group membership
2. Enable Network Level Authentication (NLA)
3. Implement strong GPO controls

### Incident Response
1. Audit WinRM configurations regularly
2. Monitor for unauthorized connection attempts
3. Review and validate Remote Management Users group membership

## Further Reading

1. [Microsoft WinRM Security Documentation](https://docs.microsoft.com/en-us/windows/win32/winrm/installation-and-configuration-for-windows-remote-management)
2. [MITRE ATT&CK - Remote Services](https://attack.mitre.org/techniques/T1021/006/)
3. [NSA Cybersecurity Information Sheet: Securing WinRM](https://media.defense.gov/2019/Jul/16/2002158036/-1/-1/0/CSI-SECURING-WINRM.PDF)

## Related Topics
- PowerShell Remoting
- Windows Remote Management
- Lateral Movement Techniques
- Windows Security Configuration

#windows #security #lateral-movement #winrm