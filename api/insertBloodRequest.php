<?php
include "db.php";

$response = array();
$qty = $_POST['qty'];
$bloodtype = $_POST['bloodtype'];
$purpose = $_POST['purpose'];
$request_number = "R".date("Ymdhis");
$user_id = $_POST['userID'];
$date = $_POST['date'];

$insertQuery = "INSERT INTO blood_request(qty, bloodtype, purpose, request_number, `status`, `user_id`, `date_needed`)VALUES('$qty','$bloodtype','$purpose','$request_number', 'Pending', '$user_id', '$date')";
$return = mysqli_query($conn, $insertQuery);
// if ($return){
//       $response['status'] = 'success';
// }else{
//       $response['status'] = 'failed';
// }
$response['status'] = $conn;
echo json_encode($response);

?>