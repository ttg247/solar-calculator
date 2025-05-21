// themeUI.js

export function initializeThemeUI(windowObj, documentObj, $) {
  'use strict';

  $(documentObj).ready(function () {
    function collapseSubmenu($item, callback) {
      $item.children('.submenu-content').show().slideUp(200, function () {
        $(this).css('display', '');
        $(this).find('.menu-item').removeClass('is-shown');
        $item.removeClass('open');
        if (callback) callback();
      });
    }

    const $appSidebar = $('.app-sidebar'),
          $sidebarContent = $('.sidebar-content'),
          $wrapper = $('.wrapper'),
          sidebarEl = documentObj.querySelector('.sidebar-content');

    new PerfectScrollbar(sidebarEl, {
      wheelSpeed: 10,
      wheelPropagation: true,
      minScrollbarLength: 5
    });

    $sidebarContent.on('click', '.navigation-main .nav-item a', function () {
      const $parent = $(this).parent('.nav-item');
      if ($parent.hasClass('has-sub') && $parent.hasClass('open')) {
        collapseSubmenu($parent);
      } else {
        if ($parent.hasClass('has-sub')) {
          const $submenu = $parent.children('.submenu-content');
          const $items = $submenu.children('.menu-item').addClass('is-hidden');
          $parent.addClass('open');
          $submenu.hide().slideDown(200, function () {
            $(this).css('display', '');
          });
          setTimeout(() => {
            $items.addClass('is-shown').removeClass('is-hidden');
          }, 0);
        }

        if ($sidebarContent.data('collapsible')) return false;

        collapseSubmenu($parent.siblings('.open'));
        $parent.siblings('.open').find('.nav-item.open').removeClass('open');
      }
    });

    // Nav toggle
    $('.nav-toggle').on('click', function () {
      const $icon = $(this).find('.toggle-icon');
      if ($icon.attr('data-toggle') === 'expanded') {
        $wrapper.addClass('nav-collapsed');
        $('.nav-toggle .toggle-icon').removeClass('ik-toggle-right').addClass('ik-toggle-left');
        $icon.attr('data-toggle', 'collapsed');
      } else {
        $wrapper.removeClass('nav-collapsed menu-collapsed');
        $('.nav-toggle .toggle-icon').removeClass('ik-toggle-left').addClass('ik-toggle-right');
        $icon.attr('data-toggle', 'expanded');
      }
    });

    // Sidebar hover behavior
    $appSidebar.on('mouseenter', function () {
      if ($wrapper.hasClass('nav-collapsed')) {
        $wrapper.removeClass('menu-collapsed');
        const $collapsedItems = $('.navigation-main .nav-item.nav-collapsed-open');
        $collapsedItems.children('.submenu-content').hide().slideDown(300, function () {
          $(this).css('display', '');
        });
        $sidebarContent.find('.nav-item.active').parents('.nav-item').addClass('open');
        $collapsedItems.addClass('open').removeClass('nav-collapsed-open');
      }
    }).on('mouseleave', function () {
      if ($wrapper.hasClass('nav-collapsed')) {
        $wrapper.addClass('menu-collapsed');
        const $openItems = $('.navigation-main .nav-item.open');
        $openItems.addClass('nav-collapsed-open');
        $openItems.children('.submenu-content').show().slideUp(300, function () {
          $(this).css('display', '');
        });
        $openItems.removeClass('open');
      }
    });

    // Responsive resize
    if ($(windowObj).width() < 992) {
      $appSidebar.addClass('hide-sidebar');
      $wrapper.removeClass('nav-collapsed menu-collapsed');
    }

    $(windowObj).resize(function () {
      const w = $(windowObj).width();
      if (w < 992) {
        $appSidebar.addClass('hide-sidebar');
        $wrapper.removeClass('nav-collapsed menu-collapsed');
      } else {
        $appSidebar.removeClass('hide-sidebar');
        if ($('.toggle-icon').attr('data-toggle') === 'collapsed') {
          $wrapper.addClass('nav-collapsed menu-collapsed');
        }
      }
    });

    // Additional click handlers for smaller screens
    $(documentObj).on('click', '.navigation li:not(.has-sub)', function () {
      if ($(windowObj).width() < 992) {
        $appSidebar.addClass('hide-sidebar');
      }
    });

    $(documentObj).on('click', '.logo-text', function () {
      if ($(windowObj).width() < 992) {
        $appSidebar.addClass('hide-sidebar');
      }
    });

    $('.mobile-nav-toggle').on('click', function (e) {
      e.stopPropagation();
      $appSidebar.toggleClass('hide-sidebar');
    });

    $('html').on('click', function (e) {
      if ($(windowObj).width() < 992 && !$(e.target).closest('.app-sidebar').length) {
        $appSidebar.addClass('hide-sidebar');
      }
    });

    $('#sidebarClose').on('click', function () {
      $appSidebar.addClass('hide-sidebar');
    });

    // Tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Select/Deselect all checkboxes
    $('#checkbox_select_all').on('click', function () {
      const checkboxes = documentObj.getElementsByName('item_checkbox');
      for (let box of checkboxes) {
        if (box.type === 'checkbox') box.checked = true;
      }
      $(checkboxes).parent().parent().addClass('selected');
    });

    $('#checkbox_deselect_all').on('click', function () {
      const checkboxes = documentObj.getElementsByName('item_checkbox');
      for (let box of checkboxes) {
        if (box.type === 'checkbox') box.checked = false;
      }
      $(checkboxes).parent().parent().removeClass('selected');
    });

    // Search
    $('#quick-search').keyup(function () {
      const value = $(this).val().trim().toLowerCase();
      $('.app-item').hide().filter(function () {
        return $(this).html().trim().toLowerCase().includes(value);
      }).show();
    });

    $('.list-item input:checkbox').change(function () {
      $(this).is(':checked')
        ? $(this).parent().parent().addClass('selected')
        : $(this).parent().parent().removeClass('selected');
    });

    $('#navbar-fullscreen').on('click', function () {
      if (typeof screenfull !== 'undefined' && screenfull.enabled) {
        screenfull.toggle();
      }
    });

    $('#selectall').click(function () {
      const status = $(this).is(':checked');
      $('.select_all_child:checkbox').prop('checked', status);
    });

    $('.list-item-wrap .list-item .list-title a').on('click', function () {
      $('.list-item.quick-view-opened').not(this).removeClass('quick-view-opened');
      $(this).parents().parent('.list-item').toggleClass('quick-view-opened');
    });

    $(documentObj).on('click', function (e) {
      if (!$(e.target).closest('.list-item').length) {
        $('.list-item').removeClass('quick-view-opened');
      }
    });

    if (typeof screenfull !== 'undefined' && screenfull.enabled) {
      $(documentObj).on(screenfull.raw.fullscreenchange, function () {
        $('#navbar-fullscreen i').toggleClass('ik-maximize ik-minimize');
      });
    }

    $('.minimize-widget').on('click', function () {
      const $btn = $(this);
      const $widget = $btn.parents('.widget');
      $widget.children('.widget-body').slideToggle();
      $btn.toggleClass('ik-minus ik-plus').fadeIn('slow');
    });

    $('.remove-widget').on('click', function () {
      const $btn = $(this);
      $btn.parents('.widget').animate({
        opacity: '0',
        transform: 'scale3d(.3, .3, .3)',
      }, 800, function () {
        $(this).remove();
      });
    });

    $('.card-header-right .card-option .action-toggle').on('click', function () {
      const $btn = $(this);
      const $cardOption = $btn.parents('.card-option');
      $cardOption.animate({ width: $btn.hasClass('ik-chevron-right') ? '28px' : '90px' });
      $btn.toggleClass('ik-chevron-right').fadeIn('slow');
    });

    $('.card-header-right .close-card').on('click', function () {
      const $btn = $(this);
      $btn.parents('.card').animate({
        opacity: '0',
        transform: 'scale3d(.3, .3, .3)',
      }, 800, function () {
        $(this).remove();
      });
    });

    $('.card-header-right .minimize-card').on('click', function () {
      const $btn = $(this);
      const $card = $btn.parents('.card');
      $card.children('.card-body').slideToggle();
      $btn.toggleClass('ik-minus ik-plus').fadeIn('slow');
    });

    $('.task-list').on('click', 'li.list', function () {
      $(this).toggleClass('completed');
    });

    $('.search-btn').on('click', function () {
      $('.header-search').addClass('open');
      $('.header-search .form-control').animate({ width: '200px' });
    });

    $('.search-close').on('click', function () {
      $('.header-search .form-control').animate({ width: '0' });
      setTimeout(() => {
        $('.header-search').removeClass('open');
      }, 300);
    });

    new PerfectScrollbar('.right-sidebar', {
      wheelSpeed: 10,
      wheelPropagation: true,
      minScrollbarLength: 5
    });

    new PerfectScrollbar('.messages', {
      wheelSpeed: 10,
      wheelPropagation: true,
      minScrollbarLength: 5
    });

    $('.right-sidebar-toggle').on('click', function () {
      this.classList.toggle('active');
      $('.wrapper').toggleClass('right-sidebar-expand');
      return false;
    });
  });
}
