---
Owner: Chris Adams
date: 2024-11-11
edited: 
layout: new_page
tags: 
draft: true
---
In this writeup, I'll be covering the *Skills Assessment* for **Detecting Windows Attacks with Splunk** in the **SOC Analyst** path in HacktheBox.

Here is the first question:
![[Pasted image 20241111183411.png]]

Before investigating, I'll connect to the Splunk web interface at `https://<target-ip>:8000`


I utilized a Splunk query from an earlier module *Detecting Beaconing Malware*.

Detecting Cobalt Strike beacon:

```
index="cobaltstrike_beacon" sourcetype="bro:http:json" 
| sort 0 _time
| streamstats current=f last(_time) as prevtime by src, dest, dest_port
| eval timedelta = _time - prevtime
| eventstats avg(timedelta) as avg, count as total by src, dest, dest_port
| eval upper=avg*1.1
| eval lower=avg*0.9
| where timedelta > lower AND timedelta < upper
| stats count, values(avg) as TimeInterval by src, dest, dest_port, total
| eval prcnt = (count/total)*100
| where prcnt > 90 AND total > 10
```

After connecting to the interface, I pasted the `SPL` query from the *Cobalt Strike beacon* and changed the timeframe to **All time**. 

Aaaand there's nothing 😢

I wanted to keep the time intervals the same, but looked at the query to see if there were any lines I could remove. I started from the bottom and notice the bottom two lines are threshold values; if the count or percent doesn't meet the threshold, no alert generated.

So, I'll try that. I'll do one at a time. Now, after removing just the bottom line

```
| where prcnt > 90 AND total > 10
```

that we now are seeing data populate.

![[Pasted image 20241111184257.png]]

Awesome! And the beauty of reusing the query, is that `TimeInterval` is already displayed from the line `| stats count, values(avg) as TimeInterval by src, dest, dest_port, total` in our query. 

If you look a little closer, the answer is right in the `TimeInterval` field.

![[Pasted image 20241111184448.png]]

![[Pasted image 20241111184926.png]]

Question 2:
![[Pasted image 20241111185030.png]]

Starting off our query with the information given, this is what we are presented with:

![[Pasted image 20241111185120.png]]

There are some pretty key points here I notice in the first log.

First: The endpoint is named `spoolss`
Second: Taking note of the IP address `192.168.1.149`
Third: The operation `RpcAddPrinterDriverEx`

By doing a quick Google search for the `RpcAddPrinterDriverEx`, I can see this operation installs a printer driver on the print server. 

https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-rprn/b96cc497-59e5-4510-ab04-5484993b259b

I think we're in the right spot. I'll click on the `spoolss` endpoint and add that to the search query.

Now, everything that interacted with this endpoint will be visible. We can use the table function to build out a table for better viewing.

![[Pasted image 20241111185622.png]]

Also note the port that is being used, `445` (SMB) port, that is used for the printer sharing service in Windows.

I think we can clearly say that the culprit here is the `id.orig_h` `192.168.1.149`.

![[Pasted image 20241111185850.png]]

Last question:
![[Pasted image 20241111190651.png]]

Starting off with the details given to us we are presented with this information:

![[Pasted image 20241111190751.png]]

Looking through the logs, I notice different endpoints, with different commands being run with the same originating IP, all using the port `445` (SMB).

Then, I created a table to get a better view of the activity and see that all the activity is originating from `192.168.109.105`.

![[Pasted image 20241111191109.png]]

That's it! Hope you enjoyed!

<div class="neon-line"></div>

Thanks for taking the time to read through my content. If you enjoy this type of content, check back here for more updates. 

Peace ✌️

#### Created on: Nov 11, 2024
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
