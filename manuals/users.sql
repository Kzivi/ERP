-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 25 Kwi 2023, 11:29
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
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `permission` int(11) NOT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT 0,
  `nlpchr` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `permission`, `disabled`, `nlpchr`) VALUES
(1, 'b.krzymowski@manufacturing.partners', 'qwerty123', 1, 0, 1),
(2, 'd.makiej@manufacturing.partners', 'qwerty123', 2, 0, 1),
(3, 'a.nowak@manufacturing.partners', 'qwerty123', 1, 0, 1),
(4, 'p.ludwikowski@manufacturing.partners', 'qwerty123', 1, 0, 1),
(5, 'm.bisha@manufacturing.partners', 'qwerty123', 1, 0, 1),
(6, 'l.modrakowski@manufacturing.partners', 'qwerty123', 1, 0, 1),
(7, 'w.babs@manufacturing.partners', 'qwerty123', 1, 0, 1),
(8, 'w.pszczolinski@manufacturing.partners', 'qwerty123', 2, 0, 1),
(9, 'j.kruszynska@manufacturing.partners', 'qwerty123', 2, 0, 1),
(10, 'l.reszkowski@manufacturing.partners', 'qwerty123', 2, 0, 1);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
