jqm.infinitescroll
==================

jQuery Mobile Infinite Scroll Plugin

This is a very basic infinite scroll plugin for jQuery Mobile.  Just provide the ID of the link to the next page, the class of items to load from the next page.  The plugin pulls in the new items via an AJAX call and recursivley calls itself until it can't find a link to the next page.

$(TARGET).infinitescroll(options, callback);

Required Options:
  navElement - The link to the next page (i.e. '#nextPage')
  itemsToLoad - The type of item to pull from next page (i.e. '#target li')
  
Optional Options:
  windowLocationTrigger - how far the user has to scroll down the page before the new items are loaded.  In the form of a percentage (0-1).  Default 0.75.
