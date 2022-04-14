import React from 'react';
import axios from 'axios'
// const axios = require('axios');
import {useTransition, animated} from 'react-spring'
import logo from './logo.svg';
import './style.css';

function CurrentDetailItem(props) {

    return (
        <div className="grid-item">
            <div className="center-vertical current-item">
                <div>
                    <img className="detail-img" src={props.detailImg} alt=""/>
                </div>
                <animated.div style={props.style} className="current-details-data">
                    {props.detailData}
                </animated.div>
                <animated.div style={props.style} className="current-details-label">
                    {props.detailLabel}
                </animated.div>
            </div>
        </div>

    )
}

function CurrentWeatherDetails(props) {
    // console.log(props)
    return (
        <div className="current-details">
            <CurrentDetailItem style={props.style} detailImg={require('./img/cold.png')} detailData={`${props.selectedWeather.low}°C`} detailLabel={'Low'}/>
            <CurrentDetailItem style={props.style} detailImg={require('./img/hot.png')} detailData={`${props.selectedWeather.high}°C`} detailLabel={'High'}/>
            <CurrentDetailItem style={props.style} detailImg={require('./img/humidity.png')} detailData={`${props.selectedWeather.humidity}%`} detailLabel={'Humidity'}/>
            <CurrentDetailItem style={props.style} detailImg={require('./img/water-drops.png')} detailData={`${props.selectedWeather.rain}%`} detailLabel={'Rain'}/>
            <CurrentDetailItem style={props.style} detailImg={require('./img/windy.png')} detailData={`${props.selectedWeather.wind}km/h`} detailLabel={'Wind'}/>
        </div>
    )
}

function OtherDayItem(props) {
    let highlight = ''
    if (props.selectedStyle) {
        highlight = (<animated.div style={props.style} className="other-day-highlight"/>)
    }
    const otherImgArr = {
        sunny: <img className="other-img" src={require('./img/sun.png')} alt=""/>,
        partlycloudy: <img className="other-img" src={require('./img/cloudy.png')} alt=""/>,
        cloudy: <img className="other-img" src={require('./img/clouds.png')} alt=""/>,
        thunderstorm: <img className="other-img" src={require('./img/storm.png')} alt=""/>,
        rainy: <img className="other-img" src={require('./img/rainy.png')} alt=""/>,
    }
    const otherImg = otherImgArr[props.type]
    return (
        <div className="grid-item">
            <div className="center-vertical other-item" onClick={() => {props.handleClick(props.index)}}>
                <div className="other-date">
                    {props.date}
                </div>
                <div>
                    {otherImg}
                </div>
                <div className="other-weather" >
                    {props.weather}
                </div>
                <div className="other-temperature">
                    {props.temperature}
                </div>
            </div>
            {highlight}
        </div>
    )
}

function OtherDaysWeather(props) {

    // console.log(props)

    function handleClick(item) {
        // console.log('Clicking Item', item)
        props.setSelectedWeather(props.weathers[item])
    }

    return (
        <div className="other-days">
            {
                props.weathers.map((item, index) => {
                    let isSelectedStyle = item == props.selectedWeather
                    return (
                        <OtherDayItem
                        key={index}
                        handleClick={handleClick}
                        type={item.type}
                        date={item.date}
                        weather={item.weather}
                        temperature={`${item.temperature}°C`}
                        index={index}
                        selectedStyle={isSelectedStyle}
                        style={props.style}
                        />
                    )
                })
            }

        </div>
    )
}

const weathersData = [
    {
        date: '12 April',
        day: 'Tuesday',
        weather: 'Partly Cloudy',
        type: 'partlycloudy',
        temperature: 30,
        high: 31,
        low: 26,
        humidity: 68,
        rain: 36,
        wind: 21
    },
    {
        date: '13 April',
        day: 'Wednesday',
        weather: 'Thunderstorms',
        type: 'thunderstorm',
        temperature: 32,
        high: 32,
        low: 25,
        humidity: 73,
        rain: 40,
        wind: 11
    },
    {
        date: '14 April',
        day: 'Thursday',
        weather: 'Sunny',
        type: 'sunny',
        temperature: 33,
        high: 33,
        low: 26,
        humidity: 68,
        rain: 20,
        wind: 13
    },
    {
        date: '15 April',
        day: 'Friday',
        weather: 'Cloudy',
        type: 'cloudy',
        temperature: 33,
        high: 33,
        low: 25,
        humidity: 65,
        rain: 20,
        wind: 10
    },
    {
        date: '16 April',
        day: 'Saturday',
        weather: 'Thunderstorms',
        type: 'thunderstorm',
        temperature: 33,
        high: 33,
        low: 26,
        humidity: 66,
        rain: 40,
        wind: 10
    },
    {
        date: '17 April',
        day: 'Sunday',
        weather: 'Rainy',
        type: 'rainy',
        temperature: 33,
        high: 33,
        low: 26,
        humidity: 62,
        rain: 20,
        wind: 11
    }
]

