<?php
include "db.php";

$response = array();
$testArr = array();
$access = $_POST['userAccess'];
$user_id = $_POST['userID'];
$request_number = $_POST['request_number']

$temp_blood_req = mysqli_query($conn, "SELECT qty FROM blood_request WHERE `request_number` = '$request_number'");
$blood_req = mysqli_fetch_row($temp_blood_req);

$temp_donation_data = mysqli_query($conn, "SELECT donated_qty FROM donation_history WHERE `bld_request_number` = '$request_number'");
$donation_data = mysqli_fetch_array($temp_donation_data);

$total_donated = 0;
while($donatationArr = $donation_data){
      $total_donated += $donatationArr['donated_qty'];
}

$blood_req->donated_qty = $total_donated;
$blood_req->remaining_qty = $blood_req->qty - $total_donated;

$response['data'] = $blood_req;

echo json_encode($response);

?>