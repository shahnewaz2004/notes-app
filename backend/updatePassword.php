<?php
    include('config.php');

    // CHECK THE REQUEST METHOD 

    if($_SERVER['REQUEST_METHOD'] === 'POST'){

       $old_pass = mysqli_real_escape_string($conn, $_POST['old_pass']);
       $new_pass = mysqli_real_escape_string($conn, $_POST['new_pass']);
       $u_email = mysqli_real_escape_string($conn, $_POST['email']);
        
    //    FIND THE USER 
       $findUser = "SELECT * FROM registered_users WHERE email='{$u_email}'";
       $result = mysqli_query($conn, $findUser);
       
       if(mysqli_num_rows($result) > 0){
           //  CHECK THE USER OLD PASSWORD 
         $row = mysqli_fetch_assoc($result);
         $verify = password_verify($old_pass, $row['password']);

         if($verify){
            // UPDATE THE USER PASSWORD 
            $hash = password_hash($new_pass, PASSWORD_BCRYPT);
            $update = "UPDATE registered_users SET password='{$hash}' WHERE email='{$u_email}'";

                if(mysqli_query($conn, $update)){
                    $response['error'] = '00';
                    $response['message'] = 'Updated password';
                }else{
                    $response['error'] = '01';
                    $response['message'] = 'Failed to update';
                }
          }else{
            $response['error'] = '01';
            $response['message'] = 'Password is incorrect';
          }
        }else{
            $response['error'] = '01';
            $response['message'] = 'Login and try again';
        }

        echo json_encode($response);
    }

    mysqli_close($conn);


?>