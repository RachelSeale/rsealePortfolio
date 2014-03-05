<?php if (isset($_POST['message'])) {

   $name = (isset($_POST['name'])) ? $_POST['name'] : "" ;
   $email = (isset($_POST['email'])) ? $_POST['email'] : "" ;
   $message = (isset($_POST['message'])) ? $_POST['message'] : "" ;
   $honey = (isset($_POST['username'])) ? $_POST['username'] : "" ;

   if($name !== "" && $email !== "" && $message !== "" && $honey == ""){   
    $to = "rvseale@msky.com";
    $subject = "rachelseale.co.uk query from ".$name." (".$email.")";
    $body = "To Rachel\n\n".$message."\n\nThanks,\n\n".$name.".";
    $headers = "From: ".$email;
    if(mail($to, $subject, $body, $headers)){
     echo "<p>Thank you $name, your message has been sent successfully.</p>";
    }else{
     echo "<p class='error'>Sorry $name. Message delivery failed. Please try again.</p>";
    }
   }else{
    echo "<p class='error'>Sorry but the form failed to validate please <a href='/contact'>try again</a> remembering to fill in all the fields, and using a valid email address.</p>";
   }
  }else{
   echo '<p>Please feel free to contact me with any questions or feedback you may have. You can tweet me <a href="http://twitter.com/RachelSeale">@RachelSeale</a> or use this handy contact form below:</p>';
  } 

?>