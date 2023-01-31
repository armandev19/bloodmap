<?php
include "db.php";

$response = array();
$testArr = array();

$donated_qty = $_POST['donated_qty'];
$bld_request_number = $_POST['bld_request_number'];
$donator = $_POST['donator'];

$insertQuery = "INSERT INTO donation_history(donated_qty, bld_request_number, donator)VALUES('$donated_qty','$bld_request_number','$donator')";
$return = mysqli_query($conn, $insertQuery);
if ($return){
      $response['status'] = 'success';
}else{
      $response['status'] = 'failed';
}

echo json_encode($response);

?>