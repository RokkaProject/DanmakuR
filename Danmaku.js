/*
 * Created by Rokka on 2017/5/13.
 */

/*
*  定义控件
*/
var HideController          // 隐藏控制器
var Danmaku;                // 播放器
var Danmaku_Player;         // 播放器视图
var Player_Danmaku;         // 播放器弹幕层
var Video;                  // 播放器视频层
var DanmakuFile;            // 弹幕文件
var Danmaku_Controller;     // 控制器
var Btn_StartPause;         // 控制器播放按钮
var Btn_Volume;             // 控制器音量按钮
var DC_Volume;              // 控制器音量滑块
var Btn_FullScreen;         // 控制器全屏按钮
var DC_Slider;              // 控制器进度条（总长）
var DC_SliderTracker        // 控制器进度条（当前）
var DC_Btn_Font;            // 控制器字体按钮
var DC_Font;                // 控制器字体
var DC_Input;               // 控制器弹幕输入框
var DC_Btn_Send;            // 控制器弹幕发送按钮

/*
*  定义开关
*/
var isFullScreen=false;     // 是否全屏

/*

*   初始化（获取控件、创建事件、绑定事件）
*/
$(document).ready(function () {
    /*
     *  获取控件
     */
    HideController=$('#HideController');
    Danmaku=$('#Danmaku');
    Danmaku_Player=$('.Danmaku_Player');
    Player_Danmaku=$('.Player_Danmaku');
    Video=$('video');
    DanmakuFile=$('#DanmakuFile').text();
    Danmaku_Controller=$('#Danmaku_Controller');
    Btn_StartPause=$('#Btn_StartPause');
    Btn_Volume=$('#Btn_Volume');
    DC_Volume=$('#DC_Volume');
    DC_VolumeSlider=$('#DC_VolumeSlider');
    DC_VolumeSliderTracker=$('#DC_VolumeSliderTracker');
    Btn_FullScreen=$('#Btn_FullScreen');
    DC_Slider=$('#DC_Slider');
    DC_SliderTracker=$('#DC_SliderTracker');
    DC_Btn_Font=$('#DC_Btn_Font');
    DC_Font=$('#DC_Font');
    DC_Input=$('#DC_Input');
    DC_Btn_Send=$('#DC_Btn_Send');
/*
 *  创建或绑定事件
 */
    // 播放或暂停
    Btn_StartPause.click(function () {
        fun_StartPause();
    })
    Video.click(function () {
        fun_StartPause();
    })
    // 播放结束时
    Video.bind('ended',function () {
        Btn_StartPause.text('▶');
    })
    // 设置是否静音
    Btn_Volume.click(function () {
        SetVolumeMuted();
    })
    Btn_Volume.mouseover(function () {
        DC_Volume.css('display','block');
    })
    Btn_Volume.mouseout(function () {
        DC_Volume.css('display','none');
    })
    DC_Volume.mouseover(function () {
        DC_Volume.css('display','block');
    })
    DC_Volume.mouseout(function () {
        DC_Volume.css('display','none');
    })
    // 设置音量
    DC_VolumeSlider.click(function () {
        SetVolume();
    })
    // 设置字体
    DC_Btn_Font.mouseover(function () {
        DC_Font.css('display','block');
    })
    DC_Btn_Font.mouseout(function () {
        DC_Font.css('display','none');
    })
    DC_Font.mouseover(function () {
        DC_Font.css('display','block');
    })
    DC_Font.mouseout(function () {
        DC_Font.css('display','none');
    })
    // 全屏
    Btn_FullScreen.click(function () {
        fun_FullScreen();
    })
    DC_Btn_Send.click(function () {
        Fun_SendDanmaku();
    })
    // 获取视频总时长
    Video.bind('loadedmetadata',function () {
        fun_GetDuration();
    })
    // 视频播放位置更新
    Video.bind('timeupdate',function () {
        fun_GetCurrentTime();
        fun_UpdateSliderTracker();
        fun_AutoDanmaku();
    })
    // 更改进度
    DC_Slider.click(function () {
        fun_SetDC_Slider();
    })
    // 弹幕
    $.get(DanmakuFile,function (xml) {
        fun_ReadDanmaku(xml);
    })
/*
 * 初始化
 */
    DC_Volume.css('top','490px');
    DC_Volume.css('left','740px');
    DC_Font.css('top','480px');
});

