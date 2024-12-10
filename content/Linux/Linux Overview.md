---
Owner: Chris Adams
date: 2024-11-19
tags: 
draft: false
title: Linux Overview
---
# Linux Operating System Components


| Component       | Description                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Bootloader      | chunk of code that runs to guide booting process that starts the operating system                                             |
| OS Kernel       | main component of operating system; manages resources at hardware level                                                       |
| Daemons         | background services to ensure functionality, loaded after boot sequence or user login                                         |
| OS Shell        | interface between OS and the user; ie. `Bash`, `Tcsh/Csh`, `Ksh`, `Zsh`, `Fish`                                               |
| Graphics server | provides graphical subsystem (server), called "X" or "X-server"; allows GUI to run locally or remotely                        |
| Window Manager  | GUI, many options, `GNOME`, `KDE`, `MATE`, `Unity`, `Cinnamon` desktop environment that includes apps, files and web browsers |
| Utilities       | programs that perform particular functions                                                                                    |


## Architecture


| Layer          | Description                                                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hardware       | peripheral devices; RAM, hard drive, CPU                                                                                                                         |
| Kernel         | core of Linux OS, controls hardware resources; kernel gives each process its own virtual resources and prevents/mitigates conflicts between different processes. |
| Shell          | command-line interace (CLI)                                                                                                                                      |
| System Utility | enables operating system functionality for the user                                                                                                              |

## Linux Directory Structure

`/` 	The top-level directory is the root filesystem and contains all of the files required to boot the operating system before other filesystems are mounted, as well as the files required to boot the other filesystems. After boot, all of the other filesystems are mounted at standard mount points as subdirectories of the root.
	`/bin` 	Contains essential command binaries.
	`/boot` 	Consists of the static bootloader, kernel executable, and files required to boot the Linux OS.
	`/dev` 	Contains device files to facilitate access to every hardware device attached to the system.
	`/etc` 	Local system configuration files. Configuration files for installed applications may be saved here as well.
`/home` 	Each user on the system has a subdirectory here for storage.
	`/lib` 	Shared library files that are required for system boot.
	`/media` External removable media devices such as USB drives are mounted here.
	`/mnt` 	Temporary mount point for regular filesystems.
	`/opt` 	Optional files such as third-party tools can be saved here.
	`/root` 	The home directory for the root user.
	`/sbin` 	This directory contains executables used for system administration (binary system files).
	`/tmp`	The operating system and many programs use this directory to store temporary files. This directory is generally cleared upon system boot and may be deleted at other times without any warning.
	`/usr` 	Contains executables, libraries, man files, etc.
	`/var` 	This directory contains variable data files such as log files, email in-boxes, web application related files, cron files, and more.

### Other variables


| Special Character | Description                                |
| ----------------- | ------------------------------------------ |
| `\d`              | Date (Mon Feb 6)                           |
| `\D{%Y-%m-%d}`    | Date (YYYY-MM-DD)                          |
| `\H`              | Full hostname                              |
| `\j`              | Number of jobs managed by the shell        |
| `\n`              | Newline                                    |
| `\r`              | Carriage return                            |
| `\s`              | Name of the shell                          |
| `\t`              | Current time 24-hour (HH:MM:SS)            |
| `\T`              | Current time 12-hour (HH:MM:SS)            |
| `\@`              | Current time                               |
| `\u`              | Current username                           |
| `\w`              | Full path of the current working directory |

# Necessary commands


<div class="neon-line"></div>



| Command    | Description                                                                                                                        |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `whoami`   | Displays current username.                                                                                                         |
| `id`       | Returns users identity                                                                                                             |
| `hostname` | Sets or prints the name of current host system.                                                                                    |
| `uname`    | Prints basic information about the operating system name and system hardware.                                                      |
| `pwd`      | Returns working directory name.                                                                                                    |
| `ifconfig` | The ifconfig utility is used to assign or to view an address to a network interface and/or configure network interface parameters. |
| `ip`       | Ip is a utility to show or manipulate routing, network devices, interfaces and tunnels.                                            |
| `netstat`  | Shows network status.                                                                                                              |
| `ss`       | Another utility to investigate sockets.                                                                                            |
| `ps`       | Shows process status.                                                                                                              |
| `who`      | Displays who is logged in.                                                                                                         |
| `env`      | Prints environment or sets and executes command.                                                                                   |
| `lsblk`    | Lists block devices                                                                                                                |
| `lsusb`    | Lists USB devices                                                                                                                  |
| `lsof`     | Lists opened files                                                                                                                 |
| `lspci`    | Lists PCI devices                                                                                                                  |

### Find Files and Directories

##### To find a path to a file or an executable, use the `which` command

```bash
which python

/usr/bin/python
```

#### To find and filter files and folders, use the `find` command

```bash
find <location> <options>
```

Here's an example from `HacktheBox`

```bash
find / -type f -name *.conf -user root -size +20k -newermt 2020-03-03 -exec ls -al {} \; 2>/dev/null
```

Let's break this down:

| Option | Description |
|--------|-------------|
| `-type f` | Hereby, we define the type of the searched object. In this case, 'f' stands for 'file'. |
| `-name *.conf` | With '-name', we indicate the name of the file we are looking for. The asterisk (*) stands for 'all' files with the '.conf' extension. |
| `-user root` | This option filters all files whose owner is the root user. |
| `-size +20k` | We can then filter all the located files and specify that we only want to see the files that are larger than 20 KiB. |
| `-newermt 2020-03-03` | With this option, we set the date. Only files newer than the specified date will be presented. |
| `-exec ls -al {} \;` | This option executes the specified command, using the curly brackets as placeholders for each result. The backslash escapes the next character from being interpreted by the shell because otherwise, the semicolon would terminate the command and not reach the redirection. |
| `2>/dev/null` | This is a STDERR redirection to the 'null device', which we will come back to in the next section. This redirection ensures that no errors are displayed in the terminal. This redirection must not be an option of the 'find' command. |

#### If the directory is not known, a faster search with `locate` may suffice.

The example below shows a search for all files ending in the `.conf` extension
```bash
locate *.conf
```


> [!info] Find vs Locate
> `Locate` does not have as many filter options as `Find` so depending on what your search parameters are, one may be better suited than the other.

---

Thanks for taking the time to read through my content. If you enjoy this type of content, check back here for more updates. 

Peace ✌️

#### Created on: Nov 19, 2024

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
