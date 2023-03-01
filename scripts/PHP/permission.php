<?php
$servername = "127.0.0.1";
$username = "root";
$password = "123456789";
$dbname = "erp";

// Tworzenie połączenia
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Sprawdzanie połączenia
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Pobieranie danych z formularza logowania
$email = $_POST['email'];
$password = $_POST['password'];

// Tworzenie zapytania do bazy danych
$sql = "SELECT permission FROM users WHERE email='$email' and password='$password'";
$result = mysqli_query($conn, $sql);
$permission = mysqli_fetch_assoc($result);
echo json_encode($permission);

// Zamykanie połączenia z bazą danych
mysqli_close($conn);
?>