<?php
    include('config.php');
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $searchEmail = "SELECT * FROM registered_users WHERE email='{$email}'";
        $result = mysqli_query($conn, $searchEmail);

        if(mysqli_num_rows($result) > 0){
            $row = mysqli_fetch_assoc($result);
            $code = uniqid();
            $receiver = $row['email'];
            $subject = "Password Reset (App name)";
            $body = "Password reset code is: $code";
            // Your mail 
            $sender = "From: your mail";

            if(mail($receiver, $subject, $body, $sender)){
               $insertSQL = "INSERT INTO forgotCode (email, code)
                             VALUES ('{$email}', '{$code}')";
                if(mysqli_query($conn, $insertSQL)){
                    $response['error'] = '00';
                    $response['message'] = 'Email sent';
                }else{
                    $response['error'] = '01';
                    $response['message'] = 'Failed to sent email';
                }
            }else{
                $response['error'] = '01';
                $response['message'] = 'Failed to sent email';
            }
        }else{
            $response['error'] = '01';
            $response['message'] = 'Email is not valid';
        }
        
        echo json_encode($response);
    }
    
    mysqli_close($conn);

?>