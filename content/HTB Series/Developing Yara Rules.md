---
Owner: Chris Adams
date: 2024-11-11
edited: 
layout: new_page
tags: 
draft: false
---
In this writeup, I will cover the *Skills Assessment* section in **Developing Yara Rules**, part of the **SOC Analyst** path in HacktheBox.

Here is what we are prompted with:

![[Screenshot from 2024-11-11 15-47-16.png]]

I'll start by connecting to the VPN 

![[Pasted image 20241111172700.png]]

```bash
WARNING: Compression for receiving enabled. Compression has been used in the past to break encryption. Sent packets are not compressed unless "allow-compression yes" is also set.
Note: --data-cipher-fallback with cipher 'AES-128-CBC' disables data channel offload.
OpenVPN 2.6.3 ****************** [SSL (OpenSSL)] [LZO] [LZ4] [EPOLL] [PKCS11] [MH/PKTINFO] [AEAD] [DCO]
...
...
...
```

Then once fully connected, this is verified seeing the `Initialization Sequence Completed`.

Now, I'll connect to the `Windows` machine using `xfreerdp`. There are sometimes connected issues using this, so in cases where I am having connection errors, I just simply respawn the target machine.

Here is the command I used to connect.

![[Pasted image 20241111173446.png]]

Once the connection is successful, we can see that we are logged in as `htb-student`.

![[Pasted image 20241111175130.png]]

Here's our first step:

> Perform string analysis on the "DirectX.dll" sample that resides in the "/home/htb-student/Samples/YARASigma" directory of this section's target.

To do that, I'll first open a terminal Window, and run the `strings` command. This will display the found strings in the file.

![[Pasted image 20241111175357.png]]

Now, that we have the strings, I'll use `yarGen` to analyze the strings and create a Yara rule. I moved the `DirectX.dll` file into it's own directory in the `/home/htb-student/temp/sample/` directory, in order to have only that file be scanned.

When running `yarGen`, notice that I am also in the directory where the `Python` script exists.

![[Pasted image 20241111180414.png]]

Then, we'll see that it was successful!

![[Pasted image 20241111180529.png]]

`yarGen` generated this rule set from the `DirectX.dll`

```bash
/* Rule Set ----------------------------------------------------------------- */

rule _home_htb_student_temp_sample_DirectX {
   meta:
      description = "sample - file DirectX.dll"
      author = "yarGen Rule Generator"
      reference = "https://github.com/Neo23x0/yarGen"
      date = "2024-11-11"
      hash1 = "dc9b5e8aa6ec86db8af0a7aa897ca61db3e5f3d2e0942e319074db1aaccfdc83"
   strings:
      $s1 = "\\msvcrt.dll" fullword ascii
      $s2 = "\\TSMSISrv.dll" fullword ascii
      $s3 = "\\spool\\prtprocs\\x64\\localspl.dll" fullword ascii
      $s4 = "\\spool\\prtprocs\\w32x86\\localspl.dll" fullword ascii
      $s5 = " inflate 1.1.4 Copyright 1995-2002 Mark Adler " fullword ascii
      $s6 = "HSUVWATAVI" fullword ascii
      $s7 = "9+ 9jZ" fullword ascii
      $s8 = "lNhhEyj8" fullword ascii
      $s9 = "B /C^Q" fullword ascii
      $s10 = "unknown compression method" fullword ascii /* Goodware String - occured 498 times */
      $s11 = "00Z0j0" fullword ascii /* Goodware String - occured 1 times */
      $s12 = "iLjLmLk" fullword ascii
      $s13 = "atKX58." fullword ascii
      $s14 = "WHwY^y~iyqVIN^MnVe" fullword ascii
      $s15 = "eeSC#'0" fullword ascii
      $s16 = "zeYyY1\\S[]" fullword ascii
      $s17 = "UWhD;Vk" fullword ascii
      $s18 = "suqZjk}" fullword ascii
      $s19 = ".IjHjMz4" fullword ascii
      $s20 = "sGWl`/Jyw" fullword ascii
   condition:
      uint16(0) == 0x5a4d and filesize < 500KB and
      8 of them
}
```

Now that we have our generated rule, we can go to the next part of the question.

> Then, study the "apt_apt17_mal_sep17_1.yar" YARA rule that resides in the "/home/htb-student/Rules/yara" directory and replace "X.dll" with the correct DLL name to ensure the rule will identify "DirectX.dll".

Here, I'll move into the directory mentioned above and `cat` the `apt_apt17_mal_sep17_1.yar` file.

![[Pasted image 20241111181223.png]]

Now, we just need to compare the strings that were generated from the `dll` file to what we have in the already created file. 

I opened another terminal window and compared the two sets of strings. Now, our goal is to fill the X in the below string. 

```bash
$s4 = "\\X.dll" ascii
```

If I go to the rule that we just created and search for the string dll, I just simply started filtering out the `dll` files already present in the existing rule and the one remaining is `TSMISrv.dll`!

![[Pasted image 20241111182000.png]]

![[Pasted image 20241111182030.png]]

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
