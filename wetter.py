from datetime import datetime

from wetterType import WetterType
from wetterbedingungen import Wetterbedingungen


class Wetter:
    def __init__(self, temperature: float, min_temperature: float, max_temperature: float, wind: int, luftfeuchtigkeit: float, sonnenaufgang: datetime, sonnenuntergang: datetime, stadt: str, wolken: int, wetterbedingungen: Wetterbedingungen) -> None:
        self.temperature = temperature
        self.min_temperature = min_temperature
        self.max_temperature = max_temperature
        self.wind = wind
        self.luftfeuchtigkeit = luftfeuchtigkeit
        self.sonnenaufgang = sonnenaufgang
        self.sonnenuntergang = sonnenuntergang
        self.stadt = stadt
        self.wolken = wolken
        self.wetterbedingungen = wetterbedingungen    
        