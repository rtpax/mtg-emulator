<?php
$myfile = fopen("newfile.txt", "w");
$txt = $_POST['data'];
fwrite($myfile, $txt);
fclose($myfile);
?>
<html><head></head><body></body></html>
