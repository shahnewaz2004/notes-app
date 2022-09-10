<?php
    include('config.php');
    
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $query = mysqli_real_escape_string($conn, $_POST['query']);
        $userId = mysqli_real_escape_string($conn, $_POST['userId']);
        $searchQuery = "SELECT * FROM notes WHERE user='{$userId}' AND title LIKE '%{$query}%'";

        if(mysqli_query($conn, $searchQuery)){
               $result = mysqli_query($conn, $searchQuery);
            if(mysqli_num_rows($result) > 0){
                $arr = array();
                while($row = mysqli_fetch_assoc($result)){
                    $arr[] = $row;
                }
                $response['error'] = '00';
                $response['notes'] = $arr; 
            }else{
                $response['error'] = '01';
                $response['message'] = 'No notes found';
            }
        }else{
            $response['error'] = '01';
            $response['message'] = 'Error occured';
        }

        echo json_encode($response);
    }

    mysqli_close($conn);

?>