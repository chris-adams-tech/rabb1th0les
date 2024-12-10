---
Owner: Chris Adams
date: 2024-10-24
edited: 2024-10-24T16:04:00
tags: 
draft:
---
# Install Proton VPN on Linux via CLI

> [!Info] Information
> I have noticed that when trying to install from the GUI package manager or any other source, it tends to not work. By following these instructions from the website, it's very easy and straight forward and just works. I have tried time and time again to run Proton exclusively via command line, but always seems to fail and now just use the GUI.

# Download the repo config keys

```
wget https://repo.protonvpn.com/debian/dists/stable/main/binary-all/protonvpn-stable-release_1.0.4_all.deb
```

# Install repo with the app

```
sudo dpkg -i ./protonvpn-stable-release_1.0.4_all.deb && sudo apt update
```

# Verify integrity

```
echo "62a9d849835de8a5664cf95329458bf1966780b15cec420bf707b5f7278b9027  protonvpn-stable-release_1.0.4_all.deb" | sha256sum --check -
```

# Install the GUI

```
sudo apt install proton-vpn-gnome-desktop
```

# Ensure the app is at the latest version

```
sudo apt update && sudo apt upgrade
```

That's it!

# If there are any installation issues and a restart is needed, use these commands:

### To uninstall

```
sudo apt-get autoremove protonvpn`
```

### Remove leftover files

```
rm -rf ~/.cache/protonvpn
```

```
rm -rf ~/.config/protonvpn
```

### If the killswitch is still active after uninstallation, run these commands

```
nmcli con show --active`
```

# Look for connections with prefix `pvpn-
`
```
nmcli connection delete [connection-name]
```

Source: https://protonvpn.com/support/official-linux-vpn-ubuntu/

Warning about using pip for installing packages:
https://protonvpn.com/support/pip-pypi/

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
