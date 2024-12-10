---
tags:
  - malware
  - APT
  - threat-actor
  - maas
created: 2024-01-02
updated: 2024-01-02
severity: High
status: Active
platform: Windows
type: MaaS
---
## Overview
MoreEggs is a sophisticated malware-as-a-service platform operated by the threat actor group known as Golden Chickens (GC). Recently observed expanding its operations with new infrastructure and enhanced capabilities, MoreEggs has become a significant threat in the cybercrime ecosystem.

| Attribute | Details |
|-----------|---------|
| Type | Malware-as-a-Service (MaaS) |
| First Discovered | 2018 |
| Latest Activity | December 2023 |
| Affected Systems | Windows |
| Primary Targets | Corporate Networks, E-commerce |
| Attribution | Golden Chickens/GC |
| Distribution Method | Phishing, Social Engineering |

## Technical Details

### Architecture
MoreEggs employs a modular architecture consisting of:
- Initial loader component
- Memory-resident payload
- Command & Control (C2) infrastructure
- Custom obfuscation techniques

### Key Features
```plaintext
- Fileless execution capabilities
- Advanced anti-analysis mechanisms
- Dynamic configuration loading
- Process injection techniques
- Custom network protocol
```

### Recent Infrastructure Expansion
- 139 new domains registered between October-December 2023
- Enhanced C2 infrastructure resilience
- Improved evasion capabilities

## Attack Methodology

1. **Initial Access**
   - Phishing emails with malicious attachments
   - Social engineering tactics targeting corporate environments

2. **Execution**
   - Fileless loading of malware components
   - Memory-only operation to evade detection

3. **Persistence**
   - Registry modifications
   - Scheduled task creation
   - DLL hijacking techniques

## Detection & Mitigation

### Detection Methods
- Monitor for suspicious PowerShell execution
- Track unusual network connections to newly registered domains
- Implement memory scanning capabilities
- Monitor for anomalous registry modifications

### Prevention Strategies
1. **Technical Controls**
   ```plaintext
   - Implement application whitelisting
   - Enable PowerShell logging
   - Deploy EDR solutions
   - Implement network segmentation
   ```

2. **Administrative Controls**
   - Regular security awareness training
   - Phishing simulation exercises
   - Strict email attachment policies
   - Regular system updates and patches

## Incident Response

### Initial Response
1. Isolate affected systems
2. Collect memory dumps and system logs
3. Identify and block C2 communications

### Recovery Steps
1. Remove malware artifacts
2. Reset compromised credentials
3. Restore from known clean backups
4. Implement additional monitoring

## Further Reading
1. [MITRE ATT&CK - Golden Chickens](https://attack.mitre.org/groups/G0160/)
2. [Proofpoint - TA505 and Golden Chickens Analysis](https://www.proofpoint.com/us/threat-insight/post/ta505-and-others-add-new-golden-chickens-tools)
3. [Microsoft Security Blog - Fileless Malware](https://www.microsoft.com/security/blog/2018/09/27/fileless-threats/)

## Related MITRE ATT&CK Techniques
- T1055 - Process Injection
- T1064 - Scripted Payload
- T1086 - PowerShell
- T1140 - Deobfuscate/Decode Files or Information

#malware #APT #threat-actor #maas #windows #golden-chickens

Related [[More_eggs MaaS Expands Operations with RevC2 Backdoor and Venom Loader]]