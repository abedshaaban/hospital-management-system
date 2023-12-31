<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

require dirname(__DIR__) . '/vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$headers = getallheaders();

if (!isset($headers['Authorization'])) {
    echo 'Authorization header not found in request';
    exit;
}

if (! preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
    echo 'Token not found in request';
    exit;
}

$key = "secret_key_here";
$alg = "HS256";
$user_jwt = explode(" ", $headers['Authorization'])[1];

$decoded_res = [];

try {
    $decoded = JWT::decode($user_jwt, new key($key, $alg));
    $decoded_res["status"] = true;
    $decoded_res["data"] = $decoded;
} catch (Exception $e) {
    $decoded_res["status"] = false;
    $decoded_res["error"]=  $e->getMessage();
}

if ($decoded_res["status"] === true) {
    $q = $mysqli->prepare("select
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
    $q->bind_param("s", $decoded_res["data"]->email);
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

    if ($q_rows == 0) {
        $response["status"] = false;
        $response["error"] = "incorrect credentials no user found.";
        
    } else {
        if($decoded_res["data"]->pwd === $db_password){
            if ($uuid === $decoded_res["data"]->uuid ) {
                $response["status"] = true;
                $response["data"]["email"] = $email;
                $response["data"]["first_name"] = $first_name;
                $response["data"]["last_name"] = $last_name;
                $response["data"]["birth_date"] = $birth_date;
                $response["data"]["account_status"] = $account_status;
                $response["data"]["privilege"] = $role;
                $response["data"]["token"] = $user_jwt;

            } else {
                $response["status"] = false;
                $response["error"] = "incorrect credentials no user found.";

            }
        } else {
            $response["status"] = false;
            $response["error"] = "incorrect credentials no user found.";
            
        }
    }
} else {
    $response["status"] = false;
    $response["error"] = "invalid token.";
}
