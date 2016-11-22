<?php
  $name = $_POST['name'];
  $phonenumber = $_POST['phonenumber'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  $to = "mattxd12@gmail.com";
  $subject = "From: $subject";
  $emailcontent = "From: $name \n\n $phonenumber\n\n $message";
  $mailheader = "From: $email";

  mail($to, $subject, $emailcontent, $mailheader) or header('Location: emailerror.html');
  header('Location: thanks.html');
?>
