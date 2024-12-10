---
tags:
  - attack
  - authentication
  - credential-access
  - T1110.003
created: 2024-01-10
modified: 2024-01-10
author: AI Assistant
mitre_id: T1110.003
severity: High
type: Authentication
---
## Overview
Password spraying is a sophisticated authentication attack that attempts to access a large number of accounts using a limited set of common passwords. Unlike traditional brute force attacks that try many passwords against a single account, password spraying tries a single password against many accounts, helping avoid account lockouts.

| Attribute | Details |
|-----------|---------|
| Definition | A type of brute force attack where a single common password is attempted against many different accounts |
| MITRE ATT&CK | T1110.003 - Brute Force: Password Spraying |
| Affected Systems | Authentication systems, Active Directory, Cloud Services, Web Applications |
| Severity | High |
| First Known Usage | ~2010s (became prominent with rise of cloud services) |
| Common Targets | Enterprise environments, Cloud platforms, Email systems |

## Technical Details

### How It Works
1. **Reconnaissance**
   - Attackers gather valid usernames through various methods
   - Often targets corporate email formats (e.g., firstname.lastname@company.com)

2. **Attack Execution**
   ```python
   for username in username_list:
       attempt_login(username, common_password)
       sleep(delay)  # Avoid detection/lockout
   ```

3. **Timing Patterns**
   - Attacks often spread over long periods
   - Usually timed to avoid detection windows
   - May coordinate with password reset cycles

### Common Target Services
- Microsoft 365
- Azure Active Directory
- G Suite
- VPN endpoints
- SSO solutions

## Notable Incidents
- 2019 Citrix Data Breach
- 2016 UK National Lottery Account Compromises
- Multiple documented nation-state APT campaigns

## Impact and Consequences
- Account compromises
- Data breaches
- Lateral movement in networks
- Regulatory compliance violations
- Reputational damage

## Detection & Mitigation

### Prevention
1. **Authentication Policies**
   - Implement MFA
   - Enforce strong password policies
   - Regular password rotation

2. **Technical Controls**
   ```yaml
   # Example Azure AD Smart Lockout Configuration
   lockoutThreshold: 10
   lockoutDurationMinutes: 10
   lockoutObservationWindow: 15
   ```

### Detection Methods
1. **Authentication Logs**
   - Monitor for:
     - Failed login attempts across multiple accounts
     - Patterns in timing and source IPs
     - Unusual login attempt volumes

2. **SIEM Rules Example**
   ```sql
   SELECT source_ip, COUNT(DISTINCT username) as attempt_count
   FROM authentication_logs
   WHERE timestamp > (NOW() - INTERVAL '1 hour')
   AND authentication_result = 'FAILURE'
   GROUP BY source_ip
   HAVING COUNT(DISTINCT username) > 10
   ```

### Incident Response
1. **Immediate Actions**
   - Block suspicious IPs
   - Force password resets
   - Enable additional monitoring

2. **Investigation Steps**
   - Review authentication logs
   - Identify compromised accounts
   - Determine attack scope

## Further Reading
1. [MITRE ATT&CK - Password Spraying](https://attack.mitre.org/techniques/T1110/003/)
2. [NIST Special Publication 800-63B](https://pages.nist.gov/800-63-3/sp800-63b.html)
3. [Microsoft Security Best Practices - Password Spray Attack Prevention](https://docs.microsoft.com/en-us/microsoft-365/security/office-365-security/password-spray-attack-detection)

## Related Topics
- Brute Force Attacks
- Credential Stuffing
- Multi-Factor Authentication
- Account Lockout Policies

#security #authentication #attack #credential-access