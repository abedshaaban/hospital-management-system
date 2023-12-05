<?php
require __DIR__ . '/vendor/autoload.php';

use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

include("connection.php");

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);

$email = $_POST["email"] ?? $data["email"];
$pwd = $_POST["password"] ?? $data["password"];

$q= $mysqli->prepare("select 
    u.uuid,
    u.email,
    u.password,
    u.first_name,
    u.last_name,
    u.birth_date,
    u.account_status,
    r.role

from `users` u 
join roles r on  u.privilege = r.id
where `email`=?");

$q->bind_param("s", $email);
$q->execute();
$q->store_result();
$q->bind_result(
    $uuid,
    $email,
    $db_password,
    $first_name,
    $last_name,
    $birth_date,
    $account_status,
    $role,
);
$q->fetch();

$q_rows = $q->num_rows;
$response = [];

$key = "secret_key_here";
$payload = [];
$alg = "HS256";

if ($q_rows == 0) {
    $response["status"] = false;
    $response["error"] = "incorrect credentials no user found.";
    
} else {
    if(password_verify($pwd, $db_password,)){
        $payload["uuid"] =  $uuid;
        $payload["email"] =  $email;
        $payload["pwd"] =  $db_password;
        
        $jwt = JWT::encode($payload, $key, $alg);

        $response["status"] = true;
        $response["data"]["email"] = $email;
        $response["data"]["first_name"] = $first_name;
        $response["data"]["last_name"] = $last_name;
        $response["data"]["birth_date"] = $birth_date;
        $response["data"]["account_status"] = $account_status;
        $response["data"]["privilege"] = $role;
        $response["data"]["token"] = $jwt;

    } else {
        $response["status"] = false;
        $response["error"] = "incorrect credentials no user found.";
    }
}

echo json_encode($response);