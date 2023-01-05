<?php
$conn = mysqli_connect('localhost', 'root', 'YgtDGdmoEn'); 
$database = mysqli_select_db($conn, 'bloodmap');

$response = array();
$qty = $_POST['qty'];
$bloodtype = $_POST['bloodtype'];
$purpose = $_POST['purpose'];
$request_number = "R".date("Ymdhis");
$user_id = $_POST['userID'];
$insertQuery = "INSERT INTO blood_request(qty, bloodtype, purpose, request_number, `status`, `user_id`)VALUES('$qty','$bloodtype','$purpose','$request_number', 'Pending', '$user_id')";
$return = mysqli_query($conn, $insertQuery);
// if ($return){
//       $response['status'] = 'success';
// }else{
//       $response['status'] = 'failed';
// }
$response['status'] = $conn;
echo json_encode($response);

?>