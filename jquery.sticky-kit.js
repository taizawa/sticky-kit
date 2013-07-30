// Generated by CoffeeScript 1.4.0
(function() {
  var $, win;

  $ = this.jQuery || this.Zepto;

  win = $(window);

  $.fn.stick_in_parent = function(parent_selector) {
    var elm, sticky_class, _fn, _i, _len;
    sticky_class = "is_stuck";
    _fn = function(elm) {
      var border_top, bottomed, fixed, float, height, last_pos, offset, padding_bottom, padding_top, parent, parent_height, parent_top, spacer,
        _this = this;
      parent = elm.parent(parent_selector);
      border_top = parseInt(parent.css("border-top-width"), 10);
      padding_top = parseInt(parent.css("padding-top"), 10);
      padding_bottom = parseInt(parent.css("padding-bottom"));
      parent_top = parent.offset().top + border_top + padding_top;
      parent_height = parent.height();
      height = elm.outerHeight(true);
      if (height === parent_height) {
        return;
      }
      float = elm.css("float");
      spacer = $("<div />").css({
        width: elm.outerWidth(true),
        height: height,
        display: elm.css("display"),
        float: float
      });
      fixed = false;
      bottomed = false;
      last_pos = void 0;
      offset = 0;
      return win.on("scroll", function(e) {
        var before, css, delta, scroll, will_bottom, win_height;
        scroll = win.scrollTop();
        if (last_pos != null) {
          delta = scroll - last_pos;
        }
        last_pos = scroll;
        if (fixed) {
          will_bottom = scroll + height + offset > parent_height + parent_top;
          if (bottomed && !will_bottom) {
            bottomed = false;
            elm.css({
              position: "fixed",
              bottom: "",
              top: 0
            });
          }
          if (scroll < parent_top) {
            fixed = false;
            offset = 0;
            if (float === "left" || float === "right") {
              elm.insertAfter(spacer);
            }
            spacer.detach();
            elm.css({
              position: ""
            }).removeClass(sticky_class);
          }
          win_height = win.height();
          if (height > win_height) {
            if (!bottomed) {
              offset -= delta;
              before = offset;
              offset = Math.max(win_height - height, offset);
              offset = Math.min(0, offset);
              elm.css({
                top: offset + "px"
              });
            }
          }
        } else {
          if (scroll > parent_top) {
            fixed = true;
            css = {
              position: "fixed",
              top: offset
            };
            elm.css(css).addClass(sticky_class).after(spacer);
            if (float === "left" || float === "right") {
              spacer.append(elm);
            }
          }
        }
        if (fixed) {
          if (will_bottom == null) {
            will_bottom = scroll + height + offset > parent_height + parent_top;
          }
          if (!bottomed && will_bottom) {
            bottomed = true;
            if (parent.css("position") === "static") {
              parent.css({
                position: "relative"
              });
            }
            return elm.css({
              position: "absolute",
              bottom: padding_bottom,
              top: ""
            });
          }
        }
      });
    };
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      elm = this[_i];
      _fn($(elm));
    }
    return this;
  };

}).call(this);
