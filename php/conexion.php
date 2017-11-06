<?php 

class Conexion
{
	
	function __construct()
	{
		$this->conectar();
	}
	function __destruct(){
		$this->closeConexion();
	}
	function conectar(){
		$cnx = mysqli_connect('localhost','root','','hanoidb') or die ("error en conexion" . mysql_error() );
		return $cnx;
	}
	function closeConexion(){
		mysql_close($this->conectar());
	}
}
 ?>