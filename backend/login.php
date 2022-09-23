<?php
    include('config.php');
    
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $password = mysqli_real_escape_string($conn, $_POST['password']);

        // CHECK THE EMAIL IS VALID OR NOT 
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            $response['error'] = '01';
            $response['message'] = 'Invalid email or password';
        }else{

            // CHECK THE EMAIL IS EXIST OR NOT 
            $getuser = "SELECT * FROM registered_users WHERE email='{$email}'";
            if(mysqli_query($conn, $getuser)){
                $result = mysqli_query($conn, $getuser);
                if(mysqli_num_rows($result) > 0){
                    $row = mysqli_fetch_assoc($result);
                    $verify = password_verify($password, $row['password']);
                    
                    // VERIFY THE PASSWORD 
                    if(!$verify){
                        $response['error'] = '01';
                        $response['message'] = 'Invalid email or password';
                    }else{
                        $response['error'] = '00';
                        $response['message'] = 'You are logged in';
                        $response['user'] = $row;
                    }
                }else{
                    $response['error'] = '01';
                    $response['message'] = 'Invalid email or password';
                }
            }
        }

        echo json_encode($response);

    }

    mysqli_close($conn);

?>
