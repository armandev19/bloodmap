<?php
$conn = mysqli_connect('localhost', 'root', 'YgtDGdmoEn'); 
$database = mysqli_select_db($conn, 'bloodmap');

$response = array();
$testArr = array();
$selectQuery = "SELECT * FROM donation_history";
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