<?php

    include('config.php');

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $noteId = mysqli_real_escape_string($conn, $_POST['noteId']);
        $deleteSQL = "DELETE FROM notes WHERE noteId='{$noteId}'";

            if(mysqli_query($conn, $deleteSQL)){
                $response['error'] = '00';
                $response['message'] = 'Deleted';
            }else{
                $response['error'] = '01';
                $response['message'] = 'Failed to delete';
            }

        echo json_encode($response);
    }

    mysqli_close($conn);



?>