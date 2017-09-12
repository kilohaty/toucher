import Vue from 'vue';

(function () {
  var VFb = (function () {
    var MAX_DISTANCE = 10;
    var collection   = {};
    var startPos     = {};

    function addClass(elm, className) {
      elm.classList.add(className);
    }

    function removeClass(elm, className) {
      elm.classList.remove(className);
    }

    return {
      generateKey() {
        return String(Math.random()).slice(2);
      },

      register(el, className) {
        var key       = this.generateKey();
        collection[key] = {el: el, className: className};

        el.setAttribute('data-feedback-key', key);
        el.addEventListener('touchstart', addClass.bind(null, el, className));
        el.addEventListener('touchend', removeClass.bind(null, el, className));
        el.addEventListener('touchcancel', removeClass.bind(null, el, className));
        return key;
      },

      destroy(element) {
        var key       = element.getAttribute('data-feedback-key');
        var el        = collection[key].el;
        var className = collection[key].className;
        el.removeEventListener('touchstart', addClass.bind(null, el, className));
        el.removeEventListener('touchend', removeClass.bind(null, el, className));
        el.removeEventListener('touchcancel', removeClass.bind(null, el, className));
        removeClass(el, className);
        delete collection[key];
      },

      onDocTouchStart(e) {
        var touch      = e.touches[0];
        startPos.screenY = touch.screenY;
        startPos.pageY   = touch.pageY;
      },

      onDocTouchMove(e) {
        var touch           = e.touches[0];
        var distanceScreenY = Math.abs(touch.screenY - startPos.screenY);
        var distancePageY   = Math.abs(touch.pageY - startPos.pageY);

        if (Object.keys(collection).length
          && (distanceScreenY > MAX_DISTANCE || distancePageY > MAX_DISTANCE)) {
          for (let key in collection) {
            if (collection.hasOwnProperty(key)) {
              removeClass(collection[key].el, collection[key].className);
            }
          }
        }
      },
    }
  }());

  document.addEventListener('touchstart', VFb.onDocTouchStart.bind(VFb));
  document.addEventListener('touchmove', VFb.onDocTouchMove.bind(VFb));

  /* 触摸反馈 */
  Vue.directive('feedback', {
    bind: function (el, binding, vnode) {
      VFb.register(vnode.elm, binding.value || 'e-feedback');
    },

    unbind: function (el, binding, vnode) {
      VFb.destroy(vnode.elm);
    }
  });

}());
