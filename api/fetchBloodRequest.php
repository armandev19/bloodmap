<?php
$conn = mysqli_connect('localhost', 'root', 'YgtDGdmoEn'); 
$database = mysqli_select_db($conn, 'bloodmap');

$response = array();
$testArr = array();
$access = $_POST['userAccess'];
$user_id = $_POST['userID'];

if($access == 'Admin'){
      $selectQuery = "SELECT * FROM blood_request WHERE `status` = 'Pending'";
}else{
      $selectQuery = "SELECT * FROM blood_request WHERE `status` = 'Pending' AND `user_id` = '$user_id'";
}
$return = mysqli_query($conn, $selectQuery);
if ($return){
      $rowcount = mysqli_num_rows($return);
      if($rowcount > 0){
            while($dataArr = mysqli_fetch_assoc($return)){
                  $testArr[] = $dataArr;
            }
            $response['data'] = $testArr;
      }else{
            $response['data'] = [];
      }
}else{
      $response['data'] = [];
}

echo json_encode($response);

?>