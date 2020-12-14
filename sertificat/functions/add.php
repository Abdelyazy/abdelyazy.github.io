<?php   
   try {
      $conn = new PDO("mysql:host=a136237.mysql.mchost.ru; dbname=a136237_skk", "a136237_skk1", "33R40zjoLK");
      
      function closeDB () {
         global $mysqli;
         $mysqli->close ();
      }

      if (empty($_POST['name'])) exit("Поле не заполнено");
      if (empty($_POST['tel'])) exit("Поле не заполнено");
      if (empty($_POST['email'])) exit("Поле не заполнено");
      if (empty($_POST['product'])) exit("Поле не заполнено");
   
      $query = "INSERT INTO feedback VALUES (NULL, :name, :tel, :email, :product)";
      $msg = $conn->prepare($query);
      $msg->execute(['name' => $_POST['name'], 'tel' => $_POST['tel'], 'email' => $_POST['email'], 'product' => $_POST['product']]);

      header("location: ../index.php");
   
   }
   
   catch (PDOException $e){
      echo "Connect failed: " . $e->getMessage();
   }
?>
 