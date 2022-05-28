


<?php
    //avvio sessione
    require_once 'dbconfig.php';
    session_start();
    //verifica accesso
    if(!isset($_SESSION['username'])){
        //redirect alla home
        header("Location: login_page.php");
        exit;
    }

    //se cerchiamo di inviare un post al database
    if(!empty($_POST['title']) && !empty($_POST['story'])){
        $conn = mysqli_connect($dbconfig['host'],$dbconfig['username'],$dbconfig['password'],$dbconfig['database']);
        $title = mysqli_real_escape_string($conn,$_POST['title']);
        $story = mysqli_real_escape_string($conn,$_POST['story']);
        $urlFox = mysqli_real_escape_string($conn,$_POST['urlFox']);
        $ID = null;

        $query1 = "SELECT personID from users where username = '".$_SESSION['username']."'";
        $res = mysqli_query($conn, $query1) or die("Errore: ".mysqli_error($conn));
        while($row = mysqli_fetch_assoc($res)){
            $ID = $row['personID'];
        }

        $query = "INSERT into posts(userID,title,story,fox) values ('$ID',\"$title\",\"$story\",\"$urlFox\")";
        if(mysqli_query($conn,$query)){
            $posted = true;
        }
        else $posted=false;
        mysqli_close($conn);

    }
?>
<html>
    <head>
        <title>FoxLessons</title>
        <link rel="stylesheet" href="style/home.css">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <script src='script/home.js' defer></script>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300&family=PT+Sans&display=swap" rel="stylesheet"> 
    </head>
    <body>
        <header>
            <h3 id="site_name">FoxLessons</h3>
            <nav>
                <div id="userInfo">
                Utente loggato:  <?php echo $_SESSION["username"] ?></div>
                <a id="logout" href="logout_page.php">Logout</a>
            </nav>
        </header>
        <?php
        if(isset($posted)){
                    echo '<div class="messageContainer">
                    <div class="messageTop">Post pubblicato correttamente!<span class="xButton">X</span></div></div>'; //FRB
                } else if($posted = false){
                    echo '<div class="messageContainer">
                    <div class="messageTop">Errore nella pubblicazione del post<span class="xButton">X</span></div></div>'; //FRB
                }
        ?>
        <article class="main">
                <p class="textStart">Leggi e racconta storie di vita vissuta che ti sono servite da lezione! Ovviamente il tutto in forma anonima! L'unica cosa che condividerai sarà il tuo username. Il tutto accompagnato da delle simpatiche volpi che aiuteranno a ridurre il tuo stress!<br> Inizia subito!</p>  
                <div class="buttonsDiv">
                <div class="buttonsDivInside">
                <button class="buttonBig" data-button="show-new-posts">Guarda i nuovi post</button><button class="buttonBig" data-button="write-post">Scrivi un post</button><button class="buttonBig" data-button="your-posts">Vedi i tuoi post</button><button class="buttonBig" data-button="show-random-fox">Volpe random</button>
                <form name="searchPost" method="post" id="searchPost"><label>Cerca nei post <input type="text" name="search" id="searchInput"><input type='submit' value="Cerca"></label>
                </form></div></div>
                <div id="startContent">
                <div class="buttonsDivDelete hidden">Post cancellato correttamente!</div>
                </div>
                
            <div class="buttonsDivEnd hidden">
            <button class="buttonBig" data-button="load-more">Carica più post</button></div>

            <div class="containerForm hidden">
                <form name="storyForm" id="storyForm" method="post">
                    <label name="title">Titolo (max 150 caratteri)</label><input type="text" id="title" name="title" placeholder="Scrivi il tuo titolo...">
                    <label name="story">La tua storia (max 3000 caratteri)</label>
                    <textarea id="story" name="story" placeholder="Scrivi la tua lezione di vita qui..." rows="10" cols="130"></textarea>
                    <input type="hidden" id="urlFox" name="urlFox" value="">
                    <input type="submit" id="submit" value="Invia la tua lezione">
                </form>
            </div>
        </article>
    <footer>
            <h2>FoxLessons - Francesco B. - 1000008032</h2>
    </footer>
    </body>
    
</html>