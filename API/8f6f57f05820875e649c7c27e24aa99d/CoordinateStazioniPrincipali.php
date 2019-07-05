<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$csv = array_map('str_getcsv', file('stations.csv'));
$Coordinate = array();
$CoordinatePrincipali = array();
foreach ($csv as $array)
{
foreach ($array as $data)
{
	$Coordinata = (object)array('nome' => explode(";", $data)[0], 'id' => explode(";", $data)[1], 'region' => explode(";", $data)[2], explode(";", $data)[3], 'city' => explode(";", $data)[4], 'lat' => explode(";", $data)[5], 'lon' => explode(";", $data)[6] );
    array_push($Coordinate,$Coordinata);
}
}
array_splice($Coordinate, 0, 1);
array_push($CoordinatePrincipali,$Coordinate[2710]);
array_push($CoordinatePrincipali,$Coordinate[2166]);
array_push($CoordinatePrincipali,$Coordinate[1446]);
array_push($CoordinatePrincipali,$Coordinate[967]);
array_push($CoordinatePrincipali,$Coordinate[2821]);
array_push($CoordinatePrincipali,$Coordinate[282]);
array_push($CoordinatePrincipali,$Coordinate[1618]);
array_push($CoordinatePrincipali,$Coordinate[195]);
array_push($CoordinatePrincipali,$Coordinate[2666]);
array_push($CoordinatePrincipali,$Coordinate[1080]);
array_push($CoordinatePrincipali,$Coordinate[2802]);
array_push($CoordinatePrincipali,$Coordinate[253]);
array_push($CoordinatePrincipali,$Coordinate[395]);
array_push($CoordinatePrincipali,$Coordinate[2434]);
array_push($CoordinatePrincipali,$Coordinate[1251]);
array_push($CoordinatePrincipali,$Coordinate[95]);
array_push($CoordinatePrincipali,$Coordinate[1774]);
array_push($CoordinatePrincipali,$Coordinate[1828]);
array_push($CoordinatePrincipali,$Coordinate[644]);
array_push($CoordinatePrincipali,$Coordinate[2837]);
array_push($CoordinatePrincipali,$Coordinate[1897]);
array_push($CoordinatePrincipali,$Coordinate[2610]);
array_push($CoordinatePrincipali,$Coordinate[2699]);
array_push($CoordinatePrincipali,$Coordinate[2073]);
array_push($CoordinatePrincipali,$Coordinate[849]);
array_push($CoordinatePrincipali,$Coordinate[2632]);
array_push($CoordinatePrincipali,$Coordinate[2109]);
array_push($CoordinatePrincipali,$Coordinate[646]);
array_push($CoordinatePrincipali,$Coordinate[977]);
array_push($CoordinatePrincipali,$Coordinate[2059]);
array_push($CoordinatePrincipali,$Coordinate[2002]);
array_push($CoordinatePrincipali,$Coordinate[846]);
array_push($CoordinatePrincipali,$Coordinate[2743]);
array_push($CoordinatePrincipali,$Coordinate[1796]);
array_push($CoordinatePrincipali,$Coordinate[1150]);
array_push($CoordinatePrincipali,$Coordinate[1704]);
print_r(json_encode($CoordinatePrincipali));
?>