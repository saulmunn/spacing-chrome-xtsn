(function () {
  // Function to add spacing to tweets on Twitter
  function addSpacingToTweets() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const tweets = document.querySelectorAll(
            'article[data-testid="tweet"]'
          );
          tweets.forEach((tweet) => {
            if (!tweet.dataset.spacingApplied) {
              // Apply CSS spacing (e.g., bottom margin) so that spacing is visible
              tweet.style.marginBottom = "20px";
              tweet.dataset.spacingApplied = "true";
            }
          });
        }
      });
    });

    // Start observing the Twitter timeline container
    const timeline = document.querySelector('[data-testid="primaryColumn"]');
    if (timeline) {
      observer.observe(timeline, {
        childList: true,
        subtree: true,
      });
    }
  }

  // Function to add spacing to Instagram posts
  function addSpacingToInstagramPosts() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          // Adjust the selector to match Instagram posts; here we assume each post is an <article>
          const posts = document.querySelectorAll("article");
          posts.forEach((post) => {
            if (!post.dataset.spacingApplied) {
              // Apply a bottom margin for spacing between posts
              post.style.marginBottom = "300px";
              post.dataset.spacingApplied = "true";
            }
          });
        }
      });
    });

    // Identify the container where Instagram loads its posts; adjust the selector based on the actual DOM
    const feedContainer = document.querySelector("main");
    if (feedContainer) {
      observer.observe(feedContainer, {
        childList: true,
        subtree: true,
      });
    }
  }

  // Initialize both functions when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    addSpacingToTweets();
    addSpacingToInstagramPosts();
  });

  // Handle dynamic navigation for both Twitter and Instagram.
  // Instead of duplicating observers, we use one observer that checks if the URL has changed.
  let lastUrl = location.href;
  new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      addSpacingToTweets();
      addSpacingToInstagramPosts();
    }
  }).observe(document, { subtree: true, childList: true });
})();
