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
$sql_ask = $_POST['sql_ask'];

// Tworzenie zapytania do bazy danych
if (mysqli_query($conn, $sql_ask)) {
$data = array('success' => true);
$last_inserted_id = mysqli_insert_id($conn);
$data = array('lii' => $last_inserted_id);
}else{
$data = array('success' => false);
$message_error = mysqli_error($conn);
$data = array('message' => $message_error);
}
echo json_encode($data);

// Zamykanie połączenia z bazą danych
mysqli_close($conn);
?>