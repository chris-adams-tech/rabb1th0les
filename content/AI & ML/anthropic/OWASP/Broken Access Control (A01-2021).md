---
tags:
  - OWASP
  - web-security
  - access-control
  - vulnerability
created: 2024-01-10
modified: 2024-01-10
severity: Critical
category: Web Application Security
framework: OWASP Top 10
type: OWASP
---
## Overview
Broken Access Control represents failures in enforcing appropriate access restrictions on authenticated users. This vulnerability occurs when users can perform actions they shouldn't be authorized to do, potentially leading to unauthorized information disclosure, modification, or destruction of data.

## Technical Details

| Attribute | Details |
|-----------|---------|
| Definition | Security vulnerability where users can act outside their intended permissions |
| OWASP Ranking | #1 in OWASP Top 10 2021 |
| Affected Systems | Web applications, APIs, microservices |
| Severity | Critical (CVSS Base Score: 6.0-9.0) |
| First Listed | Previously A5:2017, elevated to A01:2021 |
| Common CVEs | CVE-2021-26084 (Confluence), CVE-2021-41773 (Apache) |

## Technical Details

### How It Works
Access control enforces policy such that users cannot act outside their intended permissions. Failures typically occur in several ways:

```http
# Example of Insecure Direct Object Reference (IDOR)
GET /api/user_data?user_id=123   // Attacker can modify user_id
```

Common violation patterns:
- Bypassing access control checks by modifying URLs
- Allowing primary key manipulation
- Elevation of privilege through metadata manipulation
- JWT token tampering
- CORS misconfiguration
- Force browsing to authenticated pages as unauthenticated user

### Notable Incidents
1. **Facebook (2021)**: Data scraping incident affecting 533M users due to broken access controls
2. **Zoom (2020)**: Meeting access control bypass allowing unauthorized meeting access
3. **Capital One (2019)**: Server-Side Request Forgery (SSRF) leading to AWS metadata service access

## Impact Analysis

### Business Impacts
- Unauthorized access to sensitive data
- Regulatory compliance violations
- Financial losses
- Reputation damage
- Legal consequences

### Technical Impacts
- Data breach
- System compromise
- Unauthorized functionality access
- Complete system takeover

## Mitigation Strategies

### Prevention
1. **Implementation Level**
   - Deny by default
   - Implement access control mechanisms once and reuse them
   - Enforce record ownership
   - Disable web server directory listing

2. **Architecture Level**
   ```java
   // Example of proper access control check
   if (currentUser.hasPermission(resource, "READ")) {
       // Allow access
   } else {
       throw new AccessDeniedException();
   }
   ```

### Detection Methods
1. **Automated Testing**
   - DAST tools
   - Automated security scanning
   - Access control unit tests

2. **Manual Testing**
   - Penetration testing
   - Code review
   - Security audit

### Incident Response
1. **Immediate Actions**
   - Isolate affected systems
   - Revoke compromised credentials
   - Enable additional logging

2. **Long-term Response**
   - Implement proper access control matrix
   - Regular security assessments
   - Employee security training

## Further Reading
1. [OWASP Access Control Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html)
2. [NIST Access Control Guide](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-162.pdf)
3. [PortSwigger Web Security Academy - Access Control](https://portswigger.net/web-security/access-control)

## Related Topics
- [[Authentication]]
- [[Authorization]]
- [[JWT Security]]
- [[RBAC]]
- [[OAuth 2.0]]

#security #web-security #OWASP #access-control