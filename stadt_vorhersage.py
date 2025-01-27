from datetime import datetime
from typing import List

from vorhersage import Vorhersage


class StadtVorhersage:
    def __init__(self, temperaturen: List[Vorhersage], stadt: str, land: str) -> None:
        self.temperaturen = temperaturen
        self.stadt = stadt
        self.land = land
