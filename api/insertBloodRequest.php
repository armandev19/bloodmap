<?php
$conn = mysqli_connect('localhost', 'root', ''); 
$database = mysqli_select_db($conn, 'bloodmap');

$response = array();
$qty = $_POST['qty'];
$bloodtype = $_POST['bloodtype'];
$insertQuery = "INSERT INTO blood_request(qty, bloodtype)VALUES('$qty','$bloodtype')";
$return = mysqli_query($conn, $insertQuery);
if ($return){
      $response['status'] = 'success';
}else{
      $response['status'] = 'failed';
}
echo json_encode($response);

?>