<<<<<<< HEAD
import axios from "axios"

export default {
    // Get book from google search 
    getWeather: function() {
        return axios.get("https://www.googleapis.com/books/v1/https://api.openweathermap.org/data/2.5/weather?q=" + Cleveland+'&appid=9d59733d7f86dfa6c2aae70e5cfc0676')
    }.then(function(response){
        
        let temp = 1.8*(response.main.temp - 273) + 32;
        let name = state.text(response.name);
        let farenheit = state.text(temp.toFixed(0) + '°F');
    
       var weatherResults = state.addClass("weatherGroup");
    
       $(weatherResults).append(temp,name, farenheit,);
    
      })
    
}
=======
import axios from "axios";

export default {
    sendLogin: function (loginData) {
        return axios.post("/login", loginData);
    }
};
>>>>>>> bd44e727acfb34c4ea8e4cadb97bf5c5591f791d
