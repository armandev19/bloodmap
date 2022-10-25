<?php
$conn = mysqli_connect('localhost', 'root', ''); 
$database = mysqli_select_db($conn, 'bloodmap');

$obj = file_get_contents('php://input');
$obj = json_decode($obj, true);

var_dump($_POST);
$dataArr = array();
$username = $_POST['email'];
$password = $_POST['password'];
$firstname = $_POST['name'];
$lastname = "";
$phone_number = "";
$address = $_POST['address'];
$email = $_POST['email'];

$insertQuery = "INSERT INTO users (`username`, `password`, `firstname`, `lastname`, `phone_number`, `address`, `email`) VALUES ('$username', '$password', '$firstname', '$lastname', '$phone_number', '$address', '$email')";

$return = mysqli_query($conn, $insertQuery);
if($return){
      $message="User added";
}else{
      $message="Failed adding user";
}

$response = array();
$response['message'] = $message;
echo json_encode($response);

?>