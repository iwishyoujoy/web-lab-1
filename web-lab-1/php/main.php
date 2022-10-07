<?php
include 'validator.php';
header('Access-Control-Allow-Origin: *');
date_default_timezone_set('Europe/Moscow');


function check_coords($x, $y, $r) {
    $flag = false;
    if ($x >= 0 && $y >= 0 && $y + 2*$x <= $r) { //y<=-2x+R
        $flag = true;
    }
    if ($x <= 0 && $y <= 0 && $x <= $r && $y <= $r) {
        $flag = true;
    } 
    if ($x >= 0 && $y <= 0 && $x >= -$r && pow($x, 2) + pow($y, 2) <= pow($r, 2)) {
        $flag = true;
    }
    return $flag; 
}


$current_time = date("H:i:s");
$starting_time = microtime(true);

if (isset($_GET["x"]) && isset($_GET["y"]) && isset($_GET["r"])) {
    $validator = new Validator;
    if ($validator->validate($_GET["x"], $_GET["y"], $_GET["r"])) {
        $x = floatval($_GET["x"]);
        $y = floatval($_GET["y"]);
        $r = intval($_GET["r"]);
        // $x = $_GET["x"];
        // $y = $_GET["y"];
        // $r = $_GET["r"];
        
        $checked_dot = check_coords($x, $y, $r) ? "попадание!" : "промах!";

        $finish_time = round((microtime(true) - $starting_time) * 1000000, 2); //выписать единицы измерения
        
        exit("
            <tr>
                <td>$x</td>
                <td>$y</td>
                <td>$r</td>
                <td>$current_time</td>
                <td>$finish_time</td>
                <td>$checked_dot</td>
            </tr> ");
    } else {
        exit("<tr><td colspan=6 id='error'>Серверу переданы неверные данные! Проверьте, что все данные введены!</td></tr>");
    }
} else {
    exit("1");
}