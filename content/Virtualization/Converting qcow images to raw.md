---
Owner: Chris Adams
date: 2024-11-05
edited: 
layout: new_page
tags:
  - Virtualization/virt-manager
  - Virtualization
  - Virtualization/libvirt
---
For my virtual environment, I am typically using **virt-manager** or Virtual Machine Manager, a Linux hypervisor with a GUI interface for managing virtual machines that uses KVM under the hood. I tend to use a combination of the GUI interface, as well as the CLI or libvirt, utilizing the `virsh` commands. By using the CLI, the efficiency game is leveled up when deploying multiple systems. 

KVM uses `qcow` images, or Copy on Write (CoW), files to save and load it's images. These formats cannot be directly uploaded into cloud images or VMware instances. I found an article from Fortinet that they use to convert their images and have been using this to save backups of my images, as well as have an easy way to implement onto different hardware, or to upload into a cloud instance. 

My initial goal with this is to build images locally in a `qcow` format, then save the raw image, then create a project out of loading my local instance into a cloud instance. 

#### Here are the commands to convert the image

First, if not installed already, install the `qemu-img` tool

```bash
sudo apt-get install qemu-utils
```

Then, move into the directory where your `qcow` image is located. For me, I created another folder in my `/mnt` directory where my ISO files are located. This makes is easier to manager, keeping everything in the same place.

Once the directory is created, convert the image.

```bash
qemu-img convert <og-image>.qcow2 <new-image>.raw
```

It may take a little bit to convert, depending on the size of your image. Once it is complete, be sure to test it by creating a new virtual machine. 


> [!NOTE] Creating a new vm
> When you are creating the new VM in virt-manager, the "Import existing image" will need to be used, instead of the "Create new virtual machine"

Source: https://docs.fortinet.com/document/fortipam-public-cloud/1.3.0/aws-administration-guide/330330/converting-qcow2-to-a-raw-format-for-aws-import-image-tool

<div class="neon-line"></div>

Thanks for taking the time to read through my content. If you enjoy this type of content, check back here for more updates. 

Peace ✌️

#### Created on: Nov 05, 2024
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
