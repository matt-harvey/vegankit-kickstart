(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lib/coffee/app.coffee":[function(require,module,exports){
var Buffer, Buttons, Debounce, Dropdown, Growl, KS, Modal, Nav, Status, Throttler;

KS = require('./ks');

Modal = require('./modal');

Nav = require('./nav');

Debounce = require('./debouncer');

Status = require('./status');

Throttler = require('./throttler');

Buttons = require('./buttons');

Dropdown = require('./dropdown');

Buffer = require('./buffer');

Growl = require('./growl');

k$.button();

k$.dropdown();



},{"./buffer":"/Users/adamkochanowicz/sites/kickstart/lib/coffee/buffer.coffee","./buttons":"/Users/adamkochanowicz/sites/kickstart/lib/coffee/buttons.coffee","./debouncer":"/Users/adamkochanowicz/sites/kickstart/lib/coffee/debouncer.coffee","./dropdown":"/Users/adamkochanowicz/sites/kickstart/lib/coffee/dropdown.coffee","./growl":"/Users/adamkochanowicz/sites/kickstart/lib/coffee/growl.coffee","./ks":"/Users/adamkochanowicz/sites/kickstart/lib/coffee/ks.coffee","./modal":"/Users/adamkochanowicz/sites/kickstart/lib/coffee/modal.coffee","./nav":"/Users/adamkochanowicz/sites/kickstart/lib/coffee/nav.coffee","./status":"/Users/adamkochanowicz/sites/kickstart/lib/coffee/status.coffee","./throttler":"/Users/adamkochanowicz/sites/kickstart/lib/coffee/throttler.coffee"}],"/Users/adamkochanowicz/sites/kickstart/lib/coffee/buffer.coffee":[function(require,module,exports){
var buffer;

buffer = function(fn, delay) {
  var i;
  k$.bufferArray = k$.bufferArray || new Array();
  if (!k$.bufferArray.length) {
    k$.bufferArray = new Array();
    delay = delay || 500;
    i = 1;
    k$.bufferInterval = setInterval(function() {
      if (k$.bufferArray[i]) {
        k$.bufferArray[i]();
      }
      i++;
      console.log(i);
      if (i >= k$.bufferArray.length) {
        clearInterval(k$.bufferInterval);
        k$.bufferArray = void 0;
        return i = 1;
      }
    }, delay);
  }
  k$.bufferArray.push(fn);
  if (k$.bufferArray.length === 1) {
    k$.bufferArray[0]();
  }
  return console.info("Function queued (" + k$.bufferArray.length + " in queue)");
};

k$.buffer = buffer;

module.exports = buffer;



},{}],"/Users/adamkochanowicz/sites/kickstart/lib/coffee/buttons.coffee":[function(require,module,exports){
var button;

button = function() {
  var $button, $buttonDropdown, _i, _j, _len, _len1, _ref, _ref1, _results;
  _ref = k$.$$("button");
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    $button = _ref[_i];
    if ($button.querySelectorAll('ul').length) {
      $button.classList.add('with-submenu');
    }
  }
  _ref1 = k$.$$('.button-dropdown');
  _results = [];
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    $buttonDropdown = _ref1[_j];
    _results.push($buttonDropdown.parentNode.classList.add('with-submenu'));
  }
  return _results;
};

k$.button = button;

module.exports = button;



},{}],"/Users/adamkochanowicz/sites/kickstart/lib/coffee/debouncer.coffee":[function(require,module,exports){
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



},{}],"/Users/adamkochanowicz/sites/kickstart/lib/coffee/dropdown.coffee":[function(require,module,exports){
var dropdown;

dropdown = function() {
  var $_menuItem, $menuItem, $menuItems, _fn, _i, _len;
  $menuItems = k$.$$('.with-submenu');
  _fn = function($menuItem) {
    return $menuItem.addEventListener('click', function(e) {
      var $ul, _$menuItem, _j, _len1, _ref;
      if ($menuItem.classList.contains('open')) {
        $menuItem.classList.remove('open');
        return;
      }
      _ref = document.querySelectorAll('.with-submenu');
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        _$menuItem = _ref[_j];
        _$menuItem.classList.remove('open');
      }
      $ul = $menuItem.querySelector('ul');
      if ($ul) {
        $menuItem.classList.add('open');
      }
      return e.stopPropagation();
    });
  };
  for (_i = 0, _len = $menuItems.length; _i < _len; _i++) {
    $_menuItem = $menuItems[_i];
    $menuItem = $_menuItem.cloneNode(true);
    $_menuItem.parentNode.replaceChild($menuItem, $_menuItem);
    _fn($menuItem);
  }
  return document.body.addEventListener('click', function() {
    var $li, $ul, _j, _k, _len1, _len2, _ref, _ref1, _results;
    _ref = k$.$$('.with-submenu > ul');
    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
      $ul = _ref[_j];
      $ul.parentNode.classList.remove('open');
    }
    _ref1 = k$.$$('.with-submenu.open');
    _results = [];
    for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
      $li = _ref1[_k];
      _results.push($li.classList.remove('open'));
    }
    return _results;
  });
};

