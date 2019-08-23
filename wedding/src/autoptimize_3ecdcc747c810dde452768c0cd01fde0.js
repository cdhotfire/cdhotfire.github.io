(function($) {
  "use strict";
  $(document).on('ready', function() {
      var $window = $(window)
        , $document = $(document)
        , $body = $('body');
      var isMobile = {
          Android: function() {
              return navigator.userAgent.match(/Android/i);
          },
          BlackBerry: function() {
              return navigator.userAgent.match(/BlackBerry/i);
          },
          iOS: function() {
              return navigator.userAgent.match(/iPhone|iPad|iPod/i);
          },
          Opera: function() {
              return navigator.userAgent.match(/Opera Mini/i);
          },
          Windows: function() {
              return navigator.userAgent.match(/IEMobile/i);
          },
          any: function() {
              return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
          },
      }
      if (!('placeholder'in document.createElement('input'))) {
          $('form').on('submit', function() {
              $(this).find('[placeholder]').each(function() {
                  var $input = $(this);
                  if ($input.val() == $input.attr('placeholder')) {
                      $input.val('');
                  }
              });
          });
          $('[placeholder]').on('focus', function() {
              var $input = $(this);
              if ($input.val() == $input.attr('placeholder')) {
                  $input.val('');
                  $input.removeClass('placeholder');
              }
          }).on('blur', function() {
              var $input = $(this);
              if ($input.val() == '' || $input.val() == $input.attr('placeholder')) {
                  $input.addClass('placeholder');
                  $input.val($input.attr('placeholder'));
              }
          }).blur();
      }
      var $els = $('[class*="jackrose-animation-"]');
      if ($body.hasClass('jackrose-enable-animations') && !isMobile.any()) {
          $els.one('inview', function() {
              $(this).addClass('jackrose-animate');
          });
      } else {
          $els.addClass('jackrose-no-animate');
      }
      if ($('.header-section').hasClass('header-floating')) {
          var detectFloatingHeader = function() {
              if ($window.scrollTop() >= $('.header-anchor').offset().top - $body.offset().top) {
                  $('.header-section').addClass('floating').css('top', $body.offset().top);
              } else {
                  $('.header-section').removeClass('floating').css('top', '');
              }
          }
          detectFloatingHeader();
          $window.on('resize', detectFloatingHeader);
          $window.on('scroll', detectFloatingHeader);
      }
      $body.on('click', '.toggle', function(e) {
          e.preventDefault();
          $('.toggle.active').not(this).removeClass('active');
          $(this).toggleClass('active');
      });
      $('a[href="#"]').on('click', function(e) {
          e.preventDefault();
      });
      $('.header-navigation ul a, a.anchor-link').on('click', function(e) {
          if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname && location.search == this.search) {
              var $target = $(this.hash), target_top, speed;
              $target = $target.length ? $target : $('[name=' + this.hash.slice(1) + ']');
              target_top = $target.offset().top - $('.header-section').innerHeight() - $body.offset().top;
              speed = Math.abs($window.scrollTop() - target_top) / 2.5;
              if ($target.length) {
                  $('html, body').animate({
                      scrollTop: target_top,
                  }, speed);
                  $('.header-navigation-toggle').removeClass('active');
                  return false;
              }
          }
      });
      $('[data-jackrose-background-parallax]').each(function(i, el) {
          var $el = $(el), $img = $(document.createElement('img')), $bg, data = JSON.parse($el.attr('data-jackrose-background-parallax'));
          $bg = $el.find('.section-background');
          if ($bg.length < 1) {
              $bg = $(document.createElement('div')).addClass('section-background').prependTo($el);
          }
          $img.attr('src', data.src).attr('width', data.width).attr('height', data.height).attr('data-stellar-ratio', data.ratio).attr('alt', '').css({
              'opacity': 0
          }).appendTo($bg);
      });
      var resizeBackground = function() {
          $('.section-background video, .section-background img').each(function(i, el) {
              var $el = $(el), $section = $el.parent(), min_w = 0, el_w = $el.attr('width') || (el.tagName == 'VIDEO' ? el.videoWidth : el.naturalWidth), el_h = $el.attr('height') || (el.tagName == 'VIDEO' ? el.videoHeight : el.naturalHeight), section_w = $section.outerWidth(), section_h = $section.outerHeight(), scale_w = section_w / el_w, scale_h = section_h / el_h, scale = scale_w > scale_h ? scale_w : scale_h, new_el_w, new_el_h, offset_top, offset_left;
              if (scale * el_w < min_w) {
                  scale = min_w / el_w;
              }
              new_el_w = scale * el_w;
              new_el_h = scale * el_h;
              offset_left = (new_el_w - section_w) / 2 * -1;
              offset_top = (new_el_h - section_h) / 2 * -1;
              $el.css({
                  "width": new_el_w,
                  "height": new_el_h,
                  "margin-top": offset_top,
                  "margin-left": offset_left,
                  "opacity": 1,
              });
          });
      }
      $window.on('resize', function() {
          clearTimeout(this.resizeBackgroundTimeout);
          this.resizeBackgroundTimeout = setTimeout(resizeBackground, 50);
      });
      $window.on('pageStart', resizeBackground);
      if (isMobile.any()) {
          $('.section-background video').remove();
      }
      var navigationMaxHeight = function() {
          $('.header-navigation > div > ul').css('max-height', 0.8 * ($window.height() - $('.header-section').innerHeight() - $body.offset().top));
      }
      navigationMaxHeight();
      $window.on('resize', navigationMaxHeight);
      if ($('.hero-logo').length > 0) {
          var fadeOutHeroLogo = function() {
              var $logo = $('.hero-logo')
                , scroll = $window.scrollTop()
                , target = $logo.offset().top + (0.7 * $logo.outerHeight());
              $logo.css('opacity', 1 - (scroll / target).toFixed(2));
          }
          fadeOutHeroLogo();
          $window.on('scroll', fadeOutHeroLogo);
          $window.on('resize', fadeOutHeroLogo);
      }
      if ($.fn.countdown) {
          $('.jackrose-sow-countdown').each(function(i, el) {
              var $el = $(el)
                , target = $el.attr('data-jackrose-target')
                , $fragments = $el.children();
              $el.countdown(target, {
                  elapse: true,
              }).on('update.countdown', function(e) {
                  $fragments.each(function(j, fragment) {
                      var $fragment = $(fragment)
                        , format = $fragment.attr('data-jackrose-format')
                        , singular = $fragment.attr('data-jackrose-singular')
                        , plural = $fragment.attr('data-jackrose-plural');
                      $fragment.find('big').html(e.strftime('%' + format));
                      $fragment.find('small').html(e.strftime('%!' + format + ':' + singular + ',' + plural + ';'));
                  });
              });
          });
      }
      if ($.fn.lightGallery) {
          $('.lightgallery.jackrose-sow-gallery-grid-items').each(function(i, el) {
              var $el = $(el);
              $el.lightGallery({
                  selector: '.jackrose-sow-gallery-grid-item > a',
                  download: false,
              });
          });
      }
      if ($.fn.isotope) {
          $('.jackrose-sow-gallery-grid').each(function(i, el) {
              var $el = $(el)
                , $grid = $el.find('.jackrose-sow-gallery-grid-items')
                , $filter = $el.find('.jackrose-sow-gallery-grid-filters');
              $grid.imagesLoaded(function() {
                  $grid.isotope({
                      itemSelector: '.jackrose-sow-gallery-grid-item',
                      transitionDuration: '1s',
                  });
              });
              $filter.on('click', 'a', function(e) {
                  e.preventDefault();
                  var $el = $(this);
                  $el.siblings().removeClass('active');
                  $el.addClass('active');
                  $grid.isotope({
                      filter: $el.attr('data-filter')
                  });
              });
          });
      }
      if ($('.jackrose-sow-google-maps').length > 0) {
          var resizeGoogleMaps = function() {
              $('[id*="gmaps-"]').css('max-height', 0.8 * ($window.height() - $('.header-section').innerHeight() - $body.offset().top));
          }
          $window.on('resize', function() {
              resizeGoogleMaps();
          });
          resizeGoogleMaps();
      }
      if ($.fn.flickity) {
          $window.on('pageStart', function() {
              $('.hero-slider').each(function() {
                  var $el = $(this)
                    , autoplay = parseInt($el.attr('data-jackrose-autoplay'));
                  $el.flickity({
                      setGallerySize: false,
                      draggable: false,
                      wrapAround: true,
                      autoPlay: (autoplay > 0 && $el.children().length > 1) ? autoplay : false,
                      pauseAutoPlayOnHover: false,
                      prevNextButtons: false,
                      pageDots: ($el.children().length > 1) ? true : false,
                      selectedAttraction: 0.2,
                      friction: 0.8,
                  }).on('cellSelect', function() {
                      var data = $(this).data('flickity')
                        , $cells = $el.find('.hero-slide');
                      $cells.each(function(i, cell) {
                          var $video = $(cell).find('video');
                          if ($video.length > 0) {
                              if (cell == data.selectedElement) {
                                  $video.get(0).play();
                              } else {
                                  $video.get(0).pause();
                              }
                          }
                      });
                  }).trigger('cellSelect');
              });
              $('.jackrose-sow-quote').each(function() {
                  var $el = $(this)
                    , autoplay = parseInt($el.attr('data-jackrose-autoplay'));
                  $el.flickity({
                      wrapAround: true,
                      autoPlay: (autoplay > 0 && $el.children().length > 1) ? autoplay : false,
                      pauseAutoPlayOnHover: false,
                      prevNextButtons: false,
                      pageDots: ($el.children().length > 1) ? true : false,
                      selectedAttraction: 0.2,
                      friction: 0.8,
                  });
              });
          });
      }
      if ($.fn.sakura && $('#hero-effect').length > 0 && !isMobile.any()) {
          $window.on('pageStart', function() {
              var $el = $('#hero-effect')
                , effect = $el.attr('data-jackrose-effect');
              $el.sakura('start', {
                  className: 'sakura hero-effect-item ' + effect,
                  maxSize: (effect == 'snow') ? 7 : 14,
                  minSize: (effect == 'snow') ? 4 : 9,
                  newOn: (effect == 'snow') ? 200 : 300,
              });
          });
      }
      if ($.fn.stellar) {
          $window.stellar('destroy');
          if (!isMobile.any()) {
              $window.stellar({
                  verticalOffset: function() {
                      return $body.offset().top
                  },
                  positionProperty: 'transform',
                  responsive: true,
                  hideDistantElements: false,
                  horizontalScrolling: false,
              });
          } else {
              $.stellar = function() {
                  return;
              }
              ;
          }
      }
      if ($('#preloader').length > 0) {
          Pace.on('done', function() {
              $('#preloader').addClass('jackrose-preloader-done');
              $window.trigger('pageStart');
          });
      } else {
          $window.trigger('pageStart');
      }
      $window.trigger('scroll');
  });
}

