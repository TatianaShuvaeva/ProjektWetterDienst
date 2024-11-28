from dataclasses import dataclass
from wetterType import WetterType


@dataclass
class Wetterbedingungen:
    wetter_type: WetterType
    icon: str
