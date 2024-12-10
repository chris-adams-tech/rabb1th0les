---
date: 2024-10-24
cssclasses: 
type: blog
draft: true
tags:
  - status/wip
---
Researching the relationships between the **MITRE ATT&CK framework**, the **Cyber Kill Chain**, and **Windows Event IDs** can get quite detailed, but there are some great resources to help you map the techniques and tactics from ATT&CK, align them with Cyber Kill Chain stages, and then tie them to relevant Windows Event IDs for detection. 

---

### 1. **Sigma Rules Repository**  
- **What it’s for**: Sigma is a generic and open detection rule format that can be converted into various SIEM query languages (Splunk, Elastic, etc.). The Sigma rules often reference **MITRE ATT&CK techniques** and map them to specific **Windows Event IDs**, making it an excellent resource.
- **Why it's useful**: Sigma rules provide mappings from **ATT&CK techniques** to **Windows Event IDs**, and can help you bridge those to the **Cyber Kill Chain**.
  
- **Link**: [Sigma Rules GitHub Repository](https://github.com/SigmaHQ/sigma)

Check out my page for more [[Sigma]] resources.

---

### 2. **Atomic Red Team**  
- **What it’s for**: Atomic Red Team is a collection of small, focused tests designed to test detection capabilities mapped to **MITRE ATT&CK**. These tests are mapped to specific techniques and often executed in a Windows environment.
- **Why it's useful**: You can run these tests in a controlled environment to generate relevant Windows Event IDs for different ATT&CK techniques and stages of the Cyber Kill Chain.
  
- **Link**: [Atomic Red Team](https://github.com/redcanaryco/atomic-red-team)

---

### 3. **ThreatHunter Playbook**  
- **What it’s for**: A collection of threat-hunting methodologies with detailed mappings of **MITRE ATT&CK techniques**, often mapped to **Windows Event IDs** and relevant tools.
- **Why it's useful**: The playbook provides practical ways to detect adversary behaviors on Windows systems and ties them back to ATT&CK and Event IDs. You can also relate them to different stages of the Cyber Kill Chain.
  
- **Link**: [ThreatHunter Playbook](https://threathunterplaybook.com/)

---

### 4. **MITRE ATT&CK Navigator**  
- **What it’s for**: This is an interactive tool where you can view and map techniques and tactics from the MITRE ATT&CK framework. You can customize the view based on Windows platforms and specific techniques.
- **Why it's useful**: You can use it to directly map specific ATT&CK techniques to the **Cyber Kill Chain** phases and then research relevant Windows logs or Event IDs for detection.

[Feedly](https://feedly.com/) is a great resource for using `RSS` feeds to aggregate news resources. There is an AI overlay that applies all sorts of relevant metadata, including MITRE relevance. It is an extremely powerful tool to have at your side during threat investigations. 

- **Link**: [MITRE ATT&CK Navigator](https://mitre-attack.github.io/attack-navigator/)

---

### Example Use Case:

Let’s say you're trying to map the **Command and Control (C2)** stage of the **Cyber Kill Chain** to ATT&CK techniques and Windows Event IDs:
- You can start by looking at the **Command and Control** tactic in MITRE ATT&CK.
- Techniques like **Ingress Tool Transfer (T1105)** or **Remote File Copy (T1071)** might be employed.
- Using Sigma or one of the cheat sheets, you can map these to specific **Windows Event IDs**, such as **Event ID 5156** (Windows Filtering Platform), which detects network connections.
- Finally, look at the **Cyber Kill Chain** to understand where this technique fits into the broader attack lifecycle.

To take this a step further, if you have certain artifacts that need to be searched for within an environment, an innovative tool at `uncoder.io` allows translation of IoC's into a search query into a desired SIEM. See more info at [[unicoder.io]]. 

Other related pages:
[[Useful Windows Event Logs]] 
[[PowerSploit]]