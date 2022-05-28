
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
    else if(!isset($_GET["q"])){
        header("Location: home.php");
        exit;
    }
    //content is json
    header('Content-Type: application/json');

    //database connection
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['username'], $dbconfig['password'], $dbconfig['database']);

    $STRING = mysqli_real_escape_string($conn,$_GET['q']);
    //query to fetch posts
    $query = "SELECT * FROM posts where title LIKE  '%".$STRING."%' OR story LIKE '%".$STRING."%'";
    $res = mysqli_query($conn,$query);
    if(mysqli_num_rows($res)>0){
        while($row = mysqli_fetch_assoc($res)){
        $query2 = "SELECT personID,username from users where personID = '".$row['userID']."'";
        $res2 = mysqli_query($conn,$query2);
        $idcompare = 0;
        
        while($row2 = mysqli_fetch_assoc($res2)){
            $username = $row2['username'];
        }

        
        

        $time = getTime($row['time']);
        

        $array[]=array(
            'owner' => 'frb',
            'postid' => $row['postID'],
            'username' => $username,
            'title' => $row['title'],
            'story' => $row['story'],
            'time' => $time,
            'search' => $STRING,
            'fox' => $row['fox'],
            'numberOfResults' => mysqli_num_rows($res)
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