k$.dropdown = dropdown;

module.exports = dropdown;



},{}],"/Users/adamkochanowicz/sites/kickstart/lib/coffee/growl.coffee":[function(require,module,exports){
var growl;

growl = function(params) {
  return k$.buffer(function() {
    var className, content, defaults, delay, growlContainer, id;
    defaults = {
      title: void 0,
      text: void 0,
      delay: 2000,
      type: 'alert-warn',
      id: Date.now()
    };
    params = k$.extend(defaults, params);
    if (!k$.$$('.growl_container').length) {
      growlContainer = document.createElement('div');
      growlContainer.className = 'growl_container';
      document.body.appendChild(growlContainer);
    }
    growl = document.createElement('div');
    className = "alert growl " + params.type + " growl-" + params.id;
    growl.className = className;
    content = "";
    if (params.title) {
      content += "<h1>" + params.title + "</h1>";
    }
    if (params.text) {
      content += "<p>" + params.text + "</p>";
    }
    growl.innerHTML = content;
    k$.$('.growl_container').appendChild(growl);
    delay = params.delay;
    id = params.id;
    if (delay > 0) {
      return (function(delay, id) {
        return setTimeout(function() {
          return k$.$('.growl_container').removeChild(k$.$(".growl-" + id));
        }, delay);
      })(delay, id);
    }
  });
};

k$.growl = growl;

module.exports = growl;



},{}],"/Users/adamkochanowicz/sites/kickstart/lib/coffee/ks.coffee":[function(require,module,exports){
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
},{}],"/Users/adamkochanowicz/sites/kickstart/lib/coffee/modal.coffee":[function(require,module,exports){
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



},{}],"/Users/adamkochanowicz/sites/kickstart/lib/coffee/nav.coffee":[function(require,module,exports){
var nav;

nav = function(el) {
  var $menuItem, $menuItems, e, _$menuItems, _i, _j, _len, _len1;
  try {
    $menuItems = k$.$(el).querySelectorAll('ul > li');
    _$menuItems = new Array();
    for (_i = 0, _len = $menuItems.length; _i < _len; _i++) {
      $menuItem = $menuItems[_i];
      if ($menuItem.querySelectorAll('ul').length && !$menuItem.querySelectorAll('[role="button"]').length) {
        _$menuItems.push($menuItem);
      }
    }
    $menuItems = _$menuItems;
    for (_j = 0, _len1 = $menuItems.length; _j < _len1; _j++) {
      $menuItem = $menuItems[_j];
      $menuItem.classList.add('with-submenu');
    }
    k$.dropdown();
  } catch (_error) {
    e = _error;
    console.error("Could not instantiate as a nav.", e.message);
  }
  return k$.$(el);
};

k$.nav = nav;

module.exports = nav;



},{}],"/Users/adamkochanowicz/sites/kickstart/lib/coffee/status.coffee":[function(require,module,exports){
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



},{}],"/Users/adamkochanowicz/sites/kickstart/lib/coffee/throttler.coffee":[function(require,module,exports){
var throttle;

throttle = function(fn, id, delay) {};

k$.throttle = throttle;

module.exports = throttle;



},{}]},{},["./lib/coffee/app.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hZGFta29jaGFub3dpY3ovc2l0ZXMva2lja3N0YXJ0L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYWRhbWtvY2hhbm93aWN6L3NpdGVzL2tpY2tzdGFydC9saWIvY29mZmVlL2FwcC5jb2ZmZWUiLCIvVXNlcnMvYWRhbWtvY2hhbm93aWN6L3NpdGVzL2tpY2tzdGFydC9saWIvY29mZmVlL2J1ZmZlci5jb2ZmZWUiLCIvVXNlcnMvYWRhbWtvY2hhbm93aWN6L3NpdGVzL2tpY2tzdGFydC9saWIvY29mZmVlL2J1dHRvbnMuY29mZmVlIiwiL1VzZXJzL2FkYW1rb2NoYW5vd2ljei9zaXRlcy9raWNrc3RhcnQvbGliL2NvZmZlZS9kZWJvdW5jZXIuY29mZmVlIiwiL1VzZXJzL2FkYW1rb2NoYW5vd2ljei9zaXRlcy9raWNrc3RhcnQvbGliL2NvZmZlZS9kcm9wZG93bi5jb2ZmZWUiLCIvVXNlcnMvYWRhbWtvY2hhbm93aWN6L3NpdGVzL2tpY2tzdGFydC9saWIvY29mZmVlL2dyb3dsLmNvZmZlZSIsIi9Vc2Vycy9hZGFta29jaGFub3dpY3ovc2l0ZXMva2lja3N0YXJ0L2xpYi9jb2ZmZWUva3MuY29mZmVlIiwiL1VzZXJzL2FkYW1rb2NoYW5vd2ljei9zaXRlcy9raWNrc3RhcnQvbGliL2NvZmZlZS9tb2RhbC5jb2ZmZWUiLCIvVXNlcnMvYWRhbWtvY2hhbm93aWN6L3NpdGVzL2tpY2tzdGFydC9saWIvY29mZmVlL25hdi5jb2ZmZWUiLCIvVXNlcnMvYWRhbWtvY2hhbm93aWN6L3NpdGVzL2tpY2tzdGFydC9saWIvY29mZmVlL3N0YXR1cy5jb2ZmZWUiLCIvVXNlcnMvYWRhbWtvY2hhbm93aWN6L3NpdGVzL2tpY2tzdGFydC9saWIvY29mZmVlL3Rocm90dGxlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLDZFQUFBOztBQUFB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QTtXQUNkLFVBQVUsQ0FBQyxVQUFVLENBQUMsV0FBdEIsQ0FBa0MsVUFBbEMsRUFEYztFQUFBLENBZmhCLENBQUE7QUFrQkEsRUFBQSxJQUFHLE1BQU0sQ0FBQyxLQUFQLEdBQWUsQ0FBbEI7QUFDRSxJQUFBLEVBQUUsQ0FBQyxRQUFILENBQVksYUFBWixFQUEyQixlQUEzQixFQUE0QyxNQUFNLENBQUMsS0FBbkQsQ0FBQSxDQURGO0dBbEJBO0FBQUEsRUFxQkEsT0FBQSxHQUFVLEVBQUUsQ0FBQyxDQUFILENBQUssb0JBQUwsQ0FyQlYsQ0FBQTtBQUFBLEVBc0JBLE9BQU8sQ0FBQyxTQUFSLEdBQW9CLE1BQU0sQ0FBQyxJQXRCM0IsQ0FBQTtTQXVCQSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQWhCLEdBQXVCLE1BQU0sQ0FBQyxJQUFQLElBQWUsT0F6Qi9CO0FBQUEsQ0FBVCxDQUFBOztBQUFBLEVBMkJFLENBQUMsTUFBSCxHQUFZLE1BM0JaLENBQUE7O0FBQUEsTUE2Qk0sQ0FBQyxPQUFQLEdBQWlCLE1BN0JqQixDQUFBOzs7OztBQ0FBLElBQUEsUUFBQTs7QUFBQSxRQUFBLEdBQVcsU0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEtBQVQsR0FBQSxDQUFYLENBQUE7O0FBQUEsRUFJRSxDQUFDLFFBQUgsR0FBYyxRQUpkLENBQUE7O0FBQUEsTUFNTSxDQUFDLE9BQVAsR0FBaUIsUUFOakIsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJLUyAgICAgICAgPSByZXF1aXJlICcuL2tzJ1xuTW9kYWwgICAgID0gcmVxdWlyZSAnLi9tb2RhbCdcbk5hdiAgICAgICA9IHJlcXVpcmUgJy4vbmF2J1xuRGVib3VuY2UgID0gcmVxdWlyZSAnLi9kZWJvdW5jZXInXG5TdGF0dXMgICAgPSByZXF1aXJlICcuL3N0YXR1cydcblRocm90dGxlciA9IHJlcXVpcmUgJy4vdGhyb3R0bGVyJ1xuQnV0dG9ucyAgID0gcmVxdWlyZSAnLi9idXR0b25zJ1xuRHJvcGRvd24gID0gcmVxdWlyZSAnLi9kcm9wZG93bidcbkJ1ZmZlciAgICA9IHJlcXVpcmUgJy4vYnVmZmVyJ1xuR3Jvd2wgICAgID0gcmVxdWlyZSAnLi9ncm93bCdcblxuayQuYnV0dG9uKClcbmskLmRyb3Bkb3duKClcbiIsImJ1ZmZlciA9IChmbiwgZGVsYXkpIC0+XG5cbiAgIyBDcmVhdGUgYSBuZXcgYnVmZmVyQXJyYXkgaWYgb25lIGRvZXMgbm90IGV4aXN0IGFscmVhZHkuXG4gIGskLmJ1ZmZlckFycmF5ID0gayQuYnVmZmVyQXJyYXkgfHwgbmV3IEFycmF5KClcbiAgaWYgbm90IGskLmJ1ZmZlckFycmF5Lmxlbmd0aFxuICAgIGskLmJ1ZmZlckFycmF5ID0gbmV3IEFycmF5KClcblxuICAgIGRlbGF5ID0gZGVsYXkgfHwgNTAwXG5cbiAgICAjIENyZWF0ZSBhbiBpbnRlcnZhbCB0byBmaXJlIHRoZSBmbnMgaW4gYnVmZmVyQXJyYXlcbiAgICBpID0gMVxuXG4gICAgayQuYnVmZmVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCAtPlxuICAgICAgayQuYnVmZmVyQXJyYXlbaV0oKSBpZiBrJC5idWZmZXJBcnJheVtpXVxuICAgICAgaSsrXG4gICAgICBjb25zb2xlLmxvZyBpXG4gICAgICBpZiBpID49IGskLmJ1ZmZlckFycmF5Lmxlbmd0aFxuICAgICAgICBjbGVhckludGVydmFsIGskLmJ1ZmZlckludGVydmFsXG4gICAgICAgIGskLmJ1ZmZlckFycmF5ID0gdW5kZWZpbmVkXG4gICAgICAgIGkgPSAxXG4gICAgLCBkZWxheVxuXG4gICMgQWRkIHRoaXMgZnVuY3Rpb24gdG8gdGhlIGFycmF5LlxuICBrJC5idWZmZXJBcnJheS5wdXNoIGZuXG5cbiAgIyBGaXJlIHJpZ2h0IGF3YXkgaWYgaXQncyB0aGUgZmlyc3QgaW4gbGluZS5cbiAgayQuYnVmZmVyQXJyYXlbMF0oKSBpZiBrJC5idWZmZXJBcnJheS5sZW5ndGggPT0gMVxuXG4gIGNvbnNvbGUuaW5mbyBcIkZ1bmN0aW9uIHF1ZXVlZCAoI3trJC5idWZmZXJBcnJheS5sZW5ndGh9IGluIHF1ZXVlKVwiXG5cbmskLmJ1ZmZlciA9IGJ1ZmZlclxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1ZmZlclxuIiwiYnV0dG9uID0gLT5cblxuICAoJGJ1dHRvbi5jbGFzc0xpc3QuYWRkICd3aXRoLXN1Ym1lbnUnIGlmICRidXR0b24ucXVlcnlTZWxlY3RvckFsbCgndWwnKS5sZW5ndGgpIGZvciAkYnV0dG9uIGluIGskLiQkKFwiYnV0dG9uXCIpXG4gICRidXR0b25Ecm9wZG93bi5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQgJ3dpdGgtc3VibWVudScgZm9yICRidXR0b25Ecm9wZG93biBpbiBrJC4kJCAnLmJ1dHRvbi1kcm9wZG93bidcblxuayQuYnV0dG9uID0gYnV0dG9uXG5cbm1vZHVsZS5leHBvcnRzID0gYnV0dG9uXG4iLCJkZWJvdW5jZSA9IChmbiwgaWQsIGRlbGF5KSAtPlxuXG4gICRkZWxheSA9IGRlbGF5IHx8IDEwMDBcblxuICBrJC5kZWJvdW5jZVF1ZXVlID0gaWQgaWYgayQuZGVib3VuY2VRdWV1ZSA9PSBudWxsXG4gIGNsZWFyVGltZW91dCBrJC5kZWJvdW5jZVRpbWVyIGlmIGlkID09IGskLmRlYm91bmNlUXVldWVcbiAgayQuZGVib3VuY2VUaW1lciA9IHNldFRpbWVvdXQgLT5cbiAgICBmbigpXG4gICAgayQuZGVib3VuY2VRdWV1ZSA9IG51bGxcbiAgLCAkZGVsYXlcblxuayQuZGVib3VuY2UgPSBkZWJvdW5jZVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYm91bmNlXG4iLCJkcm9wZG93biA9IC0+XG5cbiAgIyBUaGUgZm9sbG93aW5nIHNob3VsZCBhcHBseSB0byBib3RoIG5hdmlnYXRpb24gZWxlbWVudHMgYW5kIGRyb3Bkb3duIGJ1dHRvbnNcblxuICAkbWVudUl0ZW1zID0gayQuJCQgJy53aXRoLXN1Ym1lbnUnXG5cbiAgZm9yICRfbWVudUl0ZW0gaW4gJG1lbnVJdGVtc1xuXG4gICAgJG1lbnVJdGVtID0gJF9tZW51SXRlbS5jbG9uZU5vZGUgdHJ1ZVxuICAgICRfbWVudUl0ZW0ucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQgJG1lbnVJdGVtLCAkX21lbnVJdGVtXG5cbiAgICBkbyAoJG1lbnVJdGVtKSAtPlxuICAgICAgIyBUT0RPOiBJcyB0aGVyZSBhIHdheSB3ZSBjb3VsZCBub3QgaGF2ZSBhbiBldmVudCBsaXN0ZW5lciBmb3IgZXZlcnlcbiAgICAgICMgc2luZ2xlIG9uZT9cbiAgICAgICRtZW51SXRlbS5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIChlKSAtPlxuXG4gICAgICAgICMgSnVzdCBjbG9zZSBpdCBpZiBpdCdzIGFscmVhZHkgb3BlblxuICAgICAgICBpZiAkbWVudUl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zICdvcGVuJ1xuICAgICAgICAgICRtZW51SXRlbS5jbGFzc0xpc3QucmVtb3ZlICdvcGVuJ1xuICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICMgUmVzZXQgYWxsXG4gICAgICAgIF8kbWVudUl0ZW0uY2xhc3NMaXN0LnJlbW92ZSAnb3BlbicgZm9yIF8kbWVudUl0ZW0gaW4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndpdGgtc3VibWVudScpXG4gICAgICAgICR1bCA9ICRtZW51SXRlbS5xdWVyeVNlbGVjdG9yICd1bCdcblxuICAgICAgICAjIE9wZW4gdGhpcyBvbmVcbiAgICAgICAgaWYgJHVsXG4gICAgICAgICAgJG1lbnVJdGVtLmNsYXNzTGlzdC5hZGQgJ29wZW4nXG5cbiAgICAgICAgIyBQcmV2ZW50IGJ1YmJsaW5nXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcblxuICAjIERpc21pc3MgYWxsXG4gIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAtPlxuICAgICR1bC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUgJ29wZW4nIGZvciAkdWwgaW4gayQuJCQoJy53aXRoLXN1Ym1lbnUgPiB1bCcpXG4gICAgJGxpLmNsYXNzTGlzdC5yZW1vdmUgJ29wZW4nIGZvciAkbGkgaW4gayQuJCQoJy53aXRoLXN1Ym1lbnUub3BlbicpXG5cbmskLmRyb3Bkb3duID0gZHJvcGRvd25cblxubW9kdWxlLmV4cG9ydHMgPSBkcm9wZG93blxuIiwiZ3Jvd2wgPSAocGFyYW1zKSAtPlxuXG4gIGskLmJ1ZmZlciAtPlxuICAgIGRlZmF1bHRzID1cbiAgICAgIHRpdGxlOiB1bmRlZmluZWRcbiAgICAgIHRleHQ6IHVuZGVmaW5lZFxuICAgICAgZGVsYXk6IDIwMDBcbiAgICAgIHR5cGU6ICdhbGVydC13YXJuJ1xuICAgICAgaWQ6IERhdGUubm93KClcblxuICAgIHBhcmFtcyA9IGskLmV4dGVuZCBkZWZhdWx0cywgcGFyYW1zXG5cbiAgICAjIENyZWF0ZSBncm93bCBjb250YWluZXJcbiAgICBpZiBub3QgayQuJCQoJy5ncm93bF9jb250YWluZXInKS5sZW5ndGhcbiAgICAgIGdyb3dsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnZGl2J1xuICAgICAgZ3Jvd2xDb250YWluZXIuY2xhc3NOYW1lID0gJ2dyb3dsX2NvbnRhaW5lcidcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQgZ3Jvd2xDb250YWluZXJcblxuICAgICMgQ3JlYXRlIGdyb3dsXG4gICAgZ3Jvd2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdkaXYnXG5cbiAgICAjIEFkZCBhcHByb3ByaWF0ZSBjbGFzc2VzXG4gICAgY2xhc3NOYW1lID0gXCJhbGVydCBncm93bCAje3BhcmFtcy50eXBlfSBncm93bC0je3BhcmFtcy5pZH1cIlxuICAgIGdyb3dsLmNsYXNzTmFtZSA9IGNsYXNzTmFtZVxuXG4gICAgIyBBZGQgY29udGVudFxuICAgIGNvbnRlbnQgPSBcIlwiXG4gICAgY29udGVudCArPSBcIjxoMT4je3BhcmFtcy50aXRsZX08L2gxPlwiIGlmIHBhcmFtcy50aXRsZVxuICAgIGNvbnRlbnQgKz0gXCI8cD4je3BhcmFtcy50ZXh0fTwvcD5cIiBpZiBwYXJhbXMudGV4dFxuICAgIGdyb3dsLmlubmVySFRNTCA9IGNvbnRlbnRcblxuICAgICMgQXBwZW5kIGNoaWxkIHRvIGNvbnRhaW5lclxuICAgIGskLiQoJy5ncm93bF9jb250YWluZXInKS5hcHBlbmRDaGlsZCBncm93bFxuXG4gICAgZGVsYXkgPSBwYXJhbXMuZGVsYXlcbiAgICBpZCA9IHBhcmFtcy5pZFxuXG4gICAgaWYgZGVsYXkgPiAwXG4gICAgICBkbyAoZGVsYXksIGlkKSAtPlxuICAgICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgICAgayQuJCgnLmdyb3dsX2NvbnRhaW5lcicpLnJlbW92ZUNoaWxkIGskLiQoXCIuZ3Jvd2wtI3tpZH1cIilcbiAgICAgICAgLCBkZWxheVxuXG5rJC5ncm93bCA9IGdyb3dsXG5cbm1vZHVsZS5leHBvcnRzID0gZ3Jvd2xcbiIsImdsb2JhbC5rJCA9IG5ldyBPYmplY3QoKVxuXG5rJC4kJCA9IChlbCkgLT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCBlbFxuayQuJCA9IChlbCkgLT4gayQuJCQoZWwpWzBdXG5rJC5kZWJvdW5jZVRpbWVyID0gZmFsc2VcbmskLmRlYm91bmNlUXVldWUgPSBudWxsXG5rJC5leHRlbmQgPSAoZGVzdGluYXRpb24sIHNvdXJjZSkgLT5cbiAgZm9yIHByb3BlcnR5IG9mIHNvdXJjZVxuICAgIGlmIHNvdXJjZVtwcm9wZXJ0eV0gYW5kIHNvdXJjZVtwcm9wZXJ0eV0uY29uc3RydWN0b3IgYW5kIHNvdXJjZVtwcm9wZXJ0eV0uY29uc3RydWN0b3IgaXMgT2JqZWN0XG4gICAgICBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gPSBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gb3Ige31cbiAgICAgIGFyZ3VtZW50cy5jYWxsZWUgZGVzdGluYXRpb25bcHJvcGVydHldLCBzb3VyY2VbcHJvcGVydHldXG4gICAgZWxzZVxuICAgICAgZGVzdGluYXRpb25bcHJvcGVydHldID0gc291cmNlW3Byb3BlcnR5XVxuICBkZXN0aW5hdGlvblxuXG5tb2R1bGUuZXhwb3J0cyA9IGskXG4iLCJtb2RhbCA9IChlbCkgLT5cblxuICBkbyAoZWwpIC0+XG5cbiAgICAjIEFsbG93IG1vZGFsIHRvIGRpc21pc3Mgd2hlbiBjbGlja2VkIG91dHNpZGVcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgLT5cbiAgICAgIGskLiQoZWwpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcblxuICAgIGskLiQoZWwpLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgKGUpIC0+XG4gICAgICByZXR1cm4gZS5zdG9wUHJvcGFnYXRpb24oKVxuXG4gIGskLiQgZWxcblxuayQubW9kYWwgPSBtb2RhbFxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGFsXG4iLCJuYXYgPSAoZWwpIC0+XG5cbiAgdHJ5XG4gICAgJG1lbnVJdGVtcyA9IGskLiQoZWwpLnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsID4gbGknKVxuICAgICMgUHJ1bmUgaXRlbXMgdGhhdCBkb24ndCBjb250YWluIHVsc1xuICAgIF8kbWVudUl0ZW1zID0gbmV3IEFycmF5KClcbiAgICBmb3IgJG1lbnVJdGVtIGluICRtZW51SXRlbXNcbiAgICAgIGlmICRtZW51SXRlbS5xdWVyeVNlbGVjdG9yQWxsKCd1bCcpLmxlbmd0aCBhbmQgISRtZW51SXRlbS5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cImJ1dHRvblwiXScpLmxlbmd0aFxuICAgICAgICBfJG1lbnVJdGVtcy5wdXNoICRtZW51SXRlbSBcblxuICAgICRtZW51SXRlbXMgPSBfJG1lbnVJdGVtc1xuICAgIGZvciAkbWVudUl0ZW0gaW4gJG1lbnVJdGVtc1xuXG4gICAgICAjIEZvciBzdHlsaW5nXG4gICAgICAkbWVudUl0ZW0uY2xhc3NMaXN0LmFkZCAnd2l0aC1zdWJtZW51J1xuXG4gICAgIyBXaXJlIHVwIHRoZSBtZW51XG4gICAgayQuZHJvcGRvd24oKVxuXG4gIGNhdGNoIGVcbiAgICBjb25zb2xlLmVycm9yIFwiQ291bGQgbm90IGluc3RhbnRpYXRlIGFzIGEgbmF2LlwiLCBlLm1lc3NhZ2VcblxuICBrJC4kIGVsXG5cblxuayQubmF2ID0gbmF2XG5cbm1vZHVsZS5leHBvcnRzID0gbmF2XG4iLCJzdGF0dXMgPSAob3B0cykgLT5cblxuICBkZWZhdWx0cyA9XG4gICAgdHlwZTogJ3dhcm4nXG4gICAgZGVsYXk6IDIwMDBcblxuICBzdGF0dXMgPSBrJC5leHRlbmQgZGVmYXVsdHMsIG9wdHNcblxuICBpZiBub3QgayQuJCQoJyNzdGF0dXMtYmFyJykubGVuZ3RoXG4gICAgJHN0YXR1c0JhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgJHN0YXR1c0Jhci5pZCA9ICdzdGF0dXMtYmFyJ1xuICAgICRzdGF0dXNCYXIuY2xhc3NOYW1lID0gJ3N0YXR1cy1iYXInXG4gICAgJHN0YXR1c0Jhci5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9J3N0YXR1cy1iYXJfc3RhdHVzJyBpZD0nc3RhdHVzLWJhcl9zdGF0dXMnPjwvZGl2PlwiXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkc3RhdHVzQmFyKVxuXG4gICRzdGF0dXNCYXIgPSBrJC4kKCcjc3RhdHVzLWJhcicpXG5cbiAgaGlkZVN0YXR1c0JhciA9IC0+XG4gICAgJHN0YXR1c0Jhci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkICRzdGF0dXNCYXJcblxuICBpZiBzdGF0dXMuZGVsYXkgPiAwXG4gICAgayQuZGVib3VuY2UgaGlkZVN0YXR1c0JhciwgJ2hpZGVTdGF0dXNCYXInLCBzdGF0dXMuZGVsYXlcblxuICAkc3RhdHVzID0gayQuJChcIiNzdGF0dXMtYmFyX3N0YXR1c1wiKVxuICAkc3RhdHVzLmlubmVySFRNTCA9IHN0YXR1cy50ZXh0XG4gICRzdGF0dXMuZGF0YXNldC50eXBlID0gc3RhdHVzLnR5cGUgfHwgJ3dhcm4nXG5cbmskLnN0YXR1cyA9IHN0YXR1c1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXR1c1xuIiwidGhyb3R0bGUgPSAoZm4sIGlkLCBkZWxheSkgLT5cblxuICBcblxuayQudGhyb3R0bGUgPSB0aHJvdHRsZVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRocm90dGxlXG4iXX0=
