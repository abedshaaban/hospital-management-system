<?php

header("Access-Control-Allow-Origin: *");
include("connection.php");

$email = $_POST["email"];
$pwd = $_POST["password"];

$q= $mysqli->prepare("select 
email, password, first_name, last_name, birth_date, privilege, account_status 
from `users` 
where `email`=?");

$q->bind_param("s", $email);
$q->execute();
$q->store_result();
$q->bind_result(
    $email,
    $db_password,
    $first_name,
    $last_name,
    $birth_date,
    $privilege,
    $account_status
);
$q->fetch();

$q_rows = $q->num_rows;

$response = [];

if ($q_rows == 0) {
    $response["status"] = false;
    $response["error"] = "incorrect credentials no user found.";
    
} else {
    if(password_verify($pwd, $db_password,)){
        $response["status"] = true;
        $response["data"]["email"] = $email;
        $response["data"]["first_name"] = $first_name;
        $response["data"]["last_name"] = $last_name;
        $response["data"]["birth_date"] = $birth_date;
        $response["data"]["privilege"] = $privilege;
        $response["data"]["account_status"] = $account_status;
    } else {
        $response["status"] = false;
        $response["error"] = "incorrect credentials no user found.";
    }
}

echo json_encode($response);