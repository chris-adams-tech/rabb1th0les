---
Owner: Chris Adams
title: Threat Investigation Process
type: blog
topic: SOC Operations
date: 2024-11-30
tags:
  - cybersecurity/Blue-Team
draft: false
reference:
---
## **Introduction**

Threat investigation is the meticulous process of examining security events and telemetry to determine the nature, scope, and validity of potential threats. As an analyst, your role is akin to being a digital detective, piecing together clues to differentiate between a false positive and a real threat while building a robust narrative for each case.

---

In my short experience in cyber, I've learned that having a system that supports your investigation efforts is extremely important. 
## **Investigation Workflow Overview**

|**Step**|**Objective**|**Outcome**|
|---|---|---|
|Data Gathering|Collect and centralize relevant logs, alerts, and context.|A complete dataset ready for analysis.|
|Alert Triage|Prioritize and assess incoming alerts for criticality and relevance.|A shortlist of high-priority events for investigation.|
|Analysis|Examine logs and behaviors to determine the threat's intent and scope.|Clear understanding of the threat.|
|Correlation|Connect disparate data points to form a unified narrative.|A timeline or pattern of activity.|
|Hypothesis Testing|Develop theories about the threat actor's goals and actions.|Confirmed or refuted hypotheses.|
|Documentation|Record findings and evidence in a structured format.|Comprehensive documentation for stakeholders.|

---

## **Key Principles for Effective Threat Investigation**

1. **Follow a Hypothesis-Driven Approach**: Treat the investigation like a scientific process. Formulate a hypothesis, gather data to validate it, and adjust as needed.
2. **Focus on Context**: Understanding the environment is crucial. Know the baseline behavior of users, systems, and network flows.
3. **Document Every Step**: Maintain a clear, consistent log of findings, queries, and outcomes to ensure repeatability and transparency.
4. **Question Every Assumption**: Never assume the benignity of any behavior without evidence.
5. **Learn the Landscape**: Familiarize yourself with the MITRE ATT&CK framework, tactics, techniques, and procedures (TTPs) used by threat actors.

---

## **Step-by-Step Threat Investigation Process**

### 1. **Data Gathering**

- **Sources**:
    - SIEM data (e.g., Splunk, Elastic Stack)
    - Network logs (NetFlow, Zeek)
    - Endpoint detection logs (EDR/XDR tools)
    - Firewall, IDS/IPS, and WAF logs
- **Checklist**:
    - Ensure log completeness and accuracy.
    - Capture data from multiple perspectives (network, host, and user activity).
    - Export or bookmark relevant logs for quick access.

### 2. **Alert Triage**

- **Questions to Answer**:
    - Is this alert noise or truly indicative of malicious activity?
    - Does the alert align with any known patterns or signatures?
    - What is the asset criticality (e.g., servers, high-value endpoints)?
- **Actions**:
    - Verify if the alert matches an active TTP from MITRE ATT&CK.
    - Cross-check against threat intelligence feeds.
    - Discard false positives and escalate potential threats.

### 3. **Deep Analysis**

- **Key Techniques**:
    - **Log Analysis**: Examine logs for anomalies in timestamps, IP addresses, or unusual file paths.
    - **Behavioral Analysis**: Look for deviations from baseline activity (e.g., excessive failed logins, lateral movement).
    - **Payload Inspection**: Decode payloads and scripts to analyze intent and functionality.
- **Common Tools**:
    - Yara for file-based analysis.
    - Sigma rules for pattern matching in SIEM.
    - Wireshark for packet capture analysis.

### 4. **Correlation**

- **Building the Puzzle**:
    - Connect logs across systems to identify a sequence of events.
    - Use timeline tools to visualize activity.
- **Example Questions**:
    - Did a suspicious login correspond with a known attacker IP?
    - Was a flagged process spawned by a malicious parent process?
- **Visualization Tools**:
    - Graph-based tools like Maltego or MISP.

### 5. **Hypothesis Testing**

- **Develop Hypotheses**:
    - Hypothesis 1: The observed activity is part of a phishing campaign.
    - Hypothesis 2: It’s a false positive triggered by a script.
- **Validation**:
    - Test against real data or sandboxed environments.
    - Cross-reference with indicators of compromise (IOCs) from threat intel platforms.

### 6. **Documentation**

- **What to Include**:
    - Timeline of events.
    - Indicators of compromise (IOCs).
    - Tools and techniques used for analysis.
    - Conclusions and recommended actions (e.g., blocklists, policy updates).
- **Preferred Formats**:
    - Markdown for portability and readability.
    - Structured templates for consistency (e.g., using Obsidian or Notion).

---

## **Practical Tips and Techniques**

### 1. **Understanding False Positives**

- **Common Causes**:
    - Legitimate applications triggering rules (e.g., PowerShell scripts flagged as malicious).
    - Misconfigured detection rules.
- **How to Differentiate**:
    - Look for corroborating evidence (e.g., correlating an alert with network traffic).
    - Review user and process behavior (e.g., normal vs. suspicious activity).

### 2. **Detecting True Positives**

- **Indicators**:
    - Multiple signs of compromise (e.g., data exfiltration combined with unauthorized access).
    - Alignment with known TTPs (e.g., credential dumping with Mimikatz).
- **Validation**:
    - Use sandboxing to execute and observe suspicious payloads.
    - Query threat intelligence platforms for matching IOCs.

---
## **Advanced Topics to Explore**

- **Threat Hunting**: Proactively searching for threats without relying on alerts.
- **Behavioral Analytics**: Using machine learning to identify anomalies.
- **Forensic Tools**: Deep-dive into forensic tools like Volatility for memory analysis.

Having a clear understanding of the threat investigation process allows defenders to prioritize the artifacts of the investigation, rather than the process itself. Ultimately, this creates more time to search for anomalies and ATP's.

<div class="neon-line"></div>

Thanks for taking the time to read through my content. If you enjoy this type of content, check back here for more updates. 

Peace ✌️

#### Created on: Nov-30-24
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
