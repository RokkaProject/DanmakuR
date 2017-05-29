<?php
/**
 * Created by PhpStorm.
 * User: Rokka
 * Date: 2017/5/21
 * Time: 13:57
 */

$VideoFile="http://hecveerk8r2r22ebtk3.exp.bcevod.com/mda-heyv1fzj7zj4dvck/mp41080p/mda-heyv1fzj7zj4dvck.mp4";         // 视频文件
$DanmakuFile="/public/static/1176840.xml";      // 弹幕文件

/*
$VideoFile="";
$DanmakuFile="/public/static/1176840.xml";
*/
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="Danmaku.js"></script>
    <link rel="stylesheet" href="danmaku.css">
</head>
<body>
<div id="Danmaku" class="Danmaku">
    <div class="Danmaku_Player">
        <div class="Player_Danmaku">
            <!-- 弹幕div -->
        </div>
        <video src="<?php echo $VideoFile?>"></video>
        <div id="HideController" class="HideController"></div>
        <p id="DanmakuFile" style="display: none;"><?php echo $DanmakuFile?></p>
    </div>
    <div id="Danmaku_Controller" class="Danmaku_Controller">
        <button id="Btn_StartPause" class="DC_Btn">▶</button>
        <div id="DC_Slider" class="DC_Slider">
            <div id="DC_SliderTracker" class="DC_SliderTracker"></div>
        </div>
        <div class="DC_VideoTime">
            <span id="VT_TimeNow">0</span>/<span id="VT_TimeTotal">0</span>
        </div>
        <button id="Btn_Volume" class="DC_Btn">♬</button>
        <div id="DC_Volume" class="DC_Volume">
            <div id="DC_VolumeSlider" class="DC_VolumeSlider">
                <div id="DC_VolumeSliderTracker" class="DC_VolumeSliderTracker"></div>
            </div>
        </div>
        <button id="Btn_FullScreen" class="DC_Btn">□</button>
        <button id="DC_Btn_Font" class="DC_Btn_Font">A</button>
        <div id="DC_Font" class="DC_Font" style="text-align: center;">暂未开放功能</div>
        <input id="DC_Input" class="DC_Input" placeholder=" 发射弹幕！！">
        <button id="DC_Btn_Send" class="DC_Btn_Send">发送</button>
    </div>

</div>
</body>
<script type="text/javascript">
    // esc退出全屏（监听窗口尺寸改变事件）
    window.onresize=function () {
        // 判断浏览器是否全屏
        var isFull =  document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
        if(isFull === undefined)
        {
            isFull = false;
        }
        if (isFull==false)
        {
            // 退出全屏
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
                exitFullSrceen();
                isFullScreen=false;
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
                exitFullSrceen();
                isFullScreen=false;
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
                exitFullSrceen();
                isFullScreen=false;
            }
        }
    }
    // 退出全屏弹幕播放器后设置控件尺寸
    function exitFullSrceen() {
        // 延迟响应时间，否则无法设置尺寸
        setTimeout(function () {
            Danmaku.css('width','800px');
            Danmaku.css('height','660px');
            Danmaku_Player.css('width','800px');
            Danmaku_Player.css('height','600px');
            Player_Danmaku.css('width','800px');
            Player_Danmaku.css('height','600px');
            Danmaku_Controller.css('width','800px');
            DC_Slider.css('width','610px');
            DC_Input.css('width','699');
            DC_Volume.css('top','490px');
            DC_Volume.css('left','740px');
            DC_Font.css('top','480px');
            HideController.css('display','none');
        },500);
    }
</script>
</html>
