---
Owner: 
date: 
edited: 
tags: []
draft:
---

# Checking SHA256 signature on a file

Tags: Configuration, Linux, Self-Created

### Simple steps to check a file hash

### In this example, we’ll download Parrot Security ISO file.

### Download the file

### Move into the folder where the file was downloaded

```bash
$ /home/<*username>/*Downloads/
```

### Download or go to the page with owner’s file hash values, in this case

![[quartz/content/img/sha.png]]
![[quartz/content/img/sha2.png]]

Enter the command below to check the respective hash
```
sha256sum <name-of-file>
```

<aside>
✅ Ensure your pwd (present working directory) is where you downloaded your file to

</aside>

![[quartz/content/img/sha3.png]]

![[quartz/content/img/sha4.png]]


List of hashes for Parrot Sec ISO files
![[quartz/content/img/sha5.png]]


The below file, `Parrot-security-6.0_amd64.iso` can be substituted for any file downloaded that you would like to check the checksum value for.

<aside>
✅ You will notice if you start at `md5sum` , it will gradually take more time. This is because of the more complex crypotographic operations occurring in the background to calculate these hashes, takes more time.

</aside>

Now, we can see that these hashes match up with what is listed in the web page for Parrot Sec.

![[quartz/content/img/sha6.png]]]

That’s it!

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