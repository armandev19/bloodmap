<?php
$conn = mysqli_connect('localhost', 'root', ''); 
$database = mysqli_select_db($conn, 'bloodmap');

$obj = file_get_contents('php://input');
$obj = json_decode($obj, true);

// var_dump($_POST);
$dataArr = array();
$username = $_POST['username'];
$password = $_POST['password'];
$firstname = $_POST['firstname'];
$lastname = $_POST['middlename'];
$phone_number = $_POST['lastname'];
$address = $_POST['address'];
$email = $_POST['email'];
$bloodtype = $_POST['bloodtype'];
$gender = $_POST['gender'];

$insertQuery = "INSERT INTO users (`username`, `password`, `firstname`, `middlename`, `lastname`, `phone_number`, `address`, `email`, `gender`, `bloodtype`) VALUES ('$username', '$password', '$firstname', '$bloodtype', '$lastname', '$phone_number', '$address', '$email', '$gender', '$bloodtype')";

$return = mysqli_query($conn, $insertQuery);
if($return){
      $message="User added";
}else{
      $message="Failed adding user";
}

$response = array();
$response['message'] = $message;
$response['status'] = "success";

echo json_encode($response);

?>