---
tags:
  - security
  - web-security
  - OWASP-Top-10
  - vulnerability
created: 2024-01-10
modified: 2024-01-10
severity: High
category: Web Application Security
mitre-attack: T1598
type: OWASP
---
## Overview
Server-Side Request Forgery (SSRF) is a critical web security vulnerability that occurs when an attacker can manipulate a server-side application to make HTTP requests to arbitrary destinations. This vulnerability can bypass network security controls and access internal resources that should not be publicly accessible.

| Attribute | Details |
|-----------|---------|
| Definition | A vulnerability that allows attackers to make server-side requests to unintended destinations through a vulnerable application |
| OWASP Category | A10:2021 Server-Side Request Forgery |
| Affected Systems | Web applications, Cloud services, Internal networks |
| Severity | High (CVSS Base Score: 7.5-9.0) |
| First Known Occurrence | ~2009 (gained prominence with cloud computing) |
| Notable CVEs | CVE-2019-5464, CVE-2021-22205, CVE-2021-42013 |

## Technical Details

### How SSRF Works
1. **Initial Entry Point**
   - URL parameters
   - API endpoints
   - File processing functions
   - Webhook configurations

2. **Common Attack Vectors**
```http
# Basic SSRF Example
https://vulnerable-app.com/fetch?url=http://internal-network.local

# URL Encoding Bypass
https://vulnerable-app.com/fetch?url=http%3A%2F%2Finternal-network.local

# Protocol-Relative Bypass
https://vulnerable-app.com/fetch?url=//internal-network.local
```

### Types of SSRF
1. **Basic SSRF**
   - Direct access to internal resources
   - Immediate response feedback

2. **Blind SSRF**
   - No direct response feedback
   - Requires out-of-band detection methods

## Notable Incidents

### Capital One Breach (2019)
- Exploited SSRF vulnerability in AWS metadata service
- Affected 100 million customers
- $80 million in damages

### Gitlab SSRF (2021)
- CVE-2021-22205
- Remote code execution through SSRF
- Critical vulnerability in ExifTool integration

## Impact and Consequences
- Access to internal systems and services
- Data exfiltration
- Remote code execution
- Cloud metadata exposure
- Internal network scanning

## Mitigation Strategies

### Prevention
1. **Input Validation**
```python
def validate_url(url):
    allowed_domains = ['trusted1.com', 'trusted2.com']
    parsed_url = urlparse(url)
    return parsed_url.netloc in allowed_domains
```

2. **Network Controls**
- Implement strict egress filtering
- Segment internal networks
- Use VPCs and security groups

### Detection Methods
1. **Network Monitoring**
- Unusual internal requests
- Unexpected DNS queries
- Abnormal metadata service access

2. **Application Logging**
```json
{
    "timestamp": "2024-01-10T12:00:00Z",
    "event_type": "url_fetch",
    "source_ip": "10.0.0.1",
    "destination": "internal-service.local",
    "status": "blocked"
}
```

### Response Procedures
1. Block affected endpoints
2. Review access logs
3. Update WAF rules
4. Patch vulnerable components

## Best Practices
1. Use allow-lists for permitted domains
2. Implement proper network segmentation
3. Disable unnecessary protocols
4. Regular security assessments

## Further Reading
- [PortSwigger SSRF Guide](https://portswigger.net/web-security/ssrf)
- [OWASP SSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)
- [AWS