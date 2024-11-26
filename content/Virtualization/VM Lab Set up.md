---
Owner: Chris Adams
date: 
edited: 
tags:
---
# Setting up Virtual Machine for offline labs

# Downloading ISOs

### Choose/Download the image files that you would like to copy over to the server

### Ensure that you can ping the receiving host.

### I used a L2 switch to put the machine on the same subnet.

### Then move to the directory where the ISO files are located
### Run the command below
```
scp <name-of-iso-file> dest-host@dest-host-ip:/path/to/directory`
```


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