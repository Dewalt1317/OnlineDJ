<?php
include "response.php";

//Принимаем данные с фронта
$data = json_decode(file_get_contents("php://input"));
require "DB-Config.php";
$test1 = $mysql->query("SELECT `title`, `album`, `musical group`, `video shot SRC`, `audio SRC`, `cover SRC`FROM `track` LEFT JOIN `album` ON `album id` = `album`.`id` LEFT JOIN `artist` ON `Artist id` = `artist`.`id` WHERE `track`.`id` = $data  ");
$test2 = $test1->fetch_assoc();
$test2 = ["title" => $test2["title"], "album" => $test2["album"], "musical group" => $test2['musical group'], "video shot SRC" => $test2["video shot SRC"], "audio SRC" => $test2["audio SRC"], "cover SRC" => $test2['cover SRC']];
systemResponse($test2);