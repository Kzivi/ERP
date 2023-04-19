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
$result = mysqli_query($conn, $sql_ask);

// Zamykanie połączenia z bazą danych
mysqli_close($conn);
?>