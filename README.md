 Vehicle Maintenance Scheduler Design



Depots structer
```json
{
  "depots": [
    { "ID": 1, "MechanicHours": 60 },
    { "ID": 2, "MechanicHours": 135 }
  ]
}
```

Vehcile 
```json
{
  "vehicles": [
    { "TaskID": "...", "Duration": 1, "Impact": 5 },
    { "TaskID": "...", "Duration": 6, "Impact": 2 }
  ]
}
```
data is not hard coded used only api and returned the data 
for the stage 1 i displayed we can fetch the required remote data before  building the next stages 
the screenshot is provideid in the file 

Final update :


now in final added *notifiacans*
## Notifications:

these notifications are ranked by type and recent weight like 
placement = 3
result = 2
event = 1
so the new notification will scored high and the op retunrs top N items and total count 

Now the Total Backend workflow : 

the depots forwards the depot API response and vehicles forwardws the vehicle task responsne and finally the notification fetches notf and ranks them 
