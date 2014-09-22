(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lib/coffee/app.coffee":[function(require,module,exports){
var Debounce, Dropdown, KS, Modal, Nav, Status, Throttler;

KS = require('./ks');

Modal = require('./modal');

Nav = require('./nav');

Debounce = require('./debouncer');

Status = require('./status');

Throttler = require('./throttler');

Dropdown = require('./dropdown');

k$.dropdown();



},{"./debouncer":"/Users/adamkochanowicz/Sites/kickstart/lib/coffee/debouncer.coffee","./dropdown":"/Users/adamkochanowicz/Sites/kickstart/lib/coffee/dropdown.coffee","./ks":"/Users/adamkochanowicz/Sites/kickstart/lib/coffee/ks.coffee","./modal":"/Users/adamkochanowicz/Sites/kickstart/lib/coffee/modal.coffee","./nav":"/Users/adamkochanowicz/Sites/kickstart/lib/coffee/nav.coffee","./status":"/Users/adamkochanowicz/Sites/kickstart/lib/coffee/status.coffee","./throttler":"/Users/adamkochanowicz/Sites/kickstart/lib/coffee/throttler.coffee"}],"/Users/adamkochanowicz/Sites/kickstart/lib/coffee/debouncer.coffee":[function(require,module,exports){
var debounce;

debounce = function(fn, id, delay) {
  var $delay;
  $delay = delay || 1000;
  if (k$.debounceQueue === null) {
    k$.debounceQueue = id;
  }
  if (id === k$.debounceQueue) {
    clearTimeout(k$.debounceTimer);
  }
  return k$.debounceTimer = setTimeout(function() {
    fn();
    return k$.debounceQueue = null;
  }, $delay);
};

k$.debounce = debounce;

module.exports = debounce;



},{}],"/Users/adamkochanowicz/Sites/kickstart/lib/coffee/dropdown.coffee":[function(require,module,exports){
var dropdown;

dropdown = function() {
  var $button, _i, _len, _ref, _results;
  _ref = k$.$$("button");
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    $button = _ref[_i];
    if ($button.querySelectorAll('ul').length) {
      _results.push($button.classList.add('with-submenu'));
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};

k$.dropdown = dropdown;

module.exports = dropdown;



},{}],"/Users/adamkochanowicz/Sites/kickstart/lib/coffee/ks.coffee":[function(require,module,exports){
(function (global){
global.k$ = new Object();

k$.$$ = function(el) {
  return document.querySelectorAll(el);
};

k$.$ = function(el) {
  return k$.$$(el)[0];
};

k$.debounceTimer = false;

k$.debounceQueue = null;

k$.extend = function(destination, source) {
  var property;
  for (property in source) {
    if (source[property] && source[property].constructor && source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

module.exports = k$;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/adamkochanowicz/Sites/kickstart/lib/coffee/modal.coffee":[function(require,module,exports){
var modal;

modal = function(el) {
  (function(el) {
    document.body.addEventListener('click', function() {
      return k$.$(el).style.display = 'none';
    });
    return k$.$(el).addEventListener('click', function(e) {
      return e.stopPropagation();
    });
  })(el);
  return k$.$(el);
};

k$.modal = modal;

module.exports = modal;



},{}],"/Users/adamkochanowicz/Sites/kickstart/lib/coffee/nav.coffee":[function(require,module,exports){
var nav;

nav = function(el) {
  var $menuItem, $menuItems, e, _$menuItems, _fn, _i, _j, _len, _len1;
  try {
    $menuItems = k$.$(el).querySelectorAll('ul > li');
    _$menuItems = new Array();
    for (_i = 0, _len = $menuItems.length; _i < _len; _i++) {
      $menuItem = $menuItems[_i];
      if ($menuItem.querySelectorAll('ul').length) {
        _$menuItems.push($menuItem);
      }
    }
    $menuItems = _$menuItems;
    _fn = function($menuItem) {
      return $menuItem.addEventListener('click', function(e) {
        var $subMenu, $ul, _$menuItem, _k, _l, _len2, _len3, _ref, _ref1;
        e.stopPropagation();
        _ref = document.querySelectorAll('.with-submenu');
        for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
          _$menuItem = _ref[_k];
          _$menuItem.classList.remove('open');
        }
        $ul = $menuItem.querySelector('ul');
        _ref1 = document.querySelectorAll('.with-submenu ul');
        for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
          $subMenu = _ref1[_l];
          $subMenu.style.display = 'none';
        }
        if ($ul) {
          $menuItem.classList.add('open');
          return $ul.style.display = ($ul.style.display === 'block' ? 'none' : 'block');
        }
      });
    };
    for (_j = 0, _len1 = $menuItems.length; _j < _len1; _j++) {
      $menuItem = $menuItems[_j];
      $menuItem.classList.add('with-submenu');
      _fn($menuItem);
    }
    document.body.addEventListener('click', function() {
      var $li, $ul, _k, _l, _len2, _len3, _ref, _ref1, _results;
      _ref = k$.$(el).querySelectorAll('ul li ul');
      for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
        $ul = _ref[_k];
        $ul.style.display = 'none';
      }
      _ref1 = k$.$(el).querySelectorAll('ul li');
      _results = [];
      for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
        $li = _ref1[_l];
        _results.push($li.classList.remove('open'));
      }
      return _results;
    });
  } catch (_error) {
    e = _error;
    console.error("Could not instantiate as a nav.", e.message);
  }
  return k$.$(el);
};

k$.nav = nav;

module.exports = nav;



},{}],"/Users/adamkochanowicz/Sites/kickstart/lib/coffee/status.coffee":[function(require,module,exports){
var status;

status = function(opts) {
  var $status, $statusBar, defaults, hideStatusBar;
  defaults = {
    type: 'warn',
    delay: 2000
  };
  status = k$.extend(defaults, opts);
  if (!k$.$$('#status-bar').length) {
    $statusBar = document.createElement('div');
    $statusBar.id = 'status-bar';
    $statusBar.className = 'status-bar';
    $statusBar.innerHTML = "<div class='status-bar_status' id='status-bar_status'></div>";
    document.body.appendChild($statusBar);
  }
  $statusBar = k$.$('#status-bar');
  hideStatusBar = function() {
    return $statusBar.parentNode.removeChild($statusBar);
  };
  if (status.delay > 0) {
    k$.debounce(hideStatusBar, 'hideStatusBar', status.delay);
  }
  $status = k$.$("#status-bar_status");
  $status.innerHTML = status.text;
  return $status.dataset.type = status.type || 'warn';
};

k$.status = status;

module.exports = status;



},{}],"/Users/adamkochanowicz/Sites/kickstart/lib/coffee/throttler.coffee":[function(require,module,exports){
var throttle;

throttle = function(fn, id, delay) {};

k$.throttle = throttle;

module.exports = throttle;



},{}]},{},["./lib/coffee/app.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hZGFta29jaGFub3dpY3ovU2l0ZXMva2lja3N0YXJ0L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYWRhbWtvY2hhbm93aWN6L1NpdGVzL2tpY2tzdGFydC9saWIvY29mZmVlL2FwcC5jb2ZmZWUiLCIvVXNlcnMvYWRhbWtvY2hhbm93aWN6L1NpdGVzL2tpY2tzdGFydC9saWIvY29mZmVlL2RlYm91bmNlci5jb2ZmZWUiLCIvVXNlcnMvYWRhbWtvY2hhbm93aWN6L1NpdGVzL2tpY2tzdGFydC9saWIvY29mZmVlL2Ryb3Bkb3duLmNvZmZlZSIsIi9Vc2Vycy9hZGFta29jaGFub3dpY3ovU2l0ZXMva2lja3N0YXJ0L2xpYi9jb2ZmZWUva3MuY29mZmVlIiwiL1VzZXJzL2FkYW1rb2NoYW5vd2ljei9TaXRlcy9raWNrc3RhcnQvbGliL2NvZmZlZS9tb2RhbC5jb2ZmZWUiLCIvVXNlcnMvYWRhbWtvY2hhbm93aWN6L1NpdGVzL2tpY2tzdGFydC9saWIvY29mZmVlL25hdi5jb2ZmZWUiLCIvVXNlcnMvYWRhbWtvY2hhbm93aWN6L1NpdGVzL2tpY2tzdGFydC9saWIvY29mZmVlL3N0YXR1cy5jb2ZmZWUiLCIvVXNlcnMvYWRhbWtvY2hhbm93aWN6L1NpdGVzL2tpY2tzdGFydC9saWIvY29mZmVlL3Rocm90dGxlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLHFEQUFBOztBQUFBLEVBQUEsR0FBWSxPQUFBLENBQVEsTUFBUixDQUFaLENBQUE7O0FBQUEsS0FDQSxHQUFZLE9BQUEsQ0FBUSxTQUFSLENBRFosQ0FBQTs7QUFBQSxHQUVBLEdBQVksT0FBQSxDQUFRLE9BQVIsQ0FGWixDQUFBOztBQUFBLFFBR0EsR0FBWSxPQUFBLENBQVEsYUFBUixDQUhaLENBQUE7O0FBQUEsTUFJQSxHQUFZLE9BQUEsQ0FBUSxVQUFSLENBSlosQ0FB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YSxFQUFFLENBQUMsQ0FBSCxDQUFLLGFBQUwsQ0FiYixDQUFBO0FBQUEsRUFlQSxhQUFBLEdBQWdCLFNBQUEsR0FBQTtXQUNkLFVBQVUsQ0FBQyxVQUFVLENBQUMsV0FBdEIsQ0FBa0MsVUFBbEMsRUFEYztFQUFBLENBZmhCLENBQUE7QUFrQkEsRUFBQSxJQUFHLE1BQU0sQ0FBQyxLQUFQLEdBQWUsQ0FBbEI7QUFDRSxJQUFBLEVBQUUsQ0FBQyxRQUFILENBQVksYUFBWixFQUEyQixlQUEzQixFQUE0QyxNQUFNLENBQUMsS0FBbkQsQ0FBQSxDQURGO0dBbEJBO0FBQUEsRUFxQkEsT0FBQSxHQUFVLEVBQUUsQ0FBQyxDQUFILENBQUssb0JBQUwsQ0FyQlYsQ0FBQTtBQUFBLEVBc0JBLE9BQU8sQ0FBQyxTQUFSLEdBQW9CLE1BQU0sQ0FBQyxJQXRCM0IsQ0FBQTtTQXVCQSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQWhCLEdBQXVCLE1BQU0sQ0FBQyxJQUFQLElBQWUsT0F6Qi9CO0FBQUEsQ0FBVCxDQUFBOztBQUFBLEVBMkJFLENBQUMsTUFBSCxHQUFZLE1BM0JaLENBQUE7O0FBQUEsTUE2Qk0sQ0FBQyxPQUFQLEdBQWlCLE1BN0JqQixDQUFBOzs7OztBQ0FBLElBQUEsUUFBQTs7QUFBQSxRQUFBLEdBQVcsU0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEtBQVQsR0FBQSxDQUFYLENBQUE7O0FBQUEsRUFHRSxDQUFDLFFBQUgsR0FBYyxRQUhkLENBQUE7O0FBQUEsTUFLTSxDQUFDLE9BQVAsR0FBaUIsUUFMakIsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJLUyAgICAgICAgPSByZXF1aXJlICcuL2tzJ1xuTW9kYWwgICAgID0gcmVxdWlyZSAnLi9tb2RhbCdcbk5hdiAgICAgICA9IHJlcXVpcmUgJy4vbmF2J1xuRGVib3VuY2UgID0gcmVxdWlyZSAnLi9kZWJvdW5jZXInXG5TdGF0dXMgICAgPSByZXF1aXJlICcuL3N0YXR1cydcblRocm90dGxlciA9IHJlcXVpcmUgJy4vdGhyb3R0bGVyJ1xuRHJvcGRvd24gID0gcmVxdWlyZSAnLi9kcm9wZG93bidcblxuayQuZHJvcGRvd24oKVxuIiwiZGVib3VuY2UgPSAoZm4sIGlkLCBkZWxheSkgLT5cblxuICAkZGVsYXkgPSBkZWxheSB8fCAxMDAwXG5cbiAgayQuZGVib3VuY2VRdWV1ZSA9IGlkIGlmIGskLmRlYm91bmNlUXVldWUgPT0gbnVsbFxuICBjbGVhclRpbWVvdXQgayQuZGVib3VuY2VUaW1lciBpZiBpZCA9PSBrJC5kZWJvdW5jZVF1ZXVlXG4gIGskLmRlYm91bmNlVGltZXIgPSBzZXRUaW1lb3V0IC0+XG4gICAgZm4oKVxuICAgIGskLmRlYm91bmNlUXVldWUgPSBudWxsXG4gICwgJGRlbGF5XG5cbmskLmRlYm91bmNlID0gZGVib3VuY2VcblxubW9kdWxlLmV4cG9ydHMgPSBkZWJvdW5jZVxuIiwiZHJvcGRvd24gPSAtPlxuXG4gIGZvciAkYnV0dG9uIGluIGskLiQkKFwiYnV0dG9uXCIpXG4gICAgaWYgJGJ1dHRvbi5xdWVyeVNlbGVjdG9yQWxsKCd1bCcpLmxlbmd0aFxuICAgICAgJGJ1dHRvbi5jbGFzc0xpc3QuYWRkICd3aXRoLXN1Ym1lbnUnXG5cbmskLmRyb3Bkb3duID0gZHJvcGRvd25cblxubW9kdWxlLmV4cG9ydHMgPSBkcm9wZG93blxuIiwiZ2xvYmFsLmskID0gbmV3IE9iamVjdCgpXG5cbmskLiQkID0gKGVsKSAtPiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsIGVsXG5rJC4kID0gKGVsKSAtPiBrJC4kJChlbClbMF1cbmskLmRlYm91bmNlVGltZXIgPSBmYWxzZVxuayQuZGVib3VuY2VRdWV1ZSA9IG51bGxcbmskLmV4dGVuZCA9IChkZXN0aW5hdGlvbiwgc291cmNlKSAtPlxuICBmb3IgcHJvcGVydHkgb2Ygc291cmNlXG4gICAgaWYgc291cmNlW3Byb3BlcnR5XSBhbmQgc291cmNlW3Byb3BlcnR5XS5jb25zdHJ1Y3RvciBhbmQgc291cmNlW3Byb3BlcnR5XS5jb25zdHJ1Y3RvciBpcyBPYmplY3RcbiAgICAgIGRlc3RpbmF0aW9uW3Byb3BlcnR5XSA9IGRlc3RpbmF0aW9uW3Byb3BlcnR5XSBvciB7fVxuICAgICAgYXJndW1lbnRzLmNhbGxlZSBkZXN0aW5hdGlvbltwcm9wZXJ0eV0sIHNvdXJjZVtwcm9wZXJ0eV1cbiAgICBlbHNlXG4gICAgICBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gPSBzb3VyY2VbcHJvcGVydHldXG4gIGRlc3RpbmF0aW9uXG5cbm1vZHVsZS5leHBvcnRzID0gayRcbiIsIm1vZGFsID0gKGVsKSAtPlxuXG4gIGRvIChlbCkgLT5cblxuICAgICMgQWxsb3cgbW9kYWwgdG8gZGlzbWlzcyB3aGVuIGNsaWNrZWQgb3V0c2lkZVxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAtPlxuICAgICAgayQuJChlbCkuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuXG4gICAgayQuJChlbCkuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAoZSkgLT5cbiAgICAgIHJldHVybiBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgayQuJCBlbFxuXG5rJC5tb2RhbCA9IG1vZGFsXG5cbm1vZHVsZS5leHBvcnRzID0gbW9kYWxcbiIsIm5hdiA9IChlbCkgLT5cblxuICB0cnlcbiAgICAkbWVudUl0ZW1zID0gayQuJChlbCkucXVlcnlTZWxlY3RvckFsbCgndWwgPiBsaScpXG4gICAgIyBQcnVuZSBpdGVtcyB0aGF0IGRvbid0IGNvbnRhaW4gdWxzXG4gICAgXyRtZW51SXRlbXMgPSBuZXcgQXJyYXkoKVxuICAgIGZvciAkbWVudUl0ZW0gaW4gJG1lbnVJdGVtc1xuICAgICAgXyRtZW51SXRlbXMucHVzaCAkbWVudUl0ZW0gaWYgJG1lbnVJdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsJykubGVuZ3RoXG5cbiAgICAkbWVudUl0ZW1zID0gXyRtZW51SXRlbXNcbiAgICBmb3IgJG1lbnVJdGVtIGluICRtZW51SXRlbXNcbiAgICAgICMgRm9yIHN0eWxpbmdcbiAgICAgICRtZW51SXRlbS5jbGFzc0xpc3QuYWRkICd3aXRoLXN1Ym1lbnUnXG5cbiAgICAgIGRvICgkbWVudUl0ZW0pIC0+XG4gICAgICAgICMgVE9ETzogSXMgdGhlcmUgYSB3YXkgd2UgY291bGQgbm90IGhhdmUgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIGV2ZXJ5XG4gICAgICAgICMgc2luZ2xlIG9uZT9cbiAgICAgICAgJG1lbnVJdGVtLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgKGUpIC0+XG5cbiAgICAgICAgICAjIFByZXZlbnQgYnViYmxpbmdcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgICAgICAjIFJlc2V0IGFsbFxuICAgICAgICAgIF8kbWVudUl0ZW0uY2xhc3NMaXN0LnJlbW92ZSAnb3BlbicgZm9yIF8kbWVudUl0ZW0gaW4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndpdGgtc3VibWVudScpXG4gICAgICAgICAgJHVsID0gJG1lbnVJdGVtLnF1ZXJ5U2VsZWN0b3IgJ3VsJ1xuICAgICAgICAgICRzdWJNZW51LnN0eWxlLmRpc3BsYXkgPSAnbm9uZScgZm9yICRzdWJNZW51IGluIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53aXRoLXN1Ym1lbnUgdWwnKVxuXG4gICAgICAgICAgIyBPcGVuIHRoaXMgb25lXG4gICAgICAgICAgaWYgJHVsXG4gICAgICAgICAgICAkbWVudUl0ZW0uY2xhc3NMaXN0LmFkZCAnb3BlbidcbiAgICAgICAgICAgICR1bC5zdHlsZS5kaXNwbGF5ID0gKGlmICR1bC5zdHlsZS5kaXNwbGF5ID09ICdibG9jaycgdGhlbiAnbm9uZScgZWxzZSAnYmxvY2snKVxuXG4gICAgIyBEaXNtaXNzIGFsbFxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAtPlxuICAgICAgJHVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScgZm9yICR1bCBpbiBrJC4kKGVsKS5xdWVyeVNlbGVjdG9yQWxsKCd1bCBsaSB1bCcpXG4gICAgICAkbGkuY2xhc3NMaXN0LnJlbW92ZSAnb3BlbicgZm9yICRsaSBpbiBrJC4kKGVsKS5xdWVyeVNlbGVjdG9yQWxsKCd1bCBsaScpXG5cbiAgY2F0Y2ggZVxuICAgIGNvbnNvbGUuZXJyb3IgXCJDb3VsZCBub3QgaW5zdGFudGlhdGUgYXMgYSBuYXYuXCIsIGUubWVzc2FnZVxuXG4gIGskLiQgZWxcblxuayQubmF2ID0gbmF2XG5cbm1vZHVsZS5leHBvcnRzID0gbmF2XG4iLCJzdGF0dXMgPSAob3B0cykgLT5cblxuICBkZWZhdWx0cyA9XG4gICAgdHlwZTogJ3dhcm4nXG4gICAgZGVsYXk6IDIwMDBcblxuICBzdGF0dXMgPSBrJC5leHRlbmQgZGVmYXVsdHMsIG9wdHNcblxuICBpZiBub3QgayQuJCQoJyNzdGF0dXMtYmFyJykubGVuZ3RoXG4gICAgJHN0YXR1c0JhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgJHN0YXR1c0Jhci5pZCA9ICdzdGF0dXMtYmFyJ1xuICAgICRzdGF0dXNCYXIuY2xhc3NOYW1lID0gJ3N0YXR1cy1iYXInXG4gICAgJHN0YXR1c0Jhci5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9J3N0YXR1cy1iYXJfc3RhdHVzJyBpZD0nc3RhdHVzLWJhcl9zdGF0dXMnPjwvZGl2PlwiXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkc3RhdHVzQmFyKVxuXG4gICRzdGF0dXNCYXIgPSBrJC4kKCcjc3RhdHVzLWJhcicpXG5cbiAgaGlkZVN0YXR1c0JhciA9IC0+XG4gICAgJHN0YXR1c0Jhci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkICRzdGF0dXNCYXJcblxuICBpZiBzdGF0dXMuZGVsYXkgPiAwXG4gICAgayQuZGVib3VuY2UgaGlkZVN0YXR1c0JhciwgJ2hpZGVTdGF0dXNCYXInLCBzdGF0dXMuZGVsYXlcblxuICAkc3RhdHVzID0gayQuJChcIiNzdGF0dXMtYmFyX3N0YXR1c1wiKVxuICAkc3RhdHVzLmlubmVySFRNTCA9IHN0YXR1cy50ZXh0XG4gICRzdGF0dXMuZGF0YXNldC50eXBlID0gc3RhdHVzLnR5cGUgfHwgJ3dhcm4nXG5cbmskLnN0YXR1cyA9IHN0YXR1c1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXR1c1xuIiwidGhyb3R0bGUgPSAoZm4sIGlkLCBkZWxheSkgLT5cblxuXG5rJC50aHJvdHRsZSA9IHRocm90dGxlXG5cbm1vZHVsZS5leHBvcnRzID0gdGhyb3R0bGVcbiJdfQ==
