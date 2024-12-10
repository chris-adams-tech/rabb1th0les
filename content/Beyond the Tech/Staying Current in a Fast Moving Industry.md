---
Owner: Chris Adams
title: Staying Current in a Fast Moving Industry
type: Innovation
topic: Emerging Threats
date: 2024-12-10
tags:
  - cybersecurity/threat-hunting
draft: false
reference:
---
In the cybersecurity industry, it can be easy to fall behind on the expanding technology with AI/ML being so heavily integrated into nearly every piece of software and application these days. Things are changing at a rapid pace and in my opinion, for good reason. It allows us humans, to be able to reduce redundant tasks, thus allowing for more creativity. Where tech used to be the straight forward and logical, with AI being more creative allows for expansion like we could have never have conceived of. 

Though as the AI capabilities grow on both ends for both positive use cases, there also becomes the dark side of malicious actors also utilizing these same tools. 

### One one to keep up with news feeds is by using RSS feeds for articles relevant to your desired industry

A very cool tool that I have recently found, [Feedly](https://feedly.com/) that a user is able to create *Threat Intelligence* dashboards. With this, you can track specific CVE's or TTP's, as well as track the latest attackers. The prebuilt threat intel dashboard also comes with prebuilt *Team Feeds* that distinguish articles with different `vulnerabilities`, `cyber attacks`, `threat intel`, `security news`, `foreign affairs`, and `vendor advisories`.

Articles can be saved, new groups can be created, new dashboards can be created, there really is a ton a capability with this software to suit your informational needs, even annotating and further personalization. It can be so helpful to have content that is tailored to exactly what you want to see to reduce extra noise that doesn't suit your interests. 

AI is also built in as a feature to assist with managing and tracking metadata with ease.

Another really cool feature is the *TTP Dashboard*. With this tool, you can filter past dates to view trending techniques over a time period. This can then be opened directly into the **MITRE ATT&CK** navigator for further research.

![[ttp-dash.png]]

Below is the expanded view from clicking the **Open in Navigator** in the previous screenshot. This is querying the trending techniques from the past 7 days according to the *TTP Dashboard*. 
![[mitre-att.png]]

#### Information cards can be created for Threat Actor groups, then exported as a PDF

![[lockbit.png]]

Below is the format that **Feedly** will export the report in. This makes it easy to do further investigation and correlate similar articles. 
![[LockBit3.0 Insights Card.pdf]]

From the Threat Intelligence reports, there may be associated `file hashes`, `URLs`, `TTPs`, etc. 

![[ioc.png]]

If you are doing a wide spread search for these `IoC's` can be put into https://uncoder.io for rule generation. `Uncoder` is a powerful community-driven, open-source, detection engineering platform powered by **SOC Prime**. 

Let's take `LockBit` for an example. I'll copy the `IoC's` from the article, https://asec.ahnlab.com/en/41450/ and turn them into a Microsoft Defender for Endpoint query.

Input:
```
[File Detection]
– Downloader/DOC.External (2022.10.31.02)
– Downloader/DOC.Generic (2022.10.31.02)
– Trojan/LNK.Runner (2022.10.31.02)
– Malware/Win.Generic.R531852 (2022.10.27.03)
– Trojan/Win.Delf.R452782 (2021.11.24.02)
– Ransomware/Win.LockBit.R506767 (2022.07.27.01)
– Ransomware/PowerShell.Lockbit.S1945 (2022.10.29.00)

[AMSI Detection]
– Ransomware/PowerShell.Lockbit.SA1945 (2022.10.29.00)

[Behavior Detection]
– Ransom/MDP.Decoy.M1171
– Ransom/MDP.Event.M1875
– Ransom/MDP.Behavior.M1946


MD5
1690f558aa93267b8bcd14c1d5b9ce34
5e54923e6dc9508ae25fb6148d5b2e55
ad444dcdadfe5ba7901ec58be714cf57
bf331800dbb46bb32a8ac89e4543cafa
f9ab1c6ad6e788686509d5abedfd1001
Additional IOCs are available on AhnLab TIP.
URL
http[:]//188.34.187.110/LBB.exe
http[:]//188.34.187.110/cc.ps1
http[:]//188.34.187.110/dd.ps1
http[:]//62.204.41.25/3g4mn5s/Plugins/cred.dll
http[:]//62.204.41.25/3g4mn5s/index.php
```

Output:
![[uncoder.png]]

```
# Microsoft Defender for Endpoint Query (Kusto)
union * | where ((RemoteIP =~ "188.34.187.110" or RemoteIP =~ "62.204.41.25") or (RemoteUrl =~ "DOC.External" or RemoteUrl =~ "DOC.Generic" or RemoteUrl =~ "LNK.Runner" or RemoteUrl =~ "LBB.exe" or RemoteUrl =~ "cred.dll" or RemoteUrl =~ "index.php") or (InitiatingProcessMD5 =~ "1690f558aa93267b8bcd14c1d5b9ce34" or InitiatingProcessMD5 =~ "5e54923e6dc9508ae25fb6148d5b2e55" or InitiatingProcessMD5 =~ "ad444dcdadfe5ba7901ec58be714cf57" or InitiatingProcessMD5 =~ "bf331800dbb46bb32a8ac89e4543cafa" or InitiatingProcessMD5 =~ "f9ab1c6ad6e788686509d5abedfd1001"))

# Elastic Stack
(destination.ip:("188.34.187.110" OR "62.204.41.25") OR destination.domain:("DOC.External" OR "DOC.Generic" OR "LNK.Runner" OR "LBB.exe" OR "cred.dll" OR "index.php") OR file.hash.md5:("1690f558aa93267b8bcd14c1d5b9ce34" OR "5e54923e6dc9508ae25fb6148d5b2e55" OR "ad444dcdadfe5ba7901ec58be714cf57" OR "bf331800dbb46bb32a8ac89e4543cafa" OR "f9ab1c6ad6e788686509d5abedfd1001"))

#SentinelOne
(DstIP in contains anycase ("188.34.187.110", "62.204.41.25") OR DNS in contains anycase ("DOC.External", "DOC.Generic", "LNK.Runner", "LBB.exe", "cred.dll", "index.php") OR Md5 in contains anycase ("1690f558aa93267b8bcd14c1d5b9ce34", "5e54923e6dc9508ae25fb6148d5b2e55", "ad444dcdadfe5ba7901ec58be714cf57", "bf331800dbb46bb32a8ac89e4543cafa", "f9ab1c6ad6e788686509d5abedfd1001"))

#Splunk
((dest_ip="188.34.187.110" OR dest_ip="62.204.41.25") OR (dest_host="DOC.External" OR dest_host="DOC.Generic" OR dest_host="LNK.Runner" OR dest_host="LBB.exe" OR dest_host="cred.dll" OR dest_host="index.php") OR (file_hash="1690f558aa93267b8bcd14c1d5b9ce34" OR file_hash="5e54923e6dc9508ae25fb6148d5b2e55" OR file_hash="ad444dcdadfe5ba7901ec58be714cf57" OR file_hash="bf331800dbb46bb32a8ac89e4543cafa" OR file_hash="f9ab1c6ad6e788686509d5abedfd1001"))
```

These two tools together can help any Defender stay current with the most critical details during active threat hunting, while also ensuring adaptability depending on your organization's environment. This can also be a great tool for learning and developing your own detection rules.

This was tested using the 7-day Enterprise trial, so results may differ depending on the plan you choose.

---

Thanks for taking the time to read through my content. If you enjoy this type of content, check back here for more updates. 

Peace ✌️

#### Created on: Dec-10-24
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
