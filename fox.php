<?php
    //content is json
    header('Content-Type: application/json');

    $url = 'https://randomfox.ca/floof/';
    $curl = curl_init();
    curl_setopt($curl,CURLOPT_URL,$url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); //per non far ritornare booleano
    $res =curl_exec($curl);
    curl_close($curl);
    echo ($res);
    

?>