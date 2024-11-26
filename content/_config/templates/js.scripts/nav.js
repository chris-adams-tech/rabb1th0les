// Script for Previous/Next navigation
(() => {
    const folderPath = app.workspace.getActiveFile().parent.path;
    const currentFile = app.workspace.getActiveFile().name;
  
    const files = app.vault.getFiles()
      .filter(file => file.parent.path === folderPath)
      .sort((a, b) => a.name.localeCompare(b.name));
  
    const currentIndex = files.findIndex(file => file.name === currentFile);
  
    // Find the previous and next files
    const prevFile = files[currentIndex - 1];
    const nextFile = files[currentIndex + 1];
  
    // Set hrefs for buttons
    const prevBtn = document.getElementById("prevPage");
    const nextBtn = document.getElementById("nextPage");
  
    if (prevFile) {
      prevBtn.href = `obsidian://open?vault=${app.vault.getName()}&file=${encodeURIComponent(prevFile.path)}`;
    } else {
      prevBtn.disabled = true; // Disable button if no previous file
    }
  
    if (nextFile) {
      nextBtn.href = `obsidian://open?vault=${app.vault.getName()}&file=${encodeURIComponent(nextFile.path)}`;
    } else {
      nextBtn.disabled = true; // Disable button if no next file
    }
  })();