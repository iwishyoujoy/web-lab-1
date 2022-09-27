<?php
include 'validator.php';
header('Access-Control-Allow-Origin: *');
date_default_timezone_set('Europe/Moscow');



function check_coords($x, $y, $r) {
    $flag = false;
    if ($x >= 0 && $y >= 0 && abs($x + $y) <= $r*3/2) { //y<=-(x-r/2)+r  => y<=-x+3r/2 => x+y<=3r/2
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
                <td width='10%'>$x</td>
                <td width='10%'>$y</td>
                <td width='10%'>$r</td>
                <td width='20%'>$current_time</td>
                <td width='30%'>$finish_time</td>
                <td width='40%'>$checked_dot</td>
            </tr> ");
    } else {
        exit("<tr><td colspan=6 id='error'>Серверу переданы неверные данные! Проверьте, что все данные введены!</td></tr>");
    }
} else {
    exit("1");
}
// $x = $_GET["x"];
// $y = $_GET["y"];
// $r = $_GET["r"];
// exit ("$x $y $r");