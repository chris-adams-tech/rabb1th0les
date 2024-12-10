---
tags:
  - security-engineer/windows-services
---
Source: HacktheBox

|     Event ID      | Log Type |             Description             |                    Security Implications                    |
| :---------------: | :------: | :---------------------------------: | :---------------------------------------------------------: |
|  **System Logs**  |          |                                     |                                                             |
|       1074        |  System  |       System Shutdown/Restart       |       Tracks unexpected system restarts or shutdowns        |
|       6005        |  System  |      Event Log Service Started      | Indicates system boot-up, potential security starting point |
|       6006        |  System  |      Event Log Service Stopped      |          Potential intentional service disruption           |
|       6013        |  System  |           Windows Uptime            |   Short uptime could indicate unauthorized system reboot    |
|       7040        |  System  |     Service Startup Type Change     |                  Possible system tampering                  |
| **Security Logs** |          |                                     |                                                             |
|       1102        | Security |          Audit Log Cleared          |             Potential evidence removal attempt              |
|       1116        | Security |     Antivirus Malware Detection     |                 Indicates malware detection                 |
|       1118        | Security |    Antivirus Remediation Started    |              Malware removal process initiated              |
|       1119        | Security |   Antivirus Remediation Succeeded   |                 Successful malware removal                  |
|       1120        | Security |    Antivirus Remediation Failed     |                   Failed malware removal                    |
|       4624        | Security |          Successful Logon           |                Tracks user login activities                 |
|       4625        | Security |            Failed Logon             |           Potential brute-force attack indicator            |
|       4648        | Security |   Logon with Explicit Credentials   |              Possible lateral network movement              |
|       4656        | Security |       Object Handle Requested       |           Attempts to access sensitive resources            |
|       4672        | Security |     Special Privileges Assigned     |              Tracks super user privilege usage              |
|       4698        | Security |       Scheduled Task Created        |               Potential persistence mechanism               |
|     4700/4701     | Security |   Scheduled Task Enabled/Disabled   |            Possible malicious task manipulation             |
|       4702        | Security |       Scheduled Task Updated        |                 Potential malicious intent                  |
|       4719        | Security |     System Audit Policy Changed     |              Possible attempt to cover tracks               |
|       4738        | Security |        User Account Changed         |                 Potential account takeover                  |
|       4771        | Security | Kerberos Pre-authentication Failed  |              Potential Kerberos service attack              |
|       4776        | Security |    Credential Validation Attempt    |                 Possible brute-force attack                 |
|       5001        | Security | Antivirus Protection Config Changed |            Potential attempt to disable Defender            |
|       5140        | Security |       Network Share Accessed        |                 Tracks network share access                 |
|       5142        | Security |         Network Share Added         |            Potential unauthorized network share             |
|       5145        | Security |    Network Share Access Checked     |                Possible network exploration                 |
|       5157        | Security |         Connection Blocked          |            Identifies malicious network traffic             |
|       7045        | Security |          Service Installed          |               Potential malware installation                |

---
<div style="text-align: center;">
	<div class="gradient-text">👾 2024 rabb1th0les (Chris A)dams 👾</div> 
	🌴☀Thanks for supporting my page ☀🌴
	<nav>
		<ul style="list-style: none; padding: 0;">
			<div style="text-align: center;">
				<li><a href="index.html">Home</a> | <a href="Contact.html">Contact</a></li>
			</div>
		</ul>
	</nav>	
</div>