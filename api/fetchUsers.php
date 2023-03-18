<?php
$conn = mysqli_connect('localhost', 'geodsyxv_bs', 'CYw0PODZ5zne'); 
$database = mysqli_select_db($conn, 'geodsyxv_bloodmap');

$response = array();
$id = $_POST['id'];
$selectQuery = "SELECT * FROM users WHERE id != ";
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