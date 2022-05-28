



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

    //se abbiamo dati post non vuoti
    if(!empty($_POST["username"]) && !empty($_POST["password"])
     && !empty($_POST["email"]) && !empty($_POST["name"])&& !empty($_POST["surname"])){

        //connessione al database
        $conn = mysqli_connect($dbconfig['host'],$dbconfig['username'],$dbconfig['password'],$dbconfig['database']);
        //controlla se nome rispetta i vincoli (max 15 caratteri e nessun carattere non alfanumerico)
        if(!preg_match("/^[a-zA-Z0-9_]{1,15}/",$_POST['username'])){
            $error[] = "L'username contiene caratteri non validi o la sua lunghezza è maggiore di 15.";
        }
        else{
            //check se username è già presente
            $username = mysqli_escape_string($conn,$_POST['username']);
            $query = "SELECT username FROM users where username = '".$username."'";
            $res = mysqli_query($conn,$query);
            if(mysqli_num_rows($res) > 0){
                $error[] = "Username già esistente.";
            }

        }
        //controlla se password ha lunghezza corretta
        if(strlen($_POST["password"]) < 8 || strlen ($_POST["password"]) > 20){
            $error[] = "Lunghezza password non valida. (minimo 8 caratteri, massimo 20 caratteri)";
        }
        if(!filter_var($_POST["email"],FILTER_VALIDATE_EMAIL)){
            $error[] = "E-mail non valida";
        }

        if(strcmp($_POST["password"],$_POST["confirmpassword"]) != 0){
            $error[] = "Le password non corrispondono.";
        }

        if(!isset($error)){
            $name = mysqli_real_escape_string($conn,$_POST["name"]);
            $surname = mysqli_real_escape_string($conn,$_POST["surname"]);
            $username = mysqli_real_escape_string($conn,$_POST["username"]);
            $email = mysqli_real_escape_string($conn,$_POST["email"]);
            $password = mysqli_real_escape_string($conn,$_POST["password"]);

            $query = "INSERT into users(name,surname,username,email,password) VALUES('$name','$surname','$username','$email','$password')";
            if(mysqli_query($conn,$query)){
                $_SESSION['username'] = $_POST["username"];
                $_SESSION["user_id"] = mysqli_insert_id($conn); 
                header('Location: home.php');
                mysqli_close($conn);
                exit;
            }
            
        }
        else{
            $registration = false;
        }
    }

?>

<html>
    <head>
        <title>Registrati - FoxLessons</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="style/registration_page.css">
        <script src="./script/registration_page.js" defer></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300&family=PT+Sans&display=swap" rel="stylesheet"> 
    </head>
    <body>
        <div id="overlay"></div>
        <main>
            <form name="registration_form" id="registration_form" method="post">
                <h3 id="site_name">FoxLessons</h3>
                <div id="register">Registrati</div>
                <div class="errorRegistration hidden">Compila correttamente i campi.</div>
                <p class="name"> <!-- 1- -->
                    <label>Nome<input type='text' name='name'></label>

                </p>
                <p class="surname"> <!-- 2- -->
                    <label>Cognome<input type='text' name='surname'></label>

                </p>
                <p class="username"> <!-- 3- -->
                    <label>Nome Utente<input type='text' name='username'></label>

                </p>
                <p class="email"> <!-- 4- fb-->
                    <label>E-Mail<input type='text' name='email'></label>
                    
                </p>
                <p class="password"> <!-- 5- -->
                    <label>Password <input type='password' name='password'></label>

                </p>
                <p class="confirmpassword"> <!-- 6- frb-->
                    <label>Ripeti la password<input type='password' name='confirmpassword'></label>

                </p>
                <p id="logandsubmit">
                    <a href="login_page.php" id="loginredirect">Già registrato? Effettua il login.</a><input type='submit' id="submit" value="Registrati">
                </p>
            </form>
        </main>
    </body>
</html>
