---
Owner: Chris Adams
date: 
edited: 
tags: []
draft:
---

```Bash
$ sudo pacman -Qi openssh
```
If there is an error run..
```Bash
$ sudo pacman -S openssh
```
**To start the SSH server**
```Bash
$ sudo systemctl status sshd
$ sudo systemctl enable sshd
$ sudo systemctl start sshd
```
**Check your host IP address**
```Bash
$ ip a
```
**Connect to the remote host**
```Bash
$ ssh USERNAME@IP_ADDRESS
```
**To change port for remote access, such as port 80**
```Bash
$ sudo nano /etc/ssh/sshd_config
```
**Apply changes**
```Bash
sudo systemctl restart sshd
```
**Accessing from alternate port**
```Bash
$ ssh -p 80 USERNAME@IP_ADDRESS
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