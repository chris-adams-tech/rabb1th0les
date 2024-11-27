---
Owner: Chris Adams
date: 
edited: 
tags:
---
# Setting up Virtual Machine for offline labs

## Downloading ISOs
Ensure when you are downloading ISO files from the internet, you are protecting yourself and checking and verification methods provided such as `SHA256` hashes, `GPG` keys, etc. I have a quick overview on how to do this, [[Checking SHA256 signature on a file]], if you need a resource, otherwise this can be easily found on the internet. 

If you are moving this over to a hardware that is offline, one option is to dump all of the ISO files onto a external hard drive or USB stick to upload onto your isolated server. Now, this is only if you are keeping your machines completely isolated, with no `SSH` access. If you are using `SSH` then you the `scp` command arises as the best option. `scp` is secure copy that uses `SSH protocol` to tunnel data between the client and receiving hosts. 

Move the files into an accessible folder for you to transfer over to offline server. Ensure that you have the proper permissions 
### Ensure that you can ping the receiving host.
Before trying to move the files over, it is best to ensure that there is connectivity. If it cannot ping, it will not be able to copy to the machine. 

### Connecting via a Layer 2 switched network
If your device is connected to the same network. In the same subnet or VLAN, you will also be able to `ping` and/or `scp` over to the intended machine. 

### Then move to the directory where the ISO files are located

### Run the command below
```
scp <name-of-iso-file> dest-host@dest-host-ip:/path/to/directory`
```

Once the command is run, it will begin uploading to the host and it will then be on the `dest-host-ip` machine in the `path/to/directory`. 

From there the ISO files can be used to create new virtual machines, such as on *Proxmox*.


Hope you learned something!

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