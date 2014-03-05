<?php if (isset($_POST['message'])) {

	$name = (isset($_POST['name'])) ? $_POST['name'] : "" ;
	$email = (isset($_POST['email'])) ? $_POST['email'] : "" ;
	$message = (isset($_POST['message'])) ? $_POST['message'] : "" ;

	$to = "rvseale@sky.com";
	$subject = "rachelseale.co.uk query from ".$name." (".$email.")";
	$body = "To Rachel\n\n".$message."\n\nThanks,\n\n".$name.".";
	$headers = "From: ".$email;
	if(mail($to, $subject, $body, $headers)){
		echo "<p>Thank you $name, your message has been sent successfully.</p>";
	}else{
		echo "<p class='error'>Sorry $name. Message delivery failed. Please try again.</p>";
	}
 
}
?>