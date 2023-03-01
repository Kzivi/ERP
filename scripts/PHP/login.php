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
$sql = "SELECT * FROM users WHERE email='$email' and password='$password'";
$result = mysqli_query($conn, $sql);

// Sprawdzanie, czy użytkownik jest zarejestrowany
if (mysqli_num_rows($result) > 0) {
    // Użytkownik jest zarejestrowany, przekierowywanie do strony głównej
    echo "success";
} else {
    // Użytkownik nie jest zarejestrowany, wyświetlanie komunikatu o błędzie
    echo "Niepoprawne dane logowania";
}

// Zamykanie połączenia z bazą danych
mysqli_close($conn);
?>