<?php
$conn = mysqli_connect('localhost', 'root', ''); 
$database = mysqli_select_db($conn, 'bloodmap');

$response = array();
$testArr = array();
$selectQuery = "SELECT * FROM blood_request";
$return = mysqli_query($conn, $selectQuery);
var_dump($return);
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