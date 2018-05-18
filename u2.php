<?php
$myfile = fopen("u2.txt", "w");
$txt = $_POST['data'];
fwrite($myfile, $txt);
fclose($myfile);
?>
