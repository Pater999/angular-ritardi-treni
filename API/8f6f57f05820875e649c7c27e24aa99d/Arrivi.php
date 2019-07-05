<?php
//required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$URL = "http://viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno";

$dateS=date('D%20M%20d%20Y%20H:i:s%20')."GMT+0100%20(ora%20solare%20Europa%20occidentale)";
$id = $_GET['id']; 

$query = $URL . "/arrivi/" . $id . "/";
$query = $query.$dateS;


$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => $query,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_SSL_VERIFYPEER => FALSE,
  CURLOPT_SSL_VERIFYHOST => FALSE,
));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);
print_r($response);
?>

