---
tags:
  - OWASP
  - web-security
  - injection
  - vulnerability
created: 2024-01-10
modified: 2024-01-10
severity: Critical
category: Web Application Security
mitre-attack: T1190
type: OWASP
---
## Overview
Injection flaws occur when untrusted data is sent to an interpreter as part of a command or query. The attacker's hostile data can trick the interpreter into executing unintended commands or accessing unauthorized data.

| Attribute | Details |
|-----------|---------|
| Definition | A vulnerability where hostile data is sent to an interpreter as part of a command or query |
| OWASP Ranking | #3 in OWASP Top 10 2021 (Previously #1 in 2017) |
| Affected Systems | Web applications, APIs, Databases |
| Common Types | SQL, NoSQL, OS Command, LDAP |
| Severity | Critical (CVSS Base Score: 8.0-10.0) |
| First Known Occurrence | Late 1990s (SQL Injection) |
## Technical Details

### How It Works
Injection attacks exploit applications that:
1. Accept user input without proper validation
2. Directly incorporate user input into:
   - SQL queries
   - Operating system commands
   - XML parsers
   - Program arguments

```sql
// Vulnerable SQL Query
String query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";

// Malicious Input
username: admin' --
password: anything
```

### Common Injection Types

#### SQL Injection
- Most prevalent form
- Manipulates database queries
- Can lead to data theft, modification, or destruction

#### Command Injection
```bash
# Vulnerable PHP Code
system("ping " . $_GET['ip']);

# Malicious Input
8.8.8.8; rm -rf /
```

#### LDAP Injection
```ldap
# Vulnerable Query
"(&(uid=" + username + ")(userPassword=" + password + "))"

# Malicious Input
*)(uid=*))(|(uid=*
```

## Notable Incidents
1. **2008 Heartland Payment Systems**
   - SQL Injection led to 134 million credit cards compromised
   - $140 million in fraud losses

2. **2019 Capital One Breach**
   - Server-Side Request Forgery (SSRF) injection
   - 100 million customer records exposed

## Impact and Consequences
- Data breach
- System compromise
- Financial losses
- Regulatory penalties
- Reputational damage

## Mitigation Strategies

### Prevention
1. Input Validation
   - Implement strict input validation
   - Use parameterized queries
   - Apply allowlist validation

2. Security Controls
```python
# Safe Query Using Parameterization
cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", [username, password])
```

3. Environment Hardening
   - Principle of least privilege
   - Regular security updates
   - Web Application Firewall (WAF)

### Detection Methods
1. Application Monitoring
   - Log analysis
   - Anomaly detection
   - Input pattern recognition

2. Security Testing
   - Regular penetration testing
   - Static code analysis
   - Dynamic application security testing (DAST)

### Incident Response
1. Immediate Actions
   - Isolate affected systems
   - Block malicious IP addresses
   - Preserve forensic evidence

2. Recovery Steps
   - Patch vulnerabilities
   - Reset compromised credentials
   - Restore from clean backups

## Further Reading
1. [OWASP Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Injection_Prevention_Cheat_Sheet.html)
2. [NIST Guide to SQL Injection](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-95.pdf)
3. [PortSwigger Web Security Academy - Injection](https://portswigger.net/web-security/sql-injection)

#web-security #OWASP #injection #