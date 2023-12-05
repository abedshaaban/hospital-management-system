<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

include("../connection.php");
include("./util.php");


$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);

$first_name_to_be = $_POST["first_name"] ?? $data["first_name"];
$last_name_to_be = $_POST["last_name"] ?? $data["last_name"];
$birth_date_to_be = $_POST["birth_date"] ?? $data["birth_date"];

if ($response["status"] === true) {

    $q = $mysqli->prepare("
    UPDATE
        `users`
    SET
        `first_name` = ?,
        `last_name` = ?,
        `birth_date` = ?
    WHERE
        `uuid` = ?
    ");

    $q->bind_param(
        "ssss",
        $first_name_to_be,
        $last_name_to_be,
        $birth_date_to_be,
        $decoded_res["data"]->uuid
    );
    $q->execute();

    $response["data"]["first_name"] = $first_name_to_be;
    $response["data"]["last_name"] = $last_name_to_be;
    $response["data"]["birth_date"] = $birth_date_to_be;

    echo json_encode($response);

}else{   
    echo json_encode($response);
}
