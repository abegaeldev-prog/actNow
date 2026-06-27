<?php

require "../config/database.php";

$result = $conn->query("SELECT * FROM todo");

$todos = [];

while($row = $result->fetch_assoc()){
    $todos[] = $row;
}

echo json_encode($todos);