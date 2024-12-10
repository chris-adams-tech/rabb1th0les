---
Owner: Chris Adams
date: 
edited: 
tags:
  - Virtualization
  - Virtualization/libvirt
  - troubleshooting
  - os/linux
  - security-engineer/networking
---

When trying to assign static IP addresses or having multiple NIC's on a virtual machine can get rather tricky. This is because libvirt has it's own DHCP server and uses DNSmasq, which routes DNS requests with the main host, rather than the vm making the calls.

I found the easiest way without having to set up your own DHCP and DNS, is to verify the leases with the following command

`sudo net-dhcp-leases <vm_network_name>`

This will print all the current lease details, including when the lease ends. After researching, it appears that DHCP is supposed to reset when starting and stopping the network with this command

`sudo virsh net-destroy <vm_network_name>`
`sudo virsh net-start <vm_network_name>`

However, when I had tried this, it never seemed to work. Instead of refreshing, the work around I used was to just manually add the IP/MAC address combination to the network's xml file, under the DHCP lease.

##### To find the MAC address via the XML file, run the command below.

`sudo virsh dumpxml <vm_name> | grep '<mac'`

### DNSmasq files

`/var/lib/libvirt/dnsmasq`



> [!INFO] Virsh Info
>This new virsh command below uses the new virNetworkUpdate() API to modify an existing network definition, and optionally have those modifications take effect immediately without restarting the network.

An example usage:

```
virsh net-update add-last ip-dhcp-host \
   --xml "<host mac='00:11:22:33:44:55' ip='192.168.122.45'/>" \
   --live --config
```
If you like, you can instead put the xml into a file, and call like
this:
```
virsh net-update add-last ip-dhcp-host \
   --file "<host mac='00:11:22:33:44:55' ip='192.168.122.45'/>" \
   --live --config
```
  
Source: https://listman.redhat.com/archives/libvir-list/2012-September/msg01380.html


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