
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
    //content is json
    header('Content-Type: application/json');
    //database connection
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['username'], $dbconfig['password'], $dbconfig['database']);
    $userID = 0;
    $username;
    //query to fetch posts
    $query = "SELECT username,personID from users where username='".$_SESSION['username']."'";
    $res = mysqli_query($conn,$query);
    while($row = mysqli_fetch_assoc($res)){
        $userID = $row['personID'];
        $username = $row['username'];
    }
    $query2 = "SELECT * from posts where userID = '".$userID."' ORDER BY postID DESC";
    $res2 = mysqli_query($conn,$query2);
    if(mysqli_num_rows($res2)>0){
        while($row2 = mysqli_fetch_assoc($res2)){

            $time = getTime($row2['time']);
            /* FRB */
            $array[]=array(
                'postid' => $row2['postID'],
                'username' => $username,
                'title' => $row2['title'],
                'story' => $row2['story'],
                'fox' => $row2['fox'],
                'time' => $time,
                'found' => true
            );
    } 
    
}else $array[] = array('found' => false);

    echo json_encode($array);
    mysqli_close($conn);

    function getTime($timestamp) {      
        // Calcola il tempo trascorso dalla pubblicazione del post       
        $old = strtotime($timestamp); 
        $diff = time() - $old;           
        $old = date('d/m/y', $old);

        if ($diff /60 <1) {
            return intval($diff%60)." secondi fa";
        } else if (intval($diff/60) == 1)  {
            return "un minuto fa";  
        } else if ($diff / 60 < 60) {
            return intval($diff/60)." minuti fa";
        } else if (intval($diff / 3600) == 1) {
            return "un'ora fa";
        } else if ($diff / 3600 <24) {
            return intval($diff/3600) . " ore fa";
        } else if (intval($diff/86400) == 1) {
            return "ieri";
        } else if ($diff/86400 < 30) {
            return intval($diff/86400) . " giorni fa";
        } else {
            return $old; 
        }
    }

?>

