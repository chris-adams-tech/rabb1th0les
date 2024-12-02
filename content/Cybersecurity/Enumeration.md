---
Owner: Chris Adams
date: 
edited: 
tags:
  - pentesting/enumeration
  - scanning
  - notes
draft: 
type: Technical Guide
topic: Enumeration
---
### Port Scanning

nmap
- nmap -v -A -sV _IPADDRESS_
    - -v gives extra information in the output data
    - -A identifies the target OS, services, versions, performs traceroute, and applies NSE scripts to detect additional information
    - -sV tries to determine what service and version are running

TCP scanning

- scans 1000 ports by default
- SYN scan
```bash
nmap -sS <target-ip>
```
![[_attachments/nmap.png]]

 - Full Connect Scan
```bash
nmap -sT -p <port(s)> <target-network/cidr>
```
 ![[_attachments/full.png]]
 
- XMAS scan with nmap
```bash
nmap -sX <target-ip>
```
![[_attachments/xmas 1.png]]

- UDP Scanning
```bash
nmap -sU -T 4 <target-ip>
```
![[_attachments/udp.png]]

 - Version Scan
```bash
nmap -sV <target-ip>
```

![[_attachments/version.png]]

 - OS Scan
```bash
nmap -O <target-ip>
```

![[_attachments/os.png]]
 
- Script Discovery
```bash
nmap -sS --script-discovery <target-network/cidr>
```

![[_attachments/sd 1.png]]
## zenmap
![[_attachments/zm 1.png]]
## NetworkMiner

[https://www.netresec.com/docs/NetworkMiner_Manual.pdf](https://www.netresec.com/docs/NetworkMiner_Manual.pdf)

- Difference between NetworkMiner and Wireshark

| Feature                     | **NetworkMiner**                                     | **Wireshark** |
| --------------------------- | ---------------------------------------------------- | ------------- |
| Purpose                     | Quick overview, traffic mapping, and data extraction | In-Depth      |
| GUI                         | ✅                                                    | ✅             |
| Sniffing                    | ✅                                                    | ✅             |
| Handling PCAPS              | ✅                                                    | ✅             |
| OS Fingerprinting           | ✅                                                    | ❌             |
| Parameter/Keyword Discovery | ✅                                                    | Manual        |
| Credential Discovery        | ✅                                                    | ✅             |
| File Extraction             | ✅                                                    | ✅             |
| Filtering Options           | Limited                                              | ✅             |
| Packet Decoding             | Limited                                              | ✅             |
| Protocol Analysis           | ❌                                                    | ✅             |
| Payload Analysis            | ❌                                                    | ✅             |
| Statistical Analysis        | ❌                                                    | ✅             |
| Cross-Platform Support      | ✅                                                    | ✅             |
| Host Categorisation         | ✅                                                    | ❌             |
| Ease of Management          | ✅                                                    | ✅             |

Resources
[https://www.netresec.com/?page=Blog&month=2011-09&post=Pcap-over-IP-in-NetworkMiner](https://www.netresec.com/?page=Blog&month=2011-09&post=Pcap-over-IP-in-NetworkMiner)  
https://www.gavinhollinger.com/2016/10/pcap-over-ip-to-networkminer.html
  
## Ping Sweep
- MegaPing

## Port scanner
- rustscan

 https://github.com/RustScan/RustScan

- rpcinfo (portmapper

 ![[_attachments/rpcinfo.png]]

## netcat

- networking program designed to write and read data across a network
    - TCP
    - UDP

Capabilities
- port scanning
- tunneling
- proxying
- port forwarding
- transferring files
- grabbing banners
- port listening, port redirection
- backdoor

### Options

| Option | Description                                                     |
| ------ | --------------------------------------------------------------- |
| -h     | Help \| Version                                                 |
| -v     | Verbosity                                                       |
| -l     | Listen mode/server mode                                         |
| -e     | Allows to execute a specific program when client connects to it |
| -k     | Accept multiple connections                                     |
| -o     | Hex dump of traffic                                             |
| -r     | Randomize ports                                                 |
| -u     | UDP mode                                                        |
| -w     | seconds] Wait timeout                                           |
| -z     | Zero-I/O mode, report connection status                         |

Transferring Files using Netcat

![[_attachments/netcat-ft.png]]

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