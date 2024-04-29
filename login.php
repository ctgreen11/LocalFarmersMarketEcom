<?php
    $username = $_POST['username'];
    $username = $_POST['password'];

    $conn = new mysqli('localhost','root','','FarmersMarketEcomm');
    if ($conn->connect_error) {
        die('Connection Failed : '.$conn->connection_error);
    }else{
        $sql = $conn->prepare();
    }
    ?>