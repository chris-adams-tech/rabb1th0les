---
Owner: Chris Adams
date: 
edited: 
tags:
  - linux
draft:
---

### To Get User ID

```
cat /etc/passwd | grep oldusername
```

#### Adding a user with sudo privileges

*Enter as root*
```
adduser <username>
passwd  <username>
usermod -aG sudo <username>
```

#### To change a username

```
usermod -l newusername oldusername
```

#### Change User ID

```
usermod -u 1234 newusername
```


# Networking/routing

`ping [options] [hostname/IP]`
`ping -c 5 [google.com](<http://google.com>)` - command will ping 5 times to google
`ip [options] object [command]`
`ip addr [subcommand]`

> manages and shows network interface IP addresses

- **`add`** - Adds a new address.
- **`show`** - Shows protocol addresses.
- **`del`** - Removes an address.
- **`flush`** - Flushes addresses based on specified criteria.

`ip addr show [interface]` shows info specific to interface

---

`ip link [subcommand] [options] [interfaces]`

[subcommands]

- **`show`** - Prints network interface information.
- **`set`** - Changes or adds information to a network interface.
- **`add`** - Adds a new network interface.
- **`del`** - Deletes a network interface.

`ip link` - shows all network interface and link information
`ip link set [interface] down` - shuts an interface down
`ip link set [interface] up` - shuts an interface up

[Syntax]:

`ip route [subcommand] [options] [destination]`

[subcommands]:

- **`show`** - Shows the routing table.
- **`add`** - Adds a new route to the table.
- **`del`** - Deletes a route from the table.
- **`change`** - Modifies an existing route.

`ip route show` - view routing table

[Syntax]:

`ifconfig [interface] [options]`

`ifconfig -s` - display summary of all active network interfaces

[Syntax]:

`dig [options] [domain] [record type] [DNS server]`

