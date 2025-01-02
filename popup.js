// Fetch the list of selected texts from storage
chrome.storage.local.get("selectedTexts", (data) => {
  const selectedTexts = data.selectedTexts || [];
  
  const searchResultsContainer = document.getElementById('searchResults');
  searchResultsContainer.innerHTML = "";  // Clear existing content
  
  if (selectedTexts.length > 0) {
    // Remove duplicates by creating a Set (which stores only unique values)
    const uniqueSelectedTexts = [...new Set(selectedTexts)];
    
    // Reverse the order to display the last selected text first
    uniqueSelectedTexts.reverse();
    
    // Display each unique selected text with a search link
    uniqueSelectedTexts.forEach(text => {
      const searchUrl = `${text.url}`;
      const resultElement = document.createElement('div');
      resultElement.className = 'result';
      resultElement.innerHTML = `
        <a href="${searchUrl}" target="_blank">${text.text}</a>
      `;
      
      // Add event listener to scroll to the selected text when clicked
      resultElement.addEventListener('click', () => {
        if (text.elementId) {
          const element = document.getElementById(text.elementId);
          if (element) {
            // Scroll to the element containing the selected text
            element.scrollIntoView({
              behavior: 'smooth',  // Smooth scrolling
              block: 'center',  // Align the element in the center of the viewport
            });
          }
        }
      });
      
      searchResultsContainer.appendChild(resultElement);
    });
  } else {
    searchResultsContainer.innerHTML = "<p>No highlighted text found.</p>";
  }
});

// Add event listener for the delete button
document.getElementById('deleteButton').addEventListener('click', () => {
  // Clear the selected texts from local storage
  chrome.storage.local.remove("selectedTexts", () => {
    // Clear the display
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = "<p>All highlights have been deleted.</p>";
  });
});
