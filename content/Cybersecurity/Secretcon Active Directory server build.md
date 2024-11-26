---
Owner: Chris Adams
date: 
edited: 
tags: 
draft:
---
# A bit about this project
<div class="neon-line"></div>
  
The initial build was based off of a vulnerable AD GitHub lab, originally by **safebuffer** [https://github.com/safebuffer/vulnerable-AD](https://github.com/safebuffer/vulnerable-AD). I, by no means take any credit for the scripts written in these documents, I merely put pieces together of something that was already created, with hopes to learn from it and continue to expand on it. With that being said, I hope you learn something and can build this on your own, then expand on it as I will continue to.
  
Some of the build was based off of work by *Joas A Santos*. Here is a link to his build:

> [https://www.linkedin.com/feed/update/urn:li:activity:7203009970085195777/](https://www.linkedin.com/feed/update/urn:li:activity:7203009970085195777/)

# Tools used in this project
- Active Directory
- KVM/VMware
- Ubuntu22.04 (server)
- Kali Linux
- OpenSSH (optional)
- PowerShell

My home lab set up was originally built on Qemu/KVM then we implemented the actual build into Proxmox.
  

> [!important]  
> As of right now, this is only including the Active Directory and Wazuh build along with their respective rulesets.  
  

> [!Info]  
> If configuring this in your home network, ensure you are isolating this subnet from the rest of your network with proper bridging/VLANs.  

# Some good prior knowledge to have

- Networking (changing IP addresses)
- PowerShell (executing commands)
- Setting up virtual machines and/or bridges
# What is Wazuh?

Wazuh is a open-source security platform that provides unified XDR and SIEM protection for endpoints and cloud workloads.
### Three main components to _Wazuh_:

1. _Wazuh_ server
2. _Wazuh_ indexer
3. _Wazuh_ dashboard
#### Hardware requirements:

|**Agents**|**CPU**|**RAM**|
|---|---|---|
|**1–25**|4 vCPU|8 GiB|
|**25–50**|8 vCPU|8 GiB|
|**50–100**|8 vCPU|8 GiB|

#### Operating System

|Amazon Linux 2|CentOS 7, 8|
|---|---|
|**Red Hat Enterprise Linux 7, 8, 9**|**Ubuntu 16.04, 18.04, 20.04, 22.04**|

Browser compatibibility:
- Chrome 95 or later
- Firefox 93 or later
- Safari 13.7 or later

*Source: https://documentation.wazuh.com/current/installation-guide/index.html

> [!important] Virtual machine deployment
> I won't get into the details of configuring starting the Ubuntu Server. If you need some help in doing so, check out the Ubuntu guide here: https://ubuntu.com/server/docs/basic-installation

For efficiency and security, I connect to my virtual machines using SSH. Steps can be followed below to add the keys to your virtual host. This is assuming that the Ubuntu Server is set up and running.
## Connecting to the machine with SSH

Begin by connecting or opening an SSH connection into your virtual machine.

On the host machine, generate an ssh key.

```bash
ssh-keygen -t ed25519
```

Save the key in the default folder, create a password if you would like. I am using locally so I will skip the password.

Copy the ID to the wazuh virtual machine.

```bash
ssh-copy-id wazuh@<wazuh-ip>
```

Now that the keys are generated and copied to the virtual machine. Run the command below to connect

```bash
ssh wazuh@<wazuh-ip>
```

Now, I connected with a bash shell prompt into the virtual machine. This makes it much easier for running commands to install the Wazuh server. In my case, I did not install the GUI since it is not needed in this setup.

![[wazuh 1.png]]

Notice the username is now at the Wazuh server and if you run `ip a` it will confirm we are in the virtual machine.

![[wazuh1.png]]
# Installing Wazuh via quick install

*Install Wazuh in a quick installation, run the command below

```
curl -sO https://packages.wazuh.com/4.8/wazuh-install.sh && sudo bash ./wazuh-install.sh -a
```

The output will look similar to below.
![[wazuh2.png]]

1. Once finished, the password will be displayed in the output.
2. To access the web interface, go to `https://<wazuh-dashboard-ip>` on your host machine, using the credentials from the output in the last step.

If you are doing this on Libvirt, to set the IP address to static, add the MAC address in the XML file.

First, grab the MAC and IP address from the libvirt interface.

![[Screenshot from 2024-10-25 13-43-28 2.png]]


The DHCP leases can be verified with the following command:

```bash
sudo virsh net-dhcp-leases labz
```

Then, add this in the XML file

![[Screenshot from 2024-10-25 13-45-42 1.png]]

After the MAC address is added, the network will need to be stopped then restarted. This can be done on the interface, or by running the following:

```bash
sudo virsh net-destroy labz
sudo virsh net-start labz
```


> [!Important] My routing configuration
> You'll notice that I have this device connected to the internet via NAT. I am using a dual NIC, which essentially has a management interface to install Wazuh and other files. The other interface is a "Routed" network that allows the forwarding of logs to the Wazuh server. Once I begin testing I remove this interface.


![[wazuh7.png]]

Then, a login screen will appear, where you can enter in the credentials “admin” and the password that was generated with the installation.


> [!NOTE] Note
> This password can be changed but requires a few steps to sync the API and other backend passwords. 

Once connected, you should have landed on a page like this:
![[wazuh9 2.png]]

The basic Wazuh server is now set up and after this, I began setting up the Active Directory server. We will come back to this machine in a few steps.

# Active Directory Set up

## Windows Server download
1. First, download Windows server from the Windows website, the Evaluation version. This allows for 180 days of use for the trial license.
    
    [https://www.microsoft.com/en-us/evalcenter/download-windows-server-2022](https://www.microsoft.com/en-us/evalcenter/download-windows-server-2022)

You may have to enter your information in order to get the link to the download. If you don't want to enter that information, the link above will go directly to the Windows Server 2022 Evaluation Center download.

  _(some browsers won’t allow you to view the ISO, if that happens, try from a different browser)_

### Installation steps

1. **Choose Windows Server 2022 Standard Evaluation (Desktop Experience)**
![[sc-ms-os-setup.png]]

2. **Choose ‘Custom: Install Microsoft Server Operating System’**

![[sc-unallocated.png]]

3. **Select the ‘Unallocated’ drive**

1. **Change the name of the Computer**
![[sc-change-computer.png]]

(Reboot needed)
  
1. Once the Windows Server is installed, open a PowerShell window as Administrator:
2. Run the command below to add Domain Services role to Server Manager

```PowerShell
PS C:\Users\Administrator> 
Install-WindowsFeature -Name ad-domain-services -IncludeManagementTools
```

3. Then, run this script to install Active Directory, be sure to change the domain name before executing

```PowerShell
PS C:\Users\Administrator> 
Install-ADDSForest -CreateDnsDelegation:$false -DatabasePath "C:\\Windows\\NTDS" -DomainMode "7" -DomainName "rabbitlabz.local" -DomainNetbiosName "rabbitlabz" -ForestMode "7" -InstallDns:$true -LogPath "C:\\Windows\\NTDS" -NoRebootOnCompletion:$false -SysvolPath "C:\\Windows\\SYSVOL" -Force:$true
```


* `Install-ADDSForest` - creates a new Active Directory forest
* `-CreateDnsDelegation` - creates DNS delegation that references new DNS server you install along with the domain controller
* `-DatabasePath` - specifies fully qualified, non-Universal Naming Convention (UNC) path to directory — default is %SYSTEMROOT%\NTDS
* `-DomainMode` - specifies domain functional level of first domain in creation of new forest — 7 is Windows Server 2016 or newer
* `-DomainName` - specifies fully qualified domain name (FQDN) for root domain in forest
* `-DomainNetbiosName` - specifies NetBIOS name 
* `-ForestMode` - specifies domain functional level of first domain in creation of new forest — 7 is Windows Server 2016 or newer
* `-InstallDns` - indicates cmdlet installs and configures DNS Server service for new forest
* `-LogPath` - specifies fully qualified, non-UNC path to a directory where log file for this operation is written
* `-NoRebootOnCompletion` - indicates cmdlet does not reboot upon completion
* `-SysvolPath` - specifies fully qualified, non-UNC path to a directory where Sysvol file is written
* `-Force` - forces command to run without asking for user confirmation

4. The server will then reboot and the next login should be with the domain level domain\user.

> [!important]  
> This could also be done through an SSH connection and just run the scripts via PuTTy or a terminal window. I did not because OpenSSH does not play nicely from a Linux KVM to Windows machine.  
## Sysmon Installation

> [!important]  
> In this setup, the Swift on Security configuration file was used and also played around with the Wazuh basic rule set  
  
Check out the ruleset here: https://github.com/SwiftOnSecurity/sysmon-config
  ![[sysmon-config.png]]
1. Download the raw xml file in the files below the README.md

![[sysmon-xml.png]]

1. Now, download Sysmon from Windows

> https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon

![[dl-sysmon 1.png]]


1.  Extract the packages from the Sysmon download
  
2.  Move the `sysmonconfig-export.xml` file into the Sysmon folder that was just extracted
  
3.  Open PowerShell as administrator and move into the Sysmon folder

 ```PowerShell
  PS C:\Users\*****\Downloads\Sysmon> .\sysmon64.exe -accepteula -i sysmonconfig-export.xml
   ```

* `accepteula` - accepts End User License Agreement
* `-i` - installs service and driver along with configuration file


# Logging, GPO, and Auditing

### Enable PowerShell Module Logging and other GPO settings

> [!important]  
> The PowerShell Module logging (Event ID 4104), along with other logging settings, will allow us to capture the full output of the scripts that are being run. Of course, it will be captured on the local machine, then forwarded via Powershell logs to Wazuh.  

![[gpo-dropdown.png]]

![[gpo.png]]
![[sc-enable-module-logging.png]]
![[sc-audit-policy.png]]
# Download the PowerShell script

1. To download directly from GitHub

```PowerShell
wget https://raw.githubusercontent.com/WaterExecution/vulnerable-AD-plus/master/vulnadplus.ps1 -o vulnadplus.ps1
```

* -o` - saves the output file to vulnadplus.ps1

> I downloaded this file, then transferred to the host machine via `scp`.

In the screenshot below are the types of attacks that can be implemented in this lab environment. These may be adjusted by going into the `vulnadplus.ps1` script BEFORE running to adjust to your purposes.

![[Github Repos/img/vulnad.png]]

2. Open the PowerShell file with notepad to adjust the domain name and number of desired users. Be sure to change these settings!!
![[sc-ps-output.png]]
# Adding the Wazuh Agent to Active Directory Server

1. If you are connected to the internet, you can add an agent from the Overview page on the Wazuh dashboard

Click the “Add agent”

![[wazuh9 1.png]]

_This will allow you to generate an agent deploy script for your Active Directory domain controller_

> [!Thought]
> The copied script may be saved in a text file in order to save for the future for more efficiency.

![[wazuh10.png]]

2. Copy the script into a PowerShell prompt with admin privileges. Ensure that both machines are in the same subnet. This will ensure communication can persist.
3. After a few moments, the machine appears as "Disconnected" then moves to "Active".

In my case, I downloaded the `.msi` file from the package list here: https://documentation.wazuh.com/current/installation-guide/packages-list.html

> Another note for what I use for enabling copy/paste functions from my host to virtual machines. A lot of Linux distributions come packaged with the `spice-vdagent`, a packaged from Red Hat. I use this on my Windows machines for enhanced functionality. If you're interested in seeing more information about this, check out their page. https://www.spice-space.org/index.html

Once the `.msi` package is downloaded, I moved the file over to the *ad-server* and installed the Wazuh agent. 

After first installing the agent, there will be no communication between the manager and the agent. I'll add in the IP address for the Wazuh server/manager, then export the key from the manager CLI.

![[wazuh3.png]]

The key can be extracted by running the following command. This is also a very helpful for any other agent management related tasks.

```bash
sudo /var/ossec/bin/manage_agents
```

![[wazuh1 1.png]]

First, we'll add the agent

![[wazuh2 1.png]]

Run `ipconfig` on the ad-server to verify the IP address to be added in the Wazuh manager CLI

![[wazuh3.png]]

Then, extract the key with the `e` option, confirm the address and name details, and enter the ID #. The key then can be entered into the Wazuh Agent GUI interface

![[wazuh5 1.png]]

After confirming the details, I started the service in PowerShell with `NET START Wazuh`

![[wazuh6.png]]


Here I confirmed that the service is running in the cmd prompt and the GUI interface

![[wazuh13.png]]


Now, let's go see in the Wazuh dashboard and see if it's connected.

![[wazuh7 1.png]]

![[wazuh14.png]]

Sweet! Everything looks good, now let's move onto the next steps. 

# Adding the 

1. Before running the script, we want to ensure there is no connectivity to the internet and the DNS is set to it’s own IP address, or loopback `127.0.0.1`.

 **Set your network on this device to ‘isolated’ so it is disconnected from NAT**

2. Open PowerShell and run the edited PowerShell script
  
  ```PowerShell
  PS C:\Users\Administrator> 
   Import-Module .\vulnadplus.ps1   
```

  > The usernames are randomized fyi  

> [!important]  
> In order for alerts to be sent to Wazuh, some configuration in the ossec.conf file is needed. 
  
1. To configure the Sysmon configuration for the agent, go to `C:\'Program Files (x86)'\ossec-agent-ossec.conf` (can be opened in notepad)
  
1. Add these two sections (Event Channels) to the configuration file then save

  ```
<localfile>    
	<location>Microsoft-Windows-Sysmon/Operational</location>
	<log_format>eventchannel</log_format>
</localfile>

<localfile>    
	<location>Microsoft-Windows-PowerShell/Operational</location>
	<log_format>eventchannel</log_format>
</localfile>
```

![[wazuh8.png]]

> [!NOTE]  
> Additional event channels can also be added by using the format below:

```
 <localfile>  
	<location>Microsoft-Windows-PrintService/Operational</location>  
	    <log_format>eventchannel</log_format>  
    </localfile>
```

Once the adjusts are made, restart the Wazuh agent

![[wazuh9 3.png]]
## Options for configuring Windows Event Channels in Wazuh

```XML
    <ossec_config>  
      <syslog_output>
        <level>9</level> # Alert level can be adjusted
        <server>192.168.10.1</server> # If level higher than 9, also sent here 
      </syslog_output>
      
      <syslog_output>
        <server>192.168.10.2</server> # All alerts are sent here
      </syslog_output>
    </ossec_config>
```
    
If you would like to disable the CIS benchmark scans, change the field in the config

  ```XML
  <!-- CIS policies evaluation -->
  <wodle name="cis-cat">
    <disabled>yes</disabled>
    <timeout>1800</timeout>
    <interval>1d</interval>
    <scan-on-start>no</scan-on-start>
```
    
  There are many other settings that can be adjusted in this file that we will not get into here.

> [!important]  
> When changing any of the files, restart the service for the changes to take effect.systemctl restart wazuh-manager  

2. If you are having any communication issues with the agent, check the agent configuration file at `C:\'Program Files (x86)'\ossec-agent-ossec.conf` to verify the Wazuh server IP address.


```XML
    <server>
      <address>'wazuh-server-ip'</address>
      <port>1514</port>
      <protocol>tcp</protocol>
    </server>
```
  
_This ensures communication between the agent and server_
# Configuring the alerts on Wazuh server

> [!important]  
> In addition to the Sysmon config, the Wazuh server must be configured in order to create alerts on the dashboard.  

I used the ruleset that was provided by Wazuh in this article: https://wazuh.com/blog/how-to-detect-active-directory-attacks-with-wazuh-part-1-of-2/

At first, I was capturing the Golden ticket attacks no problem, but then noticed there was no output in the SIEM. I made a few adjustments in the `local_rules.xml` and was able to successfully capture 

![[wazuh12.png]]

![[wazuh15.png]]
# User and Agent Management

## Creating users in Wazuh dashboard

## Managing Agents via CLI

The agents can be managed via the CLI on the Wazuh server by running the command below:

```bash
/var/ossec/bin/manage_agents
```



> [!important]  
> If you would like to limit access, or change to a user account using a different password, then steps below can be followed  
1. Go to the ‘hamburger’ in the top left corner
2. Scroll down to the **Dashboard management** > **Security**
## Removing an agent from the Wazuh manager


## Links to resources used:
  
[https://www.youtube.com/watch?v=f2nRDbwI620](https://www.youtube.com/watch?v=f2nRDbwI620)
[https://github.com/WaterExecution/vulnerable-AD-plus/blob/master/vulnadplus.ps1](https://github.com/WaterExecution/vulnerable-AD-plus/blob/master/vulnadplus.ps1)
[https://www.linkedin.com/feed/update/urn:li:activity:7203009970085195777/](https://www.linkedin.com/feed/update/urn:li:activity:7203009970085195777/)
[https://drive.google.com/file/d/1KcWMCgyH0UdABaZwpPIZ49AJZCxOaA8J/view](https://drive.google.com/file/d/1KcWMCgyH0UdABaZwpPIZ49AJZCxOaA8J/view)

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