// esc退出全屏（监听窗口尺寸改变事件）
window.onresize=function () {
    // 判断浏览器是否全屏
    var isFull =  document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
    if(isFull === undefined)
    {
        isFull = false;
    }
    if (isFull==false && isFullScreen==true)
    {
        // 退出全屏
        fun_FullScreen();
    }
}
// ie按esc退出全品
document.onkeydown=function(ev)
{
    var oEvent=ev||event;//获取事件对象(IE和其他浏览器不一样，这里要处理一下浏览器的兼容性event是IE；ev是chrome等)
    //Esc键的keyCode是27
    if(oEvent.keyCode==27)
    {
        if (isFullScreen==true)
        {
            // 退出全屏
            fun_FullScreen();
        }
    }
}
/*
 *  界面调用的函数
 */
// 播放或暂停
function fun_StartPause() {
    if(Video[0].paused)
    {
        Video[0].play();
        Btn_StartPause.text('‖');
    }else {
        Video[0].pause();
        Btn_StartPause.text('▶');
    }
}
// 设置是否静音
function SetVolumeMuted() {
    if(Video[0].muted)
    {
        Video[0].muted=false;
        Btn_Volume.text('♬');
    }else {
        Video[0].muted=true;
        Btn_Volume.text('×');
    }
}
// 设置音量
function SetVolume() {
    var volume=1-event.offsetY/parseInt(DC_VolumeSlider.css('height'));
    Video[0].volume=volume;
    DC_VolumeSliderTracker.css('height',event.offsetY/parseInt(DC_VolumeSlider.css('height'))*100+'%');
}
// 全屏
function fun_FullScreen() {
    if(isFullScreen)
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
        } else if (document.msExitFullscreen){
            document.msExitFullscreen();
            exitFullSrceen();
            isFullScreen=false;
        }
    }else{
        // 进入全屏
        if(Danmaku[0].webkitRequestFullScreen){
            Danmaku[0].webkitRequestFullScreen();
            setFullScreenSize();
            isFullScreen=true;
        }else if(Danmaku[0].mozRequestFullScreen){
            Danmaku[0].mozRequestFullScreen();
            setFullScreenSize();
            isFullScreen=true;
        }else if(Danmaku[0].requestFullScreen){
            Danmaku[0].requestFullscreen();
            setFullScreenSize();
            isFullScreen=true;
        }else if (Danmaku[0].msRequestFullscreen){
            Danmaku[0].msRequestFullscreen();
            setFullScreenSize();
            isFullScreen=true;
        }else{
            //浏览器不支持全屏API或已被禁用
        }
    }
    // 进入全屏后设置弹幕播放器控件尺寸
    function setFullScreenSize() {
        // 延迟响应时间，否则无法设置尺寸
        setTimeout(function () {
            Danmaku.css('width','100%');
            Danmaku.css('height','100%');
            Danmaku_Player.css('width','100%');
            Danmaku_Player.css('height',parseInt(Danmaku.css('height'))-parseInt(Danmaku_Controller.css('height'))+'px');
            Player_Danmaku.css('width','100%');
            Player_Danmaku.css('height',parseInt(Danmaku.css('height'))-parseInt(Danmaku_Controller.css('height'))+'px');
            Danmaku_Controller.css('width','100%');
            DC_Slider.css('width',parseInt(Danmaku.css('width'))-parseInt(Btn_StartPause.css('width'))-parseInt($('.DC_VideoTime').css('width'))-parseInt(Btn_Volume.css('width'))-parseInt(Btn_FullScreen.css('width'))-1+'px');
            DC_Volume.css('left',parseInt(Danmaku_Controller.css('width'))-parseInt(Btn_FullScreen.css('width'))-parseInt(Btn_Volume.css('width'))+'px');
            DC_Volume.css('top',parseInt(Danmaku_Player.css('height'))-parseInt(DC_Volume.css('height'))+2+'px');
            DC_Font.css('top',parseInt(Danmaku_Player.css('height'))-parseInt(DC_Font.css('height'))+30+'px');
            DC_Input.css('width',parseInt(Danmaku_Controller.css('width'))-parseInt(DC_Btn_Send.css('width'))-parseInt(DC_Btn_Font.css('width'))-4+'px');
            HideController.css('display','block');
            HideController.css('top',parseInt(Danmaku_Player.css('height'))-parseInt(HideController.css('height'))+'px');
        },500);
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
}
// 获取视频当前时长
function fun_GetCurrentTime() {
    $('#VT_TimeNow').text(formatSeconds(Video[0].currentTime));
}
// 获取视频总时长
function fun_GetDuration() {
    $('#VT_TimeTotal').text(formatSeconds(Video[0].duration));
}
// 获取视频进度
function fun_UpdateSliderTracker() {
    DC_SliderTracker.css('width',(parseFloat(Video[0].currentTime)/parseFloat(Video[0].duration)*100).toFixed(2)+'%');
}
// 用户设置视频进度
function fun_SetDC_Slider() {
    var x=event.offsetX;
    var DC_Slider_Percent=parseInt(x)/parseInt(DC_Slider.css('width'));
    Video[0].currentTime=Video[0].duration*DC_Slider_Percent;
}
// 读取弹幕文件

