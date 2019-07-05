<?php
//required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$URL = "http://viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno";

$nome = rawurldecode($_GET['nome']); 
if ($nome == "")
{
    $nome = "a";
}
$query = $URL . "/autocompletaStazione/" . rawurlencode($nome);
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => $query,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

$stazioni = array();

for ($i = 0; $i < count(explode("\n", (string)$response)) -1 ; $i++) {

    $x = (object)array('Nome' => explode("|", explode("\n", (string)$response)[$i])[0], 'Id' => explode("|", explode("\n", (string)$response)[$i])[1]);
	array_push($stazioni, $x);
}
print_r(json_encode($stazioni));
?>