jqm.infinitescroll
==================

jQuery Mobile Infinite Scroll Plugin

This is a very basic infinite scroll plugin for jQuery Mobile.  Just provide the ID of the link to the next page, the class of items to load from the next page.  The plugin pulls in the new items via an AJAX call and recursivley calls itself until it can't find a link to the next page.
	
	<div data-role="page">
		<ul id="list" data-role="listview">
			<li>Row 1</li>
			<li>Row 2</li>
			<li>Row 3</li>
		</ul>
		<a id="nextPage" href="listpage.php?start=4">Next Page</a>
	</div>
	<script type="text/javascript">
		$('#list').infinitescroll({
			// required options
			navElement: '#nextPage',
			itemsToLoad: '#list li'
		}, function(){
			// optional callback function
			$('#list').listview('refresh);
		}});
	</script>

Installation:

```bash
bower install jqm.infinitescroll
```

Required Options:

	navElement - The link to the next page (i.e. '#nextPage')
	itemsToLoad - The type of item to pull from next page (i.e. '#target li')
  
Optional Options:

	windowLocationTrigger - how far the user has to scroll down the page before the new items are loaded.  In the form of a percentage (0-1).  Default 0.75.
