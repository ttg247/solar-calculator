(function($) {
    "use strict";

    // ===== SIDEBAR NAVIGATION =====
    $(".navigation .navigation-menu-body ul li a.has-sub").on("click", function() {
        var e = $(this).parent("li");
        if (e.hasClass("open")) {
            a(e);
            e.removeClass("open");
        } else {
            if (e.closest("ul").hasClass("navigation-menu")) {
                $(".navigation .navigation-menu-body ul.navigation-menu > li.open > a").next().slideUp(200, function() {
                    $(this).closest("li").removeClass("open");
                });
            } else {
                e.parent().find("li.open").each(function() {
                    a($(this));
                });
            }
            e.addClass("open");
            e.find("> a").next().slideDown(200);
        }
    });

    function a(e, s) {
        var a = e.find("> a").next(".submenu-content");
        var i = $(".navigation").data("collapsible");
        e.removeClass("open");
        a.slideUp(200, function() {
            $(this).closest("li").removeClass("open");
        });
        a.find("li.open").removeClass("open");
        a.find(".submenu-content").slideUp(200);
    }

    // ===== TOGGLE NAVIGATION MENU =====
    $(".navigation").on("click", ".navigation-menu-tab a.nav-link", function(e) {
        e.preventDefault();
        $(this).closest(".navigation-menu-tab").find(".nav-link").removeClass("active");
        $(this).addClass("active");
        var target = $(this).attr("href");
        $(this).closest(".navigation-menu-tab").next(".navigation-menu-body").find(".navigation-menu-group").removeClass("show");
        $(target).addClass("show");
    });

    // ===== RESPONSIVE BEHAVIOR =====
    $(window).resize(function() {
        if ($(window).width() < 992) {
            $(".navigation").addClass("hide-sidebar").removeClass("nav-collapsed");
            $(".wrapper").removeClass("nav-collapsed menu-collapsed");
        } else if ($(".toggle-sidebar").hasClass("nav-collapsed")) {
            $(".navigation").removeClass("hide-sidebar").addClass("nav-collapsed");
            $(".wrapper").addClass("nav-collapsed menu-collapsed");
        } else {
            $(".navigation").removeClass("hide-sidebar");
        }
    });

    $(window).trigger("resize");

    // ===== TOGGLE SIDEBAR =====
    $(".toggle-sidebar").on("click", function() {
        if ($(window).width() > 991) {
            $(".navigation").toggleClass("nav-collapsed");
            $(".wrapper").toggleClass("nav-collapsed menu-collapsed");
        } else {
            $(".navigation").toggleClass("hide-sidebar").removeClass("nav-collapsed");
        }
        $(this).toggleClass("nav-collapsed");
        if ($(this).hasClass("nav-collapsed")) {
            $(this).find(".switch-icon").removeClass("fa-angle-left").addClass("fa-angle-right");
        } else {
            $(this).find(".switch-icon").removeClass("fa-angle-right").addClass("fa-angle-left");
        }
    });

    // ===== PERFECT SCROLLBAR INIT =====
    $(".sidebar-content, .right-sidebar, .messages").each(function() {
        if ($(this).length > 0) {
            new PerfectScrollbar(this);
        }
    });

    // ===== MOBILE NAVIGATION TOGGLE =====
    $(".mobile-nav-toggle").on("click", function() {
        $(".navigation").toggleClass("hide-sidebar");
    });

    $(".navigation .navigation-menu-body").on("click", function(e) {
        e.stopPropagation();
    });

    $("body").on("click", function() {
        if ($(window).width() < 992) {
            $(".navigation").addClass("hide-sidebar");
        }
    });

    // ===== CHECKBOX SELECT/DESELECT =====
    $("#checkbox_select_all").on("click", function() {
        $("input[name='item_checkbox']").prop("checked", true).trigger("change");
    });

    $("#checkbox_deselect_all").on("click", function() {
        $("input[name='item_checkbox']").prop("checked", false).trigger("change");
    });

    $("input[name='item_checkbox']").on("change", function() {
        if ($(this).is(":checked")) {
            $(this).closest(".list-item").addClass("selected");
        } else {
            $(this).closest(".list-item").removeClass("selected");
        }
    });

    // ===== QUICK SEARCH FILTER =====
    $("#quick-search").on("keyup", function() {
        var e = $(this).val().toLowerCase();
        $(".app-item").each(function() {
            var t = $(this).find(".app-name").text().toLowerCase();
            t.indexOf(e) > -1 ? $(this).show() : $(this).hide();
        });
    });

    // ===== FULLSCREEN TOGGLE =====
    $("#navbar-fullscreen").on("click", function(e) {
        e.preventDefault();
        if (typeof screenfull != "undefined") {
            if (screenfull.isEnabled) {
                screenfull.toggle();
            }
        }
    });

    if (typeof screenfull != "undefined") {
        if (screenfull.isEnabled) {
            document.addEventListener(screenfull.raw.fullscreenchange, function() {
                if (screenfull.isFullscreen) {
                    $("#navbar-fullscreen i").removeClass("fa-expand").addClass("fa-compress");
                } else {
                    $("#navbar-fullscreen i").removeClass("fa-compress").addClass("fa-expand");
                }
            });
        }
    }

    // ===== WIDGET MINIMIZE / REMOVE =====
    $(".minimize-widget").on("click", function() {
        $(this).toggleClass("collapsed");
        $(this).closest(".card").find(".widget-body").slideToggle();
    });

    $(".remove-widget").on("click", function() {
        $(this).closest(".card").fadeOut(300, function() {
            $(this).remove();
        });
    });

    // ===== CARD OPTIONS TOGGLE =====
    $(".card-option .action-toggle").on("click", function() {
        $(this).toggleClass("active");
        $(this).closest(".card-option").toggleClass("width-auto");
    });

    // ===== CLOSE / MINIMIZE CARD =====
    $(".card-option .close-card").on("click", function() {
        $(this).closest(".card").fadeOut(300, function() {
            $(this).remove();
        });
    });

    $(".card-option .minimize-card").on("click", function() {
        var cardBody = $(this).closest(".card").children(".card-body");
        cardBody.slideToggle();
        $(this).toggleClass("collapsed");
    });

    // ===== TASK LIST TOGGLE =====
    $(".task-list").on("click", "li", function() {
        $(this).toggleClass("completed");
    });

    // ===== SEARCH BAR EXPAND/COLLAPSE =====
    $(".search-btn").on("click", function() {
        $(".main-search").addClass("open");
        $(".main-search input").animate({ width: "200px" });
    });

    $(".search-close").on("click", function() {
        $(".main-search input").animate({ width: "0" }, function() {
            $(".main-search").removeClass("open");
        });
    });

    // ===== RIGHT SIDEBAR TOGGLE =====
    $(".right-sidebar-toggle").on("click", function() {
        $(".wrapper").toggleClass("right-sidebar-expand");
    });

    // ===== CHAT PANEL TOGGLE =====
    $(".chat-toggle").on("click", function() {
        $(".chat-panel").toggleClass("show-chat");
    });

    $(".chat-user-list .media").on("click", function() {
        $(".chat-panel").addClass("show-chat").addClass("show-chat-box");
        $(".chat-box .chat-not-selected").addClass("d-none");
        $(".chat-box .chat-list").removeClass("d-none");

        var userName = $(this).find(".media-body h6").text();
        $(".chat-box .chat-list .chat-header h6").text(userName);

        var avatar = $(this).find(".avatar");
        var chatAvatar = $(".chat-box .chat-list .chat-header .avatar");
        chatAvatar.replaceWith(avatar.clone());

        var chatMessages = $(".chat-box .chat-list .chat-body");
        chatMessages.scrollTop(chatMessages.prop("scrollHeight"));
    });

    $(".chat-box-back").on("click", function() {
        $(".chat-panel").removeClass("show-chat-box");
    });

    // ===== LAYOUT VIEW OPTIONS =====
    $("#layout-wrap .layout-view").on("click", function() {
        var layout = $(this).data("layout");
        var layoutWrap = $("#layout-wrap .layout-item");

        layoutWrap.removeClass("grid list thumb").addClass(layout);
        $("#layout-wrap .layout-view").removeClass("active");
        $(this).addClass("active");
    });

})(jQuery);