function CurrentWeather(props) {

    const currentImgArr = {
        sunny: <img className="current-img" src={require('./img/sun.png')} alt=""/>,
        partlycloudy: <img className="current-img" src={require('./img/cloudy.png')} alt=""/>,
        cloudy: <img className="current-img" src={require('./img/clouds.png')} alt=""/>,
        thunderstorm: <img className="current-img" src={require('./img/storm.png')} alt=""/>,
        rainy: <img className="current-img" src={require('./img/rainy.png')} alt=""/>,
    }

    const currentImg = currentImgArr[props.selectedWeather.type]

    return (
        <div style={props.style} className="center-vertical">
            <div className="center-vertical location-n-date">
                <div className="location-city">
                    {props.locationLabel}
                </div>
                <animated.div className="currrent-date" style={props.style}>
                    {`${props.selectedWeather.day}, ${props.selectedWeather.date}`}
                </animated.div>
            </div>
            <animated.div style={props.style} className="current-weather">
                <div className="flex">
                    <div className="center-vertical c-w-left">
                        <div>
                            {currentImg}
                        </div>
                        <div className="c-w-label">
                            {`${props.selectedWeather.weather}`}
                        </div>
                    </div>

                    <div className="current-temperature c-w-right">
                        {`${props.selectedWeather.temperature}°C`}
                    </div>
                </div>
            </animated.div>

            <CurrentWeatherDetails style={props.style} selectedWeather={props.selectedWeather}/>
        </div>
    )

}

function WeatherApp() {
    const [weathers, setWeathers] = React.useState(weathersData)
    const [selectedWeather, setSelectedWeather] = React.useState(weathers[0])
    const [locationLabel, setLocationLabel] = React.useState('Manila, PH')

    React.useEffect(() => {
        axios.get(`http://68.183.178.126:4001/api`)
        .then(function (response) {
            console.log(response.data)
            setWeathers(response.data)
            setSelectedWeather(weathers[0])
        })
        .catch(function (error) {
            console.log(error)
        })
        .then(function () {
            // always executed
        });



        function showPosition(position) {
            // console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`)
            axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`)
            .then(function (response) {
                // console.log(response)
                // console.log(response.data)
                setLocationLabel(`${response.data.city}, ${response.data.countryCode}`)
            })
            .catch(function (error) {
                // console.log(error)
            })
            .then(function () {
                // always executed
            });
        }

        var errorHandler = function (errorObj) {
            alert(`Sorry, Geolocation on your device is not working because
                ${errorObj.code}: ${errorObj.message}
            `);
        }

        function getLocation() {
            // console.log(position.coords)

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
                navigator.geolocation.getCurrentPosition(
                showPosition, errorHandler,
                {enableHighAccuracy: true, maximumAge: 10000});
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        }
        getLocation()
    },[])

    const transition = useTransition(selectedWeather, {
        from: {opacity: 0},
        enter: {opacity: 1},
        // leave: {opacity: 0},
        trail: 100,
        // order: ['leave', 'enter', 'update'],
    })
    const transitionOther = useTransition(selectedWeather, {
        from: {opacity: 0},
        enter: {opacity: 1},
    })

    const transitionBg = useTransition(selectedWeather, {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0},
    })
    // console.log(weathers)
    // console.log(selectedWeather)
    const backgroundImgArr = {
        sunny: <img src={require('./img/sunny-bg.jpg')} alt=""/>,
        partlycloudy: <img src={require('./img/partlycloudy-bg.jpeg')} alt=""/>,
        cloudy: <img src={require('./img/cloudy-bg.webp')} alt=""/>,
        thunderstorm: <img src={require('./img/thunderstorm-bg.webp')} alt=""/>,
        rainy: <img src={require('./img/rainy-bg.jpg')} alt=""/>,
    }

    const selectedBackground = backgroundImgArr[selectedWeather.type]

    return (
        <div className="center-vertical main-body">

            <div className="center-vertical backbox">
                <div className="in-box">
                    {transition((style, item) =>
                        item ? <CurrentWeather locationLabel={locationLabel} selectedWeather={selectedWeather} style={style} /> : ''
                    )}

                    {transitionOther((style, item) =>
                        item ? <OtherDaysWeather weathers={weathers} selectedWeather={selectedWeather} style={style} setSelectedWeather={setSelectedWeather}/> : ''
                    )}
                </div>
                <div className="bg">
                </div>
            </div>

            {transitionBg((style, item) =>
                item ? <animated.div className="main-background" style={style}>{selectedBackground}</animated.div> : ''
            )}


        </div>
    )
}

function App() {
  return (
    <div className="App">
        <WeatherApp/>
    </div>
  );
}

export default App;
