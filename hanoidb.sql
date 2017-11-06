/*
Navicat MySQL Data Transfer

Source Server         : Conexion
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : hanoidb

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2017-11-06 17:32:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `dificil`
-- ----------------------------
DROP TABLE IF EXISTS `dificil`;
CREATE TABLE `dificil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8_bin NOT NULL,
  `minutos` int(11) NOT NULL,
  `segundos` int(11) NOT NULL,
  `n_jugadas` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of dificil
-- ----------------------------
INSERT INTO `dificil` VALUES ('1', 'NicolÃ¡s', '10', '24', '288');

-- ----------------------------
-- Table structure for `facil`
-- ----------------------------
DROP TABLE IF EXISTS `facil`;
CREATE TABLE `facil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8_bin NOT NULL,
  `minutos` int(11) NOT NULL,
  `segundos` int(11) NOT NULL,
  `n_jugadas` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of facil
-- ----------------------------
INSERT INTO `facil` VALUES ('1', '', '0', '20', '7');
INSERT INTO `facil` VALUES ('2', 'nicolas', '0', '14', '7');
INSERT INTO `facil` VALUES ('3', 'narias', '0', '14', '7');
INSERT INTO `facil` VALUES ('4', 'NicolÃ¡s', '0', '12', '7');
INSERT INTO `facil` VALUES ('5', 'loser', '0', '26', '10');
INSERT INTO `facil` VALUES ('6', 'NicolÃ¡s Arias', '0', '8', '7');
INSERT INTO `facil` VALUES ('7', 'fdsfs', '0', '14', '7');

-- ----------------------------
-- Table structure for `medio`
-- ----------------------------
DROP TABLE IF EXISTS `medio`;
CREATE TABLE `medio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8_bin NOT NULL,
  `minutos` int(11) NOT NULL,
  `segundos` int(11) NOT NULL,
  `n_jugadas` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of medio
-- ----------------------------
INSERT INTO `medio` VALUES ('1', 'first Player', '1', '2', '33');
