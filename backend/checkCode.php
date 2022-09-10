<?php
    include('config.php');
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $code = mysqli_real_escape_string($conn, $_POST['code']);
        $checkSQL = "SELECT * FROM forgotCode WHERE code='{$code}'";
        $result = mysqli_query($conn, $checkSQL);

        if(mysqli_num_rows($result) > 0){
            $row = mysqli_fetch_assoc($result);
            $response['error'] = "00";
            $response['message'] = "Code matched";
            $response['email'] = $row['email'];
        } else{
            $response['error'] = '01';
            $response['message'] = 'Code is not valid';
        }

        echo json_encode($response);
    }
    mysqli_close($conn);


?>