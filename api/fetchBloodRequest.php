<?php
$conn = mysqli_connect('localhost', 'root', ''); 
$database = mysqli_select_db($conn, 'bloodmap');

$response = array();
$selectQuery = "SELECT * FROM blood_request";
$return = mysqli_query($conn, $selectQuery);
if ($return){
      $rowcount = mysqli_num_rows($return);
      if($rowcount > 0){
            $dataArr = mysqli_fetch_array($return);
            $response['data'] = $dataArr;
      }else{
            $response['data'] = [];
      }
}else{
      $response['data'] = [];
}

echo json_encode($response);

?>