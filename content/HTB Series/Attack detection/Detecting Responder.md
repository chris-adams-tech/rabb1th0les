For detecting events related to LLMNR/NBT-NS/mDNS Poisoning

> LLMNR (Link-Local Multicast Name Resolution) and NBT-NS (NetBIOS Name Service) poisoning

These are network level attacks that exploit inefficiencies in name resolution protocols.

LLMNR and NBT-NS are used to resolve local hostnames to IP addresses and can be exploited by attackers to resolve an unknown hostname to the attacker's IP address.

### Detection

This can be detected with Sysmon Event ID 22 by tracking the DNS queries associated with non-existent/mistyped files shares.

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