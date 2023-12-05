<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

include("connection.php");

function UUID() {
    $data = random_bytes(16);
    assert(strlen($data) == 16);

    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);


$uid = UUID();
$email = $data["email"];
$pwd = $data["password"];
$first_name = $data["first_name"];
$last_name = $data["last_name"];
$birth_date = date('Y-m-d', strtotime($data["birth_date"]));

$hash_pwd = password_hash($pwd, PASSWORD_DEFAULT);



$q = $mysqli->prepare("insert into users 
(uuid, email, password, first_name, last_name, birth_date)
values (?,?,?,?,?,?)");

$q->bind_param("ssssss", $uid, $email, $hash_pwd, $first_name, $last_name, $birth_date);
$q->execute();

$response = [];

$response['status'] = true;

echo json_encode($response);
