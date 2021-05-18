(function() {
  "use strict";
  

  //全屏
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
  } else if (!/(Android)/i.test(navigator.userAgent)) {
    $("body").click(function() {
      if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    });
  }
  NProgress.start()
  //资源文件
  let assets = [
    "audio/title_intro.mp3",
    "audio/title_loop.mp3",
    "image/title-rhodes-island.png",
    "image/title-ori.png",
    // "image/worldtip1.png",
    // "image/worldtip2.png",
    // "image/worldtip3.png",
    // "image/worldtip5.png",

    "media/无能狂怒.flv"
  ];
  
  let assets_len = assets.length;
  let i = 1;
  assets.forEach(function(item) {
    $.ajax({
      url: "../../assets/" + item,
      async: true,
      success: function() {
        console.log("Loaded " + item + "(" + (i / assets_len)*100 + "%)")
        NProgress.set(i / assets_len);
        //资源加载完毕
        if (i++ === assets_len) {
          console.log("Done!");
          NProgress.done();
          $("#bgm-intro")[0].play();
          setTimeout(function() {
            setTimeout(function() {
              $(".background").fadeOut();
            }, 1000);
            
          }, 2500);
          setTimeout(function() {
            $(".background").css(
              "background",
              'url("assets/image/title-ori.png")  center center no-repeat'
            );
            $(".background").css("background-size", "100%");
            $(".world_tip").fadeIn();
            $(".background").fadeIn();
            setTimeout(function() {
              $("#loading").fadeOut();
              $(".world_tip").fadeOut();
              $(".background").fadeOut();
              videoPlay();
              $('#bgm-intro').animate({volume: 0.01}, 1500);
              $('#bgm-loop').animate({volume: 0.01}, 1500);
            }, 2500);
          }, 5000);
        }
      }
    });
  });
  //重播
  $("#bgm-intro").bind("ended", function() {
    $("#bgm-loop")[0].play();
  });

  function videoPlay(){
    if (flvjs.isSupported()) {
      var videoElement = document.getElementById('player');
      $('#player').fadeIn();
      var flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: 'assets/media/无能狂怒.flv'
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
  }
  }

  //强制横屏
  var detectOrient = function() {
    var width = document.documentElement.clientWidth,
      height = document.documentElement.clientHeight,
      $wrapper = document.getElementById("content"),
      style = "";
    if (width >= height) {
      style += "width:" + width + "px;";
      style += "height:" + height + "px;";
      style += "-webkit-transform: rotate(0); transform: rotate(0);";
      style += "-webkit-transform-origin: 0 0;";
      style += "transform-origin: 0 0;";
    } else {
      style += "width:" + height + "px;";
      style += "height:" + width + "px;";
      style += "-webkit-transform: rotate(90deg); transform: rotate(90deg);";
      style +=
        "-webkit-transform-origin: " + width / 2 + "px " + width / 2 + "px;";
      style += "transform-origin: " + width / 2 + "px " + width / 2 + "px;";
    }
    $wrapper.style.cssText = style;
  };
  window.onresize = detectOrient;
  detectOrient();
})();
