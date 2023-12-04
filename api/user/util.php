<?php
require dirname(__DIR__) . '/vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);

$key = "secret_key_here";
$alg = "HS256";
$user_jwt = $_POST["token"] ?? $data["token"];

$decoded_res = [];

try {
    $decoded = JWT::decode($user_jwt, new key($key, $alg));
    $decoded_res["status"] = true;
    $decoded_res["data"] = $decoded;
} catch (Exception $e) {
    $decoded_res["status"] = false;
    $decoded_res["error"]=  $e->getMessage();
}