<?php
/**
 * Created by PhpStorm.
 * User: Rokka
 * Date: 2017/5/21
 * Time: 17:07
 */

/*
 * 添加一条新弹幕
*/
// 获取post
$file=$_POST['file'];
$time=$_POST['time'];
$text=$_POST['text'];
// 创建DOMDocument对象
$dom=new DOMDocument();
// 读取xml文件
$dom->load($_SERVER['DOCUMENT_ROOT'].$file);
// 获取<i>节点
$i=$dom->getElementsByTagName('i')->item(0);
// 创建<d>节点，并设置值
$d=$dom->createElement('d',$text);
// 设置参数p
$d->setAttribute('p',$time.",1");
// 添加<d>节点到尾部
$i->appendChild($d);
// 保存弹幕文件
$dom->save($_SERVER['DOCUMENT_ROOT'].$file);
