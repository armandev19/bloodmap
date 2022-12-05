<?php
$conn = mysqli_connect('localhost', 'root', 'YgtDGdmoEn'); 
$database = mysqli_select_db($conn, 'bloodmap');

$response = array();
$qty = $_POST['qty'];
$bloodtype = $_POST['bloodtype'];
$purpose = $_POST['purpose'];
$request_number = "R".date("Ymdhis");
$insertQuery = "INSERT INTO blood_request(qty, bloodtype, purpose, request_number, `status`)VALUES('$qty','$bloodtype','$purpose','$request_number', 'Pending')";
$return = mysqli_query($conn, $insertQuery);
if ($return){
      $response['status'] = 'success';
}else{
      $response['status'] = 'failed';
}
echo json_encode($response);

?>