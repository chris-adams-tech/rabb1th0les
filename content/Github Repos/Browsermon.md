---
date: 
layout: github
tags:
  - github
draft:
---

# Browser monitoring capabilities

GitHub Repo: https://github.com/eunomatix/browsermon
Website: [EUNOMATIX](https://eunomatix.com/site/web/)

BrowserMon is an advanced browser monitoring tool that offers detailed insights into browsing activities. Compatible with Chrome and Edge, it operates in both real-time and scheduled modes, effectively recording browsing histories by capturing 17 different parameters.

Parameters available:

|Parameter|Description|
|---|---|
|`hostname`|The name of the host computer.|
|`os`|Operating system used (e.g., Windows).|
|`os_username`|Operating system username.|
|`browser`|Web browser used (e.g., edge).|
|`browser_version`|Version of the web browser.|
|`browser_db`|Database type/version used by the browser.|
|`profile_id`|Identifier for the browser profile (if applicable).|
|`profile_title`|Title of the browser profile.|
|`profile_username`|Username associated with the browser profile.|
|`profile_path`|File path to the browser profile data.|
|`username`|Username of the profile.|
|`session_id`|Unique identifier for the session.|
|`referrer`|Referrer URL (if any).|
|`url`|URL of the webpage visited.|
|`title`|Title of the webpage visited.|
|`visit_time`|Time of the visit.|
|`visit_count`|Number of times the URL was visited.|
### Installation

To install using freeze executable/binaries, download the .zip file and follow the instructions mentioned in the release for your specific operating system.

To build the project:

1. Get the source code:
    
    ```
    git clone https://github.com/eunomatix/browsermon
    ```
    
2. Create a Python environment:
    
    ```
    python -m venv venv
    ```
    
    Install dependencies in the environment:
    
    ```
    pip install -r requirements.txt
    ```
    
    **Note**: For Windows, you will also have to install _pywin32_, which is not present in the requirement.txt file:
    
    ```
    pip install pywin32
    ```
    
3. Create executable using PyInstaller:
    
    ```
    pyinstaller -F src/browsermon.py
    ```
    
    For Windows:
    
    ```
    pyinstaller --hiddenimport win32timezone -F src/browsermon.py
    ```
    
4. Run service install scripts:
    
    ```
    ./linux_install.sh
    ```
    
    or
    
    ```
    Set-ExecutionPolicy RemoteSigned -Force ; .\win_install.ps1
    ```

---
Link to other Github repos on this site: [[GitHub Resources Index]]


