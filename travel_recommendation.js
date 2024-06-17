const teamResults = document.getElementById("teamResults");
const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
const countries = [];
const temples = [];
const beaches = [];
const temMembers = [];


/* get the team members to show on about us page */
function getTeam() {
        teamResults.innerHTML = '';

        fetch('travel_recommendation_api.json')
          .then(response => response.json())
          .then(data => {
            const teamMembers = data.teamMembers;
            if (teamMembers) {
                for(let i = 0; i < teamMembers.length; i++)  {
                    teamResults.innerHTML += `<div class='memberDiv'><div class='memberImg'><img src='${teamMembers[i].img}'></div><div class='textMember'><div class='memberName'>${teamMembers[i].name}</div><div class='memberDets'>${teamMembers[i].details}</div><div class='jobMember'>${teamMembers[i].job}</div></div></div>`;
                };
            } else {
                teamResults.innerHTML = 'Team members not found.';
            }
          })
          .catch(error => {
            console.error('Error:', error);
            teamResults.innerHTML = 'An error occurred while fetching data.';
          });
          
}

/* Show the country with all it's cities */

    function searchCountry() {
        const input = document.getElementById('travelInput').value.toLowerCase();
        const resultDiv = document.getElementById('countryList');
        resultDiv.innerHTML = '';
        const country = '';
        
        fetch('travel_recommendation_api.json')
          .then(response => response.json())
          .then(data => {
            
            if(input === 'countries' || input === 'country'){
                const allCountries=data.countries;
                for(let i = 0; i < allCountries.length; i++) {
                    const cities = allCountries[i].cities;
                    cities.forEach((city) => {
                        if(city.name !='' && city.name != 'undefined')
                            resultDiv.innerHTML += `<div class='countryDiv'><img class='cityImg' src='${city.imageUrl}'><p class='cityName'>${city.name}</p><p class='cityDesc'>${city.description}</p><button class='cityBtn' id='city${city.id}'>Visit</button></div>`;
                    });
                }
            }else{getOneCountry(data,input);}
                
                
          })
          .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
          });
      }

      function getOneCountry(data,countryName){
        const resultDiv = document.getElementById('countryList');
       
        const country = data.countries.find(item => item.name.toLowerCase() === countryName);
        const timeZone = country.timeZone;
         
        const options = { timeZone: timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const theTime = new Date().toLocaleTimeString('en-US', options);
        console.log("Current time in " + countryName + " is:", theTime);
        
        if (country) {
            const cities = country.cities;
            cities.forEach((city) => {
                resultDiv.innerHTML += `<div class='countryDiv'><img class='cityImg' src='${city.imageUrl}'><p class='cityName'>${city.name}</p><p class='cityDesc'>${city.description}</p><button class='cityBtn' id='city${city.id}'>Visit</button></div>`;
            });
            
        } else {
            resultDiv.innerHTML = 'Country not found.';
        }
    }


      function resetCountry(){
        const resultDiv = document.getElementById('countryList');
        resultDiv.innerHTML = '';
        document.getElementById('travelInput').value='';
        
      }


      function getRecommandation() {

        const input = document.getElementById('travelInput').value.toLowerCase().trim();
        const resultDiv = document.getElementById('countryList');
        resultDiv.innerHTML = '';
        let category='';
        //check if a category?
        if(input != ''){
            if(input === 'countries' || input === 'country'){
                //case category country
                searchCountry();
            }else if(input === 'beaches' || input === 'beach'){
                //case category beaches
                getCategory("beaches");
            }else if(input === 'temples' || input === 'temple'){
                //case category temples
                getCategory("temples");
            }else{
                //case is not category
                freeSearch(input);
            }
        }
      }

      function getCategory(category){
        const resultDiv = document.getElementById('countryList');
        resultDiv.innerHTML = '';
        let place='';
        fetch('travel_recommendation_api.json')
          .then(response => response.json())
          .then(data => {
            if(category === 'beaches'){
                place = data.beaches;
            }else if(category === 'temples'){
                place = data.temples;
            }
                
            if (place) {
                for(let i = 0; i < place.length; i++)  {
                    resultDiv.innerHTML += `<div class='countryDiv'><img class='cityImg' src='${place[i].imageUrl}'><p class='cityName'>${place[i].name}</p><p class='cityDesc'>${place[i].description}</p><button class='cityBtn' id='city${place[i].id}'>Visit</button></div>`;
                }; 
            } 
            else {
              resultDiv.innerHTML = 'Nothing found.';
            }
          })
          .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
          });
      }

      function freeSearch(input){
        const resultDiv = document.getElementById('countryList');
        resultDiv.innerHTML = '';
        let beaches=[];
        let temples=[];
        let countries=[];
        let flag=0;
        let listNames;

        fetch('travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => {
                beaches= data.beaches;  
                temples= data.temples;
                countries = data.countries;

                //check beaches
                for(let i = 0; i < beaches.length; i++)  {
                    if(beaches[i].name != ''){
                        listNames=beaches[i].poss.split(',');
                        for(let x=0 ;x < listNames.length ; x++){
                           if(input===listNames[x].trim()) {
                            flag=1;
                            resultDiv.innerHTML += `<div class='countryDiv'><img class='cityImg' src='${beaches[i].imageUrl}'><p class='cityName'>${beaches[i].name}</p><p class='cityDesc'>${beaches[i].description}</p><button class='cityBtn' id='city${beaches[i].id}'>Visit</button></div>`;
                            break;
                          }
                        }
                    }
                }; 

                //check temples
                if(!flag){
                    for(let i = 0; i < temples.length; i++)  {
                        if(temples[i].name != ''){
                            listNames=temples[i].poss.split(',');
                            for(let x=0 ;x < listNames.length ; x++){
                               if(input===listNames[x].trim()) {
                                    flag=2;
                                    resultDiv.innerHTML += `<div class='countryDiv'><img class='cityImg' src='${temples[i].imageUrl}'><p class='cityName'>${temples[i].name}</p><p class='cityDesc'>${temples[i].description}</p><button class='cityBtn' id='city${temples[i].id}'>Visit</button></div>`;
                                    break;
                                }
                            }
                        }
                    }; 

                }

                //check countries
                if(!flag){
                    for(let i = 0; i < countries.length; i++)  {
                        if(countries[i].name != ''){
                            listNames=countries[i].poss.split(',');
                            for(let x=0 ;x < listNames.length ; x++){
                               if(input===listNames[x].trim()) {
                                    flag=3;
                                    getOneCountry(data,listNames[x]);
                                    break;
                               }
                            }
                        }
                    }; 

                }
                
                if(!flag){
                    resultDiv.innerHTML = 'We could not find your search word. Please try with another name.';
                }   
            })
            .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });

      }

btnSearch.addEventListener('click', getRecommandation);

btnReset.addEventListener('click', resetCountry);