(function($) {
  "use strict";
  if (typeof wpcf7 === "undefined" || wpcf7 === null) {
    return;
  }
  wpcf7 = $.extend({ cached: 0, inputs: [] }, wpcf7);
  $(function() {
    wpcf7.supportHtml5 = (function() {
      var features = {};
      var input = document.createElement("input");
      features.placeholder = "placeholder" in input;
      var inputTypes = ["email", "url", "tel", "number", "range", "date"];
      $.each(inputTypes, function(index, value) {
        input.setAttribute("type", value);
        features[value] = input.type !== "text";
      });
      return features;
    })();
    $("div.wpcf7 > form").each(function() {
      var $form = $(this);
      wpcf7.initForm($form);
      if (wpcf7.cached) {
        wpcf7.refill($form);
      }
    });
  });
  wpcf7.getId = function(form) {
    return parseInt($('input[name="_wpcf7"]', form).val(), 10);
  };
  wpcf7.initForm = function(form) {
    var $form = $(form);
    $form.submit(function(event) {
      if (typeof window.FormData !== "function") {
        return;
      }
      wpcf7.submit($form);
      event.preventDefault();
    });
    $(".wpcf7-submit", $form).after('<span class="ajax-loader"></span>');
    wpcf7.toggleSubmit($form);
    $form.on("click", ".wpcf7-acceptance", function() {
      wpcf7.toggleSubmit($form);
    });
    $(".wpcf7-exclusive-checkbox", $form).on(
      "click",
      "input:checkbox",
      function() {
        var name = $(this).attr("name");
        $form
          .find('input:checkbox[name="' + name + '"]')
          .not(this)
          .prop("checked", false);
      }
    );
    $(".wpcf7-list-item.has-free-text", $form).each(function() {
      var $freetext = $(":input.wpcf7-free-text", this);
      var $wrap = $(this).closest(".wpcf7-form-control");
      if ($(":checkbox, :radio", this).is(":checked")) {
        $freetext.prop("disabled", false);
      } else {
        $freetext.prop("disabled", true);
      }
      $wrap.on("change", ":checkbox, :radio", function() {
        var $cb = $(".has-free-text", $wrap).find(":checkbox, :radio");
        if ($cb.is(":checked")) {
          $freetext.prop("disabled", false).focus();
        } else {
          $freetext.prop("disabled", true);
        }
      });
    });
    if (!wpcf7.supportHtml5.placeholder) {
      $("[placeholder]", $form).each(function() {
        $(this).val($(this).attr("placeholder"));
        $(this).addClass("placeheld");
        $(this).focus(function() {
          if ($(this).hasClass("placeheld")) {
            $(this)
              .val("")
              .removeClass("placeheld");
          }
        });
        $(this).blur(function() {
          if ("" === $(this).val()) {
            $(this).val($(this).attr("placeholder"));
            $(this).addClass("placeheld");
          }
        });
      });
    }
    if (wpcf7.jqueryUi && !wpcf7.supportHtml5.date) {
      $form.find('input.wpcf7-date[type="date"]').each(function() {
        $(this).datepicker({
          dateFormat: "yy-mm-dd",
          minDate: new Date($(this).attr("min")),
          maxDate: new Date($(this).attr("max"))
        });
      });
    }
    if (wpcf7.jqueryUi && !wpcf7.supportHtml5.number) {
      $form.find('input.wpcf7-number[type="number"]').each(function() {
        $(this).spinner({
          min: $(this).attr("min"),
          max: $(this).attr("max"),
          step: $(this).attr("step")
        });
      });
    }
    $(".wpcf7-character-count", $form).each(function() {
      var $count = $(this);
      var name = $count.attr("data-target-name");
      var down = $count.hasClass("down");
      var starting = parseInt($count.attr("data-starting-value"), 10);
      var maximum = parseInt($count.attr("data-maximum-value"), 10);
      var minimum = parseInt($count.attr("data-minimum-value"), 10);
      var updateCount = function(target) {
        var $target = $(target);
        var length = $target.val().length;
        var count = down ? starting - length : length;
        $count.attr("data-current-value", count);
        $count.text(count);
        if (maximum && maximum < length) {
          $count.addClass("too-long");
        } else {
          $count.removeClass("too-long");
        }
        if (minimum && length < minimum) {
          $count.addClass("too-short");
        } else {
          $count.removeClass("too-short");
        }
      };
      $(':input[name="' + name + '"]', $form).each(function() {
        updateCount(this);
        $(this).keyup(function() {
          updateCount(this);
        });
      });
    });
    $form.on("change", ".wpcf7-validates-as-url", function() {
      var val = $.trim($(this).val());
      if (
        val &&
        !val.match(/^[a-z][a-z0-9.+-]*:/i) &&
        -1 !== val.indexOf(".")
      ) {
        val = val.replace(/^\/+/, "");
        val = "http://" + val;
      }
      $(this).val(val);
    });
  };
  wpcf7.submit = function(form) {
    if (typeof window.FormData !== "function") {
      return;
    }
    var $form = $(form);
    $(".ajax-loader", $form).addClass("is-active");
    $("[placeholder].placeheld", $form).each(function(i, n) {
      $(n).val("");
    });
    wpcf7.clearResponse($form);
    var formData = new FormData($form.get(0));
    var detail = {
      id: $form.closest("div.wpcf7").attr("id"),
      status: "init",
      inputs: [],
      formData: formData
    };
    $.each($form.serializeArray(), function(i, field) {
      if ("_wpcf7" == field.name) {
        detail.contactFormId = field.value;
      } else if ("_wpcf7_version" == field.name) {
        detail.pluginVersion = field.value;
      } else if ("_wpcf7_locale" == field.name) {
        detail.contactFormLocale = field.value;
      } else if ("_wpcf7_unit_tag" == field.name) {
        detail.unitTag = field.value;
      } else if ("_wpcf7_container_post" == field.name) {
        detail.containerPostId = field.value;
      } else if (field.name.match(/^_wpcf7_\w+_free_text_/)) {
        var owner = field.name.replace(/^_wpcf7_\w+_free_text_/, "");
        detail.inputs.push({ name: owner + "-free-text", value: field.value });
      } else if (field.name.match(/^_/)) {
      } else {
        detail.inputs.push(field);
      }
    });
    wpcf7.triggerEvent($form.closest("div.wpcf7"), "beforesubmit", detail);
    var ajaxSuccess = function(data, status, xhr, $form) {
      detail.id = $(data.into).attr("id");
      detail.status = data.status;
      detail.apiResponse = data;
      var $message = $(".wpcf7-response-output", $form);
      switch (data.status) {
        case "validation_failed":
          $.each(data.invalidFields, function(i, n) {
            $(n.into, $form).each(function() {
              wpcf7.notValidTip(this, n.message);
              $(".wpcf7-form-control", this).addClass("wpcf7-not-valid");
              $("[aria-invalid]", this).attr("aria-invalid", "true");
            });
          });
          $message.addClass("wpcf7-validation-errors");
          $form.addClass("invalid");
          wpcf7.triggerEvent(data.into, "invalid", detail);
          break;
        case "acceptance_missing":
          $message.addClass("wpcf7-acceptance-missing");
          $form.addClass("unaccepted");
          wpcf7.triggerEvent(data.into, "unaccepted", detail);
          break;
        case "spam":
          $message.addClass("wpcf7-spam-blocked");
          $form.addClass("spam");
          $('[name="g-recaptcha-response"]', $form).each(function() {
            if ("" === $(this).val()) {
              var $recaptcha = $(this).closest(".wpcf7-form-control-wrap");
              wpcf7.notValidTip($recaptcha, wpcf7.recaptcha.messages.empty);
            }
          });
          wpcf7.triggerEvent(data.into, "spam", detail);
          break;
        case "aborted":
          $message.addClass("wpcf7-aborted");
          $form.addClass("aborted");
          wpcf7.triggerEvent(data.into, "aborted", detail);
          break;
        case "mail_sent":
          $message.addClass("wpcf7-mail-sent-ok");
          $form.addClass("sent");
          wpcf7.triggerEvent(data.into, "mailsent", detail);
          break;
        case "mail_failed":
          $message.addClass("wpcf7-mail-sent-ng");
          $form.addClass("failed");
          wpcf7.triggerEvent(data.into, "mailfailed", detail);
          break;
        default:
          var customStatusClass =
            "custom-" + data.status.replace(/[^0-9a-z]+/i, "-");
          $message.addClass("wpcf7-" + customStatusClass);
          $form.addClass(customStatusClass);
      }
      wpcf7.refill($form, data);
      wpcf7.triggerEvent(data.into, "submit", detail);
      if ("mail_sent" == data.status) {
        $form.each(function() {
          this.reset();
        });
      }
      $form.find("[placeholder].placeheld").each(function(i, n) {
        $(n).val($(n).attr("placeholder"));
      });
      $message
        .html("")
        .append(data.message)
        .slideDown("fast");
      $message.attr("role", "alert");
      $(".screen-reader-response", $form.closest(".wpcf7")).each(function() {
        var $response = $(this);
        $response
          .html("")
          .attr("role", "")
          .append(data.message);
        if (data.invalidFields) {
          var $invalids = $("<ul></ul>");
          $.each(data.invalidFields, function(i, n) {
            if (n.idref) {
              var $li = $("<li></li>").append(
                $("<a></a>")
                  .attr("href", "#" + n.idref)
                  .append(n.message)
              );
            } else {
              var $li = $("<li></li>").append(n.message);
            }
            $invalids.append($li);
          });
          $response.append($invalids);
        }
        $response.attr("role", "alert").focus();
      });
    };
    $.ajax({
      type: "POST",
      url: wpcf7.apiSettings.getRoute(
        "/contact-forms/" + wpcf7.getId($form) + "/feedback"
      ),
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
      .done(function(data, status, xhr) {
        ajaxSuccess(data, status, xhr, $form);
        $(".ajax-loader", $form).removeClass("is-active");
      })
      .fail(function(xhr, status, error) {
        var $e = $('<div class="ajax-error"></div>').text(error.message);
        $form.after($e);
      });
  };
  wpcf7.triggerEvent = function(target, name, detail) {
    var $target = $(target);
    var event = new CustomEvent("wpcf7" + name, {
      bubbles: true,
      detail: detail
    });
    $target.get(0).dispatchEvent(event);
    $target.trigger("wpcf7:" + name, detail);
    $target.trigger(name + ".wpcf7", detail);
  };
  wpcf7.toggleSubmit = function(form, state) {
    var $form = $(form);
    var $submit = $("input:submit", $form);
    if (typeof state !== "undefined") {
      $submit.prop("disabled", !state);
      return;
    }
    if ($form.hasClass("wpcf7-acceptance-as-validation")) {
      return;
    }
    $submit.prop("disabled", false);
    $(".wpcf7-acceptance", $form).each(function() {
      var $span = $(this);
      var $input = $("input:checkbox", $span);
      if (!$span.hasClass("optional")) {
        if (
          ($span.hasClass("invert") && $input.is(":checked")) ||
          (!$span.hasClass("invert") && !$input.is(":checked"))
        ) {
          $submit.prop("disabled", true);
          return false;
        }
      }
    });
  };
  wpcf7.notValidTip = function(target, message) {
    var $target = $(target);
    $(".wpcf7-not-valid-tip", $target).remove();
    $('<span role="alert" class="wpcf7-not-valid-tip"></span>')
      .text(message)
      .appendTo($target);
    if ($target.is(".use-floating-validation-tip *")) {
      var fadeOut = function(target) {
        $(target)
          .not(":hidden")
          .animate({ opacity: 0 }, "fast", function() {
            $(this).css({ "z-index": -100 });
          });
      };
      $target.on("mouseover", ".wpcf7-not-valid-tip", function() {
        fadeOut(this);
      });
      $target.on("focus", ":input", function() {
        fadeOut($(".wpcf7-not-valid-tip", $target));
      });
    }
  };
  wpcf7.refill = function(form, data) {
    var $form = $(form);
    var refillCaptcha = function($form, items) {
      $.each(items, function(i, n) {
        $form.find(':input[name="' + i + '"]').val("");
        $form.find("img.wpcf7-captcha-" + i).attr("src", n);
        var match = /([0-9]+)\.(png|gif|jpeg)$/.exec(n);
        $form
          .find('input:hidden[name="_wpcf7_captcha_challenge_' + i + '"]')
          .attr("value", match[1]);
      });
    };
    var refillQuiz = function($form, items) {
      $.each(items, function(i, n) {
        $form.find(':input[name="' + i + '"]').val("");
        $form
          .find(':input[name="' + i + '"]')
          .siblings("span.wpcf7-quiz-label")
          .text(n[0]);
        $form
          .find('input:hidden[name="_wpcf7_quiz_answer_' + i + '"]')
          .attr("value", n[1]);
      });
    };
    if (typeof data === "undefined") {
      $.ajax({
        type: "GET",
        url: wpcf7.apiSettings.getRoute(
          "/contact-forms/" + wpcf7.getId($form) + "/refill"
        ),
        beforeSend: function(xhr) {
          var nonce = $form.find(':input[name="_wpnonce"]').val();
          if (nonce) {
            xhr.setRequestHeader("X-WP-Nonce", nonce);
          }
        },
        dataType: "json"
      }).done(function(data, status, xhr) {
        if (data.captcha) {
          refillCaptcha($form, data.captcha);
        }
        if (data.quiz) {
          refillQuiz($form, data.quiz);
        }
      });
    } else {
      if (data.captcha) {
        refillCaptcha($form, data.captcha);
      }
      if (data.quiz) {
        refillQuiz($form, data.quiz);
      }
    }
  };
  wpcf7.clearResponse = function(form) {
    var $form = $(form);
    $form.removeClass("invalid spam sent failed");
    $form
      .siblings(".screen-reader-response")
      .html("")
      .attr("role", "");
    $(".wpcf7-not-valid-tip", $form).remove();
    $("[aria-invalid]", $form).attr("aria-invalid", "false");
    $(".wpcf7-form-control", $form).removeClass("wpcf7-not-valid");
    $(".wpcf7-response-output", $form)
      .hide()
      .empty()
      .removeAttr("role")
      .removeClass(
        "wpcf7-mail-sent-ok wpcf7-mail-sent-ng wpcf7-validation-errors wpcf7-spam-blocked"
      );
  };
  wpcf7.apiSettings.getRoute = function(path) {
    var url = wpcf7.apiSettings.root;
    url = url.replace(
      wpcf7.apiSettings.namespace,
      wpcf7.apiSettings.namespace + path
    );
    return url;
  };
})(jQuery);
(function() {
  if (typeof window.CustomEvent === "function") return false;
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

var googleMaps = {};
var initGoogleMaps = function() {
  window.addEventListener("load", function() {
    var elements = document.getElementsByClassName("jackrose-sow-google-maps");
    for (var i = 0; i < elements.length; i++) {
      var id = elements[i].getAttribute("data-jackrose-target"),
        args = JSON.parse(elements[i].getAttribute("data-jackrose-arguments"));
      googleMaps[id] = {};
      googleMaps[id]["map"] = new google.maps.Map(
        document.getElementById(id),
        args.options
      );
      googleMaps[id]["markers"] = {};
      for (var j = 0; j < args.locations.length; j++) {
        var location = args.locations[j];
        googleMaps[id]["markers"][j] = new google.maps.Marker({
          position: location["position"],
          map: googleMaps[id]["map"],
          icon: location["icon"],
          animation: location["animation"]
        });
        if (location["info_window"].length > 0) {
          googleMaps[id]["markers"][j][
            "infoWindow"
          ] = new google.maps.InfoWindow({
            content: location["info_window"],
            maxWidth: location["info_window_max_width"]
          });
          googleMaps[id]["markers"][j].addListener("click", function() {
            this.infoWindow.open(this.map, this);
          });
        }
      }
    }
  });
};
if (window.google && window.google.maps) {
  window.initGoogleMaps();
} else {
  var elements = document.getElementsByClassName("jackrose-sow-google-maps");
  var apiKey = elements[0].getAttribute("data-jackrose-api-key");
  var apiUrl =
    "https://maps.googleapis.com/maps/api/js?callback=initGoogleMaps";
  if (apiKey) {
    apiUrl += "&key=" + apiKey;
  }
  var script = document.createElement("script");
  script.setAttribute("async", true);
  script.setAttribute("defer", true);
  script.setAttribute("src", apiUrl);
  script.setAttribute("type", "text/javascript");
  document.body.appendChild(script);
}

jQuery(function(t) {
  var e = t(panelsStyles.fullContainer);
  0 === e.length && (e = t("body"));
  var r = function() {
    t(".siteorigin-panels-stretch.panel-row-style").each(function() {
      var r = t(this);
      r.css({
        "margin-left": 0,
        "margin-right": 0,
        "padding-left": 0,
        "padding-right": 0
      });
      var i = r.offset().left - e.offset().left,
        n = e.outerWidth() - i - r.parent().outerWidth();
      r.css({
        "margin-left": -i,
        "margin-right": -n,
        "padding-left": "full" === r.data("stretch-type") ? i : 0,
        "padding-right": "full" === r.data("stretch-type") ? n : 0
      });
      var a = r.find("> .panel-grid-cell");
      "full-stretched" === r.data("stretch-type") &&
        1 === a.length &&
        a.css({ "padding-left": 0, "padding-right": 0 }),
        r.css({ "border-left": 0, "border-right": 0 });
    }),
      t(".siteorigin-panels-stretch.panel-row-style").length &&
        t(window).trigger("panelsStretchRows");
  };
  t(window).on("resize load", r),
    r(),
    t("body").removeClass("siteorigin-panels-before-js");
});
