import React,{useState} from "react";
import axios from "axios";
function App() {
  const [data,setData]=useState({})
  const [location,setLocation]=useState('')
  

  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=cc71aa34334aabb12df1a0b3033cd641`
  
  const searchLocation = async (event) => {
    if(event.key ==='Enter'){
      const axisAi = await axios.get(url)
      console.log(axisAi);
      setData(axisAi.data);
      setLocation('');
    }
  }
  
  function GetData(props){
    if (data.main) {
      switch(props.name){
        case "temperature":
          return (`${data.main.temp}°C`)
        case "humidity":
          return(`${data.main.humidity}%`)
        case "feels":
          return(`${data.main.feels_like}°C`)
        case "speed":
          return (`${data.wind.speed}m/s`)
        default:
          return null
      }      
    } 
  }    

  return (
    <div className="app bg-[url(./assests/sunset.jpg)] bg-no-repeat bg-center bg-cover w-full h-screen relative overflow-hidden ">
      <div className="search text-center p-6 ">
        <input className="p-3 text-white rounded-xl bg-transparent/60"
        value={location}
        onChange={event => setLocation(event.target.value)}
        placeholder='Enter Location' required
        onKeyPress={searchLocation}      
        type='text'></input>        
      </div>
      
      <div className="container max-w-[700px] h-[700px] m-auto p-1 relative top-[10%] flex column justify-between">
        <div className="top w-full m-4">
          <div className="location ">
            <p className="text-2xl font-bold m-4">{data.name}</p>
          </div>
          <div className="temp">
            <p className="text-6xl font-semibold block m-4"><GetData name="temperature"/></p>
          </div>
          <div className="description">
            <p className="text-2xl font-bold m-4">{data.weather ? data.weather[0].main : null}</p>
          </div>

        </div>
        <div className="#Bottom flex justify-evenly text-center w-full my-auto mx-4 p-4 rounded-xl bg-white/80">
          <div className="Feels">
            <p className="text-2xl"><GetData name="feels"/></p>
            <p className="text-sm font-semibold">Feels Like</p>
          </div>
          <div className="Humidity">
            <p className="text-2xl"><GetData name="humidity"/></p>
            <p className="text-sm font-semibold">Humidity</p>            
          </div>
          <div className="Wind">
            <p className="text-2xl"><GetData name="speed"/></p>
            <p className="text-sm font-semibold">Speed</p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;
