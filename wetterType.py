from enum import Enum


class WetterType(str, Enum):
    THUNDERSTORM = "Gewitter"
    DRIZZLE = "Nieselregen"
    RAIN = "Regen"
    SNOW = "Schnee"
    CLEAR = "Sonnig"
    FOG = "Nebel"
    CLOUDS = "Bewölkt"
  