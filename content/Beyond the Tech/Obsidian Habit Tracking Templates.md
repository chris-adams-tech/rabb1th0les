---
Owner: Chris Adams
title: Obsidian Habit Tracking Templates
type: Life Hacking
topic: Templates
date: 2024-12-10
tags:
  - lifestyle
draft: true
reference:
---
Obsidian's capabilities are seeming to be endless. It can be used as basic as you want or as simple. That is what I love about this application. For me it has been a learning tool. Features such as the *Live Preview* help me to understand what code does in real time. Using the *metadata* in the properties helps me understand `yaml` formatting, as well as understanding data science for management at scale. This led me to creating a system for tracking habits and goal setting. 

This template system uses `javascript` in order to query the vault for data to create new pages with auto-populated field upon note creation.

The GitHub repo can be found here: https://github.com/chris-adams-tech/Obsidian-Templates

It is still a work in progress, but I will be making updates to it, including a video walkthrough of how I am using it. I created it to be flexible and modular so anything can be adjusted. 

Below is the `README.md` from the GitHub repo.

---
# Obsidian Habit Tracking Templates

Obsidian has really changed a lot in the way I document and track my projects and progress in not only tech, but also my personal life. Though I have never been officially diagnosed, I definitely have ADHD as I have found a lot of people in tech, especially those into Obsidian, so I hope that someone may find some use in these templates!

Here are some templates that have helped me to document and track notes. This can be adjusted to your liking, but does require some plugins for functionality. 

**List of needed plugins**:

* **Calendar** - https://github.com/liamcain/obsidian-calendar-plugin
* **Dataview** - https://github.com/blacksmithgu/obsidian-dataview
* **Periodic Notes** - https://github.com/liamcain/obsidian-periodic-notes
* **Templater** - https://github.com/SilentVoid13/Templater
* **Style Settings** (optional) - https://github.com/mgmeyers/obsidian-style-settings


> [!warning] Open-source software
> Obsidian allows *Community plugins*, ones that are built from the open-source community. Note that these are not maintained by Obsidian and are not official software. I tend to do my own research into the code in the Github repo and suggest you to verify on your own as well! *Always verify, never trust*.

To find the instructions on how to use the templates, go to the [[How to use Templates]] page.

There is an example template already generated for each of the notes, `Daily`, `Weekly`, `Monthly`, `Quarterly`, and `Yearly`. 

Everything is adjustable. Any of these can be removed to minimize frequency using the *Periodic Notes* plugin.

# Using Templates

Templates are an extremely powerful way to automate the structure of your pages. I tend to use them for my daily notes and habit tracking. With this set up for the daily, weekly, monthly, quarterly, and yearly, it allows the notes to connect in a seamless way. 

One way to use them is for **habit tracking**. Here is how I use it.

There are 5 templates under the `_config/templates` folder; `daily`, `weekly`, `monthly`, `quarterly`, and `yearly`. Each of these uses a plugin called *Templater* that allow inline *Javascript* queries in the metadata (Properties). 

For each day, I have it set so the *Daily Note* opens up when opening the application. This will then auto generate the metadata as according to the `daily.md` template that I use.

###### Here is the daily.md template
```
---
uid: <% tp.date.now("YYYYMMDDHHmm") %>
date: <% tp.date.now("YYYY-MM-DD", 0, tp.file.title, "YYYY-MM-DD") %>
weekday: <% tp.date.now("dddd") %>
week: <% tp.date.now("YYYY-[W]WW", 0, tp.file.title, "YYYY-MM-DD") %>
year: <% tp.date.now("YYYY", 0, tp.file.title, "YYYY-MM-DD") %>
tags:
  - daily_note
  - habit_tracker
medicine: 🙌
push-ups: 💩
running: 💩
apply-for-2-jobs: 💩
do 1 lab: 💩
sleep: 0
exercise: 0
reading: 0
meditation: 0
writing: 0
---
#### Work
- [ ] 💪

#### Articles
- [ ] 

#### Meetings
- 🎙

#### Outcomes
1. 🦄

#### Journal
```

By creating a template, it allows for this to be deployed dynamically each day, reducing the time having to create the fields each time. 

To show for example, now when I open a new page, it will look like this:

