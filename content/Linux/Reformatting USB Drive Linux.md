---
Owner: Chris Adams
date: 
edited: 
tags: 
draft:
---


# Reformatting USB Drive on Linux via CLI

## First check the partition to verify the device

```
lsblk
```

### Once the disk is confirmed, usually /dev/sda*

##### Formatting with FAT32 File System

```
sudo mkfs -t vfat /dev/sda1`
```

### Other options

```
sudo mkfs -t ext4 /dev/sda1`    `sudo mkfs -t ntfs /dev/sda1`
```

### To verify

```
lsblk -f
```

Source: https://phoenixnap.com/kb/linux-format-disk

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