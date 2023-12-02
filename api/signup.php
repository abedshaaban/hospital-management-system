<?php

header("Access-Controll-Allow-Origin:*");
include("connection.php");

function UUID() {
    $data = random_bytes(16);
    assert(strlen($data) == 16);

    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

$uid = UUID();
$email = $_POST["email"];
$pwd = $_POST["password"];
$first_name = $_POST["first_name"];
$last_name = $_POST["last_name"];
$birth_date = $_POST["birth_date"];

$hash_pwd = password_hash($pwd, PASSWORD_DEFAULT);



$q = $mysqli->prepare("insert into users 
(uuid, email, password, first_name, last_name, birth_date)
values (?,?,?,?,?,?)");

$q->bind_param("sssssi", $uid, $email, $hash_pwd, $first_name, $last_name, $birth_date);
$q->execute();

$response = [];

$response['status'] = true;

echo json_encode($response);
