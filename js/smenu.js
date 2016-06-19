var smenu = function(items, menu, options){
  var defaults = {
    masterElementType: "ul",
    subType: "li",
    titleElements: "h1, h2, h3, h4, h5",
    fontSize: 2,
    viewedModification: EasingFunctions.easeInOutCubic,
    scrollEasingFunction: EasingFunctions.easeInOutCubic,
    scrollTime: 500
  };

  var options = merge(defaults, options);

  var sections = document.querySelectorAll(items);
  var to = document.querySelectorAll(menu)[0];

  var ul = document.createElement(options.masterElementType);

  var liList = [];
  for(var i = 0; i < sections.length; i++){
    var titleElements = sections[i].querySelector(options.titleElements);

    var li = document.createElement(options.subType);
    li.innerHTML = titleElements.innerHTML;
    li.className = titleElements.tagName;

    addOnclick(li, i);

    liList.push(li);
    ul.appendChild(li);
  }

  to.appendChild(ul);

  var update = function(){
    var middleOfScreen = window.innerHeight

    for(var i = 0; i < sections.length; i++){
      var clientRect = sections[i].getBoundingClientRect();

      var subTop = clientRect.top > 0 ? 0 : clientRect.top;

      var fromBottom = window.innerHeight - clientRect.bottom;
      var subBottom = fromBottom > 0 ? 0 : fromBottom;

      var left = clientRect.height + subBottom + subTop;

      var middle = (clientRect.top + clientRect.bottom) / 2;

      var percentageViewed = left / Math.min(clientRect.height, window.innerHeight);
      percentageViewed = percentageViewed > 0 ? percentageViewed : 0;

      var modulatedPercentageViewed = options.viewedModification(percentageViewed);

      liList[i].style.fontSize = (1 + modulatedPercentageViewed * (options.fontSize - 1)) + "em";
    }
  }

  function addOnclick(listElement, index){
    listElement.onclick = function(){
      var clientRect = sections[index].getBoundingClientRect();

      smoothScroll(clientRect.top + window.pageYOffset, options.scrollTime, options.scrollEasingFunction);
    }
  }

  window.onscroll = update;
  window.onresize = update;

  update();
}


function smoothScroll(y, totalTime, easingFunction){
  var startTime = new Date();
  var startScroll = window.pageYOffset;
  var scrollDiff = y - startScroll;

  var tick = function(){
    var elapsed = (new Date()) - startTime;
    var percentage = elapsed / totalTime;
    if(percentage > 1){percentage = 1}

    window.scrollTo(0, easingFunction(percentage) * scrollDiff + startScroll);

    if(percentage != 1){
      requestAnimationFrame(tick);
    }
  };

  window.requestAnimationFrame(tick);
}

/*
 * https://gist.github.com/gre/1650294
 */
EasingFunctions = {
  // no easing, no acceleration
  linear: function (t) { return t },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t*t },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t*(2-t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  // accelerating from zero velocity
  easeInCubic: function (t) { return t*t*t },
  // decelerating to zero velocity
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  // accelerating from zero velocity
  easeInQuart: function (t) { return t*t*t*t },
  // decelerating to zero velocity
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t*t*t*t*t },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}

function merge(old, replaceObj) {
  var newMerge = {};
  var k;
  for (k in old) {
    if (old.hasOwnProperty(k)) {
      newMerge[k] = old[k];
    }
  }
  for (k in replaceObj) {
    if(replaceObj.hasOwnProperty(k) && typeof replaceObj[k] !== "undefined"){
      newMerge[k] = replaceObj[k];
    }
  }
  return newMerge;
}
