---
Owner: Chris Adams
date: 
edited: 2024-10-23T01:12:00
tags:
  - os/linux
  - cli
draft: false
---
# Adding user to sudo group

The *sudo* command effectively grants users permissions to execute commands with elevated privileges. 

```
sudo usermod -aG sudo <username>
```

This will add the user to the *sudo* group. And as seen in the configuration, any user in this group will be able to execute any command.

![[sudo.png]]

A system restart is needed to enable the user's permissions.

Further customizations to execution permissions can be further modified in the `/etc/sudoers` file. For more information on this, see here: https://www.digitalocean.com/community/tutorials/how-to-edit-the-sudoers-file


# Adding user to libvirt group

#### Verify the user group exists

```
sudo grep libvirt /etc/group
```

### If it does not exist use the command below
```
sudo usermod -aG --system libvirt
```
### Add the user to the group

```
sudo usermod -aG libvirt <username>
```


#### Created on: Oct 23, 2024
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


