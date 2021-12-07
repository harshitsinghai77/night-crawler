from typing import List
from pydantic import BaseModel

# query1_area_code = 3
# query2_bureau = "('77th Street', 'Harbor', 'Southwest', 'Southeast')"
# query3_ethnicity = "'W'"
# query3_crime_codes = "(121, 122, 815)"
# query4_AGE_RANGE = "41 AND 45"
# query4_year = "2014"
# query5_year_range = "2013 AND 2018"


class Query1(BaseModel):
    area_code: str


class Query2(BaseModel):
    bureau: List


class Query3(BaseModel):
    ethnicity: str
    crime_codes: List


class Query4(BaseModel):
    age_range: str
    year: str


class Query5(BaseModel):
    year_range: str
