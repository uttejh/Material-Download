$(document).ready(function(){

	var subject_array = [];
	var subj;
	// var sorted_array = [];
	var loadflag;
	var n;
	var resultarray = [];
	var total_subjects;
	var present_page = 1;
	var last_page;
	var selected = [];


	$(".checkbox").click(function(){
		if($(this).prop("checked")==true)
		{
			subj = $(this).val(); 
			subject_array.push(subj);
		}
	});

	$(".clear-btn").click(function(){
		$('.main').empty();
		$(".pagination_main").hide();
		$(".fade_div").show();
		$('.checkbox').prop('checked',false);
		subject_array=[];
	});

	// function unique(list) 
	// {
 //    	var result = [];
 //    	$.each(list, function(i, e)
 //    	{
	//         if ($.inArray(e, result) == -1) 
	//         {
	//         	result.push(e);
	//         }	
 //    	});
 //    	// return result;
 //    	sorted_array=result;
	// };

	function pagination(a)
	{
		var end = parseInt(a+5);
	 	var start = a+1;
	 	var z = total_subjects;

		$('.main').empty();
	 	if(z<=5)
	 	{
	 		last_page = 1;
	 	}
	 	else
	 	{
			last_page = ((z - (z%5))/5)+1;
	 	}
	 	$("#start_end").empty();
	 	$("#start_end").append(present_page+" / "+last_page);

		$(".loading_gif").hide();

	 	if((start<=n)&&(end<=n))
	 	{
	 		for(var i = start;i<=end;i++)
	 		{
	 			var clone= $("#cloner").clone();
				clone.find('#thumbnail').find('#subj_p').html(resultarray[i-1][2]);
				clone.find('#view-btn').find('#view_a').attr("href",resultarray[i-1][3]);				
				clone.find('#download_a').attr("href",resultarray[i-1][3]);				
				clone.attr('id',resultarray[i-1][0]);
				clone.attr('style',"float:left;margin-left:30px;");
				clone.css('display','inline');
				clone.appendTo($('.main'));
	 		};
	 		loadflag=end;
	 	}
	 	else if((start<=n)&&(end>n))
	 	{	
	 		console.log(resultarray);
	 		for(var i = start;i<=n;i++)
	 		{
	 			var clone= $("#cloner").clone();
				clone.find('#thumbnail').find('#subj_p').html(resultarray[i-1][2]);
				clone.find('#view-btn').find('#view_a').attr("href",resultarray[i-1][3]);	
				clone.find('#download_a').attr("href",resultarray[i-1][3]);			
				var some= clone.find('a').attr("href");
				clone.attr('id',resultarray[i-1][0]);
				clone.attr('style',"float:left;margin-left:30px;");
				clone.css('display','inline');
				clone.appendTo($('.main'));
	 		};
	 		loadflag=end;
	 	};
	};

	$('.done-btn').click(function(){

		

		$('.main').empty();
		

		$('.filter_head input:checked').each(function() {
		    selected.push($(this).val());
		});

		if(selected == 0)
		{
			alert('Choose a Subject !!!');
		}	
		else
		{
			// unique(subject_array);

			// if()

			// sorted_array = jQuery.grep(y, function(value) {
			//   return value != removeItem;
			// });
			$(".fade_div").hide();
	  		$(".loading_gif").show();
			n=selected.length;
			$.ajax
			({	
				url:"php/connect.php",
				type:"POST",
				dataType:"JSON",
				data:{selected : selected},
				success:function(result)
				{	
					// for(var i=0;i<result.length;i++) //i<result.length
					// {
					// 	var clone= $("#cloner").clone();
					// 	clone.find('#thumbnail').html(result[i][1]);
					// 	clone.attr('id',result[i][0]);
					// 	clone.appendTo($('.main'));

					// }
					resultarray=result;
				    console.log(resultarray);
				    total_subjects=result.length;
				    pagination(0);
				}

			});
			$(".pagination_main").show();
		};
	});

	$("#prev_pgntn").click(function(){
		if(present_page!=1)
		{
			$(".loading_gif").show();
			present_page--;
			loadflag_back=(loadflag - 10);
			pagination(loadflag_back);
		};
	});
	$("#next_pgntn").click(function(){
		if(present_page!=last_page)
		{
			$(".loading_gif").show();			
			present_page++;
			pagination(loadflag);
		};
	});
	$("#first_pgntn").click(function(){
		if(present_page!=1)
		{
			$(".loading_gif").show();			
			present_page=1;
			pagination(0);
		};
	});
	$("#last_pgntn").click(function(){
		if (present_page!=last_page)
		{	
			$(".loading_gif").show();			
			present_page=last_page;
			pagination(total_subjects-(total_subjects%5));
		};
	});

	

})