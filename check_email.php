<?php 
    //controllo se email presente nel database
    require_once 'dbconfig.php'; //inclusione database 

    //controllo se dati fetch sono stati passati

    if(!isset($_GET['q'])){
        echo 'Errore.';
        exit;
    }
    header('Content-Type: application/json');
    
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['username'], $dbconfig['password'], $dbconfig['database']);
    $email = mysqli_real_escape_string($conn,$_GET['q']);

    $query = "SELECT * from users WHERE email = '".$email."'";

    
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

    echo json_encode(array('exists' => mysqli_num_rows($res) > 0 ? true : false));
    mysqli_close($conn);
    
?>