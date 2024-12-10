---
Owner: Chris Adams
date: 2024-10-25
edited: 
tags:
  - os/windows
  - security-engineer/active-directory
  - security-engineer/windows-services
draft: 
type: Installation Guide
topic: Analysis Tools
---
SilkETW is a powerful tool for monitoring and analyzing Windows Event Tracing for Windows (ETW) logs, which can provide insights into various activities within a Windows environment.

### Step 1: Setting Up SilkETW

1. **Download SilkETW**:
   - Visit the [SilkETW GitHub repository](https://github.com/Neo23x0/silketw) and download the latest release.

2. **Install Dependencies**:
   - Ensure you have the necessary dependencies installed. SilkETW requires .NET Framework and may need additional libraries depending on your environment.


> [!info] VC++ and Microsoft .NET Framework
> On a freshly booted system, Visual C++ for Visual Studio will need to be installed to run SilkETW. If you are booting Active Directory Server, this should have the required version of the .NET framework installed, at least v4.5. Here is the link to the file download: https://www.microsoft.com/en-ie/download/details.aspx?id=48145. 
> 
> Here is the link to the Microsoft .NET Framework 4.5. Though, it should already be installed: https://www.microsoft.com/en-ie/download/details.aspx?id=30653


If Microsoft .NET Framework is already at 4.5, you will see this upon installation:
![[_attachments/silketw2.png]]

<div class="neon-line"></div>

I am hosting my Active Directory server locally, so I will create a local Remote Desktop Connection with a file share, in order to get the executables to the local machine.


> Using `xfreerdp` I am able to get a remote connection to my Windows machine locally. This requires `xfreerdp2-x11` package.


Here is the command syntax below:

```bash
xfreerdp /u:<username> /p:<password> /v:<ip-address> /drive:<path/to/folder/to/share> /dynamic-resolution
```

![[_attachments/silketw4.png]]

This makes it much easier for file sharing and getting programs or needed software onto the machine, without having to have a connection to the internet.


## Onto SilkETW


I've extracted the SilkETW zip file into a new folder in the `C:\Tools\Silk` directory.

   >- Open a command prompt or PowerShell window with administrative privileges.
   >- Navigate to the directory where SilkETW is located.
   >- Run SilkETW using the following command:


```powershell
 .\Silketw.exe
```

![[_attachments/silketw.png]]


After executing, you should see an output like below.

![[_attachments/silketw1.png]]

# Installing the Service

On initial execution, there was an error in trying to install using the `.\` method. When running the command below, you may see this error.


```
.\SilkService.exe
```

![[silketw6.png]]



This can be fixed by running the command below to start the service


```cmd
sc create SilkService binpath= "C:\\Tools\\Silk\\SilkService.exe"

```

![[_attachments/silketw5.png]]


Now, let's check which Event Trace sessions are already enabled by default.


```cmd
logman -ets
```

![[_attachments/silketw3.png]]


### To query all providers

This will dump all of the providers. This method would not be recommended, as it outputs way more info than needed, however, it can be useful for discovering new providers. 


```cmd
logman query providers
```

#### Query specific ETW Providers


```cmd
$ETWProviders | Where-Object { $_ -Like "*Security*" }
```


This returns the providers that match the string `Security`


![[_attachments/etw.png]]

#### Find more information about a provider


```cmd
logman query providers "Security: KDC"
```


![[_attachments/etw1.png]]


Or another example with the NTLM Authentication provider


![[_attachments/etw3.png]]


Here are some key providers that I will begin focusing on. This seems to be a good starting point for capturing Kerberos related events.


```
Microsoft-Windows-LDAP-Client            {099614A5-5DD7-4788-8BC9-E29F43DB28FC}
Microsoft-Windows-Security-Kerberos      {98E6CFCB-EE0A-41E0-A57B-622D4E1B30B1}
```


#### To see subscriptions for an Event Trace Session


```cmd
logman query "EventLog-System" -ets
```


![[_attachments/etw4.png]]

# Adding LDAP Logging in GUI

Event logging can also be added via the registry editor in the GUI interface.

First, open the Registry Editor and go to:

> HKEY_LOCAL_MACHINE -> SYSTEM -> CurrentControlSet -> Services -> NTDS -> Diagnostics

Set the '15 Field Engineering' to '5'

This enables Expensive and Inefficient LDAP calls to be logged in Event Viewer.

>Recent LDAP queries  
Go to Event Viewer → Filter Directory Service logs to locate the event ID 1644 (Windows Server 2003 to 2012)

Source: https://learn.microsoft.com/en-us/answers/questions/558208/ldap-ldaps-authentication-audit-through-win-events


> [!INFO] Enable LDAP Signing
> The best practice is to enable LDAP signing, the instructions can be found here: https://learn.microsoft.com/en-us/troubleshoot/windows-server/active-directory/enable-ldap-signing-in-windows-server


Here, we can see a lot of different types of logs. More importantly, are the `Provider Guid`. This is what will help us to configure event traces, if implementing from the CLI.


> To see more available GUIDS without querying, check out this page, where I've begun compiling some for testing: [[Notes/Microsoft/Windows Security & Logging/Logman provider GUID]]


There are probably many other ones that can be useful, but for the sake of not being overloaded with tons of logs, I am beginning with small steps. 

I finally figured it out! I had been working with an AI chat to build a PowerShell script to implement SilkETW traces by GUID. After some testing and debugging, here is the result:

```powershell
# Run as Administrator check
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Error "This script requires administrative privileges. Please run as Administrator."
    exit
}

