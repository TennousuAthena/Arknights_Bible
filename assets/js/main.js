(function() {
  "use strict";
  NProgress.start()
  let world_tips = [
    ["矿石病", "目前发现长期接触源右及其工业衍生品，会使人更容易得二种被称、“矿石病”的不治之症。患上矿石病的人被称为“感染者”。矿石病会以一种危险的形式增强人的法术使用能力，但是却会在患者使用法术的过程中不断扩大感石疒石病染范围最终夺走感染者的生命并以其作为新的感染源。有关该病症经有多方面的长期研究，然而并没有太多有效成果。"],
    ["罗德岛", "罗德岛制药公司是一家注册医药研发公司。罗德岛在公开的资料中声称正在研究可以应用于各个国家、组织或个人遭遇的感染者问题的医疗方案,因此在各国范围内广招贤士，不管资历，无论感染。同时，罗德岛也为其雇员提供良好的医疗与生活条件以及最先进的研究设备，这吸引了许多走投无路的感染者和立志改变感染者处境的有能人士。"]
  ];

  //全屏
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
  } else if (!/(Android)/i.test(navigator.userAgent)) {
    $("body").on("click", function() {
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

    // "media/无能狂怒.flv"
  ];
  
  let assets_len = assets.length;
  let i = 1;
  let base = $("base").attr("href");
  assets.forEach(function(item) {
    $.ajax({
      url: base + "/assets/" + item,
      async: true,
      success: function() {
        console.log("Loaded " + item + "(" + (i / assets_len)*100 + "%)")
        NProgress.set(i / assets_len);
        if(i === 1){
          $("#bgm-intro")[0].play();
        }
        //资源加载完毕
        if (i++ === assets_len) {
          console.log("Done!");
          NProgress.done();
          
          // $(".background").on("click", function() {
          //   window.click ? bg() : window.click=1;
          // })
          bg();

        }
      }
    });
  });
  //重播
  $("#bgm-intro").bind("ended", function() {
    $("#bgm-loop")[0].play();
  });

  function bg() {
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
        // FLVvideoPlay();
        setTimeout(function () {
          // $('#player').fadeIn();
          // $('#player')[0].play();
          const dp = new DPlayer({
            container: document.getElementById('dplayer'),
            video: {
                url: 'assets/media/无能狂怒.mp4',
            },
          });
          dp.play();
        }, 2500)
        

        $('#bgm-intro').animate({volume: 0.01}, 1500);
        $('#bgm-loop').animate({volume: 0.01}, 1500);
      }, 4500);
    }, 5000);
  }

  function FLVvideoPlay(){
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
