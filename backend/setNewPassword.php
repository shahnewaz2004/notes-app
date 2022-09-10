<?php
    include('config.php');
    
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $new_password = mysqli_real_escape_string($conn, $_POST['new_pass']);
        $hash_password = password_hash($new_password, PASSWORD_BCRYPT);
        $updateSQL = "UPDATE registered_users SET password='{$hash_password}'
                     WHERE email='{$email}'";

        if(mysqli_query($conn, $updateSQL)){
            $deleteCode = "DELETE FROM forgotCode WHERE email='{$email}'";
            if(mysqli_query($conn, $deleteCode)){
                $response['error'] = '00';
                $response['message'] = 'Password reset successful';
            }else{
                $response['error'] = '01';
                $response['message'] = 'Error occured! Reset your password again';
            }
        }else{
            $response['error'] = '01';
            $response['message'] = 'Failed to set new password';
        }

        echo json_encode($response);
    }

    mysqli_close($conn)

?>