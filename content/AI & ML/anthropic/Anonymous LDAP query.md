---
tags:
  - ldap
  - authentication
  - security
  - protocols
  - active-directory
created: 2024-01-10
modified: 2024-01-10
type: Active Directory
status: active
---
## Overview
Anonymous LDAP queries represent a method of accessing LDAP (Lightweight Directory Access Protocol) directory services without providing authentication credentials. This functionality, while potentially legitimate for public directories, often poses significant security risks when enabled in enterprise environments.

| Attribute | Details |
|-----------|---------|
| Definition | A query made to an LDAP directory service without providing authentication credentials |
| Affected Systems | LDAP servers, Active Directory, OpenLDAP |
| Default Status | Disabled in modern configurations |
| First Known Usage | Early 1990s with LDAP v2 |
| Security Impact | Medium to High |
| MITRE ATT&CK | T1589.002 (Gathering Victim Identity Information) |
## Technical Details

### How It Works
Anonymous LDAP binding allows a client to establish a connection to an LDAP server by:
1. Initiating a bind request
2. Leaving the authentication fields empty
3. Accessing permitted directory information without credentials

Example anonymous bind request:
```ldap
dn: ""
password: ""
```

### Implementation
Anonymous access can be configured in different LDAP servers:

**Active Directory:**
```powershell
dsacls "DC=domain,DC=com" /G "ANONYMOUS LOGON:GR"
```

**OpenLDAP:**
```conf
access to *
  by anonymous read
  by * none
```

## Security Implications

### Risks
- Enumeration of directory structure
- Information disclosure of user attributes
- Potential for reconnaissance activities
- Foundation for more sophisticated attacks

### Common Attack Scenarios
1. User enumeration
2. Organization structure mapping
3. Email harvest operations
4. Pre-authentication information gathering

## Detection Methods

### Log Monitoring
Monitor for:
```
- Bind attempts with null credentials
- High volume of directory queries from single sources
- Access patterns indicating automated enumeration
```

### Network Detection
Look for:
```
- LDAP traffic on ports 389/636
- Unusual query patterns
- Multiple failed binds followed by anonymous attempts
```

## Mitigation Strategies

### Preventive Measures
1. Disable anonymous binds:
   - Active Directory: Set `Network security: LDAP server signing requirements`
   - OpenLDAP: Configure `olcDisallows: bind_anon`

2. Implement proper access controls:
   ```bash
   # OpenLDAP example
   access to *
     by authenticated users read
     by anonymous none
   ```

3. Use LDAPS (LDAP over SSL/TLS)

### Response Procedures
1. Audit existing anonymous access
2. Document legitimate use cases
3. Implement logging and monitoring
4. Develop incident response playbooks

## Further Reading

1. [Microsoft: LDAP Security Guidance](https://docs.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/network-security-ldap-server-signing-requirements)

2. [SANS: LDAP Enumeration Guide](https://www.sans.org/reading-room/whitepapers/testing/ldap-enumeration-33985)

3. [OpenLDAP Security Guide](https://www.openldap.org/doc/admin24/security.html)

## Related Topics
- LDAP Injection
- Active Directory Security
- Directory Services Hardening
- Authentication Protocols

#ldap #security #active-directory #authentication