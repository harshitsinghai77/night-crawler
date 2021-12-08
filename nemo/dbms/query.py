# query 1
def query_1(query1_area_code):
    # query1_area_code = 3
    return (
        "WITH female_incidents AS  "
        "(\n "
        "   SELECT i.DATE_TIME AS DATE_TIME, i.crime_code AS crime_code, i.DR_NO AS DR_NO "
        "   FROM incidents i, victims v, district d "
        "   WHERE i.victim_id = v.victim_id AND i.area_code = d.area_code "
        f"   AND v.gender = 'F' AND d.area_code = {query1_area_code} AND EXTRACT(year from i.DATE_TIME) < 2020 "
        ")\n"
        "SELECT r.calender_year, r.yearly_growth, c.crime_desc "
        "FROM crime c, "
        "   (\n"
        "       SELECT t1.calender_year AS calender_year, t1.crime_code AS crime_code, ROUND(((cast(t1.no_of_incidents as decimal) - t2.no_of_incidents) / t2.no_of_incidents) * 100, 2) AS yearly_growth, t2.calender_year AS previous_year, t1.no_of_incidents AS Current_Year_Incidents, t2.no_of_incidents AS Prev_Year_Incidents "
        "       FROM (\n"
        "               SELECT EXTRACT(year from DATE_TIME) AS calender_year, crime_code, count(DISTINCT(DR_NO)) AS no_of_incidents "
        "               FROM female_incidents "
        "               GROUP BY EXTRACT(year from DATE_TIME), crime_code "
        "               HAVING count(DISTINCT(DR_NO)) >=15 "
        "               ORDER BY calender_year ASC "
        "            ) t1 \n"
        "       LEFT JOIN \n"
        "            (\n"
        "               SELECT EXTRACT(year from DATE_TIME) AS calender_year, crime_code, count(DISTINCT(DR_NO)) AS no_of_incidents "
        "               FROM female_incidents "
        "               GROUP BY EXTRACT(year from DATE_TIME), crime_code "
        "               HAVING count(DISTINCT(DR_NO)) >=15 "
        "               ORDER BY calender_year ASC "
        "            ) t2 \n"
        "       ON t1.crime_code = t2.crime_code AND t2.calender_year = t1.calender_year - 1 "
        "       WHERE (t1.calender_year, ROUND(((cast(t1.no_of_incidents as decimal) - t2.no_of_incidents) / t2.no_of_incidents) * 100, 2)) IN "
        "            (\n"
        "               SELECT t1.calender_year, MAX(ROUND(((cast(t1.no_of_incidents as decimal) - t2.no_of_incidents) / t2.no_of_incidents) * 100, 2)) "
        "               FROM (\n"
        "                       SELECT EXTRACT(year from DATE_TIME) AS calender_year, crime_code, count(DISTINCT(DR_NO)) AS no_of_incidents "
        "                       FROM female_incidents "
        "                       GROUP BY EXTRACT(year from DATE_TIME), crime_code "
        "                       HAVING count(DISTINCT(DR_NO)) >=15 "
        "                       ORDER BY calender_year ASC "
        "                    ) t1 \n"
        "                   LEFT JOIN \n"
        "                    (\n"
        "                       SELECT EXTRACT(year from DATE_TIME) AS calender_year, crime_code, count(DISTINCT(DR_NO)) AS no_of_incidents "
        "                       FROM female_incidents "
        "                       GROUP BY EXTRACT(year from DATE_TIME), crime_code "
        "                       HAVING count(DISTINCT(DR_NO)) >=15 "
        "                       ORDER BY calender_year ASC "
        "                    ) t2 \n"
        "               ON t1.crime_code = t2.crime_code AND t2.calender_year = t1.calender_year - 1 "
        "               WHERE ROUND(((cast(t1.no_of_incidents as decimal) - t2.no_of_incidents) / t2.no_of_incidents) * 100, 2) IS NOT NULL "
        "               GROUP BY t1.calender_year "
        "            )\n"
        "   ) r \n"
        "WHERE c.crime_code = r.crime_code "
        "ORDER BY calender_year; "
    )


