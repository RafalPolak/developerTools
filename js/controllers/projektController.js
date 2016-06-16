var aktualnosci = angular.module('projektController', []);


aktualnosci
	.controller('projektCtrl', ['$scope', function ($scope) {
		
		$scope.releases = ["Release 2.19.0","Release 2.18.0","Release 2.17.0"];

		$scope.current = 0;

    $scope.isFormatted = false;



//date code

		$scope.today = function() {
    		$scope.dtStart = new Date();
    		$scope.dtEnd = new Date();
  		};

  		$scope.today();

  		$scope.popup1 = {
    		opened: false
  		};

  		$scope.popup2 = {
    		opened: false
  		};

		$scope.openStartDate = function() {
    		$scope.popup1.opened = true;
  		};

  		$scope.openEndDate = function() {
    		$scope.popup2.opened = true;
  		};

//end date code

  		$scope.text = null;



readTextFile("log.txt");


  	function readTextFile(file)
  {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                $scope.commits = allText;
                $scope.text = allText.split(/\n/);
            }
        }
    }
    rawFile.send(null);
}

  		var test = $scope.text;

  		//check date start/end and show commits
  		$scope.startFormatting = function(){

        var isFormatWithDate = true;
        var startPoint = false;
        var endPoint = false;

        var sliceDateEnd = $scope.dtEnd.toISOString().slice(0,10);
        var sliceDateStart = $scope.dtStart.toISOString().slice(0,10);

        console.log(sliceDateStart);

        var sliceDate;
        var arrayDate = [];

        if($scope.dtStart===$scope.dtEnd){
          isFormatWithDate = false;
        }


        if(isFormatWithDate){
          console.log('Formatting with date');
            
            for(var i=0;i<test.length;i++){
              sliceDate = test[i].slice(0,10);
              if(startPoint===false){
                if(sliceDate===sliceDateEnd){
                  startPoint=true;
                }
              }
              if(startPoint===true&&endPoint==false){
                arrayDate.push(test[i]);
              }
              if(endPoint===false){
                if(sliceDate===sliceDateStart){
                  endPoint=true;
                  }
                }
            }    

            $scope.isFormatted = true;
            $scope.formatted = arrayDate
            console.log("after formatting",arrayDate);      
        }


  			//have array with one commit


  			//slice from beginng to end date


  			//compare with dtStart

  			//boolean startPoint = false
  			//if equal then write to new array and set flag startPoint = true

  			//boolean endPoint = false
  			//next check if meet date end and set flag endPoint = true

  			/*if(startPoint==false){
					if(item[0-8]equal dtStart[0-8]){
						startPoint=true
					}
					add to new array
  				}

  			  if(startPoint==true&&endPoint==false){
				add to new array
  			  }
	
  			  if(endPoint==false){
					if(item[0-9]equal dtEnd[0-8]){
						endPoint=true
					}
  			  }
  			  */

  			console.log($scope.dtStart);
  			console.log($scope.dtEnd);
  		}


  		$scope.generatePdf = function(){
  			//generate pdf with commits
  			var doc = new jsPDF();
        //set font title
				doc.setFontSize(22);
        //set first line
				doc.text(20, 20, 'Projekt3');
        //set font content
				doc.setFontSize(16);

				var coordinate = 20;
        var maxHeight = 460;

				for(var i=0;i<test.length;i++){
            if(coordinate+11>=maxHeight){
              doc.addPage();
              coordinate = 20;
              doc.setFontSize(22);
              doc.text(20, 20, 'Projekt3');
              doc.setFontSize(16);
            }
					doc.text(20, coordinate+=11, test[i]);
  				}	


				doc.save('Test.pdf');
  		}


	}]);