// 按时发射弹幕（优化后，防止多次读取弹幕文件）
var arr_Time =new Array(); //定义全局时间
var arr_Text =new Array(); //定义全局弹幕内容
var arr_FontSize=new Array(); //定义弹幕字体大小
var arr_Color=new Array(); //定义彩色弹幕
function fun_ReadDanmaku(xml) {
    $(xml).find('d').each(function () {
        var p=$(this).attr('p').split(',');
        arr_Time.push(parseFloat(p[0]).toFixed(1));
        arr_FontSize.push(p[2]);
        // 10进制转换16进制颜色
        var color=parseInt(p[3]).toString(16);
        if (color.length<6)
        {
            var difference=6-color.length;
            for (var i=1; difference>i;i++)
            {
                color='0'+color;
            }
        }
        arr_Color.push(color);
        // 获取弹幕内容，存入数组
        arr_Text.push($(this).context.innerHTML);
    })
}
function fun_AutoDanmaku() {
    for (var i = 0; i < arr_Time.length; i++) {
        var CurrentTim = Video[0].currentTime.toFixed(1);
        if (CurrentTim == arr_Time[i]) {
            var x = parseInt(Video.width());
            var y = Math.abs(Math.random() * (Video.height()) - 60).toFixed(0);
            var content = $('<div style="position: absolute;color: #ffffff; white-space: nowrap;font-size: '+arr_FontSize[i]+'px;color: #'+arr_Color[i]+'">' + arr_Text[i] + '</div>');
            content.css('left', x + 'px');
            content.css('top', y + 'px');
            Player_Danmaku.append(content);
            content.animate({left: -1024}, 16000, function () {
                $(this).remove();
            })
        }
    }
}
// 发送弹幕
function Fun_SendDanmaku() {
    var x = parseInt(Video.width());
    var y = Math.abs(Math.random() * (Video.height()) - 60).toFixed(0);
    var content = $('<div style="position: absolute;color: #ffffff; white-space: nowrap;font-size: 16px;color: #FFFFFF">' + DC_Input.val() + '</div>');
    content.css('left', x + 'px');
    content.css('top', y + 'px');
    Player_Danmaku.append(content);
    content.animate({left: -1024}, 16000, function () {
        $(this).remove();
    })
    $.post('WirteDanmakuXML.php',{file:DanmakuFile,time:Video[0].currentTime,text:DC_Input.val()});
    //console.log(DanmakuFile);
}
// 将秒数换成时分秒格式
function formatSeconds(value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
        if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
        }
    }
    var result = ""+parseInt(theTime);
    if(theTime1 > 0) {
        result = ""+parseInt(theTime1)+":"+result;
    }
    if(theTime2 > 0) {
        result = ""+parseInt(theTime2)+":"+result;
    }
    return result;
}