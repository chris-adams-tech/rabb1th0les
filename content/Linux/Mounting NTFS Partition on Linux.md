---
Owner: Chris Adams
date: 
edited: 
tags:
  - linux
draft:
---

# Mounting NTFS Partition on Linux

Tags: Linux, Self-Created

**Find the NTFS file system**

```bash
$ sudo parted -l
```

**Create a mount point**

```bash
$ sudo mkdir /mnt/ntfs1
```

**Mount on the ntfs1 volume created previously**

```bash
$ sudo mount -t ntfs /dev/sdb1 /mnt/ntfs1
```

**Use *disk free* to check info on filesystems to verify**

```bash
$ df -hT
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