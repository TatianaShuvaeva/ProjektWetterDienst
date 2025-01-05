from functools import cache
import requests
from datetime import datetime
from typing import List

from exceptions.api_dienst_error import ApiDienstError
from exceptions.nicht_gefunden_fehler import NichtGefundenFehler
from vorhersage import Vorhersage
from wetter import Wetter
from koordinaten import Koorditaten
from stadt_vorhersage import StadtVorhersage
from wetterType import WetterType
from wetterbedingungen import Wetterbedingungen


class WetterDienst:
    def __init__(self, api_key: str):
        self._api_key = api_key
        # https://example.com/path/to/page?name=ferret&color=purple
        self._base_url = (
            "https://api.openweathermap.org/data/2.5/weather"
            "?appid={api_key}"
            "&q={stadt_name}"
            "&units=metric"
        )
        self._url_breiten_laengengrad = (
            "https://api.openweathermap.org/geo/1.0/direct"
            "?appid={api_key}"
            "&q={stadt_name}"
            "&limit=1"

        )
        self._url_fuenf_tage = (
            "https://api.openweathermap.org/data/2.5/forecast"
            "?appid={api_key}"
            "&lat={breitengrad}"
            "&lon={laengengrad}"
            "&units=metric"
        )

    @cache
    def get(self,  stadt: str) -> Wetter:

        complete_url = self._base_url.format(
            stadt_name=stadt, api_key=self._api_key)

        response = requests.get(complete_url)

        if response.status_code == 404:
            raise NichtGefundenFehler(f"{stadt} ist nicht gefunden")

        antwort_json = response.json()
        if antwort_json["cod"] != 200:
            print(response.text)
            raise Exception(antwort_json)

        temperatur = antwort_json["main"]["temp"]
        min_temperature = antwort_json["main"]["temp_min"]
        max_temperature = antwort_json["main"]["temp_max"]
        wind = antwort_json["wind"]["speed"]
        luftfeuchtigkeit = antwort_json["main"]["humidity"]
        sonnenaufgang = datetime.fromtimestamp(antwort_json["sys"]["sunrise"])
        sonnenuntergang = datetime.fromtimestamp(antwort_json["sys"]["sunset"])
        stadt = antwort_json["name"]
        wolken = antwort_json["clouds"]["all"]
        wetter_type = self._parse_wetter_type(antwort_json)
        wetter_type_icon = antwort_json["weather"][0]["icon"]
        wetterbedingungen = Wetterbedingungen(wetter_type, wetter_type_icon)

        return Wetter(temperatur, min_temperature, max_temperature, wind, luftfeuchtigkeit, sonnenaufgang, sonnenuntergang, stadt, wolken, wetterbedingungen)

    def _parse_wetter_type(self, antwort_json: dict) -> WetterType:
        try:
            wetter_type_id = str(antwort_json["weather"][0]["id"])
        except (IndexError, KeyError):
            raise ApiDienstError

        wetter_types = {
            "2": WetterType.THUNDERSTORM,
            "3": WetterType.DRIZZLE,
            "5": WetterType.RAIN,
            "6": WetterType.SNOW,
            "7": WetterType.FOG,
            "800": WetterType.CLEAR,
            "80": WetterType.CLOUDS
        }
        for key, wert in wetter_types.items():
            if wetter_type_id.startswith(key):
                return wert
        raise ApiDienstError

    @cache
    def _get_breiten_laengengrad(self,  stadt: str) -> Koorditaten:
        url = self._url_breiten_laengengrad.format(
            stadt_name=stadt, api_key=self._api_key)

        response = requests.get(url)

        antwort_json = response.json()
        
        if antwort_json == []:        
            raise NichtGefundenFehler(f"{stadt} ist nicht gefunden")
        
        breitengrad = antwort_json[0]["lat"]
        laengengrad = antwort_json[0]["lon"]
        land = antwort_json[0]["country"]
        gebiet = '' #antwort_json[0]["state"]
        stadt = antwort_json[0]["name"]

        return Koorditaten(breitengrad, laengengrad, land, gebiet, stadt)

    @cache
    def get_vorhersage(self,  stadt: str) -> StadtVorhersage:
        koordinaten = self._get_breiten_laengengrad(stadt)

        url = self._url_fuenf_tage.format(
            breitengrad=koordinaten.breitengrad, laengengrad=koordinaten.laengengrad, api_key=self._api_key)

        response = requests.get(url)

        if response.status_code == 404:
            raise NichtGefundenFehler(f"{koordinaten.breitengrad} und {
                                      koordinaten.laengengrad} sind nicht gefunden")

        antwort_json = response.json()

        vorhersagen: List[Vorhersage] = []

        for element in antwort_json["list"]:
            datum_zeit = datetime.fromtimestamp(element["dt"])
            temperature = element["main"]["temp"]
            min_temperature = element["main"]["temp_min"]
            max_temperature = element["main"]["temp_max"]

            vorhersage = Vorhersage(
                datum_zeit, temperature, min_temperature, max_temperature)
            vorhersagen.append(vorhersage)

        return StadtVorhersage(vorhersagen, koordinaten.stadt, koordinaten.land)
