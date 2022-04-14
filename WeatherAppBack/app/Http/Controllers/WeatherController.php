<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class weatherController extends Controller
{
    //

    public function getWeathersByDay() {
        $days = [
            strtotime(' 0 day'),
            strtotime(' +1 day'),
            strtotime(' +2 day'),
            strtotime(' +3 day'),
            strtotime(' +4 day'),
            strtotime(' +5 day')
        ];

        $weathers = $this->getWeathers();
        $resultWeathers = [];

        foreach ($days as $i => $item) {
            $daySelected = date("l", $item);
            $resultWeathers[] = $weathers[$daySelected];
            $resultWeathers[$i]['date'] = date("j F", $item);
        }
        return $resultWeathers;
    }
    public function getWeathers() {
        return [
            'Tuesday' => [
                'day' => 'Tuesday',
                'weather' => 'Partly Cloudy',
                'type' => 'partlycloudy',
                'temperature' => 30,
                'high' => 31,
                'low' => 26,
                'humidity' => 68,
                'rain' => 36,
                'wind' => 21
            ],
            'Wednesday' => [
                'day' => 'Wednesday',
                'weather' => 'Thunderstorms',
                'type' => 'thunderstorm',
                'temperature' => 32,
                'high' => 32,
                'low' => 25,
                'humidity' => 73,
                'rain' => 40,
                'wind' => 11
            ],
            'Thursday' => [
                'day' => 'Thursday',
                'weather' => 'Sunny',
                'type' => 'sunny',
                'temperature' => 34,
                'high' => 34,
                'low' => 26,
                'humidity' => 68,
                'rain' => 20,
                'wind' => 13
            ],
            'Friday' => [
                'day' => 'Friday',
                'weather' => 'Cloudy',
                'type' => 'cloudy',
                'temperature' => 29,
                'high' => 29,
                'low' => 25,
                'humidity' => 65,
                'rain' => 20,
                'wind' => 10
            ],
            'Saturday' => [
                'day' => 'Saturday',
                'weather' => 'Thunderstorms',
                'type' => 'thunderstorm',
                'temperature' => 30,
                'high' => 30,
                'low' => 26,
                'humidity' => 66,
                'rain' => 40,
                'wind' => 10
            ],
            'Sunday' => [
                'day' => 'Sunday',
                'weather' => 'Rainy',
                'type' => 'rainy',
                'temperature' => 33,
                'high' => 33,
                'low' => 26,
                'humidity' => 62,
                'rain' => 20,
                'wind' => 11
            ],
            'Monday' => [
                'day' => 'Monday',
                'weather' => 'Sunny',
                'type' => 'sunny',
                'temperature' => 33,
                'high' => 34,
                'low' => 28,
                'humidity' => 52,
                'rain' => 10,
                'wind' => 17
            ]
        ];
    }
}
