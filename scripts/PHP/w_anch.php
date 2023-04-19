<?php
$config = parse_ini_file('config/db_config.ini', true);

$host = $config['database']['host'];
$username = $config['database']['username'];
$password = $config['database']['password'];
$dbname = $config['database']['dbname'];

// Tworzenie połączenia
$conn = mysqli_connect($host, $username, $password, $dbname);

// Sprawdzanie połączenia
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Pobieranie danych z formularza logowania
$ani = $_POST['js_anpn'];

// Tworzenie zapytania do bazy danych
$sql = "SELECT * FROM warehouse_stock WHERE part_number='$ani'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $data = array('nif' => false);
    echo json_encode($data);
} else {
    $data = array('nif' => true);
    echo json_encode($data);
}

// Zamykanie połączenia z bazą danych
mysqli_close($conn);
?>