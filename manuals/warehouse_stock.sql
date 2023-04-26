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
-- Struktura tabeli dla tabeli `warehouse_stock`
--

CREATE TABLE `warehouse_stock` (
  `id` int(11) NOT NULL,
  `part_number` text DEFAULT NULL,
  `item_name` text NOT NULL,
  `qty` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 1,
  `supplier` varchar(255) DEFAULT NULL,
  `stock_min` int(11) DEFAULT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `warehouse_stock`
--

INSERT INTO `warehouse_stock` (`id`, `part_number`, `item_name`, `qty`, `status`, `supplier`, `stock_min`, `type`) VALUES
(1, '0300010', 'Main housing', 0, 1, 'SEND3D', 0, 1),
(2, '0300011', 'Back lid', 0, 1, 'SEND3D', 0, 1),
(3, '0300012', 'Battery hatch', 0, 1, 'Mad Props AB', 0, 1),
(4, '0300013', 'Button', 0, 1, 'Mad Props AB', 0, 1),
(5, '0300014', 'Cover glass - PC sheet', 0, 1, '2x3 S.A.', 0, 1),
(6, '0300029', 'Cover glass - CNC', 0, 1, 'MP', 0, 1),
(7, '0300016', 'Pivot plate', 0, 1, 'SEND3D', 0, 1),
(8, '0300003', 'Threaded Insert M3x4x4,5mm', 0, 1, 'Allegro', 0, 1),
(9, '0300004', '2.0x4.5mm torx (1,8x5)', 0, 1, 'TME', 0, 1),
(10, '0300006', 'M2   5x8 mm', 0, 1, 'TME', 0, 1),
(11, '0300005', '2,5x8 DIN 84 screw', 0, 1, 'BEJMET', 0, 1),
(12, '0300009', 'M3x10 mm philip', 0, 1, 'BEJMET', 0, 1),
(13, '0300002', 'Screw oring 2,5x1', 0, 1, 'Passerotti', 0, 1),
(14, '0300001', 'Lid oring 45x1', 0, 1, 'Passerotti', 0, 1),
(15, '0300008', 'Compression spring', 0, 1, 'Lesjoforsab', 0, 1),
(16, '0300007', 'Inclinometer level', 0, 1, 'Level Development', 0, 1),
(17, '0300017', 'PCB ', 0, 1, 'JLCPCB', 0, 1),
(18, '0300018', 'PCBA', 0, 1, 'JLCPCB', 0, 1),
(19, '0300019', 'Battery holder', 0, 1, 'Digikey ', 0, 1),
(20, '0300020', 'Switch', 0, 1, 'Digikey ', 0, 1),
(21, '0300021', 'LED', 0, 1, 'Digikey ', 0, 1),
(22, '0300022', 'Capacitor', 0, 1, 'Digikey ', 0, 1),
(23, '0300023', 'Resistor', 0, 1, 'Digikey ', 0, 1),
(24, '0300024', 'FET Transistor', 0, 1, 'Digikey ', 0, 1),
(25, '0300025', 'Battery', 0, 1, 'hurt.com.pl', 0, 1),
(26, '0300026', 'Glue ATK UV #16', 0, 1, 'Ataszek.pl', 0, 1),
(27, '0300027', 'Glue needles', 0, 1, 'Ataszek.pl', 0, 1),
(28, '0300028', 'Packaging', 0, 1, 'Neopak', 0, 1);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `warehouse_stock`
--
ALTER TABLE `warehouse_stock`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `part_number` (`part_number`) USING HASH;

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `warehouse_stock`
--
ALTER TABLE `warehouse_stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
