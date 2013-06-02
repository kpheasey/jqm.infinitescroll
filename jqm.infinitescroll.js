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
            if ($(window).scrollTop() == 0 || ($(window).scrollTop() > 1 && (($(window).scrollTop() + $(window).height()) / $(document).height()) > limit)) {
                return true;
            } else {
                return false;
            }
        }
    };

    $.fn.infinitescroll = function(options, callback) {
        var opts = $.extend(defaults, options);
        opts['instance'] = $(this);
        opts['newItems'] = undefined;

        $(opts.navElement, $.mobile.activePage).hide(); // hide the navigation element

        $(window).on('scrollstop.infinitescroll', function() {

            if (methods.isScrolledToBottom(opts.windowLocationTrigger)) {
                $(window).off('scrollstop.infinitescroll');// stop checking the scrolling
                opts.pathToNextPage = methods.setPathToNextPage(opts.navElement, $.mobile.activePage);

                if (opts.pathToNextPage == undefined) {
                    return false;
                }

                $.ajax(opts.pathToNextPage).done(function(data) {
                    opts.newItems = $(data).find(opts.itemsToLoad);

                    opts.newItems.each(function() {
                        opts.instance.append(this);
                    });

                    if (typeof callback === 'function') { // make sure the callback is a function
                        callback.call(this, opts.newItems); // brings the scope to the callback
                    }

                    var newNavElement = $(data).find(opts.navElement);
                    if (newNavElement.length > 0) {
                        $(opts.navElement).attr('href', newNavElement.attr('href'));
                        opts.instance.infinitescroll(opts, callback);
                    } else {
                        $(opts.navElement).removeAttr('id');
                    }
                });
            }
        });

        if ($(window).height() > $('[data-role="content"]', $.mobile.activePage).height()) {
            $(window).trigger('scrollstop.infinitescroll');
        }
    };
})(jQuery);

$(document).on('pagebeforehide', function() {
    $(window).off('scrollstop.infinitescroll resize.infinitescroll');
});
