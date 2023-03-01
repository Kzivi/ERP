<?php
$servername = "127.0.0.1";
$username = "root";
$password = "123456789";
$dbname = "erp";
$x = 1;

$conn = mysqli_connect($servername, $username, $password, $dbname);

// Sprawdzanie połączenia
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Tworzenie zapytania do bazy danych
$sql = "SELECT * FROM users";
$result = mysqli_query($conn, $sql);
$rows = (mysqli_num_rows($result) + 1);
$data = array();
while ($x < $rows) {
    $sql = "SELECT id FROM users WHERE id='$x'";
    $result = mysqli_query($conn, $sql);
    $db_id[$x] = mysqli_fetch_assoc($result);

    $sql = "SELECT email FROM users WHERE id='$x'";
    $result = mysqli_query($conn, $sql);
    $db_mail[$x] = mysqli_fetch_assoc($result);

    $sql = "SELECT permission FROM users WHERE id='$x'";
    $result = mysqli_query($conn, $sql);
    $db_permission[$x] = mysqli_fetch_assoc($result);

    $data[] = array(
        'id' => $db_id[$x],
        'email' => $db_mail[$x],
        'permission' => $db_permission[$x]
    );

    $x++;
}
// Zwracanie wyniku jako JSON
echo json_encode($data);
// Zamykanie połączenia z bazą danych
mysqli_close($conn);
?>