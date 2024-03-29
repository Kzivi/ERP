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
$email = $_POST['email'];
$password = $_POST['password'];

// Tworzenie zapytania do bazy danych
$sql = "SELECT permission, email FROM users WHERE email='$email' and password='$password'";
$result = mysqli_query($conn, $sql);

// Sprawdzanie, czy użytkownik jest zarejestrowany
if (mysqli_num_rows($result) > 0) {
    // Użytkownik jest zarejestrowany, przekierowywanie do strony głównej
    $row = mysqli_fetch_assoc($result);
    $db_usermail = $row['email'];
    $db_permission = $row['permission'];
    $data = array('json_usermail' => $db_usermail, 'json_permission' => $db_permission);
    echo json_encode($data);

} else {
    // Użytkownik nie jest zarejestrowany, wyświetlanie komunikatu o błędzie
    $data = array('json_permission' => "denial");
    echo json_encode($data);
}

// Zamykanie połączenia z bazą danych
mysqli_close($conn);
?>