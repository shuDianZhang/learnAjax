<?php
header('content-type:text/html;charset="utf-8"');
error_reporting(0);
$news=array(
    array('title'=>'这是新闻一','data'=>'2017/2/2'),
    array('title'=>'这是新闻二','data'=>'2017/2/1'),
    array('title'=>'这是新闻三','data'=>'2017/2/1'),
    array('title'=>'这是新闻四','data'=>'2017/2/1'),
    array('title'=>'这是新闻五','data'=>'2017/2/2'),
    array('title'=>'这是新闻六','data'=>'2017/2/1'),
    array('title'=>'这是新闻七','data'=>'2017/2/1'),
    array('title'=>'这是新闻八','data'=>'2017/2/2'),
);

echo json_encode($news);