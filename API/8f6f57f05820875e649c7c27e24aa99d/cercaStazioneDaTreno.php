<?php
//required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$URL = "http://viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno";

$id = $_GET['id']; 

$query = $URL . "/cercaNumeroTrenoTrenoAutocomplete/" . $id;

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

$risultato = array();

for ($index = 0; $index < count(explode("\n", (string)$response)) - 1; $index++) {
    $x = (object)array('idTreno' => explode(" - ",explode("|",explode("\n", (string)$response)[$index])[0])[0], 
                                'nomeStazione' => explode(" - ",explode("|",explode("\n", (string)$response)[$index])[0])[1],
                                'idStazione' => explode("-",explode("|",explode("\n", (string)$response)[$index])[1])[1]);
    array_push($risultato,$x);
}


if (count($risultato) == 1) {
    $query = $URL . "/andamentoTreno/" . (string)$risultato[0]->idStazione . "/" . (string)$risultato[0]->idTreno;

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
    print_r(json_encode($response));
}
else {
    print_r(json_encode($risultato));
}
?>

