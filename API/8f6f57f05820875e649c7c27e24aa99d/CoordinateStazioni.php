<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$csv = array_map('str_getcsv', file('stations.csv'));
$Coordinate = array();
foreach ($csv as $array)
{
foreach ($array as $data)
{
	$Coordinata = (object)array('nome' => explode(";", $data)[0], 'id' => explode(";", $data)[1], 'region' => explode(";", $data)[2], explode(";", $data)[3], 'city' => explode(";", $data)[4], 'lat' => explode(";", $data)[5], 'lon' => explode(";", $data)[6] );
    array_push($Coordinate,$Coordinata);
}
}
array_splice($Coordinate, 0, 1);
print_r(json_encode($Coordinate));
?>