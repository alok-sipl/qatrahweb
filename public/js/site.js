// SITE js
var SITE = {
	initMobileMenu: function(){
		//	The menu on the left
		jQuery('#mobile_menu').mmenu(
			{
				selectedClass  : "active"
			}, {
	        	offCanvas: {
	            	pageSelector: "#wrapper"
		        }
	     	}
         );
	},

	collapse: function(){
		jQuery('[data-collapse]').on('click',function(){
			var Elem  = jQuery(this);
			var getcollapseID = Elem.data('collapse');
			var collapseElem = jQuery(getcollapseID);
			if(!Elem.hasClass('active')){
				Elem.addClass('active');
				collapseElem.addClass('open');
			} else {
				Elem.removeClass('active');
				collapseElem.removeClass('open');
			}
			collapseElem.slideToggle({
				duration: 500,
				done: function(){
					SITE.matchHeight();
				}
			});
			
		})
	},

	dropdown: function(){
		function hideDropdown(Elem, dropdownMenu){
			Elem.removeClass('active');
			dropdownMenu.removeClass('open');
			dropdownMenu.fadeOut();
		}
		function showDropdown(Elem, dropdownMenu){
			Elem.addClass('active');
			dropdownMenu.addClass('open');
			dropdownMenu.fadeIn();
		}
		jQuery('[data-dropdown]').on('click',function(){
			var Elem  = jQuery(this);
			var dropdownMenu = Elem.next('.dropdown-menu');
			if(!Elem.hasClass('active')){
				showDropdown(Elem, dropdownMenu)
			} else {
				hideDropdown(Elem, dropdownMenu)
			}
		});
		jQuery(document).mouseup(function(e){
		    var container = jQuery('.dropdown-menu,[data-dropdown]');
		    var dropdownMenu = jQuery('.dropdown-menu');
		    var Elem = jQuery('.active[data-dropdown]');
		    // if the target of the click isn't the container nor a descendant of the container
		    if (!container.is(e.target) && container.has(e.target).length === 0){
		        hideDropdown(Elem, dropdownMenu)
		    }
		});
	},

	counter: function(){
		var counter = jQuery('.payment-amount')
		if(counter.size() > 0){
			counter.each(function () {
			    jQuery(this).prop('Counter',0).animate({
			        Counter: jQuery(this).text()
			    }, {
			        duration: 2000,
			        easing: 'swing',
			        step: function (now) {
			            jQuery(this).text(Math.ceil(now));
			        }
			    });
			});
		}
	},

	matchHeight: function() {
		var rows = jQuery('.eq-parent');
		if(rows.size() > 0){
			rows.find('.eq-child').height('');
			rows.each(function( index ) {
				var cols      = jQuery(this).find('.eq-child');
				var setHeight = Math.max(cols.height());
				cols.each(function(index){
					jQuery(this).height(setHeight);
				})
			});
		}
	},

	initTabs: function(){
		jQuery(".tabs").on("click","a",function(event) {
            event.preventDefault();
            jQuery(this).parent().addClass("active");
            jQuery(this).parent().siblings().removeClass("active");
            var tab = jQuery(this).attr("href");
            jQuery(".tab-content").hide();
            jQuery(tab).show();
        });

        jQuery(".tabs a:eq(0)").click();
	},

	lineChart: function(elemID, dataSet){
		var elem = jQuery(elemID);
		var lineChart = new Chart(elem, {
		    type: 'line',
		    data: dataSet,
		    options: {
		    	legend: {
		    		position:'bottom',
					labels: {
						boxWidth:30,
						fontSize:10,
					}
				},
		    	maintainAspectRatio: false,
		    	plugins:{
			    	datalabels: false
				},
		        scales: {
		            yAxes: [{
		                stacked: true
		            }]
		        },
		    }
		});
	},

	barChart: function(elemID, dataSet){
		var elem = jQuery(elemID);
		var chart = new Chart(elem, {
		    type: 'bar',
		    data: dataSet,
		    options: {
		    	legend: {
		    		position:'bottom',
					labels: {
						boxWidth:30,
						fontSize:10,
					}
				},
		    	maintainAspectRatio: false,
		    	plugins:{
			    	datalabels: {
			    		backgroundColor: function(context) {
			    			return context.dataset.borderColor;
						},
			    		anchor:'end',
			    		borderRadius: 4,
						color: 'white',
						font: {
							size: 11,
						},
						formatter: Math.round
			    	}
				},

		    }
		});
	},

	pieChart: function(elemID, dataSet){
		var elem = jQuery(elemID);
		var chart = new Chart(elem, {
		    type: 'pie',
		    data: dataSet,
		    options: {
		    	legend: {
		    		position:'right',
					labels: {
						boxWidth:40,
						fontSize:12,
					}
				},
		    	maintainAspectRatio: false,
		    	plugins:{
			    	datalabels: {
			    		backgroundColor: function(context) {
							return context.dataset.backgroundColor;
						},
			    		borderRadius: 4,
			    		anchor:'end',
						color: 'white',
						font: {
							size: 11,
						},
						offset: 8,
						formatter: function(value, context) {
							function getSum(total, num) {
							    return total + num;
							}
							var dataValues = context.dataset.data;
							var total = dataValues.reduce(getSum);
							var currentValue = value;
							
							var precentage = Math.floor(((currentValue/total) * 100)+0.5);         
							return precentage + "%";
						},
						textAlign:'end'
			    	}
				},
		    }
		});
	}

}

//---------------------------------------------
	

jQuery(window).load(function() {
	if(typeof FastClick !== 'undefined') {      
      if (typeof document.body !== 'undefined') {
        FastClick.attach(document.body);
      }
    }

    SITE.counter();
	SITE.collapse();
	SITE.initMobileMenu();
	SITE.matchHeight();
	SITE.initTabs();
	SITE.dropdown();

	if($('[data-toggle="datepicker"]').size() > 0){
		$('[data-toggle="datepicker"]').datepicker();
	}
	var chartID = $("#chart");
	if(chartID.size() > 99){
		var lineChart = new Chart(chartID, {
		    type: 'line',
		    data: data,
		    options: {
		    	maintainAspectRatio: false,
		    	plugins:{
			    	datalabels: {
						color: 'White',
						backgroundColor:'#fc6f8c',
						borderRadius:3
					}
		    	},
				legend: {
	            	position:'bottom'
	        	},
		        scales: {
		            yAxes: [{
		                stacked: true
		            }]
		        }
		    }
		});
	}

	

    var pieID = $(".pie");
    if(pieID.size() > 0){
	    var pieChart = new Chart(pieID, {
	        type: 'pie',
	        data: {
	            datasets: [{
	                data: [
	                    randomScalingFactor(),
	                    randomScalingFactor(),
	                    randomScalingFactor(),
	                    randomScalingFactor(),
	                    randomScalingFactor(),
	                    randomScalingFactor(),
	                ],
	                backgroundColor: [
	                    'red',
	                    'orange',
	                    'yellow',
	                    'green',
	                    'blue',
	                    'brown',
	                ],
	                label: 'Dataset 1'
	            }],
	            labels: [
	                "UAQ",
	                "FUJ",
	                "SHJ",
	                "AUH",
	                "RAK",
	                "DXB"
	            ]
	        },
	        options: {
	            responsive: true,
	            maintainAspectRatio: false,
	            legend: {
	            	position:'right'
	        	}
	        }
	    });
    }
});