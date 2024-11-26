---
Owner: Chris Adams
date: 
tags:
  - detections
  - github
  - resources
draft:
---


> [!Important] Awesome tool
> Below is a tool to translate Sigma rules into queries into various platforms. IoC's can also put in the platform to generate a search query for the intended provider. I highly recommend checking it out https://uncoder.io/

##### Ultimate repository for detections and various lists in CSV format:

> [!NOTE] Title
> This repo has a TON of great resources and information. Highly recommend checking it out. 

Github Repo: https://github.com/mthcht/awesome-lists
# Detection Rules

### Elastic

> Install instructions are located in the GitHub repo.
https://github.com/elastic/detection-rules

These rules can be used for development, maintenance, testing, validation, and release of rules for Elastic Security's Detection Engine.

GitHub Repo: 

https://github.com/elastic/detection-rules

Detection Rules is the home for rules used by Elastic Security. This repository is used for the development, maintenance, testing, validation, and release of rules for Elastic Security’s Detection Engine.

#### Detecting Suspicious Windows Binaries exploitation
https://github.com/elastic/detection-rules/blob/main/hunting/windows/docs/detect_masquerading_attempts_as_native_windows_binaries.md
This hunt detects processes named as legit Microsoft native binaries located in the system32 folder. Adversaries may attempt to manipulate features of their artifacts to make them appear legitimate or benign to users and/or security tools. Masquerading occurs when the name or location of an object, legitimate or malicious, is manipulated or abused for the sake of evading defenses and observation.

### Sigma

This is the main Sigma rule repo. Sigma rules are a generic and open signature format for detection rules. It aims to create uniformity across detection rules, in order to best integrate with flexibility. Sigma uses the `.yml` format.

> [!INfo] Rule Repositories
> There are a lot of `Sigma` rule repos out there and will share just a few here.

Github Repo: https://github.com/mdecrevoisier/SIGMA-detection-rules

###### Here's an example from their website:
```YML
# ./rules/cloud/okta/okta_user_account_locked_out.yml
title: Okta User Account Locked Out
id: 14701da0-4b0f-4ee6-9c95-2ffb4e73bb9a
status: test
description: Detects when a user account is locked out.
references:
    - https://developer.okta.com/docs/reference/api/system-log/
    - https://developer.okta.com/docs/reference/api/event-types/
author: Austin Songer @austinsonger
date: 2021-09-12
modified: 2022-10-09
tags:
    - attack.impact
logsource:
    product: okta
    service: okta
detection:
    selection:
        displaymessage: Max sign in attempts exceeded
    condition: selection
falsepositives:
    - Unknown
level: medium
```

* `detection:` specifies what the rule is looking for
* `selection:` groups to organize detections for readibility & filtering
	* contains the definition for the detection

###### And/or operations

The `list` format represents an "OR" operation. This means when you are using a `-` to list different `field_name`, such as below, it will search for `this` field OR `that` field.

```yaml
detection:
  selection:
    field_name:
      - this # or
      - that
  condition: selection
```

In order to execute an "AND" operation, the syntax looks like below:

```yaml
detection:
  selection:
    field_name: this # and
    other_field_name: that
  condition: selection
```

###### Keyword

Here's an example using `keywords` separated by a logical "OR" statement

```yaml
logsource:
    product: linux
detection:
    keywords:
        - 'rm *bash_history'
        - 'echo "" > *bash_history'
        - 'truncate -s0 *bash_history'
        - 'history -c'
        - 'history -w'
    condition: keywords
falsepositives:
    - Unknown
```

This search is searching for ANY one of the keywords in the logs. Note that it only has to be one of them to generate an a log to the SIEM.


> [!information] Creating Sigma Queries
> The GitHub repo below is a CLI tool that can help to automatically create splunk searches out Sigma rule creation. https://github.com/SigmaHQ/sigma-cli


###### Searching by Field

```yaml
detection:
  selection:
    Username: "Administrator"
  condition: selection
```


Source: Sigma Documentation - https://sigmahq.io/docs/basics/rules.html#detection


### Snort

Website: https://www.snort.org/
GitHub Repo: https://github.com/secnnet/Snort-Rules


