---
cssclasses: 
date: 2024-11-19
tags:
  - cybersecurity/incident-response
  - cybersecurity/grc
title: Creating an Incident Response Plan
type: Technical Guide
topic: IR Planning
---

Source: https://app.letsdefend.io/training/lesson_detail/how-create-incident-response-plan-windows

# What is incident response?
<div class="neon-line"></div>
Incident response is an approach to managing a security incident process. An incident response plan is needed to approach security incidents systematically. A successful incident response plan includes the following 6 stages:

1- Preparation
2- Identification
3- Scope
4- Eradication
5- Recovery
6- Lessons Learned

## 1- Preparation
<div class="neon-line"></div>
##### Creating a Central Registration System

It is important in terms of saving time that all data can be examined from a single point with a central log collection system that can manage large files.

##### Time Synchronization

Enabling NTP on all devices in the network is important for matching the time information of the logs collected.

##### User Account Management

The fact that the user names of different accounts belonging to personnel are the same and different from other personnel makes it easy to monitor user activities in the event of an incident.

##### Management of System and Service Accounts

The administrators of the services and systems used should be appointed and a document should be created on how to reach these managers if needed.

##### Asset Management

Instant access to information such as devices, operating systems, patch versions, and critical status should be available.

##### Secure Communication

If necessary, the team may need to communicate independently of the internal network, for such cases mobile phone or secondary emails can be used.

##### Legal Transactions

The method of who will initiate the judicial process and in which situations should be determined before the incident occurs.

## 2- Identification
<div class="neon-line"></div>
##### Review

For a potential suspicious incident, preliminary information about the incident should be gathered. Then it must be decided whether the situation is a suspicious event or not.

##### Assignment

The first person to examine the incident must be determined. The person should take notes about the review.

##### Using the Checklist

There should be checklists for the analysis to be made in order to ensure consistent responses to incidents.
## 3- Scope
<div class="neon-line"></div>
##### Characterize the event

Since determining the event will determine the actions to be taken, it is important to determine the type of the incoming event. EX: DDoS, malware infection, data leak …

##### Taking Action

Action should be taken according to the technique used to intercept the attacker's method quickly. If there is an account that it has captured, simple measures such as account deactivation and IP blocking should be done quickly.

##### Data collecting

The image of the volatile memory along with the firewall, network traffic and other logs will be required for the investigation.

##### Isolation

Unplugging the compromised system could be a solution, isolating it is a more viable solution.

After the systems affected by the incident are determined, the possibility of the attacker's spread in the network is cut and volatile information is collected, the next step can begin.
## 4- Eradication
<div class="neon-line"></div>
##### Identifying the Root Cause

With the information obtained in the 2nd and 3rd stages, the root cause of the event should be determined. The attacker must then be completely eliminated.

##### Determining Rootkit Potential

If rootkits are suspected in the system, the disk should be cleaned and a clean backup installed. After the installation, the latest updates of the existing applications and systems should be installed.

##### Improve Defense

Operating systems, applications used, network, DMZ etc. The deficiencies of defense in areas should be determined and work should be done on how to make improvement.

##### Vulnerability Scan

Potential attack points on networks and systems should be identified and corrected by performing vulnerability scans.

When the necessary arrangements are prepared to prevent the event from recurring, the recovery phase can be started.
## 5- Recovery
<div class="neon-line"></div>
##### Verification

Verify that logging, systems, applications, databases, and other operations work correctly.

Restore At this stage, the restore operation is coordinated.

##### Monitoring

Systems should be monitored for recurring events.

When there is no repetitive harmful situation or unusual activity, the next step is taken.
## 6- Lessons Learned
<div class="neon-line"></div>
##### Writing a Follow-up Report

The report includes the examinations with the expert and the executive, the stages of good and bad working in the intervention plan, and the recommendations regarding the process. The report should be written in a way that the manager is sure that the event has been closed.

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