# Define the GUID for SilkETW - replace with your specific GUID if different
$SilkETWGuid = "{099614A5-5DD7-4788-8BC9-E29F43DB28FC}"
$SessionName = "SilkETWTrace"

function Enable-SilkETWTrace {
    param(
        [Parameter(Mandatory=$true)]
        [string]$SessionName,
        [Parameter(Mandatory=$true)]
        [string]$ProviderGuid
    )
    
    try {
        Write-Host "Starting ETW trace session setup..." -ForegroundColor Yellow
        
        # Stop any existing sessions
        Write-Host "Checking for existing sessions..." -ForegroundColor Yellow
        $stopResult = & logman stop "$SessionName" -ets 2>&1
        Start-Sleep -Seconds 2

        # Delete any existing session definitions
        Write-Host "Removing any existing session definitions..." -ForegroundColor Yellow
        $deleteResult = & logman delete "$SessionName" 2>&1
        Start-Sleep -Seconds 2

        # Create new trace session with initial provider configuration
        Write-Host "Creating new trace session..." -ForegroundColor Yellow
        $createCmd = "logman create trace `"$SessionName`" -p `"$ProviderGuid`" 0xffffffffffffffff 0xff -rt -ets"
        Write-Host "Executing: $createCmd" -ForegroundColor Gray
        $createResult = Invoke-Expression $createCmd 2>&1

        if ($createResult -match "Error:") {
            throw "Failed to create session. Error: $createResult"
        }

        # Verify session was created successfully
        Start-Sleep -Seconds 2
        $verifySession = & logman query "$SessionName" -ets 2>&1
        if ($verifySession -match "Data Collector Set was not found") {
            throw "Failed to verify session creation"
        }

        Write-Host "Successfully created and started ETW trace session!" -ForegroundColor Green
        Write-Host "Session Name: $SessionName" -ForegroundColor Green
        Write-Host "Provider GUID: $ProviderGuid" -ForegroundColor Green
        
        # Display current status
        Write-Host "`nCurrent session status:" -ForegroundColor Yellow
        & logman query "$SessionName" -ets
        return $true
    }
    catch {
        Write-Error "Failed to create ETW trace session: $_"
        
        # Cleanup on failure
        Write-Host "Attempting cleanup..." -ForegroundColor Yellow
        & logman stop "$SessionName" -ets 2>&1 | Out-Null
        & logman delete "$SessionName" 2>&1 | Out-Null
        return $false
    }
}

function Remove-TraceSession {
    param(
        [Parameter(Mandatory=$true)]
        [string]$SessionName
    )
    
    try {
        Write-Host "Stopping trace session..." -ForegroundColor Yellow
        $stopResult = & logman stop "$SessionName" -ets 2>&1
        Start-Sleep -Seconds 1
        
        Write-Host "Removing session definition..." -ForegroundColor Yellow
        $deleteResult = & logman delete "$SessionName" 2>&1
        
        if ($stopResult -notmatch "Error:" -and $deleteResult -notmatch "Error:") {
            Write-Host "Session stopped and removed successfully." -ForegroundColor Green
        } else {
            Write-Host "No active session found or already removed." -ForegroundColor Yellow
        }
    }
    catch {
        Write-Error "Failed to stop trace session: $_"
    }
}

# Main execution
try {
    Write-Host "=== Starting SilkETW Trace Session Setup ===" -ForegroundColor Cyan
    
    $result = Enable-SilkETWTrace -SessionName $SessionName -ProviderGuid $SilkETWGuid
    
    if ($result -eq $true) {
        Write-Host "`nSetup completed successfully!" -ForegroundColor Green
        Write-Host "To stop the session later, use: Remove-TraceSession -SessionName '$SessionName'" -ForegroundColor Yellow
    }
}
catch {
    Write-Error "Main execution failed: $_"
}

