<?php
    $hostname = 'localhost';
    $username = 'root';
    $password = '';
    $db = 'notes';

    $conn = mysqli_connect($hostname, $username, $password, $db);
    if(!$conn){
        die("Connection failed: " . mysqli_connect_error());
    }

?>