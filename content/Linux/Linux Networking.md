---
Owner: Chris Adams
date: 
edited: 
tags:
  - linux
  - networking
layout: 
draft:
---
# Linux Networking

Tags: Linux, Self-Created

**Checking Default route on Linux CLI**

```bash
# Shows all subnets and routes
$ ip route

# Filters for 'default' route only
$ ip route | grep default

# Displays routing table
$ route -n
```

**Linux show / display available network interfaces using nmcli**

```bash
$ nmcli device status

OR

$ nmcli connection show
```

**Show a table of all network interfaces**

```bash
$ netstat -i
```

**Checking the network interface on Linux using the tcpdump**

```bash
$ tcpdump --list-interfaces
```

**View Routing Table** 

```bash
$ ip r
```

**View ARP cache**

```bash
$ arp
$ arp -a
$ arp -e
$ arp -n
# On modern Linux distros use the ip command #
$ ip neigh
$ ip -s neigh
```

**View available interfaces**

```bash
$ cat /proc/net/dev
```

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