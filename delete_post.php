
<?php
    //include db
    require_once 'dbconfig.php';
    //check if user has logged in
    session_start();
    if(!isset($_SESSION['username'])){
        //redirect alla home
        header("Location: login_page.php");
        exit;
    }
    if(!isset($_GET['q'])){
        //redirect alla home
        header("Location: home.php");
        exit;
    }
    //content is json
    header('Content-Type: application/json');


    $deletable=false;
    //database connection
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['username'], $dbconfig['password'], $dbconfig['database']);
    $postID = mysqli_real_escape_string($conn,$_GET['q']);
    $username;
    //query to fetch posts
    $query = "SELECT username,personID from users where username='".$_SESSION['username']."'";
    $res = mysqli_query($conn,$query);
    while($row = mysqli_fetch_assoc($res)){
        $userID = $row['personID'];
        $username = $row['username'];
    }
    $query2 = "DELETE from posts where postID = ".$postID." AND userID = '".$userID."'";
    
    if(mysqli_query($conn,$query2)){
        $array[] = array('deleted' => true,'rows' => mysqli_affected_rows($conn));
    }
    else $array[] = array('deleted' => false);

    echo json_encode($array);
    mysqli_close($conn);

?>