# Uncomment the following line to automatically stop the session
# Remove-TraceSession -SessionName $SessionName
```

In the second clause, you'll see a GUID value in between two brackers `{}`. From my testing so far, any GUID can be placed to enable a trace session.

Checks seem to be successful, however, we will take a further look and see if they are in fact enabled

![[_attachments/etw6.png]]

If we run a `logman -ets` we can see that the *SilkETWTrace* is running!

![[_attachments/etw7.png]]

### Step 2: Configure SilkETW for Monitoring


SilkETW uses JSON formatting for configuring searches and alerts.


Here is an example:

```json
{
    "Technique": "UserTrace",
    "Output": {
        "Type": "file",
        "FilePath": "C:\\Logs\\KerberosETW.json"
    },
    "Providers": [
        {
            "Provider": "Microsoft-Windows-Security-Kerberos",
            "KeywordsAny": "0xFFFFFFFFFFFFFFFF",
            "KeywordsAll": "0x0",
            "Level": "4"
        }
    ]
}
```


1. **Select the ETW Providers**:
   - SilkETW allows you to specify which ETW providers to monitor. For detecting Kerberos related events, enable the following providers:
     - **Microsoft-Windows-Security-Auditing**: This provider logs security-related events, including Kerberos authentication events.
     - **Microsoft-Windows-Kerberos**: This provider logs Kerberos-related events.

2. **Start Monitoring**:
   - Use the following command to start monitoring with the specified providers:
```powershell
 .\silketw.exe -p Microsoft-Windows-Security-Auditing -pn Microsoft-Windows-Kerberos
```

# Analyzing with SilkETW

## Basic Command Syntax

```powershell
.\SilkETW.exe -t [Technique] -o [OutputType] -p [Provider] 
```

- **`-t`**: Specifies the type of trace (e.g., `User` for user mode).
- **`-o`**: Defines the output format (e.g., `console`, `file`, `ETW`).
- **`-p`**: Specifies the provider (e.g., `ProcessCreate`, `NetConn`, etc.).

## Analyzing in real-time

#### Process Creation Events

To monitor process creation events:

```powershell
.\SilkETW.exe -t UserTrace -o console -p ProcessCreate
```


### Step 3: Detecting Specific Attacks

#### 1. **DCSync Detection**

DCSync attacks involve an attacker impersonating a domain controller to request user account data. Look for the following events:

- **Event ID 4662**: An operation was performed on an object. Specifically, look for operations related to `userAccount` objects.
- **Event ID 4672**: Special privileges assigned to a new logon. This can indicate that a user is attempting to access sensitive data.

**Example Query**:
You can filter the logs for these event IDs using PowerShell or your SIEM tool.

```powershell
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4662}
```

#### 2. **Golden Ticket Detection**

Golden Ticket attacks involve forging Kerberos tickets to gain unauthorized access. Look for:

- **Event ID 4769**: A Kerberos service ticket was requested. Pay attention to requests for tickets for sensitive accounts (e.g., KRBTGT).
- **Event ID 4624**: Successful logon events, especially for accounts that should not be logging in at unusual times.

**Example Query**:
Filter for suspicious ticket requests.

```powershell
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4769} | Where-Object { $_.Message -like "*KRBTGT*" }
```

#### 3. **Kerberoasting Detection**

Kerberoasting attacks involve requesting service tickets for service accounts and then attempting to crack them offline. Look for:

- **Event ID 4769**: Similar to Golden Ticket detection, but focus on service accounts.
- **Event ID 4672**: Special privileges assigned to a new logon, particularly for service accounts.

**Example Query**:
Monitor for service ticket requests.

```powershell
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4769} | Where-Object { $_.Message -like "*Service*" }
```

### Step 4: Analyze and Respond

1. **Review the Logs**:
   - Regularly review the logs collected by SilkETW for the specified events. Look for patterns or anomalies that indicate potential attacks.

2. **Automate Alerts**:
   - If possible, integrate SilkETW with a SIEM solution to automate alerts based on the detection of these events.

3. **Incident Response**:
   - If suspicious activity is detected, follow your organization's incident response plan to investigate and mitigate the threat.

## Filter Data in PowerShell

Logs can also be viewed in PowerShell by importing the JSON output

```powershell
function Get-SilkData {  
  param($Path)  
  $JSONObject = @()  
  Get-Content $Path | ForEach-Object {  
    $JSONObject += $_ | ConvertFrom-Json  
  }  
$JSONObject  
}
```
Source: https://kalilinuxtutorials.com/silketw-abstract-complexities-etw/

#### Read or query logs from .evtx files

```powershell
Get-WinEvent -Path 'C:\PATH\TO\THE\EVTX\FILE.evtx' -MaxEvents 5 | Select-Object TimeCreated, ID, ProviderName, LevelDisplayName, Message | Format-Table -Autosize
```

#### Filtering Events with FilterHashTable

```powershell
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational'; ID=1,3} | Select-Object TimeCreated, ID, ProviderName, LevelDisplayName, Message | Format-Table -AutoSize
```


### Conclusion

Using SilkETW to monitor ETW logs can significantly enhance your ability to detect DCSync, Golden Ticket, and Kerberoasting attacks. By focusing on specific event IDs and configuring SilkETW appropriately, you can gain valuable insights into potential malicious activities within your Windows environment. Regular monitoring and analysis are crucial for maintaining security and responding to threats effectively.

#### Created on: Nov 03, 2024
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