> [!INFO] About
>Snort - Network Intrusion Detection & Prevention System  
    > Snort is an open-source, free and lightweight network intrusion detection system (NIDS) software for Linux and Windows to detect emerging threats.  
    > [https://www.snort.org/#documents](https://www.snort.org/#documents)  

> "Snort is the foremost Open Source Intrusion Prevention System (IPS) in the world. Snort IPS uses a series of rules that help define malicious network activity and uses those rules to find packets that match against them and generates alerts for users.

Snort can be deployed inline to stop these packets, as well. Snort has three primary uses: As a packet sniffer like tcpdump, as a packet logger — which is useful for network traffic debugging, or it can be used as a full-blown network intrusion prevention system. Snort can be downloaded and configured for personal and business use alike." -- From Snort Website https://www.snort.org/

## Snort Options

| Parameter | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -c        | Defining configuration file                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -T        | Testing configuration file                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -N        | Disable logging                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -D        | Background mode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -A        | Alert modes:<br>- **Full**: Full alert mode, providing all possible information about the alert. This one also is the default mode; once you use -A and don't specify any mode, snort uses this mode.  <br>- **Fast**: mode shows the alert message, timestamp, source and destination IP, along with port numbers.  <br>- **Console**: Provides fast style alerts on the console screen.<br>- **cmg**: CMG style, basic header details with payload in hex and text format.<br>- **none:** Disabling alerting. |
#### Examples:
* alert icmp any any <> any any (msg: "ICMP Packet Found"; sid: 100001; rev:1;
* sudo snort -c /etc/snort/snort.conf -T
* sudo snort -c /etc/snort/snort.conf -N
* sudo snort -c /etc/snort/snort.conf -D
* sudo snort -c /etc/snort/snort.conf -A console
* sudo snort -c /etc/snort/snort.conf -A cmg
* sudo snort -c /etc/snort/snort.conf -A fast
* sudo snort -c /etc/snort/snort.conf -A full
* sudo snort -c /etc/snort/snort.conf -A none

### Microsoft Defender Hunting Queries

GitHub Repo: https://github.com/secnnet/Microsoft-365-Defender-Hunting-Queries

### Yara & Sigma

See here for more info on Yara and Sigma [[Notes/Log Analysis & Detection Engineering/Detection Engineering/Explore/YARA & Sigma Usage]]

# Suricata

"Suricata is a high performance Network IDS, IPS and Network Security Monitoring engine. It is open source and owned by a community-run non-profit foundation, the Open Information Security Foundation (OISF). Suricata is developed by the OISF."

It is an extremely powerful open-source detection tool and IDS/IPS engine. It can be integrated with nearly everything. 

[https://docs.suricata.io/en/latest/](https://docs.suricata.io/en/latest/)  


# Zeek

###  Zeek vs. Snort

| **Tool**            | **Zeek**                                                                                                                                                                                          | **Snort**                                                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Capabilities**    | NSM and IDS framework. It is heavily focused on network analysis. It is more focused on specific threats to trigger alerts. The detection mechanism is focused on events.                         | An IDS/IPS system. It is heavily focused on signatures to detect vulnerabilities. The detection mechanism is focused on signature patterns and packets. |
| **Cons**            | Hard to use. The analysis is done out of the Zeek, manually or by automation.                                                                                                                     | Hard to detect complex threats.                                                                                                                         |
| **Pros**            | It provides in-depth traffic visibility.<br>Useful for threat hunting.<br>Ability to detect complex threats.<br>It has a scripting language and supports event correlation. <br>Easy to read logs | Easy to write rules. Cisco supported rules.<br>Community support                                                                                        |
| **Common Use Case** | Network monitoring.In-depth traffic investigation.Intrusion detecting in chained events                                                                                                           | 

### Architecture

![[zeek.png]]

### Frameworks

| Logging   | Notice               | Input      | Configuration   | Intelligence   |
| --------- | -------------------- | ---------- | --------------- | -------------- |
| Cluster   | Broker Communication | Supervisor | GeoLocation     | File Analysis  |
| Signature | Summary              | NetControl | Packet Analysis | TLS Decryption |

### Commands

To Check version of Zeek
```
zeek -v
```

Options for Zeek
```
sudo su
zeekctl [OPTIONS|status, start, stop]
```

To read a pcap file
```
zeek -C -r sample.pcap
```

| **Parameter** | **Description**                           |
| ------------- | ----------------------------------------- |
| **-r**        | Reading option, read/process a pcap file. |
| **-C**        | Ignoring checksum errors.                 |
| **-v**        | Version information.                      |
| **zeekctl**   | ZeekControl module.                       |

### Most commonly used logs

| **Update Frequency** | **Log Name**         | **Description**                                 |
| -------------------- | -------------------- | ----------------------------------------------- |
| **Daily**            | *known_hosts.log*    | List of hosts that completed TCP handshakes.    |
| **Daily**            | *known_services.log* | List of services used by hosts.                 |
| **Daily**            | *known_certs.log*    | List of SSL certificates.                       |
| **Daily**            | *software.log*       | List of software used on the network.           |
| **Per Session**      | *notice.log*         | Anomalies detected by Zeek.                     |
| **Per Session**      | *intel.log*          | Traffic contains malicious patterns/indicators. |
| Per Session          | *signatures.log*     | List of triggered signatures.                   |

### Log usage

| **Overall Info** | **Protocol Based** | **Detection** | **Observation** |
| --- | --- | --- | --- |
| *conn.log* | *http.log* | *notice.log* | *known_host.log* |
| *files.log* | *dns.log* | *signatures.log* | *known_services.log* |
| *intel.log* | *ftp.log* | *pe.log* | *software.log* |
| *loaded_scripts.log* | *ssh.log* | *traceroute.log* | *weird.log* |

### Reduce columns in the output of logs

| **Tool/Auxilary Name** | **Purpose** |
| --- | --- |
| **Zeek-cut** | Cut specific columns from zeek logs. |

> [!NOTE] Example
> - Zeek-cut example 
`root@ubuntu$ cat conn.log | zeek-cut uid proto id.orig_h` `id.orig_p id.resp_h id.resp_p`
    CTMFXm1AcIsSnq2Ric	udp	192.168.121.2	51153	192.168.120.22	53
    CLsSsA3HLB2N6uJwW	udp	192.168.121.10	50080	192.168.120.10	514


### Signatures

| **Signature id** | **Unique** signature name.                                                                                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Conditions**   | **Header:** Filtering the packet headers for specific source and destination addresses, protocol and port numbers.**Content: Filtering the packet payload for specific value/pattern.** |
| **Action**       | **Default action:** Create the "signatures.log" file in case of a signature match.<br>Additional action: Trigger a Zeek script.                                                         |
*Zeek signatures use the ".sig" extension.*


**Additional action:** Trigger a Zeek script. |


### Filters

| Condition Field         | Available Filters                                                                                                                                                                                                                                                                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header                  | src-ip: Source IP<br>dst-ip: Destination IP<br>src-port: Source port<br>dst-port: Destination <br>port.ip-proto: Target protocol <br>Supported protocols; TCP, UDP, ICMP, ICMP6, IP, IP6                                                                                                                                                       |
| Content                 | **payload:** Packet payload<br>**http-request:** Decoded HTTP requests<br>**http-request-header:** Client-side HTTP headers<br>**http-request-body:** Client-side HTTP request bodys<br>**http-reply-header:** Server-side HTTP headers<br>**http-reply-body:** Server-side HTTP request bodys<br>**ftp:** Command line input of FTP sessions. |
| **Context**             | **same-ip:** Filtering the source and destination addresses for duplication.                                                                                                                                                                                                                                                                   |
| Action                  | **event:** Signature match message.                                                                                                                                                                                                                                                                                                            |
| **ComparisonOperators** | **==**, **!=**, **<**, **<=**, **>**, **>=**                                                                                                                                                                                                                                                                                                   |
| **NOTE!**               | Filters accept string, numeric and regex values.
### ELK Stack
HELK (Hunting ELK) [https://thehelk.com/intro.html](https://thehelk.com/intro.html)

GitHub Repo: https://github.com/Cyb3rWard0g/HELK?tab=readme-ov-file

### Elastic
* https://www.elastic.co/guide/en/logstash/8.1/input-plugins.html
* https://www.elastic.co/guide/en/logstash/8.1/filter-plugins.html

### Kibana


> [!NOTE] Info
>Kibana is a web-based data visualization that works with Elasticsearch to analyze, investigate and visualize the data stream in real-time. 
>* It allows the users to create multiple visualizations and dashboards for better visibility

Integration flow

![[quartz/content/img/kibana.png]]
### Wireless Intrusion Prevention System (WIPS)

- detects presence of rogue or misconfigured devices
    - _can prevent from operating on wireless enterprise networks by scanning the networks RF’s for DoS and other attacks_
    - Mojo Networks AirTight WIPS
    - HP RFProtect
    - Cisco Adaptive Wireless IPS
    - Fluke Networks AirMagnet Enterprise
    - HP Mobility Security IDS/IPS
    - Zebra Technologies AirDefense

### Azure and AWS Monitoring
    
**Cloud Grappler**
    
[https://permiso.io/blog/cloudgrappler-a-powerful-open-source-threat-detection-tool-for-cloud-environments](https://permiso.io/blog/cloudgrappler-a-powerful-open-source-threat-detection-tool-for-cloud-environments)
    
[https://github.com/Permiso-io-tools/CloudGrappler](https://github.com/Permiso-io-tools/CloudGrappler)
