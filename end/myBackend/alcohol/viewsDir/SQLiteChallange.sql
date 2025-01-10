-- SQLite
SELECT 
alcohol_event.id AS eventId,
alcohol_alcohol.name AS alcoholName,
alcohol_challange.id AS challangeId,
SUM(alcohol_alcohol.volume * alcohol_alcohol.percentage/100) AS overallAlc
FROM alcohol_event 
JOIN alcohol_challange ON alcohol_challange.user_id = alcohol_event.userId_id
JOIN alcohol_alcohol  ON alcohol_alcohol.id = alcohol_event.alcohol_id
WHERE alcohol_event.date BETWEEN 
alcohol_challange.startDate AND alcohol_challange.endDate
GROUP BY alcohol_challange.id
