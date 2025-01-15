

-- INSERT INTO alcohol_event (alcohol_id, userId_id, eventName, [date])
-- VALUES (2, 1, 'Party', '2025-01-21 19:52:52.563038');

-- DELETE FROM alcohol_event
-- WHERE alcohol_id = 2 AND eventName = 'Party';

SELECT 
    alcohol_challange.startDate,
    alcohol_challange.endDate,
    alcohol_challange.chellangeType,
    IFNULL(SUM(alcohol_alcohol.volume * alcohol_alcohol.percentage / 100), 0) AS overallAlc,
    alcohol_challange.limitAlc AS limitOfAlcohol
FROM alcohol_challange
LEFT JOIN alcohol_event 
    ON alcohol_challange.user_id = alcohol_event.userId_id
    AND alcohol_event.date BETWEEN alcohol_challange.startDate AND alcohol_challange.endDate
LEFT JOIN alcohol_alcohol  
    ON alcohol_alcohol.id = alcohol_event.alcohol_id
WHERE 
    alcohol_challange.user_id = 1
GROUP BY alcohol_challange.id;



SELECT SUM(volume * percentage/100)  
FROM alcohol_event 
INNER JOIN alcohol_alcohol ON alcohol_event.alcohol_id = alcohol_alcohol.id
WHERE alcohol_event.userId_id = 1 AND date BETWEEN "2025-01-08 17:32:26.866293" AND  "2025-01-15 17:32:26.866293"




SELECT h.hangoverType, COUNT(h.hangoverType)
FROM alcohol_hangover AS h
WHERE user_id = 1 AND date BETWEEN "2025-01-08 17:32:26.866293" AND "2025-01-15 17:32:26.866293"
GROUP BY h.hangoverType



