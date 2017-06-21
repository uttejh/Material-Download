$(document).ready(function(){

	var value;
	var subject;
	var dataarray=[];
	// $('.checkbox').each(function()
 //    { 
 //    	this.checked = true;  
 //    	// myvalue();
 //    	value = $(this).val();
 //    	alert(value);
 //    });
	$(".checkbox").click(function(){
		if($(this).prop("checked")==true)
		{
			value = $(this).val();
			myvalue();
		}
	});
	function myvalue()
	{
		subject = value;
		$.ajax
		({	
			type:"POST",
			url:"php/connect.php",
			dataType:"JSON",
			data:{subject : subject},
			success:function(result)
			{	
				for(var i=0;i<result.length;i++) //i<result.length
				{
					// console.log(result[1]);
					var clone= $("#cloner").clone();
					clone.find('#thumbnail').html(result[i][1]);
					clone.attr('id',result[i][0]);
					clone.appendTo($('.main'));
					// console.log('a');
					// alert("fff");
				}	
			}
		});

	};
})