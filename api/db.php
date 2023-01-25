<?php
$conn = mysqli_connect('localhost', 'geodsyxv_bs', 'CYw0PODZ5zne'); 
$database = mysqli_select_db($conn, 'geodsyxv_bloodmap');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);

?>