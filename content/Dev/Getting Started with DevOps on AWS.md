---
Owner: Chris Adams
date: 2024-10-07
Edited: 
tags:
  - cloud/aws/
  - cloud
  - devsecops
  - certs
title: Getting Started with DevOps on AWS
---
#cloud/aws/ #certs #cloud #devsecops 

*Information is sourced from AWS Skill builder course*

**What is DevOps?**
- combination of cultural philosophies, practices, and tools that increase an organization’s ability to deliver applications and services at high velocity
    - evolving and improving products at a faster pace than traditional practices
        - this speed enables organizations to better serve their customers
- emphasizes better collaboration and efficiencies so teams can innovate faster and deliver higher value to businesses and customers

### DevOps Lifecycle changes
1. **Code** - develop code in languages such as .java, .NET, or Python
2. **Build** - creating builds of your software
    1. compile code
    2. check code styles and standards
    3. analyze code complexity and maintainability
    4. validate dependencies
    5. create container images
    6. run unit tests
3. **Test** - assess if application meets defined functions, performance, design, and implementation requirements
    1. Types of testing
        1. functional
        2. integration
        3. regression
        4. acceptance
        5. load
        6. security
4. **Release** - prepare and package the tested code with a specific version number
5. **Deploy** - deploy release to targeted environments, such as test, alpha, beta, or production
6. **Monitor** - monitor application in production to quickly detect unusual activity or errors
  
---
_Development_
**Integrated development environment** (IDE) - help write, run and debug code for your applications
**Software development kits** (SDKs) - sets of tools that allow programmers to develop applications for a specific platform
Examples:
- **IDEs**: AWS Cloud9, IntelliJ, Eclipse, Visual Studio Code
- **SDKs**: AWS SDK for Java, iPhone SDK
- **Source code repositories**: GitHub, AWS CodeCommit
  
CI/CD Tools
- **Build:** Jenkins, Travis CI, AWS CodeBuild
- **Source control tools, repositories:** Git, CodeCommit
- **Deployment tools:** AWS CodeDeploy, AWS CloudFormation
- **Pipeline automation tools:** AWS CodePipeline, Jenkins, GitLab
  
Infrastructure automation:
- **Infrastructure automation tools:** AWS CloudFormation, Terraform, AWS Elastic Beanstalk
- **Configuration management tools:** Chef, Puppet, AWS OpsWorks
  
Containers and Serverless architecture
- **Serverless services:** AWS Lambda, AWS Fargate
- **Container services:**
    - **Runtimes:** Docker, containerd
    - **Orchestration:** Amazon Elastic Container Service (Amazon ECS), Kubernetes, Amazon Elastic Kubernetes Services (Amazon EKS)
  
Code
[[Notes/Automation, Cloud & Virtualization/AWS/AWS - Cloud Practitioner/Explorer/AWS CodePipeline]]
**AWS CodeCommit** - securely store and source control your code
Build
**AWS CodeBuild** - automatically compile source code, run tests, and produce software packages
  
  
Test
**AWS CodeBuild + Third Party**
  
Deploy
**AWS CodeDeploy** - fully managed deployment service that automates software deployments to various compute services
Monitor
**AWS X-Ray** - collects data about requests that your application serves
Amazon Cloudwatch - monitors AWS resources
Developers
Dev tools:
- **AWS Cloud9** - write, run, and debug your code; can also makes changes to an AWS CodeCommit repository
- Amazon tools and SDKs
- AWS Cloud Development Kit (AWS CDK)

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