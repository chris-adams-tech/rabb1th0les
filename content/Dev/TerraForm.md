---
Owner: Chris Adams
date: 2024-10-07
Edited: 2024-10-24T01:13:00
tags:
  - automation
  - automation/IaC
  - cloud
  - devsecops
cssclasses: 
title: TerraForm
---
Terraform makes it easy to deploy IaC deployments via API calls
  
*Sourced from Terraform docs* : [https://developer.hashicorp.com/terraform/docs](https://developer.hashicorp.com/terraform/docs)
# Categories of IaC tools
1. Ad hoc scripts
2. Configuration management tools
3. Server templating tools
4. Orchestration tools
5. Provisioning tools
  
### Cloud Specific
- Cloud formation
- Azure Resource Manager
- Google Cloud Deployment Manager
### Cloud Agnostic
- Terraform
- Pulumi
# Basic Usage Sequence
- terraform init
- terraform plan
- terraform apply
- terraform destroy
  

> [!important]  
> First an IAM user must be created in AWS or other cloud deployment option.  
  
### State File
- Terraform’s representation of the world
- JSON file containing info about every resource and data object
- Contains sensitive info
- can be stored locally or remotely
  
### Variable Types
---
Input variables
- `var.<name>`
---
  
Local variables
- `local.<name>`
---
  
Output variables
  
```Bash
variable "instance_type" {
	description = "ec2 instance type"
	type        = string
	default     = "t2.micro"
}
locals {
	service_name = "My Service"
	owner        = "Dev0ps Directive"
}
output "instance_ip_addr" {
	value = aws_instance.instance.public_ip
}
```
  
### Setting input variables
In order of precedence // lowest → highest
- manual entry during plan/apply
- default value in declaration block
- `TF_VAR_<name>` environment variables
- `terraform.tfvars` file
- `*.auto.tfvars` files
- command line `-var` or `-var-file`
  
### Types & Validation
---
**Primitive Types**
- string
- number
- bool
  
**Complex Types**
- `list(<TYPE>)`
- `set(<TYPE>)`
- `map(<TYPE>)`
- `object({<ATTR NAME> = <TYPE>, … })`
- `tuple([<TYPE>, …])`
---
  
### Sensitive Data
**Mark variables as sensitive**
- `Sensitive = true`
  
**Pass to terraform apply with:**
- `TV_VAR_variable`
- `-var` (retrieved from secret manager at runtime)
  
**Can also use external secret store**
- For example, AWS Secrets Manager
  
### Meta-Arguments
  

> [!important]  
> set of meta arguments to control terraform behavior for specific resources  
---
`create_before_destroy` can help with zero downtime deployments
`ignore_changes` prevents Terraform from trying to revert metadata being set elsewhere
`prevent_destroy` causes Terraform to reject any plan which would destroy this resource
---
  
### Types of Modules
  
**Root Module:** default module containing all .tf files in main working directory
**Child Module:** A separate external module referred to from a .tf file
  
**Module Sources**
---
- Local paths
- Terraform registry
- GitHub
- Bitbucket
- Generic Git, Mercurial repos
- HTTP URLs
- S3 buckets
- GCS buckets
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