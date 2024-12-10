---
date: 2024-10-26
title: Verifying Network connections on Ubuntu
---
### 1. Check Network Configuration on Ubuntu

- **Verify IP Address and Subnet Mask**:
  ```bash
  ip a
  ```
  
> Ensure that the IP address and subnet mask are correctly configured on the Ubuntu machine and that they are on the same subnet as the Windows host.

- **Routes**:
  Check the routing table to ensure that there’s a route to the Windows host:
  ```bash
  ip route
  ```
  You should have a route that covers the subnet of the Windows host.

### 2. Check Firewall Settings

- **UFW Status** (Uncomplicated Firewall):
  Check if the UFW is active on the Ubuntu machine:
  
  ```bash
  sudo ufw status
  ```
 
  If it's active, you can allow ping requests:
  
  ```bash
  sudo ufw allow from <windows_ip> to any proto icmp
  ```

- **IPTables**:
  If you are using `iptables`, list the rules to see if there are any blocking ICMP (ping) packets:
  ```bash
  sudo iptables -L -n -v
  ```

### 3. Windows Firewall

- **Check Windows Firewall Rules**:
  On your Windows machine, check if the Windows Firewall is configured to allow ICMP packets (ping). To do this:
  - Go to **Control Panel** > **System and Security** > **Windows Firewall** > **Advanced settings**.
  - Go to "**Inbound Rules**" and look for "**File and Printer Sharing** (Echo Request - ICMPv4-In)" and ensure it is **enabled**.

### 4. Network Adapter Configuration

- **Virtual Machine Settings**:
  Ensure that the network adapter for the Ubuntu VM is properly configured. Common options include:
  - **NAT**: This connects the VM to the host's network. It allows the VM to communicate with the host and external networks, but the host cannot access the VM.
  - **Bridged Adapter**: This allows the VM to appear as a separate device on the local network, making it visible to the host and other devices.

- If you’re using a Virtualization platform (like VMware, VirtualBox):
  - Open the VM settings and check the network configuration type.
  - Switch between NAT and Bridged if necessary and see if that resolves the issue.

### 5. Test Local Connectivity

- **Ping Local IPs**:
  From the Ubuntu server, try to ping the default gateway and any other local IPs on the same network if available. This can help isolate if the issue is only with the Windows host.

### 6. Check Hostname Resolution

- **Use IP Address**:
  Instead of pinging by hostname, use the IP address of the Windows host to rule out DNS resolution issues. Hostnames are kept in the `/etc/hosts` file.

### 7. Logging and Diagnosis

- **Use `tcpdump`**:
  You can use `tcpdump` on the Ubuntu machine to check if ICMP requests and replies are being sent and received:
  ```bash
  sudo tcpdump -i any icmp
  ```
  This will show you ICMP traffic; you can note if you see pings being sent and any replies received.

### 8. Restart Network Services

- **On Ubuntu**:
  You can try restarting the network services on the Ubuntu machine:
  ```bash
  sudo systemctl restart networking
  ```

- **Reboot the Virtual Machine**:
  If possible, you might also consider rebooting the Ubuntu VM to ensure all changes take effect.

### 9. Check System Logs

- Look at system logs for any relevant messages:
  ```bash
  dmesg | grep -i network
  journalctl -u network
  ```

After running these commands and viewing the output, you should have a better understanding where the connection is dropping.

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