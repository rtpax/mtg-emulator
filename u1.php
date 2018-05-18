<?php
$myfile = fopen("u1.txt", "w");
$txt = $_POST['data'];
fwrite($myfile, $txt);
fclose($myfile);
?>
