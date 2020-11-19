"""First hug API (local and HTTP access)"""
from flatlib.datetime import Datetime
from flatlib.geopos import GeoPos
from flatlib.chart import Chart
from flatlib import const

import hug

# from hug.middleware import CORSMiddleware # I can't remember why I needed this but I did, you may or may not need it
# api = hug.API(__name__)
# api.http.add_middleware(CORSMiddleware(api))

@hug.get(examples='date=20150313&time=17%3A00&location1=38n32&location2=8w54')  
@hug.local()
def getAllOneNodeType(date: hug.types.text, time: hug.types.text, location1: hug.types.text, location2: hug.types.text, hug_timer=3):
    """Changing the data types"""
    dateString = date[0:4]+"/"+date[4:6]+"/"+date[6:8]
    timeString = time[0:2]+":"+time[5:7]
    return runAstroScript(dateString, timeString, location1, location2)




def runAstroScript(dateString, timeString, location1, location2):
# Here you call the functions you need to and parse the data into whatever format you need it in (maybe a dict)
    """Running flatlib script"""
    date = Datetime(dateString, timeString, '+00:00')
    pos = GeoPos(location1, location2)
    chart = Chart(date, pos, IDs=const.LIST_OBJECTS)
    asc = chart.get(const.ASC)
    chart_array = []
    for obj in chart.objects:
        obj_dict = {"planet":obj.id, "sign": obj.sign}
        chart_array.append(obj_dict)
    asc_dict = {"planet":asc.id,"sign":asc.sign}
    chart_array.append(asc_dict)
    return {'message': 'Chart {0}'.format(chart_array)}


