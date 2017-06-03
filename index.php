<?php
/**
 * Created by PhpStorm.
 * User: Rokka
 * Date: 2017/5/21
 * Time: 13:57
 */

$VideoFile="http://hecveerk8r2r22ebtk3.exp.bcevod.com/mda-hfcm1nb1i9ri02be/mda-hfcm1nb1i9ri02be.mp4";         // 视频文件
$DanmakuFile="/public/static/15812295.xml";      // 弹幕文件
//$VideoFile="http://www.w3school.com.cn/i/movie.mp4";
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
        <div id="HideController" class="HideController" style="display: none;"></div>
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

</html>