![[daily-habit.png]]
A random `uid` is generated for uniqueness, the `date` of the note is populated and set as the title, the `weekday` is set according to the current date, `week` is set according to the week within the year, and `year` is set within that time frame. 

I've also set two tags `daily_note` and `habit_tracker` so these notes can be easily queried via the *Dataview* plugin. That plugin makes managing pages at scale much more efficient. That's a discussion for another page though. 

Now each of these `daily` notes and each of the daily habits can be reviewed at the end of the week in the `weekly` note. Then, this `weekly` note can be used to plan for the upcoming week as well. This ensures continuous improvement and planning for your next goals. 

This micro to macro goal setting can continue from `weekly` -> `monthly` -> `quarterly` -> `yearly` and can easily be adjusted to remove any for less optimization. If the system is not built to support doing this level of tracking, it can be more daunting to even approach such a task. But with small bits and adding little by little (*the 1% compounding factor rate*), you can find a system that works for you.

Additionally to this, any of the fields can be adjusted, removed, added, to tailor to your liking. 

---

### Managing your notes with hotkeys

I have been finding the best way to be able to manage these notes is by both using *Dataview* and the use of *hotkeys*. *Hotkeys* are customized key bindings that optimize frequently executed tasks, such as templates. 

For the note-taking, I use a plugin called *Periodic Notes*, which allows the creation of the multitude of notes. Here are the hotkeys I have set:

| Template      | Hotkey     |
| ------------- | ---------- |
| **Daily**     | `CTRL + D` |
| **Weekly**    | `CTRL + W` |
| **Monthly**   | `CTRL + M` |
| **Quarterly** | `CTRL + Q` |
| **Yearly**    | `CTRL + Y` |

This is set for basic use and can further be customized with going to previous/next note, etc. but this is a great starting point.

> [!tip] Further research
> Technical documentation on syntax and how to use *Templater*, check out their docs https://silentvoid13.github.io/Templater/introduction.html

---
# Dataviews

A very efficient way to visualize the data in Obsidian is using *Dataviews*. This is a community built plugin that uses *javascript* to query within the vault to visualize data. It really is a game changer and is an incredible way to manage pages within your vault. 

#### 3 Use Cases

Here are 3 use cases that I am using it for in my vault.

1. **Habit Tracking** - Within the *Periodic Notes* you'll notice that there are emojis as a *key/pair* value with a habit. This is to signify whether the habit was met for that day. 
	1. 🙌 = habit was met
	2. 💩 = habit was not met
		By using *Dataview*, this data can be queried and put into a table with whichever parameters you indicate. For example, in the weekly note, include the habits from the past 7 days in a table format. The code would look a little something like this:

![[dataview.png]]

And the output would be this table. This pulls the data from the daily notes of the past 7 days and populates them into this table.

![[Pasted image 20241210122139.png]]

2. **Tracking Published Pages for Website*** - Using *Dataview*, I can review the pages I have in my `published` directory along with the associated *metadata*. I tend to track mostly by the tags and will filter based upon the date creation. This way I can also review everything that has just been published, as we reviewing and updating anything that is old and outdated, possibly needing an update. 

![[dataview1 1.png]]

Now, with this vault there is only one page with a date. When using this in production with templates, it makes more sense. Right now is only the templates, and baseline configuration. From this simple query, it can be adjusted to review specific tags or any other *metadata* within the properties. 

# Other Templates

This can be adjusted to your own liking. You'll notice the `gradient-text`. This is using a *CSS* class in the `.obsidian/snippets` folder. Ensure the file is there and enabled in the settings.

![[Pasted image 20241210122415.png]]

Here is the code for the snippet, I named it `gradient-text.css`. When you want to use this code within an HTML block, just use this code wrapped around the text you would like the effects to apply to:

```html
<div class="gradient-text">your-text-here</div>
```


```css
@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.gradient-text {
    background: linear-gradient(90deg, #892be249, #37ff146c);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: gradientShift 10s ease-in-out infinite;
}```

Below is the footer template that is also in the directory. Using the *Templater* plugin, I use the `Notes Template` by opening up *Templater* with `Alt + E` then choose the `Notes Template`. This way for each note created, this *footer_template* will be applied to the bottom. That template also has a preset group of properties that will enable future tracking for the note as well.

![[footer.png]]

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
