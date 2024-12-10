---
Owner: Chris Adams
date: 2024-10-08
tags:
  - cloud/aws/
  - devsecops/analytics
  - cloud
  - security-engineer
  - cybersecurity/certs
title: Fundamentals of Analytics on AWS - Part 1
type: Technical Guide
topic: AWS
---
*Information is sourced from AWS Skill builder course*

Data analytics uses raw data captures from many sources to process, analyze, and interpret what may happen and how an organization can use this knowledge for its benefit
  
**Benefits of data analytics**
- finding patterns
- discovering opportunities
- predicting events and actions
- making well-informed decisions
  
**Types of analytics**
- descriptive
    - describes what happened?
        - trends
        - patterns
- diagnostic
    - describes why did it happen?
        - correlation
        - insights into actionable items
- predictive
    - describes what might happen?
        - future outcomes
        - helps to make informed decisions
- prescriptive
    - recommends actions or responses based on predictive analysis
  
5 V’s of Big Data
**Volume**
**Variety**
Data types to consider:
- structured
    - table format
    - easy to analyze
    - lack of flexibility
Examples
- Customer Relationship Management (CRM) system
- Online forms
- Network logs
- Event reservation system
- semi-structured
    - stored in non-relational databases
    - most often temporary
    - more difficult to analyze
Examples:
- CSV
- JSON
- XML
- unstructured
    - files and objects
    - requires tabbing and cataloging
Examples:
- Clickstream data
- Emails
- Documents
- PDFs
- Photos
- Videos

### Data storage methods
- **Structured** and **semistructured data** are stored in database management systems (DBMS).
- **Unstructured data** is stored in data lakes or object storage solutions.
  
### Semistructured data stores
Semistructured data are often stored in non-relational database systems, sometimes called NoSQL databases.

> [!important]  
> Non-relational or NoSQL does not mean the data stored cannot be queried using SQL. A better way to think of it is not only SQL.  
  
### Key value databases
Key-value databases are a type of non-relational database that store unstructured data in the form of key-value pairs.
Strengths include the following:
- Very flexible
- Able to handle a wide variety of data types
- Keys are linked directly to their values with no need for indexing or complex join operations
- Content of a key can be conveniently copied to other systems without reprogramming the data
Weaknesses include the following:
- Difficult to query values because they are stored as a single blob
- Updating or editing the content of a value is quite difficult
- Not all objects are conveniently modeled as key-value pairs
  
### Document stores
Document stores are a type of non-relational database that store semistructured and unstructured data in the form of files. These files range in form, but include JSON, BSON, and XML. The files can be navigated using numerous languages, including Python and Node.js.
Strengths include the following:
- Flexibility
- No need to plan for a specific type of data when creating one
- Convenient to scale
Weaknesses:
- Cannot query across files
  
### Strengths of NoSQL databases
- Ability to update schemas on the fly
- Faster development cycles
- Less downtime
- Scales really well for larger data sets
  
### Weaknesses of NoSQL databases
Weaknesses of NoSQL databases include the following:
- Data is not instantaneously updated with every change.
- It does not perform well for applications requiring extremely low transactional latency.
- It is not as a mature as relational database technology.
  
### **OLTP and OLAP systems**
Two primary methods:
**online transaction processing** (OLTP)
**online analytical processing** (OLAP)

> [!important]  
> Adding data to a database is called a write operation.Querying data in a database is called a read operation  
_Smaller databases have a tolerance for simultaneous write and read operations._
- The solution is to have an OLTP database optimized for write operations and an OLAP database optimized for read operations.
  
**Velocity**
- **Scheduled batch processing -** represents data that is processed in a very large volume on a regularly scheduled basis
- **Periodic batch processing -** batch of data that is processed at irregular times
    - often run after a certain amount of data has been collected
        - can make them unpredictable and hard to plan around
- **Near real-time -** streaming data that is processed in small batches
- **Real-time -** processed in very small batches, continuously collected
**Value**

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