# query 2
def query_2(query2_bureau):
    # query2_bureau = "('77th Street', 'Harbor', 'Southwest', 'Southeast')"
    query2 = f"""
    SELECT concat(arr.calender_year,'-Q',arr.calender_quarter) AS year_quarter, 
        ROUND((cast(arr.no_of_arrests as decimal) / inc.no_of_incidents) * 100, 2) AS Arrest_Percentage
        FROM
        (
            SELECT 
                EXTRACT(year from fe.DATE_TIME) AS calender_year,
                EXTRACT(quarter from fe.DATE_TIME) AS calender_quarter,
                count(DISTINCT(fe.DR_NO)) AS no_of_arrests
            FROM (
                    SELECT *
                    FROM incidents i, victims v, district d
                    WHERE i.victim_id = v.victim_id 
                        AND i.area_code = d.area_code
                        AND d.area_name in {query2_bureau} 
                        AND v.gender = 'F' 
                        AND EXTRACT(year from i.DATE_TIME) < 2020
                ) fe
            WHERE status_code = 'AA' OR status_code = 'JA'
            GROUP BY EXTRACT(year from DATE_TIME), EXTRACT(quarter from DATE_TIME)
            ORDER BY calender_year ASC
        ) arr,
        (
            SELECT 
                EXTRACT(year from DATE_TIME) AS calender_year,
                EXTRACT(quarter from DATE_TIME) AS calender_quarter,
                count(DISTINCT(DR_NO)) AS no_of_incidents
            FROM (
                    SELECT *
                    FROM incidents i, victims v, district d
                    WHERE i.victim_id = v.victim_id 
                        AND i.area_code = d.area_code
                        AND d.area_name in {query2_bureau} 
                        AND v.gender = 'F' 
                        AND EXTRACT(year from i.DATE_TIME) < 2020
                ) fe
            GROUP BY EXTRACT(year from DATE_TIME), EXTRACT(quarter from DATE_TIME)
            ORDER BY calender_year ASC
        ) inc
    WHERE arr.calender_year = inc.calender_year 
        AND arr.calender_quarter = inc.calender_quarter 
    """
    return query2


# query 3
def query_3(ethnicity, crime_codes):
    # query3_ethnicity = "'W'"
    # query3_crime_codes = "(121, 122, 815)"
    query3 = f"""
    WITH female_incidents AS 
    (
        SELECT *
        FROM incidents i, victims v
        WHERE i.victim_id = v.victim_id 
            AND i.crime_code IN {crime_codes}
            AND v.gender = 'F'
            AND v.ethnicity IN {ethnicity}
            AND EXTRACT(year from i.DATE_TIME) < 2020
        )
        SELECT p.premises_desc AS premise_desc, c.time_hour AS time_hour, c.no_of_incidents AS no_of_incidents
        FROM premises p, (
                            SELECT premises_code, EXTRACT(HOUR from DATE_TIME) AS time_hour, COUNT(DISTINCT(dr_no)) AS no_of_incidents
                            FROM female_incidents
                            WHERE premises_code IN ( 
                                SELECT r.premises_code 
                                FROM
                                    (
                                        SELECT premises_code, COUNT(DISTINCT(dr_no))
                                        FROM female_incidents
                                        GROUP BY premises_code
                                        HAVING COUNT(DISTINCT(dr_no)) >= ALL 
                                        (
                                            SELECT COUNT(DISTINCT(dr_no))
                                            FROM female_incidents
                                            GROUP BY premises_code
                                        )
                                    ) r
                            )
                            GROUP BY EXTRACT(HOUR from DATE_TIME), premises_code
                        ) c				 
        WHERE p.premises_code = c.premises_code
        ORDER BY time_hour
    """
    return query3


