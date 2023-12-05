<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

include("../connection.php");
include("./util.php");


$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);

$user_profile = $_POST["user"] ?? $data["user"];

if ($response["status"] === true) {
    echo $user_profile;

}else{   
    echo json_encode($response);
}