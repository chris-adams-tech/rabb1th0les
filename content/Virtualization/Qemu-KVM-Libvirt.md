---
Owner: Chris Adams
date: 
edited: 
tags:
  - linux
  - Virtualization/kvm
  - Virtualization/libvirt
  - Virtualization
  - qemu
  - Virtualization/virt-manager
  - cli
  - networking
---
Part of my journey into Linux also began into `libvirt` and `Qemu`. To me, it just made sense as it came native to most Linux distributions. So here are some commands and little tricks that I found useful when using this in my home lab.
### KVM CLI
**View available virtual machines**
```Bash
virsh list
```

**Shutdown an active virutal machine**
```Bash
virsh shutdown <HOSTNAME>
```

**Confirm the virtual host is shutdown**
```Bash
virsh list
```

**Locate virtual machine’s file path**
```Bash
virsh domblklist <HOSTNAME>
```

**Obtain information about the guest OS virtual machine**
```Bash
qemu-img info <PATH-FROM-OUTPUT-ABOVE>
```

## Network Tunneling

> [!info] Network tunneling with… QEMU?  
> While investigating an incident, we detected uncommon malicious activity inside one of the systems.  
> [https://securelist.com/network-tunneling-with-qemu/111803/](https://securelist.com/network-tunneling-with-qemu/111803/)  
**View routing table** (helpful for figuring out which IP is correlated to which bridge)
```Bash
$ ip r
```


```Bash
$ ip link show type bridge
```

![[vm-bridge.png]]

This will show the virtual bridges attached to your KVM hypervisor

> [!important]  
> When creating a new network, the network must be restarted if there are any changes such as the dhcp leasing  
  
To add a bridge to your virtual networks
```JavaScript
$ sudo ip link add testbr0 type bridge
$ sudo ip link show type bridge
```

## **XML formatting**
  
Formatting for .xml virtual networks
```XML
<network>
  <name>default6</name>
  <bridge name="virbr0"/>
  <forward mode="nat"/>
  <ip address="192.168.122.1" netmask="255.255.255.0">
    <dhcp>
      <range start="192.168.122.2" end="192.168.122.254"/>
    </dhcp>
  </ip>
  <ip family="ipv6" address="2001:db8:ca2:2::1" prefix="64">
    <dhcp>
      <range start="2001:db8:ca2:2:1::10" end="2001:db8:ca2:2:1::ff"/>
    </dhcp>
  </ip>
</network>
```

_**libvirt**_ **git files**

> [!info]  
>  
> [https://github.com/libvirt/libvirt/blob/master/src/network/default.xml.in](https://github.com/libvirt/libvirt/blob/master/src/network/default.xml.in)  

### CLI lib-virth helpful commands

**View Virtual networks**

```Bash
$ sudo virsh net-list --all
```

**View Virtual Devices on network**
```Plain
$ sudo virsh list --all 
```

**View bridges**
```Bash
$ ip link show type bridge
```

**Edit a config**
```Bash
$ sudo virsh net-edit default
```

**Show interfaces linked to bridge**
```Bash
$ ip link show master virbr0
```

**Create a new bridge**
```Bash
$ sudo ip link add br0 type bridge
```

**Verify new bridge**
```Bash
$ sudo ip link show type bridge
```
  
### **Linux virsh networking config**
- [https://www.cyberciti.biz/faq/linux-list-network-interfaces-names-command/](https://www.cyberciti.biz/faq/linux-list-network-interfaces-names-command/)
- [https://computingforgeeks.com/managing-kvm-network-interfaces-in-linux/](https://computingforgeeks.com/managing-kvm-network-interfaces-in-linux/)
- [https://computingforgeeks.com/virsh-commands-cheatsheet/#45-virsh-manage-networking](https://computingforgeeks.com/virsh-commands-cheatsheet/#45-virsh-manage-networking)
- [https://linuxconfig.org/how-to-use-bridged-networking-with-libvirt-and-kvm](https://linuxconfig.org/how-to-use-bridged-networking-with-libvirt-and-kvm)
  
### **VLAN setup for vswitch in QEMU**

> [!important]  
> I’ve found for that I have not needed to use Open vSwitch because of the libvirt network bridging, however, there may be use cases where it could be implemented.  
- [https://wiki.archlinux.org/title/Open_vSwitch](https://wiki.archlinux.org/title/Open_vSwitch)
  
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