# query4
def query_4(query4_AGE_RANGE, query4_year):
    # query4_AGE_RANGE = "41 AND 45"
    # query4_year = "2014"
    query4 = f"""
        WITH female_incidents AS 
        (
            SELECT *
            FROM incidents i, victims v
            WHERE i.victim_id = v.victim_id 
                AND i.area_code BETWEEN 1 AND 11
                AND v.gender = 'F'
                AND v.age BETWEEN {query4_AGE_RANGE}
        )
        SELECT area_name, GROWTH_Percentage 
        FROM district d,
            (
            SELECT area_code, GROWTH_Percentage 
            FROM (
                SELECT t1.area_code AS area_code, ROUND(((t2.total_incidents - t1.total_incidents)/t1.total_incidents) * 100, 2) AS GROWTH_Percentage 
                FROM   (
                        SELECT * FROM (
                                        SELECT area_code, calender_year, no_of_incidents, SUM(no_of_incidents) OVER (PARTITION BY area_code ORDER BY calender_year) AS total_incidents
                                        FROM (
                                                SELECT area_code, EXTRACT(YEAR FROM DATE_TIME) AS calender_year, COUNT(DISTINCT(dr_no)) AS no_of_incidents
                                                FROM female_incidents
                                                WHERE EXTRACT(YEAR FROM DATE_TIME) < 2020
                                                GROUP BY EXTRACT(YEAR FROM DATE_TIME), area_code
                                                ORDER BY area_code, calender_year
                                            ) a
                                    ) b
                        WHERE calender_year IN ({query4_year},2019)
                        ) t1, 
                        (
                        SELECT * FROM (
                                        SELECT area_code, calender_year, no_of_incidents, SUM(no_of_incidents) OVER (PARTITION BY area_code ORDER BY calender_year) AS total_incidents
                                        FROM (
                                                SELECT area_code, EXTRACT(YEAR FROM DATE_TIME) AS calender_year, COUNT(DISTINCT(dr_no)) AS no_of_incidents
                                                FROM female_incidents
                                                WHERE EXTRACT(YEAR FROM DATE_TIME) < 2020
                                                GROUP BY EXTRACT(YEAR FROM DATE_TIME), area_code
                                                ORDER BY area_code, calender_year
                                            ) a
                                    ) b
                        WHERE calender_year IN ({query4_year},2019)
                        ) t2
                WHERE t1.area_code = t2.area_code AND t1.calender_year = {query4_year} AND t2.calender_year = 2019  
                ) c
            ) ar
        WHERE d.area_code = ar.area_code
    """
    return query4


# query5
def query_5(query5_year_range):
    # query5_year_range = "2013 AND 2018"
    query5 = f"""
    SELECT t1.calender_year, ROUND((cast(t1.male_incidents as numeric)/t2.female_incidents) * 100, 2) AS MaleToFemaleRatio
    FROM (
        SELECT EXTRACT(YEAR FROM i.DATE_TIME) AS calender_year, COUNT(DR_NO) AS male_incidents
        FROM incidents i, victims v
        WHERE v.victim_id = i.victim_id 
            AND v.gender = 'M'
            AND i.weapon_code IS NOT NULL 
            AND EXTRACT(YEAR FROM i.DATE_TIME) BETWEEN {query5_year_range}
        GROUP BY EXTRACT(YEAR FROM i.DATE_TIME)
        ORDER BY calender_year
        ) t1,
        (
        SELECT EXTRACT(YEAR FROM i.DATE_TIME) AS calender_year, COUNT(DR_NO) AS female_incidents
        FROM incidents i, victims v
        WHERE v.victim_id = i.victim_id 
            AND v.gender = 'F'
            AND i.weapon_code IS NOT NULL 
            AND EXTRACT(YEAR FROM i.DATE_TIME) BETWEEN {query5_year_range}
        GROUP BY EXTRACT(YEAR FROM i.DATE_TIME)
        ORDER BY calender_year
        ) t2
        WHERE t1.calender_year = t2.calender_year 
    """
    return query5
