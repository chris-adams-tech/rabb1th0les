---
tags:
  - OWASP
  - security
  - misconfiguration
  - vulnerability
created: 2024-01-10
modified: 2024-01-10
severity: HIGH
category: Web Security
framework: OWASP Top 10
type: OWASP
---
## Overview
Security misconfiguration represents one of the most common and dangerous vulnerability categories in modern applications. It occurs when security controls are improperly configured, left in their default state, or implemented incompletely. This vulnerability has become increasingly critical with the adoption of cloud services and containerized deployments.

| Attribute | Details |
|-----------|---------|
| Definition | Security misconfiguration occurs when security settings are defined, implemented, or maintained incorrectly |
| OWASP Ranking | #5 in OWASP Top 10 2021 |
| Affected Systems | Web applications, cloud services, networks, servers, databases |
| Severity | High (CVSS Base Score: 7.5-8.5) |
| First Listed | OWASP Top 10 2004 |
| Detection Methods | Automated scanning, penetration testing, security audits |

## Technical Details

### Common Misconfigurations
1. **Default Configurations**
   - Unchanged default credentials
   - Default system accounts left active
   - Sample applications not removed
   
2. **Cloud/Platform Issues**
   ```yaml
   # Example of dangerous S3 bucket configuration
   {
     "Version": "2012-10-17",
     "Statement": [
         {
             "Effect": "Allow",
             "Principal": "*",
             "Action": "s3:*",
             "Resource": "arn:aws:s3:::bucket-name/*"
         }
     ]
   }
   ```

3. **Security Features**
   - Disabled security headers
   - Unnecessary open ports
   - Exposed error handling
   - Unpatched systems

## Notable Incidents

1. **Capital One Breach (2019)**
   - Impact: 100 million customers affected
   - Cause: Misconfigured web application firewall
   - Cost: $150 million in breach-related costs

2. **Microsoft Power Apps Exposure (2021)**
   - 38 million records exposed
   - Default portal settings led to data exposure
   - Affected multiple organizations

## Impact Analysis

### Direct Consequences
- Unauthorized access to sensitive data
- System compromise
- Compliance violations
- Financial losses
- Reputational damage

### Cascade Effects
- Lateral movement in networks
- Data breaches
- Service disruptions
- Legal liabilities

## Mitigation Strategies

### Prevention
1. **Secure Configuration Process**
   - Implement secure baseline configurations
   - Regular security audits
   - Configuration management systems
   - Infrastructure as Code (IaC) security scanning

2. **Environment Hardening**
   ```bash
   # Example: Disable unnecessary services
   systemctl disable unnecessary-service
   systemctl stop unnecessary-service
   
   # Remove default accounts
   userdel default-user
   ```

### Detection
1. **Monitoring Tools**
   - Configuration scanning tools
   - Cloud security posture management (CSPM)
   - Log analysis
   - Automated security testing

2. **Regular Assessments**
   - Vulnerability scanning
   - Penetration testing
   - Security reviews
   - Compliance audits

### Response Procedures
1. Immediate containment of exposed systems
2. Configuration correction
3. Impact assessment
4. Root cause analysis
5. Security control enhancement

## Best Practices
1. Implement least privilege principle
2. Regular security updates
3. Configuration version control
4. Automated configuration management
5. Security testing in CI/CD pipeline

## Further Reading
1. [OWASP Security Misconfiguration](https://owasp.org/Top10/A05_2021-Security_Misconfiguration/)
2. [CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks/)
3. [NIST Security Configuration Guides](https://csrc.nist.gov/publications/detail/sp/800-70/rev-4/final)

## Related Topics
- [[Secure Configuration Management]]
- [[