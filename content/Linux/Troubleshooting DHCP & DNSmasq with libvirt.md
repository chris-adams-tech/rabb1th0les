---
cssclasses: 
date: 2024-10-11
title: Troubleshooting DHCP & DNSmasq with libvirt
Summary: Commands for troubleshooting libvirt virtual environments
tags:
  - Virtualization/libvirt
  - Virtualization/virt-manager
  - Virtualization/kvm
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