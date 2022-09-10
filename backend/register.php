<?php
    include('config.php');

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $name = mysqli_real_escape_string($conn, $_POST['name']);
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $password = mysqli_real_escape_string($conn, $_POST['password']);

        // THIS SECRET TOKEN IS HIGHLY CONFEDENTIAL. 
        $secret = '8N74p0bwM2';
        $auth_id = uniqid() . $secret. rand(1, 1000);
        
        // VALIDATE THE NAME HERE 
        if(strlen($name) < 3){
            $response['error'] = '01';
            $response['message'] = 'Name should be at least 3 characters!';
        }else{

            // VALIDATE THE EMAIL HEERE 
            if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                $response['error'] = '01';
                $response['message'] = 'Invalid Email';
            }else{
                $check = "SELECT email from registered_users WHERE email='{$email}'";
                
                if(mysqli_query($conn, $check)){
                    $result = mysqli_query($conn, $check);
                    
                    // CHECK IF THE USER GIVEN EMAIL IS ALERADY REGISTERED OR NOT 
                    if(mysqli_num_rows($result) > 0){ 
                        $response['error'] = '01';
                        $response['message'] = 'Email is already exist';
                    }else{
                        $date = date('d M Y');
                        $hash = password_hash($password, PASSWORD_BCRYPT);
                        $insert = "INSERT INTO registered_users (name, email, password, joined)
                                VALUES ('{$name}', '{$email}', '{$hash}', '{$date}')";
                        
                        if(mysqli_query($conn, $insert)){
                            $response['error'] = '00';
                            $response['message'] = 'Registration Success';
                        }else{
                            $response['error'] = '01';
                            $response['message'] = 'Error occured';
                        }
                    }
                }
            }
        }

        echo json_encode($response);
        
    }

    mysqli_close($conn);

?>