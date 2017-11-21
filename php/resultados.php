<?php 
if (empty($_GET)) header('location:../index.html');
else{
	require_once 'conexion.php';
		$user = $_GET['user'];
		$nivel = $_GET['nivel'];
	if (isset($_GET['jugadas'])) {
		$minutos = $_GET['minutos'];
		$segundos = $_GET['segundos'];
		$jugadas = $_GET['jugadas'];
		$query = "select id from $nivel where username='$user'";
		$res = mysqli_query(Conexion::conectar(),$query);
		if (!mysqli_fetch_array($res)) {
			$query = "insert into $nivel (username,minutos,segundos,n_jugadas) values ('$user','$minutos','$segundos','$jugadas')";
		}else{
			$query = "update $nivel set minutos='$minutos', segundos='$segundos',n_jugadas='$jugadas' where username='$user'";
		}
		mysqli_query(Conexion::conectar(),$query);
		header("location:resultados.php?user=$user&nivel=$nivel");
	}else{
		$query = "select * from $nivel order by minutos asc,segundos asc,n_jugadas asc limit 3";
		$res = mysqli_query(Conexion::conectar(),$query);
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Resultados</title>
	<link rel="stylesheet" type="text/css" href="../estilos.css">
</head>
<body>
	<section class="resultados">
		<h1>Resultados nivel <?php echo $nivel; ?></h1>
		<table>
			<thead>
				<tr>
					<th>Posicion</th>
					<th>Nombre de Usuario</th>
					<th>Tiempo</th>
					<th>N° de Jugadas</th>
				</tr>
			</thead>
			<tbody>
				<?php
					$estado = false;
					$i = 0;
					while ($data = mysqli_fetch_array($res)) {
						$i++;
						if ($data['minutos']<10) $data['minutos'] = "0{$data['minutos']}";
						if ($data['segundos']<10) $data['segundos'] = "0{$data['segundos']}";
						if ($data['username'] == $user) {
							$estado = true;
							echo "<tr class='user-row'>";
						}else echo "<tr>";
						echo "
						<td>$i</td>
							<td>{$data['username']}</td>
							<td>{$data['minutos']}:{$data['segundos']}</td>
							<td>{$data['n_jugadas']}</td>
						</tr>
						";
					}
					if (!$estado) {
						$query = "select * from $nivel where username='$user'";
						$res = mysqli_query(Conexion::conectar(),$query);
						while ($data = mysqli_fetch_array($res)){
						if ($data['minutos']<10) $data['minutos'] = "0{$data['minutos']}";
						if ($data['segundos']<10) $data['segundos'] = "0{$data['segundos']}";
							echo "<tr class='user-row'>
							<td>Tú</td>
								<td>{$data['username']}</td>
								<td>{$data['minutos']}:{$data['segundos']}</td>
								<td>{$data['n_jugadas']}</td>
							</tr>";
						}
					}
				 ?>
			</tbody>
		</table>
		<a href="../index.html" class="btn start">Volver a Jugar</a>
	</section>
</body>
</html>
<?php 
	}
}

?>