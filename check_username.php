<?php 
    //controllo se username presente nel database
    require_once 'dbconfig.php'; //inclusione database 

    //controllo se dati fetch sono stati passati

    if(!isset($_GET['q'])){
        echo 'Errore.';
        exit;
    }
    header('Content-Type: application/json');
    
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['username'], $dbconfig['password'], $dbconfig['database']);
    $username = mysqli_real_escape_string($conn,$_GET['q']);

    $query = "SELECT username from users WHERE username = '".$username."'";

    
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

    echo json_encode(array('exists' => mysqli_num_rows($res) > 0 ? true : false));
    mysqli_close($conn);
    
?>