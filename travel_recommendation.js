const teamResults = document.getElementById("teamResults");
const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
const countries = [];
const temples = [];
const beaches = [];
const temMembers = [];

/* get the team members tyo show on about us page */

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

/*
function addPatient() {
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const condition = document.getElementById("condition").value;

    if (name && gender && age && condition) {
      patients.push({ name, gender: gender.value, age, condition });
      resetForm();
      generateReport();
    }
  }

  function resetForm() {
    document.getElementById("name").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("age").value = "";
    document.getElementById("condition").value = "";
  }

  function generateReport() {
    const numPatients = patients.length;
    const conditionsCount = {
      Diabetes: 0,
      Thyroid: 0,
      "High Blood Pressure": 0,
    };
    const genderConditionsCount = {
      Male: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
      },
      Female: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
      },
    };

    for (const patient of patients) {
      conditionsCount[patient.condition]++;
      genderConditionsCount[patient.gender][patient.condition]++;
    }

    report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
    report.innerHTML += `Conditions Breakdown:<br>`;
    for (const condition in conditionsCount) {
      report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
    }

    report.innerHTML += `<br>Gender-Based Conditions:<br>`;
    for (const gender in genderConditionsCount) {
      report.innerHTML += `${gender}:<br>`;
      for (const condition in genderConditionsCount[gender]) {
        report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
      }
    }
  }

addPatientButton.addEventListener("click", addPatient);
*/
    function searchCountry() {
        const input = document.getElementById('travelInput').value.toLowerCase();
        const resultDiv = document.getElementById('countryList');
        resultDiv.innerHTML = '';

        fetch('travel_recommendation_api.json')
          .then(response => response.json())
          .then(data => {
            const country = data.countries.find(item => item.name.toLowerCase() === input);

            if (country) {
              const name = country.name;
              const cities = country.cities;
              cities.forEach((city) => {
                resultDiv.innerHTML += `<div class='countryDiv'><img class='cityImg' src='${city.imageUrl}'><p class='cityName'>${city.name}</p><p class='cityDesc'>${city.description}</p><button class='cityBtn' id='city${city.id}'>Visit</button></div>`;
                });
              
            } else {
              resultDiv.innerHTML = 'Country not found.';
            }
          })
          .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
          });
      }

      function resetCountry(){
        const resultDiv = document.getElementById('countryList');
        resultDiv.innerHTML = '';
        document.getElementById('travelInput').value='';
        
      }
        btnSearch.addEventListener('click', searchCountry);

        btnReset.addEventListener('click', resetCountry);