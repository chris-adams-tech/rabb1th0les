---
tags:
  - OWASP
  - security-logging
  - monitoring
  - detection
  - SIEM
created: 2024-01-10
modified: 2024-01-10
severity: HIGH
framework: OWASP Top 10
status: active
type: OWASP
---
## Overview
Security Logging and Monitoring Failures represent a critical vulnerability where organizations lack sufficient visibility into security events, system behaviors, and potential threats. This weakness can significantly delay breach detection and incident response capabilities.

| Attribute | Details |
|-----------|---------|
| Definition | Insufficient logging, detection, monitoring, and active response capabilities |
| OWASP Risk Rating | HIGH |
| CWE References | CWE-778, CWE-223, CWE-532 |
| Affected Systems | Applications, Infrastructure, Cloud Services |
| First Listed | 2021 (Previously "Insufficient Logging & Monitoring" in 2017) |
| Common Platforms | All platforms and environments |
## Technical Details

### Core Components
1. **Logging Systems**
   - Application logs
   - Security logs
   - Access logs
   - Error logs
   - Audit trails

2. **Monitoring Systems**
   - SIEM platforms
   - Log aggregators
   - Alert systems
   - Real-time monitoring tools

### Common Failure Points
```plaintext
- Missing logging for critical operations
- Logs stored without proper protection
- Insufficient log retention periods
- Lack of real-time alerting
- Inadequate log detail level
- No centralized logging strategy
```

## Notable Incidents

### Case Study: Equifax Breach (2017)
- 76-day detection delay
- Insufficient monitoring of critical systems
- Delayed patch management detection
- Affected 147 million people

### Case Study: Target Data Breach (2013)
- Monitoring alerts were present but ignored
- Lack of proper alert triage
- Resulted in 40 million credit card records stolen

## Impact Analysis

### Business Consequences
- Extended breach detection time
- Increased damage from attacks
- Compliance violations
- Forensic investigation challenges
- Reputation damage

### Technical Consequences
1. Inability to detect:
   - Account tampering
   - Data exfiltration
   - System compromises
   - API abuse

## Mitigation Strategies

### Prevention
1. **Implement Comprehensive Logging**
   ```yaml
   Critical Areas:
   - Authentication events
   - Access control failures
   - Input validation failures
   - System errors
   - Third-party service interactions
   ```

2. **Establish Monitoring Framework**
   - Deploy SIEM solution
   - Implement log aggregation
   - Configure automated alerts
   - Establish baseline behaviors

### Detection Methods
1. **Real-time Monitoring**
   - Anomaly detection
   - Behavior analysis
   - Pattern matching
   - Correlation rules

2. **Log Analysis**
   ```python
   Key Metrics:
   - Failed login attempts
   - Unusual access patterns
   - Resource usage spikes
   - Error rate changes
   ```

### Response Procedures
1. **Incident Response Integration**
   - Automated alert workflows
   - Escalation procedures
   - Investigation playbooks
   - Response documentation

2. **Recovery Actions**
   - Evidence preservation
   - Root cause analysis
   - System hardening
   - Control enhancement

## Best Practices
1. Follow logging standards (e.g., RFC 5424)
2. Implement secure log management
3. Establish retention policies
4. Configure appropriate log levels
5. Regular monitoring system testing

## Further Reading
1. [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
2. [NIST SP 800-92 Guide to Computer Security Log Management](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf)
3. [MITRE ATT&CK: Defensive Evasion](https://attack.mitre.org/tactics/TA0005/)

## Related Topics
- [[SIEM Implementation]]