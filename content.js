// Listen for selection and store the selected text, URL, and position
document.addEventListener('mouseup', () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    // Get the current list of selected texts from storage
    chrome.storage.local.get("selectedTexts", (data) => {
      const selectedTexts = data.selectedTexts || [];
      
      // Get the current URL of the page
      const currentUrl = window.location.href;
      
      // Create a new element for storing the selected text
      const selectedElement = window.getSelection().anchorNode.parentElement;  // Or find a better element that contains the selected text
      
      // Give it a unique ID for later reference
      const elementId = `highlightedText_${Date.now()}`;  // Unique ID based on timestamp
      selectedElement.id = elementId;  // Set the unique ID for the element
      
      // Add the selected text, URL, and element ID as an object to the array
      selectedTexts.push({ text: selectedText, url: currentUrl, elementId: elementId });
      
      // Save the updated list back to storage
      chrome.storage.local.set({ selectedTexts: selectedTexts });
    });
  }
});
