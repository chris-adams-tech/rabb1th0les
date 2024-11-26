---
Owner: Chris Adams
date: 
edited: 
tags: 
draft:
---

# Permanently disabling cups

On September 27th, 2024 Hacker News reported a Critical Linux CUPS vulnerability that could allow Remote Command Execution.

Here are the related CVE's:

| **CVE ID**          | **Description**                                                                                                                                                                                                                                            |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CVE-2024-47176      | cups-browsed <= 2.0.1 binds on UDP INADDR_ANY:631 trusting any packet from any source to trigger a Get-Printer-Attributes IPP request to an attacker-controlled URL.                                                                                      |
| CVE-2024-47076      | libcupsfilters <= 2.1b1 cfGetPrinterAttributes5 does not validate or sanitize the IPP attributes returned from an IPP server, providing attacker-controlled data to the rest of the CUPS system.                                                              |
| CVE-2024-47175      | libppd <= 2.1b1 ppdCreatePPDFromIPP2 does not validate or sanitize the IPP attributes when writing them to a temporary PPD file, allowing the injection of attacker-controlled data in the resulting PPD.                                                  |
| CVE-2024-47177      | cups-filters <= 2.0.1 foomatic-rip allows arbitrary command execution via the FoomaticRIPCommandLine PPD parameter.                                                                                                                                     |
Though, it was labeled as a Critical and a 9.0 CVE score, some say that it may have been a bit exaggerated. Regardless, there were about 75,000 machines that were exposed.

MalwareCube, a very well regarded pentester, did his review on this vulnerability and actually exploited it. Here is the link to the video if you want to see the demo: https://www.youtube.com/watch?v=cixyRITXaOw 

![CUPS Exploit Demo](https://youtu.be/cixyRITXaOw?si=VRJHgEuylAsRKUzw)

If CUPS is not needed on your system, you can disable and remove it completely. 
```
sudo systemctl stop cups
sudo service cups stop
sudo snap remove cups
sudo apt-get purge cups
```

### Verify status

After running the above commands, you can verify the CUPS service is disabled and will not autostart.

```
sudo systemctl status cups`
`sudo systemctl status cups-browsed`
```

### Add a firewall rule to reject incoming connections from port 631.

You may also reject the port completely on your firewall. Note, this is for Linux systems running the *uncomplicated firewall*
```
sudo ufw reject 631`
```

### This can also be added in the Firewall in System Settings

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