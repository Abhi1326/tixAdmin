

//*********************jquery code for scrolling up*****************//
$(window).scroll(function() {
    let $scroll_pos = 0;
    $scroll_pos = $(window).scrollTop();
    if($scroll_pos >= 52){
            $('.search_top').addClass('search_fixed');

    }else{
            $('.search_top').removeClass('search_fixed');
    }
});


$(window).scroll(function() {
    let $scroll_pos = 0;
    $scroll_pos = $(window).scrollTop();
    if($scroll_pos >= 52){
        $('.search_top1').show().addClass('search_fixed1');

    }else{
        $('.search_top1').hide()
    }
});
//**********************************end******************************//


//*********code is wrking but at refresh failing***********//
// var supportPageOffset = window.pageXOffset !== undefined;
// var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
//
// var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
// var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
//
// if(window.y >= 52){
//     var d = document.getElementById("txtSearch");
//     d.className += "search_fixed";
// }else{
//     // document.getElementById("txtSearch").className =
//     //     document.getElementById("txtSearch").className.replace(/\bsearch_scroll\b/,'');
// }
//*********end***********//



// ******************js code for scrolling upwards**************//
// window.onscroll = function (e) {
//     var el = document.querySelector('.search');
//     if(el.scrollTop >=52){
//         var d = document.getElementById("txtSearch");
//         d.className += "search_fixed";
//     }
// }
//
// function scroll_down() {
//
// }
//
// function scroll_up() {
//     var el = document.querySelector('.container');
//     smooth_scroll_to(el, el.scrollTop - 500, 600);
// }
//
// function sequence() {
//     var el = document.querySelector('.container');
//     smooth_scroll_to(el, el.scrollTop + 500, 800).then(function() {
//         return smooth_scroll_to(el, el.scrollTop - 200, 500);
//     }).then(function() {
//         return smooth_scroll_to(el, el.scrollTop + 900, 400);
//     }).catch(function(error) {
//         setTimeout(function() {
//             alert("Sequence cancelled: " + error);
//         }, 500);
//     });
// }
//
//
// /**
//  Smoothly scroll element to the given target (element.scrollTop)
//  for the given duration
//
//  Returns a promise that's fulfilled when done, or rejected if
//  interrupted
//  */
// var smooth_scroll_to = function(element, target, duration) {
//     target = Math.round(target);
//     duration = Math.round(duration);
//     if (duration < 0) {
//         return Promise.reject("bad duration");
//     }
//     if (duration === 0) {
//         element.scrollTop = target;
//         return Promise.resolve();
//     }
//
//     var start_time = Date.now();
//     var end_time = start_time + duration;
//
//     var start_top = element.scrollTop;
//     var distance = target - start_top;
//
//     // based on http://en.wikipedia.org/wiki/Smoothstep
//     var smooth_step = function(start, end, point) {
//         if(point <= start) { return 0; }
//         if(point >= end) { return 1; }
//         var x = (point - start) / (end - start); // interpolation
//         return x*x*(3 - 2*x);
//     }
//
//     return new Promise(function(resolve, reject) {
//         // This is to keep track of where the element's scrollTop is
//         // supposed to be, based on what we're doing
//         var previous_top = element.scrollTop;
//
//         // This is like a think function from a game loop
//         var scroll_frame = function() {
//             if(element.scrollTop != previous_top) {
//                 reject("interrupted");
//                 return;
//             }
//
//             // set the scrollTop for this frame
//             var now = Date.now();
//             var point = smooth_step(start_time, end_time, now);
//             var frameTop = Math.round(start_top + (distance * point));
//             element.scrollTop = frameTop;
//
//             // check if we're done!
//             if(now >= end_time) {
//                 resolve();
//                 return;
//             }
//
//             // If we were supposed to scroll but didn't, then we
//             // probably hit the limit, so consider it done; not
//             // interrupted.
//             if(element.scrollTop === previous_top
//                 && element.scrollTop !== frameTop) {
//                 resolve();
//                 return;
//             }
//             previous_top = element.scrollTop;
//
//             // schedule next frame for execution
//             setTimeout(scroll_frame, 0);
//         }
//
//         // boostrap the animation process
//         setTimeout(scroll_frame, 0);
//     });
// }
// ******************end**************//