<?php
$conn = mysqli_connect('localhost', 'root', 'YgtDGdmoEn'); 
$database = mysqli_select_db($conn, 'bloodmap');

$user_id = $_POST['user_id'];
$firstname = $_POST['firstname'];
$middlename = $_POST['middlename'];
$lastname = $_POST['lastname'];
$age = $_POST['age'];
$phone_number = $_POST['phone_number'];
$address = $_POST['address'];
$email = $_POST['email'];


$updateQuery = "UPDATE users SET `firstname`='$firstname', `middlename`='$middlename', `lastname`='$lastname', `age`='$age', `phone_number`='$phone_number', `email`='$email', `address`='$address' WHERE `id`='$user_id'";
$return = mysqli_query($conn, $updateQuery);

$newData = "SELECT * FROM users WHERE id='$user_id'";
$returnNewData = mysqli_query($conn, $newData);
if ($return){
        $dataArr = mysqli_fetch_object($returnNewData);
        $response['user_data'] = $dataArr;
        $response['status'] = 'success';
}else{
      $response['status'] = 'failed';
}
echo json_encode($response);

?>