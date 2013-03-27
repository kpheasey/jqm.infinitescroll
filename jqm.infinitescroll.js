/*
 ------------------------------------
 jQuery Mobile Infinite Scroll Plugin
 ------------------------------------
 Copyright 2013 - Kevin Pheasey
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function($) {
    var defaults = {
        'windowLocationTrigger': 0.75, //percentage of how far downt he page the user needs to be before the next list is loaded
        'pathToNextPage': undefined
    };

    var methods = {
        setPathToNextPage: function(navElement, instance) {
            var pathToNextPage = undefined;

            if ($(navElement, instance).length > 0) { // nav element may not exist
                pathToNextPage = $(navElement, instance).attr('href');
            } else {
                pathToNextPage = undefined;
            }

            return pathToNextPage;
        },
        isScrolledToBottom: function(limit) {
            if ($(window, $.mobile.activePage).scrollTop() > 1 && (($(window, $.mobile.activePage).scrollTop() + $(window, $.mobile.activePage).height()) / $(document).height()) > limit) {
                return true;
            } else {
                return false;
            }
        }
    };

    $.fn.infinitescroll = function(options, callback) {
        defaults['instance'] = $(this);
        defaults['path']
        var opts = $.extend(defaults, options);

        opts.pathToNextPage = methods.setPathToNextPage(opts.navElement, $.mobile.activePage);

        if (opts.pathToNextPage !== undefined) { // only do something if there is a known path to next page
            $(opts.navElement, $.mobile.activePage).hide(); // hide the navigation element

            $(window, $.mobile.activePage).bind('scrollstop.infinitescroll', function() {
                if (methods.isScrolledToBottom(opts.windowLocationTrigger)) {
                    $(window).unbind('scrollstop.infinitescroll');// stop checking the scrolling

                    $.ajax(opts.pathToNextPage).done(function(data) {
                        $(data).find(opts.itemsToLoad).each(function() {
                            opts.instance.append(this);
                        });

                        var newNavElement = $(data).find(opts.navElement);
                        if (newNavElement !== undefined) {
                            $(opts.navElement).attr('href', newNavElement.attr('href'));
                            opts.instance.infinitescroll(opts, callback);
                        } else {
                            $(opts.navElement).remove();
                        }

                        if (typeof callback === 'function') { // make sure the callback is a function
                            callback.call(this); // brings the scope to the callback
                        }
                    });
                }
            });
        }
    };
})(jQuery);

$(document).live('pagebeforehide', function() {
    $(window).unbind('scrollstop.infinitescroll');
});
