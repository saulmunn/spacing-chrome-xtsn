function addSpacingToTweets() {
  // Use MutationObserver to handle dynamically loaded tweets
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        const tweets = document.querySelectorAll(
          'article[data-testid="tweet"]'
        );
        tweets.forEach((tweet) => {
          if (!tweet.dataset.spacingApplied) {
            tweet.dataset.spacingApplied = "true";
          }
        });
      }
    });
  });

  // Start observing the timeline for changes
  const timeline = document.querySelector('[data-testid="primaryColumn"]');
  if (timeline) {
    observer.observe(timeline, {
      childList: true,
      subtree: true,
    });
  }
}

// Initialize when the page loads
document.addEventListener("DOMContentLoaded", addSpacingToTweets);

// Handle dynamic navigation
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    addSpacingToTweets();
  }
}).observe(document, { subtree: true, childList: true });
