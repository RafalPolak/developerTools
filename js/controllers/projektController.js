var aktualnosci = angular.module('projektController', []);


aktualnosci
	.controller('projektCtrl', ['$scope', function ($scope) {

		$scope.releases = ["Release 2.19.0","Release 2.18.0","Release 2.17.0"];

		$scope.current = 0;

    $scope.isFormatted = false;

    $scope.isReleases = false;

    $scope.releasesNew = [];

    $scope.popup1 = {
        opened: false
      };

    $scope.popup2 = {
        opened: false
      };

    $scope.text = null;

//date function start
    $scope.today = function() {
        $scope.dtStart = new Date();
        $scope.dtEnd = new Date();
      };
    
    $scope.openStartDate = function() {
        $scope.popup1.opened = true;
      };

    $scope.openEndDate = function() {
        $scope.popup2.opened = true;
      };
//date function end


    $scope.today();
  		

//read files
readTextFile("log2.txt");
readTextFile("log2_1.txt");



//read file fun

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

                //fun to create data strucure
                prepareStructure($scope.text);

              }
        }
    }
    rawFile.send(null);
}


// prepare data structure

function prepareStructure(data){

                console.log(data);            
                //iterate over array

//TO DO - refactor start
                //if contain # then:
                                  // cut between #
                                  // empty array for commits
                                  // boolean isAddingCommits 
                                  // add to object with version
                                  // and start adding commits to array
                                  // if next # then:
                                          //
                var isAddingCommits = false;
                var arrayForCommits = [];
                var releases = [];
                var version = null;

                for(var index=0;index<data.length;index++){
                  
                  //pattern to cut someText between #someText#
                  var pattern = /#([\s\S]*?)(?=#)/g;
                  var result = data[index].match(pattern);

                      //find version
                      if(result!==null){
                        console.log("result jest inny, mam wersje");
                          
                          //check if version is new
                          if(result!==version){
                            console.log("arrayForCommits cos ma", arrayForCommits);
                            //refactor below duplicate code
                            if(version!==null&&arrayForCommits.length>0){
                                var ob = {version:version,
                                          commits:arrayForCommits,
                                          toString:function(){
                                    return "\nversion: "+this.version + " \n\ncommits:\n"+this.commits;
                                }
                              };
                            releases.push(ob);
                            isAddingCommits = false; 
                            }
                          }
                            

                          version = result.toString();
                          arrayForCommits = [];
                          isAddingCommits = true;

                          console.log("Moja wersja i status");
                          console.log(version);
                          console.log(arrayForCommits);
                          console.log(isAddingCommits);
                          
                      }

                      if(isAddingCommits){
                        console.log('dodaje',data[index]);
                        arrayForCommits.push(data[index]);
                      }
                      console.log('status',index)
                      console.log('dlugosc',data.length);
                      //condition if we have last version and there is no next version
                      if(data.length-1==index){
                        var ob = {version:version,
                                  commits:arrayForCommits,
                                  toString:function(){
                                    return "\nversion: "+this.version+"\n\ncommits:\n"+this.commits;
                                  }};
                            releases.push(ob);
                            isAddingCommits = false;
                      }
                  
                }

                console.log("TEST OB: ",releases);
                $scope.releasesNew.push(releases);

//TO DO - refactor end



}


//for tests data check

$scope.checkReleases = function(){

        //check lodash _.uniq(array)
        //return only unique value        

        if($scope.releasesNew.length!==0){
          $scope.isReleases = true;
          /*
              make $scope.releasesNew as array
              if select some version then iterate by array and check version
              if version correct then add commits to data for view
          */
          $scope.structuredData = $scope.releasesNew;
        }
  }




//end read file fun

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