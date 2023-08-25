<?php
//Подключаемся к БД
$mysql = new mysqli('127.0.0.1:3306', 'OnlineDJ', '/pBwYAS]povt/)zk', 'onlinedj');

// Установка кодировки соединения
$mysql->query("SET NAMES utf8");
$mysql->query("SET CHARACTER SET utf8");
$mysql->query("SET character_set_connection=utf8");

