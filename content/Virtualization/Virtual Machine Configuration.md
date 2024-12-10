---
Owner: Chris Adams
date: 
edited: 
tags:
  - Virtualization
  - Virtualization/libvirt
  - os/linux
  - Virtualization/kvm
  - Virtualization/qemu
---
### To check the status of a virtual machine, such as the `virtual size` or the `disk size`

Run this command to see the available discs on your machine
```Bash
sudo fdisk -l
```

It may not appear in the `df -h` output. In my machine, it appears as `/dev/zram0`

```Bash
Disk /dev/zram0: 30.66 GiB, 32917946368 bytes, 8036608 sectors
Units: sectors of 1 * 4096 = 4096 bytes
Sector size (logical/physical): 4096 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
```

### KVM CLI
**View available virtual machines**
```Bash
sudo virsh list
```

**Shutdown an active virutal machine**
```Bash
sudo virsh shutdown <HOSTNAME>
```

**Confirm the virtual host is shutdown**
```Bash
sudo virsh list
```

**Locate virtual machine’s file path**
```Bash
sudo virsh domblklist <HOSTNAME>
```

**Obtain information about the guest OS virtual machine**
```Bash
sudo qemu-img info <PATH-FROM-OUTPUT-ABOVE>
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