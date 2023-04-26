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

INSERT INTO `warehouse_log` (`id`, `item_id`, `qty`, `operation`, `time_when`, `who`, `document`, `description`, `price`) VALUES
(1, 1, 0, 1, '21.04.2023, 06:39:05', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(2, 2, 0, 1, '21.04.2023, 06:39:48', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(3, 3, 0, 1, '21.04.2023, 06:40:09', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(4, 4, 0, 1, '21.04.2023, 06:40:28', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(5, 5, 0, 1, '21.04.2023, 06:40:48', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(6, 6, 0, 1, '21.04.2023, 06:41:13', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(7, 7, 0, 1, '21.04.2023, 06:41:35', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(8, 8, 0, 1, '21.04.2023, 06:41:56', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(9, 9, 0, 1, '21.04.2023, 06:42:19', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(10, 10, 0, 1, '21.04.2023, 06:42:43', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(11, 11, 0, 1, '21.04.2023, 06:43:04', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(12, 12, 0, 1, '21.04.2023, 06:43:30', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(13, 13, 0, 1, '21.04.2023, 06:43:56', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(14, 14, 0, 1, '21.04.2023, 06:44:37', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(15, 15, 0, 1, '21.04.2023, 06:44:59', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(16, 16, 0, 1, '21.04.2023, 06:45:23', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(17, 17, 0, 1, '21.04.2023, 06:45:50', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(18, 18, 0, 1, '21.04.2023, 06:46:07', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(19, 19, 0, 1, '21.04.2023, 06:46:28', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(20, 20, 0, 1, '21.04.2023, 06:46:53', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(21, 21, 0, 1, '21.04.2023, 06:47:10', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(22, 22, 0, 1, '21.04.2023, 06:47:27', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(23, 23, 0, 1, '21.04.2023, 06:47:44', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(24, 24, 0, 1, '21.04.2023, 06:48:01', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(25, 25, 0, 1, '21.04.2023, 06:48:19', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(26, 26, 0, 1, '21.04.2023, 06:48:40', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(27, 27, 0, 1, '21.04.2023, 06:49:04', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL),
(28, 28, 0, 1, '21.04.2023, 06:49:24', 'b.krzymowski@manufacturing.partners', NULL, NULL, NULL);

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
