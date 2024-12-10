---
tags:
  - privilege-escalation
  - windows
  - service-paths
  - attack-vector
date_created: 2024-01-10
last_modified: 2024-01-10
platform: Windows
mitre_id: T1574.009
severity: High
author: Security_Team
status: Active
type: Privilege Escalation
---
## Overview
Unquoted service path vulnerability is a privilege escalation technique that exploits Windows' behavior when handling service paths containing spaces that aren't properly enclosed in quotation marks.

| Attribute | Details |
|-----------|---------|
| Definition | A vulnerability that occurs when Windows service paths containing spaces are not properly quoted, allowing arbitrary code execution with SYSTEM privileges |
| Affected Systems | Windows Operating Systems |
| MITRE ATT&CK | T1574.009 - Hijack Execution Flow: Path Interception by Unquoted Path |
| Severity | High |
| First Known Occurrence | Pre-2000s, but widely documented around 2011 |
| Common Tools | PowerSploit, Metasploit, PowerUp |

## Technical Details

### How It Works
When Windows encounters an unquoted service path with spaces, it attempts to execute the program by trying different combinations of the path. For example, with the path:

```plaintext
C:\Program Files\My Service\service.exe
```

Windows will try to execute in this order:
1. `C:\Program.exe`
2. `C:\Program Files\My.exe`
3. `C:\Program Files\My Service\service.exe`

If an attacker can place a malicious executable in any of these locations (with appropriate naming), they can achieve code execution with SYSTEM privileges.

### Example Vulnerable Service Configuration
```powershell
# Vulnerable service registration
sc create "Vulnerable Service" binpath= "C:\Program Files\Custom Folder\Service.exe"

# Secure service registration
sc create "Secure Service" binpath= "\"C:\Program Files\Custom Folder\Service.exe\""
```

## Impact and Consequences
- Elevation of privileges to SYSTEM level
- Arbitrary code execution
- Persistence mechanism establishment
- Complete system compromise

## Detection Methods

### Event Log Monitoring
Monitor for:
- Service creation events (Event ID 7045)
- Service modification events (Event ID 4697)
- Suspicious file creation in Program Files directories

### PowerShell Detection Script
```powershell
Get-WmiObject win32_service | 
    Select-Object Name, DisplayName, PathName | 
    Where-Object {$_.PathName -notlike '"*"' -and $_.PathName -like '* *'}
```

## Mitigation Strategies

### Preventive Measures
1. Always use quotes around service paths
2. Implement strict folder permissions
3. Regular system auditing
4. Use Group Policy to restrict service creation

### Remediation Steps
1. Identify vulnerable services:
```powershell
wmic service get name,displayname,pathname,startmode | findstr /i "auto" | findstr /i /v "c:\windows\\" | findstr /i /v """
```

2. Modify service paths:
```cmd
sc config "Service Name" binpath= "\"C:\Program Files\Custom Folder\Service.exe\""
```

3. Review and adjust permissions on Program Files directories

## Response Procedures
1. Identify affected services
2. Document unauthorized modifications
3. Remove malicious executables
4. Update service configurations
5. Investigate potential compromise indicators

## Further Reading
- [MITRE ATT&CK - Path Interception by Unquoted Path](https://attack.mitre.org/techniques/T1574/009/)
- [Microsoft Security Documentation - Service Paths](https://docs.microsoft.com/en-us/windows/win32/services/service-security-and-access-rights)
- [OWASP - Windows Unquoted Service Paths](https://owasp.org/www-community/vulnerabilities/Windows_Unquoted_Service_Paths)

## Related Topics
- [[Windows Service Permissions]]
- [[Privilege Escalation Techniques]]
- [[Windows Security Hardening]]

#windows #privilege