<?php

// From 
$header="from: $name <$mail_from>";

// Details
$email="$email";

// Mail of sender
$mail_from="$customer_mail"; 

// Enter your email address
$to ='rvseale@sky.com';
$send_contact=mail($header, $email, $customer_mail);

// Check, if message sent to your email 
// display message "We've recived your information"
if($send_contact){
echo "We've recived your contact information";
}
else {
echo "ERROR";
}
?>