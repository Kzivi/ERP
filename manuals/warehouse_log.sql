-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 25 Kwi 2023, 11:30
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `erp`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `warehouse_log`
--

CREATE TABLE `warehouse_log` (
  `id` int(11) NOT NULL,
  `item_id` int(11) DEFAULT NULL,
  `qty` int(11) NOT NULL DEFAULT 0,
  `operation` int(11) NOT NULL,
  `time_when` varchar(20) DEFAULT NULL,
  `who` varchar(50) NOT NULL,
  `document` varchar(50) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `warehouse_log`
--

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `warehouse_log`
--
ALTER TABLE `warehouse_log`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `warehouse_log`
--
ALTER TABLE `warehouse_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
