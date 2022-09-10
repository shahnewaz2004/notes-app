<?php

    include('config.php');

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $userId = mysqli_real_escape_string($conn, $_POST['userId']);
        $getSQL = "SELECT * FROM notes WHERE user='${userId}' ORDER BY id DESC";

        $result = mysqli_query($conn, $getSQL);
            if(mysqli_num_rows($result) > 0){
                $arr = array();
                while($row = mysqli_fetch_assoc($result)) {
                        $arr[] = $row;
                 }
                $response['error'] = '00';
                $response['notes'] = $arr;
            }else{
                $response['error'] = '01';
                $response['message'] = 'No notes found';
            }

        echo json_encode($response);
    }

    mysqli_close($conn);



?>