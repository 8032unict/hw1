


<?php
    include 'dbconfig.php';
    //avvio sessione
    session_start();
    //verifica accesso
    if(isset($_SESSION['username'])){
        //redirect alla home
        header("Location: home.php");
        exit;
    }

    //se abbiamo dati post con username e password
    if(isset($_POST["username"]) && isset($_POST["password"]) && !empty($_POST["username"]) && !empty($_POST["password"])){
        //connessione al database
        $conn = mysqli_connect($dbconfig['host'],$dbconfig['username'],$dbconfig['password'],$dbconfig['database']);
        //preventing SQL injection attacks
        $username = mysqli_real_escape_string($conn, $_POST["username"]);
        $password = mysqli_real_escape_string($conn, $_POST["password"]);
        //query 
        $query = "SELECT username,password FROM users WHERE username = '".$username."' AND password = '".$password."'";
        $result = mysqli_query($conn, $query);

        //controlliamo correttezza dei dati e reindirizziamo o inviamo messaggio d'errore
        
        if(mysqli_num_rows($result)>0){
            $_SESSION["username"] = $_POST["username"]; 
            header("Location: home.php");
        }
        else{
            $errore = true;
        }
    }

?>
<html>
    <head>
        <title>Login - FoxLessons</title>
        <link rel="stylesheet" href="style/login_page.css">
        <script src='script/login_page.js' defer></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300&family=PT+Sans&display=swap" rel="stylesheet"> 
    </head>
    <body>
        <div id="overlay"></div>
        <main>
            <form name="login_form" method="post" id="login_form">
                <h3 id="site_name">FoxLessons</h3>
                <?php
                if(isset($errore)){
                    echo '<div class="errorLogin">Nome utente o password errata.</div>';
                }
                ?>
                <div class="errorLogin1 hidden">Compila tutti i campi.</div>
                <p>
                    <label class="username">Nome Utente<input type='text' name='username'></label>
                </p>
                <p>
                    <label class="password">Password <input type='password' name='password'></label>
                </p>
                <p id="logandsubmit">
                    <a href="registration_page.php" id="loginredirect">Non sei membro? Registrati.<a><input type='submit' value="Login"></label>
                </p>
            </form>
        </main>
    </body>
</html>