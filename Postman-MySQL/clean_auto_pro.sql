-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 29 avr. 2025 à 04:46
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
-- Base de données : `clean_auto_pro`
--

DELIMITER $$
--
-- Procédures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `Agencies_create` (IN `p_name` VARCHAR(255), IN `p_adress` TEXT, IN `p_city` VARCHAR(100), IN `p_phone_number` VARCHAR(15), IN `p_email` VARCHAR(255))   BEGIN
    INSERT INTO agencies (name, adress, city, phone_number, email)
    VALUES (p_name, p_adress, p_city, p_phone_number, p_email);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Agencies_deleteById` (IN `p_id` INT)   BEGIN
    DELETE FROM agencies WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Agencies_getById` (IN `p_id` INT)   BEGIN
    SELECT id, name, adress, city, phone_number, email
    FROM agencies
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Agencies_updateById` (IN `p_id` INT, IN `p_name` VARCHAR(255), IN `p_adress` TEXT, IN `p_city` VARCHAR(100), IN `p_phone_number` VARCHAR(15), IN `p_email` VARCHAR(255))   BEGIN
    IF p_name IS NOT NULL AND p_name != '' THEN
        UPDATE agencies SET name = p_name WHERE id = p_id;
    END IF;

    IF p_adress IS NOT NULL AND p_adress != '' THEN
        UPDATE agencies SET adress = p_adress WHERE id = p_id;
    END IF;

    IF p_city IS NOT NULL AND p_city != '' THEN
        UPDATE agencies SET city = p_city WHERE id = p_id;
    END IF;

    IF p_phone_number IS NOT NULL AND p_phone_number != '' THEN
        UPDATE agencies SET phone_number = p_phone_number WHERE id = p_id;
    END IF;

    IF p_email IS NOT NULL AND p_email != '' THEN
        UPDATE agencies SET email = p_email WHERE id = p_id;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Appointments_create` (IN `p_vehicle_id` INT, IN `p_shift_id` INT, IN `p_cleaning_type_id` INT)   BEGIN
    INSERT INTO Appointments (vehicle_id, shift_id, cleaning_type_id)
    VALUES (p_vehicle_id, p_shift_id, p_cleaning_type_id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Appointments_deleteById` (IN `p_id` INT)   BEGIN
    DELETE FROM Appointments WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Appointments_getById` (IN `p_id` INT)   BEGIN
    SELECT * FROM Appointments WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Appointments_updateById` (IN `p_id` INT)   BEGIN
    -- No non-FK fields to update yet.
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BlogPost_create` (IN `p_employee_id` INT, IN `p_title` VARCHAR(255), IN `p_text` TEXT)   BEGIN
    INSERT INTO blog_posts (employee_id, title, date, text)
    VALUES (p_employee_id, p_title, NOW(), p_text);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BlogPost_deleteById` (IN `p_id` INT)   BEGIN
    IF p_id IS NOT NULL AND p_id != 0 THEN
        DELETE FROM blog_posts WHERE id = p_id;
        SELECT 'Blog post deleted successfully' AS message;
    ELSE
        SELECT 'Error: Invalid ID' AS message;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BlogPost_getById` (IN `p_id` INT)   BEGIN
    IF p_id IS NOT NULL AND p_id != 0 THEN
        SELECT * FROM blog_posts WHERE id = p_id;
    ELSE
        SELECT 'Error: Invalid ID' AS message;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BlogPost_updateById` (IN `p_id` INT, IN `p_title` VARCHAR(255), IN `p_text` TEXT)   BEGIN
    IF p_id IS NOT NULL AND p_id != 0 THEN
        IF p_title IS NOT NULL AND p_title != '' THEN
            UPDATE blog_posts SET title = p_title WHERE id = p_id;
        END IF;

        IF p_text IS NOT NULL AND p_text != '' THEN
            UPDATE blog_posts SET text = p_text WHERE id = p_id;
        END IF;

        SELECT 'Blog post updated successfully' AS message;
    ELSE
        SELECT 'Error: Invalid ID' AS message;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CleaningTypes_create` (IN `p_name` VARCHAR(255), IN `p_price` DECIMAL(10,2), IN `p_discount_price` DECIMAL(10,2))   BEGIN
    INSERT INTO cleaning_types (name, price, discount_price) 
    VALUES (p_name, p_price, p_discount_price);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CleaningTypes_deleteById` (IN `p_id` INT)   BEGIN
    DELETE FROM cleaning_types WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CleaningTypes_getById` (IN `p_id` INT)   BEGIN
    SELECT * FROM cleaning_types WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CleaningTypes_updateById` (IN `p_id` INT, IN `p_name` VARCHAR(255), IN `p_price` DECIMAL(10,2), IN `p_discount_price` DECIMAL(10,2))   BEGIN
    IF p_name IS NOT NULL AND p_name != '' THEN
        UPDATE cleaning_types SET name = p_name WHERE id = p_id;
    END IF;

    IF p_price IS NOT NULL AND p_price != '' THEN
        UPDATE cleaning_types SET price = p_price WHERE id = p_id;
    END IF;

    IF p_discount_price IS NOT NULL AND p_discount_price != '' THEN
        UPDATE cleaning_types SET discount_price = p_discount_price WHERE id = p_id;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Clients_create` (IN `p_name` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_password` VARCHAR(255), IN `p_phone_number` VARCHAR(10), IN `p_adress` TEXT, IN `p_profile_picture` VARCHAR(255), IN `p_language` VARCHAR(2))   BEGIN
    INSERT INTO clients (
        name,
        email,
        password,
        phone_number,
        adress,
        profile_picture,
        language
    ) VALUES (
        p_name,
        p_email,
        p_password,
        p_phone_number,
        p_adress,
        p_profile_picture,
        p_language
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Clients_deleteById` (IN `p_id` INT)   BEGIN
    DECLARE v_count INT;

    -- Check if the client exists
    SELECT COUNT(*) INTO v_count FROM clients WHERE id = p_id;

    IF v_count > 0 THEN
        -- If the client exists, delete it
        DELETE FROM clients WHERE id = p_id;
        SELECT 'Client deleted successfully' AS message;
    ELSE
        -- If the client does not exist
        SELECT 'Client not found' AS message;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Clients_getById` (IN `p_id` INT)   BEGIN
    SELECT 
        id,
        name,
        email,
        phone_number,
        adress,
        profile_picture,
        language
    FROM clients
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Clients_updateById` (IN `p_id` INT, IN `p_name` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_password` VARCHAR(255), IN `p_phone_number` VARCHAR(10), IN `p_adress` TEXT, IN `p_profile_picture` VARCHAR(255), IN `p_language` VARCHAR(2))   BEGIN
    IF p_name IS NOT NULL AND p_name != '' THEN
        UPDATE clients SET name = p_name WHERE id = p_id;
    END IF;

    IF p_email IS NOT NULL AND p_email != '' THEN
        UPDATE clients SET email = p_email WHERE id = p_id;
    END IF;

    IF p_password IS NOT NULL AND p_password != '' THEN
        UPDATE clients SET password = p_password WHERE id = p_id;
    END IF;

    IF p_phone_number IS NOT NULL AND p_phone_number != '' THEN
        UPDATE clients SET phone_number = p_phone_number WHERE id = p_id;
    END IF;

    IF p_adress IS NOT NULL AND p_adress != '' THEN
        UPDATE clients SET adress = p_adress WHERE id = p_id;
    END IF;

    IF p_profile_picture IS NOT NULL AND p_profile_picture != '' THEN
        UPDATE clients SET profile_picture = p_profile_picture WHERE id = p_id;
    END IF;

    IF p_language IS NOT NULL AND p_language != '' THEN
        UPDATE clients SET language = p_language WHERE id = p_id;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Comments_create` (IN `p_appointment_id` INT, IN `p_text` TEXT)   BEGIN
    INSERT INTO comments (appointment_id, text)
    VALUES (p_appointment_id, p_text);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Comments_deleteById` (IN `p_id` INT)   BEGIN
    DELETE FROM comments WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Comments_getById` (IN `p_id` INT)   BEGIN
    SELECT * FROM comments WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Comments_updateById` (IN `p_id` INT, IN `p_text` TEXT)   BEGIN
    IF p_text IS NOT NULL AND p_text != '' THEN
        UPDATE comments SET text = p_text WHERE id = p_id;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Employees_create` (IN `p_agency_id` INT, IN `p_name` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_password` VARCHAR(255), IN `p_is_admin` BOOLEAN)   BEGIN
    INSERT INTO employees (agency_id, name, email, password, is_admin)
    VALUES (p_agency_id, p_name, p_email, p_password, p_is_admin);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Employees_deleteById` (IN `p_id` INT)   BEGIN
    DELETE FROM employees
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Employees_getById` (IN `p_id` INT)   BEGIN
    SELECT id, agency_id, name, email, is_admin
    FROM employees
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Employees_updateById` (IN `p_id` INT, IN `p_name` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_password` VARCHAR(255), IN `p_is_admin` BOOLEAN)   BEGIN
    IF p_name IS NOT NULL AND p_name != '' THEN
        UPDATE employees SET name = p_name WHERE id = p_id;
    END IF;

    IF p_email IS NOT NULL AND p_email != '' THEN
        UPDATE employees SET email = p_email WHERE id = p_id;
    END IF;

    IF p_password IS NOT NULL AND p_password != '' THEN
        UPDATE employees SET password = p_password WHERE id = p_id;
    END IF;

    IF p_is_admin IS NOT NULL THEN
        UPDATE employees SET is_admin = p_is_admin WHERE id = p_id;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Products_create` (IN `p_agency_id` INT, IN `p_name` VARCHAR(255), IN `p_price` DECIMAL(10,2), IN `p_discount_price` DECIMAL(10,2), IN `p_stock` INT)   BEGIN
    INSERT INTO products (agency_id, name, price, discount_price, stock)
    VALUES (p_agency_id, p_name, p_price, p_discount_price, p_stock);
    SELECT 'Product created successfully' AS message;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Products_deleteById` (IN `p_id` INT)   BEGIN
    DELETE FROM products WHERE id = p_id;
    SELECT 'Product deleted successfully' AS message;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Products_getById` (IN `p_id` INT)   BEGIN
    SELECT * FROM products WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Products_updateById` (IN `p_id` INT, IN `p_name` VARCHAR(255), IN `p_price` DECIMAL(10,2), IN `p_discount_price` DECIMAL(10,2), IN `p_stock` INT)   BEGIN
    IF p_name IS NOT NULL AND p_name != '' THEN
        UPDATE products SET name = p_name WHERE id = p_id;
    END IF;

    IF p_price IS NOT NULL AND p_price != '' THEN
        UPDATE products SET price = p_price WHERE id = p_id;
    END IF;

    IF p_discount_price IS NOT NULL AND p_discount_price != '' THEN
        UPDATE products SET discount_price = p_discount_price WHERE id = p_id;
    END IF;

    IF p_stock IS NOT NULL AND p_stock != '' THEN
        UPDATE products SET stock = p_stock WHERE id = p_id;
    END IF;

    SELECT 'Product updated successfully' AS message;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Shifts_create` (IN `p_employee_id` INT, IN `p_shift_start` DATETIME, IN `p_shift_end` DATETIME, IN `p_covered` BOOLEAN)   BEGIN
    INSERT INTO Shifts (employee_id, shift_start, shift_end, covered)
    VALUES (p_employee_id, p_shift_start, p_shift_end, p_covered);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Shifts_deleteById` (IN `p_id` INT)   BEGIN
    DELETE FROM Shifts WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Shifts_getById` (IN `p_id` INT)   BEGIN
    SELECT * FROM Shifts WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Shifts_updateById` (IN `p_id` INT, IN `p_employee_id` INT, IN `p_shift_start` DATETIME, IN `p_shift_end` DATETIME, IN `p_covered` BOOLEAN)   BEGIN
    IF p_employee_id IS NOT NULL AND p_employee_id != '' THEN
        UPDATE Shifts SET employee_id = p_employee_id WHERE id = p_id;
    END IF;

    IF p_shift_start IS NOT NULL AND p_shift_start != '' THEN
        UPDATE Shifts SET shift_start = p_shift_start WHERE id = p_id;
    END IF;

    IF p_shift_end IS NOT NULL AND p_shift_end != '' THEN
        UPDATE Shifts SET shift_end = p_shift_end WHERE id = p_id;
    END IF;

    IF p_covered IS NOT NULL AND p_covered != '' THEN
        UPDATE Shifts SET covered = p_covered WHERE id = p_id;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SoldProducts_create` (IN `p_product_id` INT, IN `p_agency_id` INT, IN `p_sold_price` DECIMAL(10,2))   BEGIN
    INSERT INTO sold_products (product_id, agency_id, sold_price)
    VALUES (p_product_id, p_agency_id, p_sold_price);
    SELECT 'Sold product created successfully' AS message;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SoldProducts_deleteById` (IN `p_id` INT)   BEGIN
    DELETE FROM sold_products WHERE id = p_id;
    SELECT 'Sold product deleted successfully' AS message;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SoldProducts_getById` (IN `p_id` INT)   BEGIN
    SELECT * FROM sold_products WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SoldProducts_updateById` (IN `p_id` INT, IN `p_sold_price` DECIMAL(10,2), IN `p_agency_id` INT)   BEGIN
    IF p_sold_price IS NOT NULL THEN
        UPDATE sold_products SET sold_price = p_sold_price WHERE id = p_id;
    END IF;

    IF p_agency_id IS NOT NULL THEN
        UPDATE sold_products SET agency_id = p_agency_id WHERE id = p_id;
    END IF;

    SELECT 'Sold product updated successfully' AS message;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Vehicles_create` (IN `p_client_id` INT, IN `p_vin` VARCHAR(17), IN `p_vehicle_type` VARCHAR(50))   BEGIN
    INSERT INTO vehicles (client_id, vin, vehicle_type)
    VALUES (p_client_id, p_vin, p_vehicle_type);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Vehicles_deleteById` (IN `p_id` INT)   BEGIN
    DELETE FROM vehicles
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Vehicles_getById` (IN `p_id` INT)   BEGIN
    SELECT 
        id,
        client_id,
        vin,
        vehicle_type
    FROM vehicles
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Vehicles_updateById` (IN `p_id` INT, IN `p_vin` VARCHAR(17), IN `p_vehicle_type` VARCHAR(50))   BEGIN
    IF p_vin IS NOT NULL AND p_vin != '' THEN
        UPDATE vehicles SET vin = p_vin WHERE id = p_id;
    END IF;

    IF p_vehicle_type IS NOT NULL AND p_vehicle_type != '' THEN
        UPDATE vehicles SET vehicle_type = p_vehicle_type WHERE id = p_id;
    END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `agencies`
--

CREATE TABLE `agencies` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `adress` text NOT NULL,
  `city` varchar(100) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `agencies`
--

INSERT INTO `agencies` (`id`, `name`, `adress`, `city`, `phone_number`, `email`) VALUES
(1, 'ACP rouen', '19 allee des moutardes', 'Rouen', '0101010101', 'ACP_Rouen@gmail.com');

-- --------------------------------------------------------

--
-- Structure de la table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `shift_id` int(11) DEFAULT NULL,
  `cleaning_type_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `appointments`
--

INSERT INTO `appointments` (`id`, `vehicle_id`, `shift_id`, `cleaning_type_id`) VALUES
(1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `employee_id`, `title`, `date`, `text`) VALUES
(1, 1, 'test 1', '2025-04-29', 'test 3');

-- --------------------------------------------------------

--
-- Structure de la table `cleaning_types`
--

CREATE TABLE `cleaning_types` (
  `id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cleaning_types`
--

INSERT INTO `cleaning_types` (`id`, `price`, `discount_price`, `name`) VALUES
(1, '50.99', '50.99', 'interrior');

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `adress` text NOT NULL,
  `profile_picture` varchar(255) NOT NULL,
  `language` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id`, `name`, `email`, `password`, `phone_number`, `adress`, `profile_picture`, `language`) VALUES
(5, 'test', 'test email', '$2b$10$ASlvNaEI4KKSgrnAakP8V.czZ0jCk6PWb9wSSVjO/r3hN587CjUmS', '0101010101', 'somewhere street', 'test profile_picture', 'FR');

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `appointment_id` int(11) DEFAULT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `agency_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `employees`
--

INSERT INTO `employees` (`id`, `agency_id`, `name`, `email`, `password`, `is_admin`) VALUES
(1, 1, 'test', 'test email', '$2b$10$eJsdZjqHVYcPkty7aFV75OkLh9LWPv0DoOCt.JcZwjDkFcZ84rBTe', 1);

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `agency_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `agency_id`, `name`, `price`, `discount_price`, `stock`) VALUES
(1, 1, 'wind shield whippers', '20.00', '20.00', 22);

-- --------------------------------------------------------

--
-- Structure de la table `shifts`
--

CREATE TABLE `shifts` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `shift_start` datetime NOT NULL,
  `shift_end` datetime NOT NULL,
  `covered` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `shifts`
--

INSERT INTO `shifts` (`id`, `employee_id`, `shift_start`, `shift_end`, `covered`) VALUES
(1, 1, '2025-05-01 09:00:00', '2025-05-01 17:00:00', 1);

-- --------------------------------------------------------

--
-- Structure de la table `sold_products`
--

CREATE TABLE `sold_products` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `agency_id` int(11) NOT NULL,
  `sold_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sold_products`
--

INSERT INTO `sold_products` (`id`, `product_id`, `agency_id`, `sold_price`) VALUES
(1, 1, 1, '20.00');

-- --------------------------------------------------------

--
-- Structure de la table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `vin` varchar(17) NOT NULL,
  `vehicle_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `vehicles`
--

INSERT INTO `vehicles` (`id`, `client_id`, `vin`, `vehicle_type`) VALUES
(1, 5, '123123213', 'Bike');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `agencies`
--
ALTER TABLE `agencies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_id` (`vehicle_id`),
  ADD KEY `shift_id` (`shift_id`),
  ADD KEY `cleaning_type_id` (`cleaning_type_id`);

--
-- Index pour la table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Index pour la table `cleaning_types`
--
ALTER TABLE `cleaning_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cleaning_types_name_unique` (`name`);

--
-- Index pour la table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Index pour la table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `agency_id` (`agency_id`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `agency_id` (`agency_id`);

--
-- Index pour la table `shifts`
--
ALTER TABLE `shifts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Index pour la table `sold_products`
--
ALTER TABLE `sold_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `agency_id` (`agency_id`);

--
-- Index pour la table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_client_id` (`client_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `agencies`
--
ALTER TABLE `agencies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `cleaning_types`
--
ALTER TABLE `cleaning_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `shifts`
--
ALTER TABLE `shifts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `sold_products`
--
ALTER TABLE `sold_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`shift_id`) REFERENCES `shifts` (`id`),
  ADD CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`cleaning_type_id`) REFERENCES `cleaning_types` (`id`);

--
-- Contraintes pour la table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD CONSTRAINT `blog_posts_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`);

--
-- Contraintes pour la table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`agency_id`) REFERENCES `agencies` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`agency_id`) REFERENCES `agencies` (`id`);

--
-- Contraintes pour la table `shifts`
--
ALTER TABLE `shifts`
  ADD CONSTRAINT `shifts_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);

--
-- Contraintes pour la table `sold_products`
--
ALTER TABLE `sold_products`
  ADD CONSTRAINT `sold_products_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `sold_products_ibfk_2` FOREIGN KEY (`agency_id`) REFERENCES `agencies` (`id`);

--
-- Contraintes pour la table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `fk_vehicles_client_id` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_vehicles_clients` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
