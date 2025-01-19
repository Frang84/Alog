# Lista użytych wzorców projektowych
1.  Table Data Gateway 
    1. przykłady użycia (viewHangovers.py)
    ```python
        def post(self, request): 
        try: 
            userId = request.user.id 
            user = User.objects.all().filter(id = userId).first()
            date = self.getDate(request.data.get("date")) 
            hangoverType = request.data.get('hangoverType')
            Hangover.objects.create(user=user, date=date, hangoverType=hangoverType)
            return Response({'message': 'Hangover created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return  Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    ```
    służy do wybrania kilku wierszy z bazy danych 
2. Row Data Gateway 
    1. przykaład użycia 
    ```python
    def post(self, request): 
        try: 
            userId = request.user.id 
            user = User.objects.all().filter(id = userId).first()
            date = self.getDate(request.data.get("date")) 
            hangoverType = request.data.get('hangoverType')
            Hangover.objects.create(user=user, date=date, hangoverType=hangoverType)
            return Response({'message': 'Hangover created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return  Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    ```
    metoda first zwraca nam obiekt uzytkownika ktory jest pozniej wykorzystywany do stworzenia obiektu rezprezentujacego hangover 

3. Foregin key mapping
    ```python
        class Hangover(models.Model): 
    hangoverTypeChoice = [
        ('restless night', 'restless night'),
        ('bad mood', 'bad mood'),
        ('indigestion', 'indigestion')
    ]
    user = models.ForeignKey(User, related_name='hangovers', on_delete=models.CASCADE)
    date = models.DateTimeField()
    hangoverType = models.CharField(max_length=100, choices=hangoverTypeChoice)
    ```
4. Transaction Script 
    ```python
            def totalAlcoholPrice(self, userId, groupBy, startDate, endDate): 
        '''funckaj wylicza calkowity alkohol i cene dla kazdego dnia w podanym przedziale czasowym'''
        with connection.cursor() as cursor:
            cursor.execute(f"""
            SELECT  {groupBy}, SUM(price) as totalPrice, SUM(volume * percentage/100) as totalAlcohol
            FROM alcohol_event 
            INNER JOIN alcohol_alcohol ON alcohol_event.alcohol_id = alcohol_alcohol.id
            WHERE alcohol_event.userId_id = {userId} AND (date BETWEEN '{startDate}' AND '{endDate}')
            GROUP BY {groupBy}
            ORDER BY {groupBy}
            """)
            row = cursor.fetchall()
            return row

    def preferedAlcoType(self, userId, startDate, endDate): 
        '''oblicza jaki udzial procentowy po przeliczeniu na czysty spirytus ma dany typ alkocholu w podanym przedziale czasowym'''
        with connection.cursor() as cursor:
            cursor.execute(f"""
            SELECT alcoholType,  SUM(volume * percentage/100) 
            as alcoTypePercentage
            FROM alcohol_event 
            INNER JOIN alcohol_alcohol ON alcohol_event.alcohol_id = alcohol_alcohol.id
            WHERE alcohol_event.userId_id = {userId} AND date BETWEEN '{startDate}' AND '{endDate}'
            GROUP BY alcoholType
            """)
            row = cursor.fetchall()
            return row
    ```
5. Repository 
    ```python
        Hangover.objects.create(user=user, date=date, hangoverType=hangoverType)

        def delete(self, request): 
            try: 
                # Pobierz obiekt Hangover na podstawie ID i upewnij się, że należy do zalogowanego użytkownika
                hangover = Hangover.objects.filter(id=request.data.get('hangoverId'), user_id=request.user.id).first()
                if hangover:
                    hangover.delete()
                    return Response({'message': 'Hangover deleted successfully'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Hangover not found or you are not authorized to delete it'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    ```
    oddzielenie tworzenia i usuwania obiektu 

6. Identity field 
    ```python
    class Challange(models.Model): 
        challangeTypeChoice = [
            ('Limit', 'Limit'),
            ('Alone', 'Alone')
        ]
        user = models.ForeignKey(User, related_name='chellenges', on_delete=models.CASCADE)
        limitAlc = models.FloatField()
        chellangeType = models.CharField(max_length=100, choices=challangeTypeChoice)
        startDate = models.DateTimeField()
        endDate = models.DateTimeField()
    ```
    do klasy automatycznie dołączne jest pole id

7. Domain Model

    odseparowana logika dziedziny od reszty kodu. W strukturze plików folder modelsDir.

8. Querry object 
    ```python
        def getChallanges( userId): 
            with connection.cursor() as cursor:
                cursor.execute(f"""
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
                    alcohol_challange.user_id = {userId}
                GROUP BY alcohol_challange.id;
                """)
                row = cursor.fetchall()
                return row
    ```
    pozwala na tworzenie kodu sql w zaleznosci od id użytkownika. 

    

