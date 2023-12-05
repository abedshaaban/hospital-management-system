<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

include("../connection.php");
include("./util.php");

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);

$phone_nb_to_be = $_POST["phone_nb"] ?? $data["phone_nb"];
$country_to_be = $_POST["country"] ?? $data["country"];
$city_to_be = $_POST["city"] ?? $data["city"];
$zip_code_to_be = $_POST["zip_code"] ?? $data["zip_code"];
$st_referal_phone_nb_to_be = $_POST["1st_referal_phone_nb"] ?? $data["1st_referal_phone_nb"];
$nd_referal_phone_nb_to_be = $_POST["2nd_referal_phone_nb"] ?? $data["2nd_referal_phone_nb"];


if ($response["status"] === false) {
    echo json_encode($response);
    exit;
    
}else{
    $q = $mysqli->prepare("
    UPDATE
        `contacts`
    SET
        `phone_nb` = ?,
        `country` = ?,
        `city` = ?,
        `zip_code` = ?,
        `1st_referal_phone_nb` = ?,
        `2nd_referal_phone_nb` = ?
    WHERE
        `id`= ?
    ");

    $q->bind_param(
        "sssssss",
        $phone_nb_to_be,
        $country_to_be,
        $city_to_be,
        $zip_code_to_be,
        $st_referal_phone_nb_to_be,
        $nd_referal_phone_nb_to_be,
        $decoded_res["data"]->uuid
    );
    $q->execute();

    $response["status"] = true;
    $response["data"] = null;

    echo json_encode($response);
}
