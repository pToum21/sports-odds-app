var seacrhBtn = document.querySelector('#search-btn');
var searchBar = document.querySelector('#search-bar');
var team;
var gameArea = document.querySelector('#game-area');
var americanFootballTeamName;
var oddsTeam;
var teamOne = document.querySelector('#team-1');
var teamTwo = document.querySelector('#team-2');
var teamOneOdds = document.querySelector('#odds-for-team-1');
var teamTwoOdds = document.querySelector('#odds-for-team-2');
function oddsGetter(teamName) {
  // First API for odds
  var options = { method: "GET", headers: { "User-Agent": "insomnia/8.1.0" } };

  fetch(
    "https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=2e7e1a581a683ba3a7d10cb86a9f4105&regions=us&markets=spreads",
    options
  )
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
      for (let i = 0; i < data.length; i++) {
        if(teamName === data[i].home_team || teamName === data[i].away_team){


          console.log(data[i].bookmakers[1].markets[0].outcomes[0].name)
        console.log(data[i].bookmakers[1].markets[0].outcomes[1].name)
        console.log(data[i].bookmakers[1].markets[0].outcomes[0].price)
        console.log(data[i].bookmakers[1].markets[0].outcomes[1].price)

          teamOne.textContent = data[i].bookmakers[1].markets[0].outcomes[0].name;
          teamTwo.textContent = data[i].bookmakers[1].markets[0].outcomes[1].name;
          teamOneOdds.textContent = data[i].bookmakers[1].markets[0].outcomes[0].price;
          teamTwoOdds.textContent = data[i].bookmakers[1].markets[0].outcomes[1].price;

        }else {
          console.log('no odds')
        }
      }
      

  })
  .catch(function (error) {
    console.log(error);
  })
}
  //   Second API for games
  function teamchooser(){
    var americanFootballURL =
    "https://americanfootballapi.p.rapidapi.com/api/american-football/search/" + team;
  var americanFootballKey = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": '746925a469msh98c5942603eb21ap1763ecjsn8eaf237b1f64',
      "X-RapidAPI-Host": "americanfootballapi.p.rapidapi.com",
    },
  };

  fetch(americanFootballURL, americanFootballKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      americanFootballTeamName = data.results[0].entity.name
      oddsGetter(americanFootballTeamName);
    })
    .catch(function (error) {
      console.log(error);
    });}
  



seacrhBtn.addEventListener('click', function (event) {
  event.preventDefault();
  team = searchBar.value;
  teamchooser();
})






// if(americanFootballTeamName === data[0].home_team || data[0].away_team){
 
// }