/** Awesome New Tab Page
  *   antp.co
  *   Copyright 2011-2012 Michael Hart (h4r7.me)
  * Want to make it even more awesome?
  *   github.antp.co
  *
  * Licensed under GPL v3:
  *   http://www.gnu.org/licenses/gpl-3.0.txt
  *   Further Restrictions:
  *     To make use of or modify the below code in any way:
  *     - You agree to leave this copyright and license notice intact without
  *       modification; and
  *     - You agree to mark your modified versions as modified from the original
  *       version; and
  *     - You agree not to misrepresent the origin of this material or your
  *       relationship with the authors of this project or the project itself.
***/


/* START :: Windows */

  $(document).ready(function($) {
    $(".ui-2.container").center();

    $(window).bind('resize scroll', function() {
      $(".ui-2.container").center();
    });
  });

  $(".close,.ui-2.x").live("click", function(){
    $("body > .ui-2,#recently-closed-tabs-menu").hide();

    $(".edit-shortcut-ui").remove();

    window.location.hash = "";
    hscroll = true;
  });

  $("#app-drawer-button").live("click", function(){
    loadFeatured();
    _gaq.push([ '_trackEvent', 'Window', "Apps" ]);

    $(".ui-2#apps").toggle();

    $(".ui-2#widgets").hide();
    $(".ui-2#config").hide();
    $("#recently-closed-tabs-menu").hide();
    $(".ui-2#about").hide();

    $(".ui-2#editor").hide();
    $(".edit-shortcut-ui").remove();
  });

  var options_init = true;
  $("#config-button, .ui-2.config").live("click", function(){
    _gaq.push([ '_trackEvent', 'Window', "Config" ]);

    $(".ui-2#config").toggle();

    $(".ui-2#widgets").hide();
    $(".ui-2#apps").hide();
    $("#recently-closed-tabs-menu").hide();
    $(".ui-2#about").hide();

    $(".ui-2#editor").hide();
    $(".edit-shortcut-ui").remove();
  });

  $("#logo-button, .ui-2.logo").live("click", function(){
    _gaq.push([ '_trackEvent', 'Window', "About" ]);

    $(".ui-2#about").toggle();

    if(options_init === true) {
      options_init = false;

      (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();

      (function() {
        var s = document.createElement('script'), t = document.getElementsByTagName('script')[0];
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://api.flattr.com/js/0.6/load.js?mode=auto';
        t.parentNode.insertBefore(s, t);
      })();

      (function() {
        var twitterScriptTag = document.createElement('script');
        twitterScriptTag.type = 'text/javascript';
        twitterScriptTag.async = true;
        twitterScriptTag.src = 'https://platform.twitter.com/widgets.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(twitterScriptTag, s);
      })();
    }

    $(".ui-2#widgets").hide();
    $(".ui-2#apps").hide();
    $("#recently-closed-tabs-menu").hide();
    $(".ui-2#config").hide();

    $(".ui-2#editor").hide();
    $(".edit-shortcut-ui").remove();
  });

  /* END :: Windows */

/* START :: Top Left Buttons */

  function moveLeftButtons() {
    if ( localStorage.getItem("hideLeftButtons") === "yes" &&
      localStorage.getItem("lock") !== "false" ) {
      $(".side-button").css("left", "-50px");
      $("#widget-holder,#grid-holder").css("left", "0px");
    }
    if ( localStorage.getItem("hideLeftButtons") === "yes") {
      $("#hideLeftButtons").attr('checked', 'checked');
    }
    if ( localStorage.getItem("hideLeftButtons") !== "yes" ) {
      $(".side-button").css("left", "0px");
      $("#widget-holder,#grid-holder").css("left", "27px");
    }
  }

  $(document).ready(function($) {
    moveLeftButtons();
  });

  $("#hideLeftButtons").live("click", function(){
    if ($(this).is(':checked')) {
      localStorage.setItem("hideLeftButtons", "yes");
      moveLeftButtons();
    } else {
      localStorage.setItem("hideLeftButtons", "no");
      moveLeftButtons();
    }
  });

  $("#top-buttons").live({
    mouseenter: function() {
      if ( localStorage.getItem("hideLeftButtons") === "yes" ) {

        $(".side-button").css("left", "0px");
        $("#widget-holder,#grid-holder").css("left", "27px");
      }

    },
    mouseleave: function() {
      if ( localStorage.getItem("hideLeftButtons") === "yes"
        && localStorage.getItem("lock") === "true" ) {

        $(".side-button").css("left", "-50px");
        $("#widget-holder,#grid-holder").css("left", "0px");
      }
    }
  });

  /* END :: Top Left Buttons */

/* START :: Recently Closed Tabs */

  $("#recently-closed-tabs-menu").live('mouseleave', function() {
    $(this).css("display", "none");
  });

  $("#recently-closed-tabs").live('click', function() {
    $("#recently-closed-tabs-menu").toggle();

    $(".ui-2#widgets").hide();
    $(".ui-2#config").hide();
    $(".ui-2#apps").hide();
    $(".ui-2#about").hide();
    _gaq.push([ '_trackEvent', 'Window', "Recently Closed Tabs" ]);
  });

  $(window).bind('storage', function (e) {
    if ( typeof(e.originalEvent) === "object"
      && typeof(e.originalEvent.key) === "string"
      && e.originalEvent.key === "recently_closed" )
        resetRecentlyClosedTabs();
  });

  function resetRecentlyClosedTabs() {
    var recently_closed = JSON.parse(localStorage.getItem("recently_closed"));

    $("#recently-closed-tabs-menu").empty();

    if(recently_closed !== null) {
      $.each(recently_closed, function(id, tab) {
        var rct_temp = $("<a></a>").addClass("rctm-item").attr({
          "href": tab.url,
          "target": "_top"
        });
        $("<img></img>").appendTo(rct_temp).addClass("rctm-icon")
          .attr("src", "chrome://favicon/"+tab.url);
        $("<div></div>").appendTo(rct_temp).addClass("rctm-link").text(tab.title);
        rct_temp.appendTo("#recently-closed-tabs-menu");
      });
    }
  }
  $(document).ready(function($) {
    setTimeout(resetRecentlyClosedTabs, 500);
  });

  /* END :: Recently Closed Tabs */

/* START :: Tooltips */

  $(document).ready(function($) {
    var qtipShared = {
      show: 'mouseover',
      hide: 'mouseout',
      style: {
        name: 'light',
        tip: 'topLeft'
      }
    };

    var qtipUI2 = {
      show: 'mouseover',
      hide: 'mouseout',
      style: {
        name: 'light',
        tip: 'topMiddle'
      },
      position: {
        corner: {
           target: 'bottomMiddle',
           tooltip: 'topMiddle'
        },
        adjust: {
          screen: true
        }
      }
    };

    $(".ui-2.widgets-refresh").qtip(
      $.extend({}, qtipUI2, { content: "Widgets not showing up? Refresh manually." })
    );
    $(".ui-2.x").qtip(
      $.extend({}, qtipUI2, { content: chrome.i18n.getMessage("ui_button_close") })
    );
    $(".ui-2.help").qtip(
      $.extend({}, qtipUI2, { content: "Help" })
    );

    $(".ui-2.config,#config-button").qtip(
      $.extend({}, qtipUI2, { content: chrome.i18n.getMessage("ui_config") })
    );

    $(".ui-2#apps .download").qtip(
      $.extend({}, qtipUI2, { content: chrome.i18n.getMessage("ui_button_downloadapps") })
    );

    $(".ui-2#widgets .download").qtip(
      $.extend({}, qtipUI2, { content: chrome.i18n.getMessage("ui_button_download") })
    );

    $("#logo-button").qtip(
      $.extend({}, qtipShared, { content: "About" })
    );
    $("#app-drawer-button").qtip(
      $.extend({}, qtipShared, { content: chrome.i18n.getMessage("ui_button_apps") })
    );
    $("#widget-drawer-button").qtip(
      $.extend({}, qtipShared, { content: chrome.i18n.getMessage("ui_button_widgets") })
    );
    $("#unlock-button").qtip(
      $.extend({}, qtipShared, { content: chrome.i18n.getMessage("ui_button_unlock") })
    );
    $("#lock-button").qtip(
      $.extend({}, qtipShared, { content: chrome.i18n.getMessage("ui_button_lock") })
    );
    $("#recently-closed-tabs").qtip(
      $.extend({}, qtipShared, { content: chrome.i18n.getMessage("ui_button_rct") })
    );

  });

  /* END :: Tooltips */

/* START :: Featured */
  var loaded_featured = false;
  function loadFeatured() {
    if(loaded_featured === false) {
      $.ajax({
        url: "https://cdn.antp.co/getFeatured/?nocache-day=" + new Date().getDate(),
        dataType: "jsonp",
        cache: true,
        jsonpCallback: "setupFeatured",
        success: setupFeatured
      });
    }
  }

  function setupFeatured(data) {
    loaded_featured = true;

    if( typeof(data.a) === "object" ) {
      if( typeof(data.a.app) === "object" ) {
        $(".ui-2#apps .faw-box .faw-featured img").attr("src", data.a.app.img);
        $(".ui-2#apps .faw-box .faw-featured .faw-title").html(data.a.app.title);
        $(".ui-2#apps .faw-box .faw-featured .faw-href").attr("href", data.a.app.href).css("display", "block");
      }
      if( typeof(data.a.widget) === "object" ) {
        $(".ui-2#widgets .faw-box .faw-featured img").attr("src", data.a.widget.img);
        $(".ui-2#widgets .faw-box .faw-featured .faw-title").html(data.a.widget.title);
        $(".ui-2#widgets .faw-box .faw-featured .faw-href").attr("href", data.a.widget.href).css("display", "block");
      }
    }
  }
  /* END :: Featured */

/* START :: Configure */

  $(document).ready(function($) {
    if(window.location.hash) {
      switch(window.location.hash) {
        case "#options":
          $("#config-button").trigger("click");
          break;
      }
    }

    if(localStorage.getItem("showbmb") === null) {
      localStorage.setItem("showbmb", "no");
    }

    bookmark_bar_rendered = false;
    if(localStorage.getItem("showbmb") === "yes") {
      $("#toggleBmb").attr('checked', 'checked');
      bookmark_bar_rendered = true;
      chrome.bookmarks.getTree(getBookmarks);
      $("#bookmarksBar").css("display", "block");
    } else {
      $("#bookmarksBar").css("display", "none");
    }

    if(localStorage.getItem("bg-img-css") && localStorage.getItem("bg-img-css") !== "") {
      $("body").css("background", localStorage.getItem("bg-img-css") );
      $("#bg-img-css").val( localStorage.getItem("bg-img-css") );
    }
  });

  $(document).ready(function($) {
    $("#amazon-locale-selection").val(localStorage.getItem("amazon-locale") || "amazon.com");
    $("#amazon-locale-selection").change(function() {
      localStorage.setItem("amazon-locale", $(this).val());
    });

    $("#widget-holder > .app > a").live('mouseup', function(e) {
      if( (this.href).match(amazon_regex) ) {
        if (localStorage["amazon-locale"] !== null
          && localStorage["amazon-locale"] !== ""
          && typeof(localStorage["amazon-locale"]) !== "undefined") {
          this.href = "http://www." + localStorage["amazon-locale"] + "/?tag=sntp-20";
        } else {
          $(this).attr("data-url", "http://www.amazon.com/?tag=sntp-20");
        }
      }

      if( (this.href).indexOf("file://") != -1 ) {
        switch(e.which)
        {
          case 1:
            chrome.tabs.update(null, {url: (this.href)});
            return false;
          case 2:
            chrome.tabs.create({url: (this.href)});
            return false;
        }
      }
    }).live('click', function(e) {
      if( (this.href).indexOf("file://") != -1 ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });

    $("#colorselector-bg").ColorPicker({
      color: '#' + ( localStorage.getItem("color-bg") || "221f20") ,
      onShow: function (colpkr) {
        $(colpkr).fadeIn(500);
        return false;
      },
      onHide: function (colpkr) {
        $(colpkr).fadeOut(500);
        return false;
      },
      onChange: function (hsb, hex, rgb) {
        $(".bg-color").css('background-color', '#' + hex);
        localStorage.setItem("color-bg", hex);
      }
    });
  });

  $(".bg-color").css("background-color", "#" + (localStorage.getItem("color-bg") || "221f20"));

  $("#toggleBmb").live("click", function(){
    if ($(this).is(':checked')) {
      if ( bookmark_bar_rendered === false ) {
        bookmark_bar_rendered = true;
        chrome.bookmarks.getTree(getBookmarks);
      }

      $("#bookmarksBar").show();
      localStorage.setItem("showbmb", "yes");
      moveGrid({ "animate_top": true });
    } else {
      $("#bookmarksBar").hide();
      localStorage.setItem("showbmb", "no");
      moveGrid({ "animate_top": true });
    }
  });

  $("#bg-img-css").live("keyup change", function() {
    $("body").css("background", "" );
    $("body").css("background", $(this).val() );
    $(".bg-color").css("background-color", '#' + (localStorage.getItem("color-bg") || "221f20") );

    if($(this).val() === "") {
      $(".bg-color").css("background-color", "#" + (localStorage.getItem("color-bg") || "221f20"));
    }

    localStorage.setItem("bg-img-css", $(this).val() );
  });

  /* END :: Configure */