- **`[options]`** - Parameters that modify the behavior of the command.
- **`[domain]`** - The domain name to query.
- **`[record type]`** - The [DNS record type](https://phoenixnap.com/kb/dns-record-types) to query. Defaults to A records.
- **`[DNS server]`** - A specified DNS server for the query.

_All parameters are optional_

`dig [google.com](<http://google.com>)` - performs simple DNS lookup for google
`dig -x 8.8.8.8` - x option to perform reverse DNS lookup

[Syntax]:

`nslookup [domain] [DNS server]`
`nslookup [google.com](<http://google.com>)` - performs a DNS lookup for google

[Syntax]:

`netstat [options]`
`netstat -at` - lists all TCP ports

[Syntax]:

`traceroute [options] [hostname/IP]`
`sudo traceroute -T 184.95.56.34` - traces route using TCP protocol to ending IP address

[Syntax]:

`route [options] [subcommand] [arguments]`

- **`[options]`** - Optional command-line parameters that control the output view, address family, and IP protocol.
- **`[subcommand]`** - An action to perform, such as **`add`** or **`delete`**.
- **`[arguments]`** - Additional arguments that differ depending on the subcommand.

`route` - view current routing table
`sudo route add default gw [gateway]` - add a default gateway

[Syntax]:

`arp [options] [hostname/IP]`
`arp` - display the ARP cache

[Syntax]:
`wget [options] [URL]`

`curl [options] [URL]`
`wget -O [file name] [URL]` - downloads file using wget
`curl -o [file name] [URL]` - downloads file using curl

[Syntax]:

`tcpdump [options] [filter]`
`tcpdump port 80` - capture packs specific to port 80

# Systemd/services

## Application management (services)

`systemctl enable`
`systemctl restart`
`systemctl start`
`systemctl status`
`systemctl stop`
`systemctl reload`

---

## Control over computers and virtual machines

`systemctl poweroff`
`systemctl reboot`

---

`systemctl --type=service --state=running | grep ssh` - grep to search for specific service
`systemctl list-unit-files --state=disabled` - searches for disabled services

---

## Status of a service in systemd

`systemctl status cups.service`

---

## System information

`journalctl`
`systemctl list-sockets`
`systemctl list-units`
`systemctl list-unit-files`

---

## Systemd information

`systemctl get-default` - shows default target
`systemctl list-automounts` - shows automounts
`systemctl list-dependencies` - lists dependencies of a target
`systemctl list-jobs` - view active jobs
`systemctl list-sockets` - lists sockets and what it activates
`systemctl list-timers` - List timers (scheduled tasks, similar to cronjobs)
`systemctl list-unit-files` - shows unit files and state
`systemctl list-units` - shows loaded/active units

---

## Status and unit changes

`systemctl daemon-reload` - reload changed unit files
`systemctl state=failed (or --failed)` - show failed services
`systemctl reset-failed` - reset unit with failed state
`systemctl enable` - enables service and allows on boot
`systemctl disable` - disable service, don’t start on boot
`systemctl mask` - fully disable a unit
`systemctl unmask` - reactivate unit after being masked

---

## Configuration

`systemctl cat` - show all unit file details
`systemctl show` - show properties
`systemctl edit` - create configuration as drop in unit
`systemctl edit --full` - edit primary unit file for service

---

## Journal (logs

|Long option|Short option|What the option does|
|---|---|---|
|--follow|-f|Track changes, like tail -f|
|--output=|-o|Define what output format should be used for journal entries|
|--reverse|-r|Reverse output, newest on top|
|--since|-S|Limit the data to a specific period|

# Linux IR

## User accounts

`cat /etc/passwd` - List user accounts.
`passwd -S [User_Name]` - Check password status for a user.
`lastlog` - Show the most recent logins.
`last` - Show last logged in users.
`who` - Show who is logged on.
`w` - Show who is logged on and what they are doing.

## Log Entries

`cat /var/log/messages` - Show system messages.
`cat /var/log/auth.log` - Show user authentication logs.
`cat /var/log/secure` - Show authentication log for Red Hat based systems.
`cat /var/log/boot.log` - Show system boot log.
`cat /var/log/dmesg` - Show kernel ring buffer log.
`cat /var/log/kern.log` - Show kernel log.

## System Resources

`top` - Display Linux tasks.
`htop` - Interactive process viewer.
`uptime` - Show system uptime.
`ps aux` - Show currently running processes.
`pstree` - Show running processes as a tree.
`free -m` - Show memory usage in MB.

## Processes

`ps -ef` - Display all the currently running processes on the system.
`pstree -p` - Display processes in a tree format with PIDs.
`top -n 1` - Display top processes.
`ps -eo pid,tt,user,fname,rsz` - Show processes in custom format.
`lsof -i` - List open files associated with network connections.

## Services

`chkconfig --list` - List all services and their current states.
`service --status-all` - Show status of all services.
`systemctl list-units --type=service` - List running services (systemd).

## Files

`ls -alh` - Show all files in human-readable format.
`find / -name [filename]` - Find a specific file.
`find / -mtime -[N]` - Find files modified in the last N days.
`find / -atime -[N]` - Find files accessed in the last N days.
`find / -size +[N]c` - Find files larger than N bytes.

## Network Settings

`ifconfig -a` - Show all network interfaces.
`netstat -antup` - Show active network connections.
`iptables -L -n -v` - Show all iptables rules.
`route -n` - Show routing table.
`ss -tuln` - Show listening ports and established connections.

## Misc Commands

`export PS1='$ '` - Hides username in terminal windows
`grep :0: /etc/passwd` - Find root accounts.
`find / -nouser -print` - Find files with no user.
`cat /etc/shadow` - View encrypted passwords and account expiration information.
`cat /etc/group` - View group information.
`cat /etc/sudoers` - View sudoers file.
`tail /var/log/auth.log` - View the last few entries in the authentication log.
`history | less` - View command history.
`cat /proc/meminfo` - Display memory information.
`cat /proc/mounts` - Display mounted filesystems.
`lsof -p [pid]` - List open files for a process (use a specific PID).
`service --status-all` - List all services and their status.
`cat /etc/crontab` - View the cron table for scheduled tasks.
`more /etc/resolv.conf` - View DNS settings.
`more /etc/hosts` - View host file entries.
`iptables -L -n` - List all iptables rules without resolving IP addresses.
`find /home/ -type f -size +512k -exec ls -lh {} \\;` - Find files larger than 512KB in home directories.
`find /etc/ -readable -type f 2>/dev/null` - Find readable files in the etc directory.
`find / -mtime -2 -ls` - Find files modified in the last 2 days.
`netstat -nap` - Show network connections and associated programs.
`arp -a` - View the ARP table.
`echo $PATH` - Display the PATH environment variable.

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