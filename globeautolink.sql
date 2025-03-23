-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 06 fév. 2025 à 22:57
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `globalautolink`
--

-- --------------------------------------------------------

--
-- Structure de la table `carads`
--

CREATE TABLE `carads` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `original_pub_date` date NOT NULL,
  `original_url` varchar(500) DEFAULT NULL,
  `local_url` varchar(500) DEFAULT NULL,
  `scraped_date` datetime NOT NULL DEFAULT current_timestamp(),
  `carBrand` varchar(100) NOT NULL,
  `carModel` varchar(100) NOT NULL,
  `year` year(4) NOT NULL,
  `currentMiles` int(11) NOT NULL,
  `carType` enum('SUV','Sedan','Hatchback') NOT NULL,
  `energy` enum('Electric','Diesel','Petrol','Hybrid') NOT NULL,
  `country` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `gearbox` enum('Manual','Automatic') NOT NULL,
  `wd` enum('2WD','4WD') NOT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `carads`
--

INSERT INTO `carads` (`id`, `title`, `original_pub_date`, `original_url`, `local_url`, `scraped_date`, `carBrand`, `carModel`, `year`, `currentMiles`, `carType`, `energy`, `country`, `price`, `gearbox`, `wd`, `is_available`) VALUES
(1, '2021 Tesla Model 3 - Low Mileage', '2024-01-15', 'https://example.com/tesla-model3', NULL, '2025-02-06 21:57:12', 'Tesla', 'Model 3', 2021, 15000, 'Sedan', 'Electric', 'USA', '37999.99', 'Automatic', '2WD', 1),
(2, '2019 Ford Explorer - Fully Loaded', '2024-01-10', 'https://example.com/ford-explorer', NULL, '2025-02-06 21:57:12', 'Ford', 'Explorer', 2019, 45000, 'SUV', 'Petrol', 'Canada', '28999.50', 'Automatic', '4WD', 1),
(3, '2020 Toyota Corolla - Great Condition', '2024-02-01', 'https://example.com/toyota-corolla', NULL, '2025-02-06 21:57:12', 'Toyota', 'Corolla', 2020, 30000, 'Sedan', 'Hybrid', 'UK', '20999.00', 'Automatic', '2WD', 1),
(4, '2018 BMW X5 - Sport Package', '2024-01-20', 'https://example.com/bmw-x5', NULL, '2025-02-06 21:57:12', 'BMW', 'X5', 2018, 60000, 'SUV', 'Diesel', 'Germany', '41999.75', 'Automatic', '4WD', 0),
(5, '2022 Honda Civic - Like New', '2024-02-05', 'https://example.com/honda-civic', NULL, '2025-02-06 21:57:12', 'Honda', 'Civic', 2022, 8000, 'Sedan', 'Petrol', 'Australia', '25999.99', 'Manual', '2WD', 1),
(6, '2017 Mercedes-Benz GLC - Luxury SUV', '2024-01-12', 'https://example.com/mercedes-glc', NULL, '2025-02-06 21:57:12', 'Mercedes-Benz', 'GLC', 2017, 75000, 'SUV', 'Diesel', 'France', '33999.99', 'Automatic', '4WD', 0),
(7, '2023 Nissan Leaf - Electric Hatchback', '2024-02-03', 'https://example.com/nissan-leaf', NULL, '2025-02-06 21:57:12', 'Nissan', 'Leaf', 2023, 5000, 'Hatchback', 'Electric', 'Japan', '31999.49', 'Automatic', '2WD', 1),
(8, '2016 Volkswagen Golf - Affordable & Reliable', '2024-01-28', 'https://example.com/vw-golf', NULL, '2025-02-06 21:57:12', 'Volkswagen', 'Golf', 2016, 90000, 'Hatchback', 'Petrol', 'Italy', '14999.00', 'Manual', '2WD', 1),
(9, '2021 Subaru Outback - AWD', '2024-02-02', 'https://example.com/subaru-outback', NULL, '2025-02-06 21:57:12', 'Subaru', 'Outback', 2021, 25000, 'SUV', 'Hybrid', 'USA', '35999.89', 'Automatic', '4WD', 1),
(10, '2015 Chevrolet Malibu - Budget Friendly', '2024-01-18', 'https://example.com/chevy-malibu', NULL, '2025-02-06 21:57:12', 'Chevrolet', 'Malibu', 2015, 110000, 'Sedan', 'Petrol', 'Mexico', '9999.99', 'Automatic', '2WD', 0);

-- --------------------------------------------------------

--
-- Structure de la table `caradsimages`
--

CREATE TABLE `caradsimages` (
  `image_id` int(11) NOT NULL,
  `carads_id` int(11) NOT NULL,
  `image_title` varchar(255) NOT NULL,
  `image_url` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `country` varchar(100) NOT NULL,
  `registration_date` datetime NOT NULL DEFAULT current_timestamp(),
  `last_login_date` datetime DEFAULT NULL,
  `user_ip` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `carads`
--
ALTER TABLE `carads`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `caradsimages`
--
ALTER TABLE `caradsimages`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `carads_id` (`carads_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `carads`
--
ALTER TABLE `carads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `caradsimages`
--
ALTER TABLE `caradsimages`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `caradsimages`
--
ALTER TABLE `caradsimages`
  ADD CONSTRAINT `caradsimages_ibfk_1` FOREIGN KEY (`carads_id`) REFERENCES `carads` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
