<?php
    include('config.php');

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $title = mysqli_real_escape_string($conn, $_POST['title']);
        $description = mysqli_real_escape_string($conn, $_POST['desc']);
        $userId = mysqli_real_escape_string($conn, $_POST['userId']);
        $noteId = mysqli_real_escape_string($conn, $_POST['noteId']) ;
        $date = date('d M Y');
        $status = 1; // STATUS 1 MEAN ACTIVE, 2 MEAN TRASHED AND 3 MEAN PERMANENT DELETED 


        // CHECKING IF THE USER ALEADY NOTES THIS (THEN UPDATE) OR THIS IS A NEW NOTE 
        $checkSQL = "SELECT * FROM notes WHERE noteId='{$noteId}'";
        $result = mysqli_query($conn, $checkSQL);

        if(mysqli_num_rows($result) == 0){
            $uid = uniqid() . rand(1, 100000);
            $insertSQL = "INSERT INTO notes (title, description, status, noteId,  date, user) 
                        VALUES ('{$title}', '{$description}', '{$status}', '{$uid}', '{$date}', '{$userId}')";
            
            if(mysqli_query($conn, $insertSQL)){
                $response['error'] = '00';
                $response['message'] = 'Saved';
            }else{
                $response['error'] = '01';
                $response['message'] = 'Error while saving';
            }
        }else{
            $updateSQL = "UPDATE notes SET title='{$title}', description='{$description}', date='{$date}'
                         WHERE noteId='{$noteId}'";
            if(mysqli_query($conn, $updateSQL)){
                $response['error'] = '00';
                $response['message'] = 'Saved';
            }else{
                $response['error'] = '01';
                $response['message'] = 'Error while saving';
            }
        }

        echo json_encode($response);
    }

    mysqli_close($conn);


?>