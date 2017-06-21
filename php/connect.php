<?php

	mysql_connect('localhost','root','') or die("Database is not connected!!!");
	mysql_select_db('uttejh');	
	
	if((isset($_POST['selected'])))
	{	
    	$subject = $_POST['selected'];
    	$list = "'". implode("', '", $subject) ."'";
      	$out= array();
	    $query=mysql_query('SELECT * FROM test WHERE subject IN ('.$list.')');
		while($run=mysql_fetch_array($query,MYSQL_ASSOC))
		{
			$id=$run['id'];
			$value=$run['subject'];
			$subj_name=$run['subj_name'];
			$src=$run['src'];
			array_push($out,array($id,$value,$subj_name,$src));
		}
		echo json_encode($out);
    }
?>