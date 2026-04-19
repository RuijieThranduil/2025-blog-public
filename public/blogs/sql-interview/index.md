## Introduction

### Course Intro & How to Prep for the SQL Interview

- 课程结构
    - SQL 考点总结（视频讲解 + 笔记）
    - SQL 面试技巧分享（视频讲解 + 笔记）
    - SQL 面试真题（笔记）
        - Concept questions
        - Query analysis questions
        - Live coding questions
- 注意事项
    - 本课程适用于熟悉基本 SQL 语法的同学，如果没有基础的同学推荐可以先上 Udemy 的 Master SQL for Data Science
    - 全套课程笔记：[https://armandbirt.notion.site/Ace-SQL-Interview-Problems-8be3af9bdcae44d98225d9b96d686e41](https://www.notion.so/Ace-SQL-Interview-Problems-973d2342204e829aa33201453d8d4c21?pvs=21)
    - SQL 本身考点比较有限，不像数据结构与算法需要大量刷题找到感觉，写出好的 SQL query 更需要对于 SQL 本身知识点的扎实理解。建议在掌握基本 SQL 语法后准备面试的学习路径是首先复习并且掌握考点，然后再配合少量刷题。本套笔记将 SQL 考点整理为以下几个方面：
        - Database & SQL Query Basics
        - Using Functions
        - Grouping Data
        - Subqueries
        - CASE Clause
        - JOIN
        - Window Functions
        - Contemporary Table Expressions
    - 考点梳理的部分如果有大家不会的知识点，建议 Google 补充相关知识
    - Live coding questions 真实面试的环境下也是无法运行 SQL code 查看是否正确的，所以需要大家练习如何快速理解 database 结构并且写 solution。如果有大家不理解的 solution 可以将标记 * 的 SQL 代码放到为大家准备的 PostgreSQL database 里运行
- 为什么我会做这套课程
    - 觉得有一套好的笔记非常重要可以节省很多学习时间，这样学的时候可以专注于理解内容而且之后也可以随时复习
- SQL Interview 准备方法
    1. Learn an introductory course in SQL (Highly recommended: [https://www.udemy.com/course/master-sql-for-data-science/](https://www.udemy.com/course/master-sql-for-data-science/)) 
    2. Go over this set of course notes and make sure you really master the concept
    3. (Optional) Check out the following resources for more practices: 
        
        [https://www.interviewquery.com/blog-facebook-sql-questions/](https://www.interviewquery.com/blog-facebook-sql-questions/) 
        
        [https://www.interviewquery.com/blog-amazon-sql-interview-questions](https://www.interviewquery.com/blog-amazon-sql-interview-questions) 
        
        [https://www.interviewquery.com/blog-google-sql-interview-questions](https://www.interviewquery.com/blog-google-sql-interview-questions) 
        

### What is SQL and Understanding SQL in Context (From Software to Data Science)

- SQL, or Structured Query Language, is a standardized programming language specifically designed for managing and manipulating relational databases.
    - **Data Querying**: SQL allows you to retrieve specific data from one or more tables using the `SELECT` statement. You can filter, sort, and aggregate data to generate reports and insights.
    - **Data Manipulation**: SQL enables you to add, update, or delete data within a database using commands like `INSERT`, `UPDATE`, and `DELETE`.
    - **Data Definition**: You can define and modify the structure of database tables with SQL using `CREATE`, `ALTER`, and `DROP` statements. This includes specifying table columns, data types, and relationships between tables.
        - Define table schema and structure
        - Define table partitioning
- **Software Engineering**: SQL is used to manage application data, such as user profiles, settings, and transactions, ensuring data is correctly stored and retrieved.
    
    例子：Youtube 
    
    - Backend development
        
        当用户注册账户后，在 Backend 的 PostgreSQL database create a user account 
        
        ```python
        import psycopg2
        from flask import Flask, request, jsonify
        
        app = Flask(__name__)
        
        # Configure the PostgreSQL connection
        db_config = {
            'dbname': 'youtube_app',
            'user': 'username',
            'password': 'password',
            'host': 'localhost'
        }
        
        def get_db_connection():
            conn = psycopg2.connect(**db_config)
            return conn
        
        @app.route('/create_account', methods=['POST'])
        def create_account():
            data = request.json
        
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')
        
            if not username or not email or not password:
                return jsonify({'error': 'Username, email, and password are required'}), 400
        
            try:
                conn = get_db_connection()
                cursor = conn.cursor()
        
                # Use a parameterized query to prevent SQL injection
                insert_query = '''
                    **INSERT INTO users (username, email, password) 
                    VALUES (%s, %s, %s)**
                '''
        
                cursor.execute(insert_query, (username, email, password))
                conn.commit()
        
                cursor.close()
                conn.close()
        
                return jsonify({'message': 'User created successfully'}), 201
            except psycopg2.IntegrityError:
                return jsonify({'error': 'User with this username or email already exists'}), 400
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        
        if __name__ == '__main__':
            app.run(debug=True)
        ```
        
    - Generating telemetry events
        
        Instead of manually writing code to insert records into a database, the telemetry events sdk / 3rd party tool provides functions or methods that you can call to log events. These functions automatically capture relevant data, format it, and queue it for transmission to a telemetry server.
        
        Example: use a telemetry SDK to log an event where a user likes a video. 
        
        ```python
        # Import the telemetry SDK
        import telemetry_sdk
        
        # Initialize the SDK with configuration
        telemetry_sdk.initialize(api_key='YOUR_API_KEY')
        
        # Log a video like event
        telemetry_sdk.log_event('Video Like', {
            'user_id': 'user123',
            'video_id': 'video456',
            'video_title': 'Exciting Tech Innovations',
            'device': 'iPhone 12',
            'os_version': 'iOS 16',
            'timestamp': '2024-08-03T12:34:56Z'
        })
        
        # The SDK handles the rest: batching, queuing, and sending to the server
        ```
        
- **Data Engineering**: SQL is essential for ETL (Extract, Transform, Load) processes, where data is extracted from different sources, transformed into a suitable format, and loaded into data warehouses.
    
    ```python
    from airflow import DAG
    from airflow.operators.python_operator import PythonOperator
    from airflow.operators.bigquery_operator import BigQueryExecuteQueryOperator
    from airflow.utils.dates import days_ago
    from airflow.hooks.postgres_hook import PostgresHook
    from google.cloud import bigquery
    import pandas as pd
    import requests
    import os
    
    # Define default arguments for the DAG
    default_args = {
        'owner': 'airflow',
        'depends_on_past': False,
        'start_date': days_ago(1),
        'retries': 1,
    }
    
    # Initialize the DAG
    dag = DAG(
        'data_pipeline',
        default_args=default_args,
        description='A data pipeline that extracts data from PostgreSQL and Amplitude and loads it into BigQuery',
        schedule_interval='@daily',  # Runs daily
    )
    
    # Define the function to extract user account data from PostgreSQL
    def extract_postgresql_data(**kwargs):
        pg_hook = PostgresHook(postgres_conn_id='your_postgres_conn_id')
        sql = "SELECT * FROM user_accounts WHERE date = CURRENT_DATE;"
        df = pg_hook.get_pandas_df(sql)
        df.to_csv('/path/to/your/local/storage/user_accounts.csv', index=False)
        print("PostgreSQL data extraction complete")
    
    # Define the function to extract like video event data from Amplitude
    def extract_amplitude_data(**kwargs):
        api_key = 'YOUR_AMPLITUDE_API_KEY'
        url = 'https://amplitude.com/api/2/events'
        params = {
            'start': 'yesterday',  # Adjust the date range as needed
            'end': 'today',
            'api_key': api_key
        }
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        df = pd.json_normalize(data['events'])
        df.to_csv('/path/to/your/local/storage/like_events.csv', index=False)
        print("Amplitude data extraction complete")
    
    # Define the function to load data into BigQuery
    def load_data_into_bigquery(table_name, file_path, **kwargs):
        client = bigquery.Client()
        dataset_id = 'your_dataset_id'
        table_id = f'{dataset_id}.{table_name}'
        
        job_config = bigquery.LoadJobConfig(
            source_format=bigquery.SourceFormat.CSV,
            skip_leading_rows=1,
            autodetect=True,
        )
        
        with open(file_path, 'rb') as file:
            job = client.load_table_from_file(file, table_id, job_config=job_config)
        
        job.result()  # Wait for the load job to complete.
        print(f"Loaded data into {table_id} from {file_path}")
    
    # Define the tasks
    extract_pg_task = PythonOperator(
        task_id='extract_postgresql_data',
        python_callable=extract_postgresql_data,
        provide_context=True,
        dag=dag,
    )
    
    extract_amplitude_task = PythonOperator(
        task_id='extract_amplitude_data',
        python_callable=extract_amplitude_data,
        provide_context=True,
        dag=dag,
    )
    
    load_pg_to_bq_task = PythonOperator(
        task_id='load_postgresql_data_to_bigquery',
        python_callable=load_data_into_bigquery,
        op_args=['user_accounts', '/path/to/your/local/storage/user_accounts.csv'],
        provide_context=True,
        dag=dag,
    )
    
    load_amplitude_to_bq_task = PythonOperator(
        task_id='load_amplitude_data_to_bigquery',
        python_callable=load_data_into_bigquery,
        op_args=['like_events', '/path/to/your/local/storage/like_events.csv'],
        provide_context=True,
        dag=dag,
    )
    
    # Set the task dependencies
    extract_pg_task >> extract_amplitude_task >> load_pg_to_bq_task
    extract_amplitude_task >> load_amplitude_to_bq_task
    ```
    
- **Analytics Engineering**: SQL is used to create data models and transformations that serve as the foundation for business intelligence and reporting tools.
    - **ETL**: Transformed data is often smaller in volume, as unnecessary details are removed before loading.
    - **ELT**: Loads raw data, which can be larger, and transforms it as needed for analysis.
    
    ```python
    # Example of ETL 
    
    transform_data_task = BigQueryExecuteQueryOperator(
        task_id='transform_data',
        sql="""
        -- Create or replace table with user-level likes
        CREATE OR REPLACE TABLE `your_project_id.your_dataset_id.user_likes_summary` AS
        SELECT
            user_id,
            DATE(event_time) AS event_date,
            COUNT(*) AS total_likes
        FROM
            `your_project_id.your_dataset_id.like_events`
        GROUP BY
            user_id, event_date;
    
        -- Create or replace table with video-level likes
        CREATE OR REPLACE TABLE `your_project_id.your_dataset_id.video_likes_summary` AS
        SELECT
            video_id,
            DATE(event_time) AS event_date,
            COUNT(*) AS total_likes
        FROM
            `your_project_id.your_dataset_id.like_events`
        GROUP BY
            video_id, event_date;
        """,
        use_legacy_sql=False,  # Use standard SQL
        dag=dag,
    )
    ```
    
- **Data Science and Analysis**: SQL helps data scientists and analysts extract and prepare data for analysis, enabling them to derive insights and build predictive models.
    
    ```sql
    SELECT 
        event_date, AVG(total_likes)
    FROM 
        `your_project_id.your_dataset_id.video_like_summary`
    GROUP BY 1
    ```
    

### Environment Setup

- Download link: [www.postgresql.org](http://www.postgresql.org)
- PostgreSQL Server is the actual database application server and pgAdmin4 is the graphical user interface where we can interact with the database.
- For now, we can ignore all of the other items but the most important one that we're going to be involved with in this course is the tables icon, which represents where the data is saved in a database.
    
    ![](Untitled.png)
    
- Right click "Databases" → Select "Create" → Select "Database" → Enter database details
- Select a database → Click "Tools" → Select "Query Tool" → Copy, paste and execute the following statements（注意如果执行这个文件两次会报错"Table already exists" ）
    
    [mock-data.txt](mock-data.txt)
    

## SQL Recap

### Chapter 1: Database & SQL Query Basics

- 考点 1.1: Relational vs. Non-relational
    - A relational database is structured, meaning the data is organized in tables. A relational database is a collection of tables. Many times, the data within these tables have relationships with one another, or dependencies.
    - A non relational database is document-oriented, meaning, all information gets stored in more of a laundry list order.
- 考点 1.2: A primary key is the column or columns that contain values that uniquely identify each row in a table.
- Querying data from a table
    
    ```sql
    SELECT column1, column2 
    FROM table
    WHERE condition
    ORDER BY column1 DESC
    LIMIT number
    ```
    
- `WHERE` clause is used to extract only those records that fulfill a specified condition and will check if every single row meets the condition.
    
    ```sql
    SELECT * 
    FROM employees 
    WHERE 1 = 1 
    -- true for every single record 
    ```
    
- 考点 1.3: The SQL language is case insensitive and the data is case sensitive.
- 考点 1.4: `Null` values cannot be compared
    - `IS NULL` / `IS NOT NULL`
    - The following statements will all evaluate to NULL:
        - `WHERE email = NULL`
        - `WHERE NULL != 1`
        - `WHERE NULL = NULL`
        - `WHERE NULL != NULL`
- `DISTINCT` 的使用
    - In SQL multiple fields may be added with `DISTINCT` clause. `DISTINCT` will eliminate those rows where all the selected fields are identical.
        
        ```sql
        SELECT DISTINCT column1,column2,column3 FROM table
        -- equivalent to: SELECT column1,column2,column3 FROM table GROUP BY column1,column2,column3
        ```
        
    - The following syntax is incorrect:
        
        ```sql
        ~~SELECT email, DISTINCT department~~
        FROM employees
        ```
        
- 考点 1.5: Column Alias
    - Renaming Columns
        
        We need to surround the compound word in double quotes. Whereas single quotes in PostgreSQL are used to create a text string, double quotes are used to name an identifier with the case preserved. 
        
        ```sql
        SELECT first_name, last_name AS "Last Name", salary AS Yearly_Salary
        FROM employees 
        ```
        
    - In PostgreSQL, column alias is not allowed in `WHERE` and `HAVING` clauses, but is acceptable in `GROUP BY` and `ORDER BY` clauses.
        
        The following syntax is incorrect: 
        
        ```sql
        SELECT department dp, COUNT(*) count
        FROM departments 
        GROUP BY dp 
        ~~HAVING count = 1~~
        ```
        
- 考点 1.6: `ORDER BY` 和 `LIMIT` 的使用
    - `ORDER BY` 默认从小到大（时间从早到晚）排列，如果需要倒序排列需要使用 `ORDER BY DESC`
    - We can use `ORDER BY` and `LIMIT` to find the maximum or minimum value without using the `MAX()` or `MIN()` function.
        
        ```sql
        SELECT * 
        FROM employees 
        ORDER BY hire_date DESC
        LIMIT 1 
        ```
        
    - 缺点：如果最大 / 最小值有并列的情况出现，`LIMIT` 只能 return 确定数量的 row。

### Chapter 2: Using Functions

- 考点 2.1: Concatenation
    
    ```sql
    SELECT first_name || ' ' || last_name full_name
    FROM employees 
    ORDER BY salary desc 
    ```
    
- 考点 2.2: String functions
    - `UPPER()`, `LOWER()`, `LENGTH()`
        
        ```sql
        SELECT LENGTH(first_name), LOWER(department) 
        FROM employees
        ```
        
    - `TRIM()`
        
        ```sql
        SELECT TRIM('   HELLO THERE   ')
        ```
        
    - `SUBSTRING()`
        
        ```sql
        SELECT SUBSTRING('This is test data' FROM 9 FOR 4) test_data_extracted
        ```
        
        ```sql
        SELECT SUBSTRING('This is test data' FROM 3) test_data_extracted 
        ```
        
        ```sql
        SELECT 
        	last_name, 
        	UPPER(SUBSTRING(department, 1, 3)) AS department, 
        	-- extract 3 characters starting from position 1
        	salary, 
        	hire_date 
        FROM employees  
        ```
        
    - `COALESCE()` function returns the first non-null value in a list.
        
        ```sql
        SELECT COALESCE(email, NULL, NULL, 'Non-null value', NULL, 'Example') 
        FROM employees
        ```
        
- 考点 2.3: Date functions
    
    [https://www.postgresql.org/docs/current/functions-datetime.html](https://www.postgresql.org/docs/current/functions-datetime.html) 
    
    [https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-date/](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-date/) 
    
- 考点 2.4: Returning a number in specified decimal places
    - `ROUND(AVG(salary), 2)` returns a number rounded to 2 digits after decimal; whereas `TRUNC(AVG(salary), 2)` returns a number truncated to 2 digits after decimal.
    - `CAST(AVG(salary) AS DECIMAL(10,2))` is the same as `ROUND(AVG(salary), 2)`.
    - Both `SELECT 3/5` and `SELECT ROUND(3/5,2)` returns 0. In order to perform division properly, we have to use `SELECT 3/ROUND(5,2)`.

### Chapter 3: Grouping Data

- Grouping rows using an aggregate function
    
    ```sql
    SELECT column1, aggregate(column2)
    FROM table 
    GROUP BY column1
    HAVING condition 
    ```
    
- 考点 3.1: `COUNT(*)` is equivalent to `COUNT([primary key])`
    
    ```sql
    SELECT COUNT(employee_id)
    -- employee_id is the primary key column, so there must be data in there
    -- equivalent to: SELECT COUNT(*)  
    FROM employees 
    ```
    
- 考点 3.2: Any non-aggregate columns that are mentioned in the `SELECT` list must also be mentioned in the `GROUP BY` clause.
    
    ```sql
    SELECT department, gender, count(*) 
    FROM employees 
    GROUP BY department, gender 
    ORDER BY department 
    ```
    
- 考点 3.3: `HAVING`
    - The `HAVING` clause was added to SQL because the `WHERE` keyword cannot be used with aggregate functions. The `WHERE` clause places conditions on the selected columns, whereas the `HAVING` clause places conditions on groups created by the GROUP BY clause.
    - `WHERE` clause 中不能出现 aggregate function，但是 `HAVING` clause 中可以。
        
        ```sql
        SELECT column_name(s)
        FROM table_name
        WHERE condition
        GROUP BY column_name(s)
        HAVING condition
        ORDER BY column_name(s) 
        ```
        
- 考点 3.4: Count the number of distinct values
    
    ```sql
    SELECT department, COUNT(DISTINCT last_name)
    FROM employees 
    GROUP BY 1 
    ORDER BY 2 DESC 
    ```
    

### Chapter 4: Subqueries

- 考点 4.1: Subqueries in `WHERE` / `HAVING` clause
    
    ```sql
    SELECT * FROM employees 
    WHERE department NOT IN (SELECT department FROM departments) 
    ```
    
    ```sql
    SELECT salary 
    FROM employees 
    GROUP BY salary 
    HAVING COUNT(*) >= ALL(SELECT COUNT(*) FROM employees GROUP BY salary) 
    ORDER BY salary DESC 
    LIMIT 1
    ```
    
- 考点 4.2: Subqueries in `FROM` clause
    
    Once the subquery is in the FROM clause, we need to give the source of data an alias. 
    
    ```sql
    SELECT a.employee_name, a.yearly_salary 
    FROM (
    	SELECT first_name employee_name, salary yearly_salary 
    	FROM employees WHERE salary > 150000) a 
    ```
    
- 考点 4.3: Subqueries in `SELECT` clause
    
    Subquery used as an expression in `SELECT` clause can only return one row. 
    
    ```sql
    ~~SELECT first_name, last_name, salary, (SELECT first_name FROM employees)~~ 
    SELECT first_name, last_name, salary, (SELECT first_name FROM employees LIMIT 1) 
    FROM employees
    ```
    
- Correlated subquery（几乎很少用到）
    - A subquery is a query within a query. A correlated subquery is a query nested inside of another that uses values from the outer query.
    - Write a query that can obtain the names of those departments that have more than 38 employees and shows the highest paid employee of each department
        
        ```sql
        SELECT department, (SELECT MAX(salary) FROM employees WHERE department = d.department)
        FROM departments d 
        WHERE 38 < (SELECT COUNT(*) FROM employees e WHERE e.department = d.department) 
        ```
        

### Chapter 5: CASE Clause

- 考点 5.1: Conditional expressions
    
    ```sql
    SELECT CASE
        WHEN condition1 THEN result1
        WHEN condition2 THEN result2
        WHEN conditionN THEN resultN
        ELSE result
    END 
    FROM table 
    ```
    
- 考点 5.2: Transpose date using `CASE` with `SUM()`
    
    ```sql
    SELECT 
    	SUM(CASE WHEN salary < 100000 THEN 1 ELSE 0 END) as under_paid, 
    	-- count number of the employees whose salary is < 100000
    	SUM(CASE WHEN salary > 100000 AND salary < 160000 THEN 1 ELSE 0 END) as paid_well, 
    	SUM(CASE WHEN salary > 160000 THEN 1 ELSE 0 END) as executive 
    FROM employees 
    ```
    

### Chapter 6: JOIN

- Querying from multiple tables
    
    ```sql
    SELECT table1.column1, table2.column2
    FROM table 1 
    LEFT JOIN ON condition 
    -- RIGHT JOIN ON condition 
    -- FULL OUTER JOIN ON condition 
    -- INNER JOIN ON condition 
    ```
    
- 考点 6.1: Different types of `OUTER JOIN`
    - Left Outer Join (or Left Join)
    - Right Outer Join (or Right Join)
    - Full Outer Join (or Full Join)
        - The FULL OUTER JOIN combines the results of both left and right outer joins and returns all (matched or unmatched) rows from the tables on both sides of the join clause.
- 考点 6.2: Difference between `INNER JOIN` and `OUTER JOIN`
    - An inner join focuses on the commonality between two tables. When using an inner join, there must be at least some matching data between two (or more) tables that are being compared.
    - An outer join returns a set of records (or rows) that include what an inner join would return but also includes other rows for which no corresponding match is found in the other table.
- Joining three tables
    
    If we are joining three tables, we are joining the third table with the table resulted from joining the first two tables. 
    
- 考点 6.3: Solve difficult query challenges using JOIN logic
- 考点 6.4: `UNION` and `UNION ALL`
    - Difference between `UNION` and `UNION ALL`
        
        `UNION` eliminates the duplicates. `UNION` can flip things around since it tries to find unique records. `UNION ALL` gives all of the results from all the records from the first query stacked on top of all the records from the second query 
        
        ```sql
        SELECT department 
        FROM employees 
        UNION 
        -- UNION ALL 
        SELECT department 
        FROM departments 
        ```
        
    - UNION is considered inside of the query.
        
        Clauses such as Order By should be at the end of the query. 
        
        ```sql
        SELECT DISTINCT department 
        FROM employees 
        ~~ORDER BY department~~
        UNION ALL 
        SELECT department 
        FROM departments 
        UNION 
        SELECT country 
        FROM regions 
        ORDER BY department 
        ```
        
        We should put parenthesis to take the first result as a whole if we want to use LIMIT or ORDER BY clause. 
        
        ```sql
        (SELECT first_name, department, hire_date, country
        FROM employees e INNER JOIN regions r 
        ON e.region_id = r.region_id 
        WHERE hire_date = (SELECT MIN(hire_date) FROM employees e2)
        LIMIT 1)
        UNION 
        SELECT first_name, department, hire_date, country 
        FROM employees e INNER JOIN regions r 
        ON e.region_id = r.region_id
        WHERE hire_date = (SELECT MAX(hire_date) FROM employees e2) 
        ORDER BY hire_date 
        ```
        
- `EXCEPT` - takes the first result set and removes from it all rows from the second result set
    
    ```sql
    SELECT distinct department 
    FROM employees 
    EXCEPT 
    SELECT department 
    FROM departments 
    ```
    

### Chapter 7: Window Functions

- 考点 7.1: Difference between window functions and aggregate functions
    - A **window function** or **analytic function** is a function which uses values from one or multiple rows to return a value for each row. This contrasts with aggregate function, which returns a single value for multiple rows.
    - Window functions have an `OVER` clause; any function without an `OVER` clause is not a window function. We no longer use `GROUP BY` for window functions.
- Syntax
    
    ```sql
    SELECT first_name, department, COUNT(*) OVER()
    -- if we leave the parenthesis empty, we are going to get the total number of employees 
    FROM employees e2 
    ```
    
    ```sql
    SELECT first_name, department, COUNT(*) OVER(PARTITION BY department) 
    FROM employees e2 
    ORDER BY 3 DESC
    ```
    
    ```sql
    SELECT first_name, department, 
    COUNT(*) OVER(PARTITION BY department) dept_count, 
    -- the number of employees in that department 
    region_id, 
    COUNT(*) OVER(PARTITION BY region_id) region_count
    -- the number of employees in that region 
    FROM employees e2 
    ```
    
    ```sql
    SELECT first_name, department, 
    SUM(salary) OVER(PARTITION BY department)
    FROM employees e2 
    ```
    
- 考点 7.2: Window functions run towards the end of the query and is based on whatever data is filtered out
    
    ```sql
    SELECT first_name, department, COUNT(*) OVER()
    -- count is 145, which is the total number of employees in region_id 3
    FROM employees 
    WHERE region_id = 3 
    ```
    
- 考点 7.3: Ordering Data in Window Frames
    - ORDER BY allows us to order the data in such a way that we can create frames of data (rolling sum / average). For example, now we can only target those 10 rows before or 10 rows after.
        
        ```sql
        SELECT first_name, hire_date, salary, 
        SUM(salary) OVER(ORDER BY hire_date RANGE BETWEEN UNBOUNDED PRECEDING 
        								AND CURRENT ROW) as running_total_of_salaries
        -- equivalent to: SUM(salary) OVER(ORDER BY hire_date) as running_total_of_salaries
        FROM employees 
        -- ORDER BY hire_date is not necessary here 
        ```
        
        ```sql
        SELECT first_name, hire_date, department, salary, 
        SUM(salary) OVER(ORDER BY hire_date ROWS BETWEEN 1 PRECEDING AND CURRENT ROW)
        -- SUM(salary) OVER(ORDER BY hire_date ROWS BETWEEN 3 PRECEDING AND CURRENT ROW)
        FROM employees 
        ```
        
    - Note that there is also something called `"ROWS BETWEEN CURRENT ROW AND 1 FOLLOWING"`.
    - `ORDER BY` modifies the window so that it goes from the start of the partition to the current row. Thus, the window function restarts at each partition.
- 考点 7.4: Difference between`RANK()`, `DENSE_RANK()` & `ROW_NUMBER()`
    - Syntax
        
        ```sql
        SELECT first_name, email, department, salary, 
        RANK() OVER(PARTITION BY department ORDER BY salary DESC)
        -- DENSE_RANK() OVER(PARTITION BY department ORDER BY salary DESC)
        -- ROW_NUMBER() OVER(PARTITION BY department ORDER BY salary DESC)
        FROM employees 
        ```
        
    - `RANK()` assigns the rank number to each row in a partition. It skips the number for similar values.
    - `DENSE_RANK()` assigns the rank number to each row in a partition. It does not skip the number for similar values.
    - `ROW_NUMBER()` assigns the sequential rank number to each unique record.
    - 如果遇到有两个 value 并列第一名的情况，RANK()有可能会跳过第二名。比如对于 800, 800, 700 的排列：
        
        `RANK()` 的排列结果：1, 1, 3
        
        `DENSE_RANK()` 的排列结果：1, 1, 2
        
        `ROW_NUMBER()` 的排列结果：1, 2, 3
        
- 考点 7.5: The window function is processed at the end of the query after the `WHERE` clause, so we need a subquery to filter for the window function column.
    
    ```sql
    SELECT * FROM (
    SELECT first_name, email, department, salary, 
    RANK() OVER(PARTITION BY department ORDER BY salary DESC)
    FROM employees 
    	) a
    WHERE rank = 8 
    ```
    
    The following is invalid: 
    
    ```sql
    ~~SELECT first_name, email, department, salary, 
    RANK() OVER(PARTITION BY department ORDER BY salary DESC)
    FROM employees 
    WHERE rank = 8~~
    ```
    
- 考点 7.6: `FIRST_VALUE()` and `NTILE()` Functions
    - `NTILE()`
        
        NTILE() splits each department into n groups (n is the argument). If there's a department that has a number of employees that is not divisible by 5, then it will try to match it as close as possible. 
        
        ```sql
        SELECT first_name, email, department, salary, 
        NTILE(5) OVER(PARTITION BY department ORDER BY salary DESC) salary_bracket 
        FROM employees
        ```
        
    - `FIRST_VALUE()`
        
        The `FIRST_VALUE()` function is a window function that returns the first value in an ordered partition of a result set. `FIRST_VALUE()` takes a column as an argument. 
        
        ```sql
        SELECT first_name, email, department, salary, 
        FIRST_VALUE(salary) OVER(PARTITION BY department ORDER BY salary DESC) first_value 
        -- in this case, equivalent to: MAX(salary) OVER(PARTITION BY department) 
        FROM employees 
        ```
        
        The advantage with `FIRST_VALUE()` is that we can order by any of the columns. For example: 
        
        ```sql
        SELECT first_name, email, department, salary, 
        FIRST_VALUE(salary) OVER(PARTITION BY department ORDER BY first_name ASC) first_value 
        FROM employees 
        ```
        
    - `NTH_VALUE()`
        
        The `NTH_VALUE()` is a window function that allows you to get a value from the Nth row in an ordered set of rows.
        
        ```sql
        SELECT first_name, email, department, salary, 
        NTH_VALUE(salary,5) OVER(PARTITION BY department ORDER BY first_name ASC) nth_value 
        FROM employees 
        ```
        
- 考点 7.7: `LEAD()` and `LAG()` Functions
    
    Note that the first or last row has a `NULL` value since there is no previous / next value. 
    
    ```sql
    SELECT first_name, last_name, salary, 
    LEAD(salary) OVER() previous_salary
    -- LAG(salary) OVER() previous_salary 
    FROM employees 
    ```
    
    ```sql
    SELECT department, last_name, salary, 
    LAG(salary) OVER(ORDER BY salary DESC) closest_higher_salary
    -- 显示the previous value
    FROM employees 
    ```
    
    ```sql
    SELECT department, last_name, salary, 
    LEAD(salary) OVER(PARTITION BY department ORDER BY salary DESC) closest_lower_salary
    -- 显示the next value
    FROM employees 
    ```
    

### Chapter 8: Common Table Expressions

- The SQL `WITH` clause allows you to give a sub-query block a name (a process also called sub-query refactoring), which can be referenced in several places within the main SQL query.
- 考点 8.1: Using `WITH` to solve difficult query challenges
    
    ```sql
    WITH temporaryTable1 as(SELECT column1, column2 FROM Table1), 
    	temporaryTable2 as (SELECT column3, column4 FROM Table2)
    SELECT temporaryTable1.column1
    FROM temporaryTable1 
    LEFT JOIN temporaryTable2 ON condition
    ```
    

## SQL Interview Tips

### Types of SQL Interview Problems

- Concept question
- Query analysis question
- Live coding question
    - Four Step Strategy to Answering a Live Coding Question
        1. **Ask** clarifying questions 
        2. **Think** about the overall logic 
        3. **Write** your code 
        4. **Discuss** other considerations 
- What to Do When You Are Stuck?
    - Make sure that you understand the question completely.
    - Take the time to think about the solution. It’s okay to be quiet for 2 minutes if it is a really hard problem.
    - Go through your line of thoughts and ask for hint.
    - Offer a solution that partially solves this question.

### How to Win Bonus Points in SQL Interviews?

- Bonus point 1: discuss limitations for your solution
- Bonus point 2: discuss query logic for alternative solutions

## Concept Questions

### What is a primary key?

【考点 1.2】

- A primary key is a column (or collection of columns) or a set of columns that uniquely identifies each row in the table.
- It uniquely identifies a single row in the table.
- Null values are not allowed in the primary key column.

### Difference between single and double quotes in SQL

【考点 1.5】

- Single-quotes are used to enclose string literals (and, in recent versions, DATE literals).
- Double-quotes are used to enclose identifiers (like table and column names) . They are optional (and therefore almost never used) when the name conforms to certain rules for names (starts with a letter, no spaces or special symbols, no lower-case letters, ...).

### What are the syntax and use of the COALESCE function?

【考点 2.2】

- From a succession of expressions, the `COALESCE` function returns the first non-null value. The expressions are evaluated in the order that they are supplied, and the function’s result is the first non-null value. Only if all of the inputs are null does the `COALESCE` method return NULL.
- The syntax of COALESCE function is `COALESCE (exp1, exp2, …. expn)`.

### Difference between WHERE and HAVING

【考点 3.3】

- A WHERE clause is used to filter records from a result. The filter occurs before any groupings are made.
- A HAVING clause is used to filter grouped data.

### Difference between INNER JOIN and OUTER JOIN

【考点 6.2】

- An inner join focuses on the commonality between two tables. When using an inner join, there must be at least some matching data between two (or more) tables that are being compared.
- An outer join returns a set of records (or rows) that include what an inner join would return but also includes other rows for which no corresponding match is found in the other table.

### Difference between UNION and UNION ALL

【考点 6.4】

Main difference is that UNION removes duplicate records, but UNION ALL does not remove duplicate records. 

### Difference between RANK vs. DENSE_RANK

【考点 7.4】

- In a tie, `RANK` function skips the next ranking(s) and assigns same rank to values that tie. So there will be gaps in the rank.
- In a tie, `DENSE_RANK` function does not skip the ranks. It assigns same rank to values that tie. But next rank will be consecutive rank.

### What is the use of WITH clause in SQL?

【考点 8.1】

The main uses of WITH clause are: 

- Simplify: it can simplify a SQL query by creating a subset of data
- Reduce repetition: WITH clause can create a subset of data that can be reused multiple times in the main query

## Query Analysis Questions

### What is the result of the following query?

```sql
SELECT 
	CASE WHEN null = null 
	THEN 'True'
	ELSE 'False' 
END AS Result; 
```

【考点 1.4】

### What is wrong with this query to get the list of employees not in Dept 1?

```sql
SELECT name 
FROM employee
WHERE deptid <> 1 
```

![Untitled](Untitled%201.png)

【考点 1.4】

- There are 3 employees (John, George and Ray) not in dept 1. But query returns only one result: George.
- Since we are just looking for employees not in dept 1, query does not compare deptid with null. So employees without a department are not returned.

### What’s wrong with the following query?

```sql
SELECT department AS dep, SUM(salary)
FROM employees
WHERE dep != 'sports'
GROUP BY 1
```

【考点 1.5】

An output column's name can be used to refer to the column's value in `ORDER BY`
 and `GROUP BY` clauses, but not in the `WHERE` or `HAVING` clauses; there you must write out the expression instead.

### What’s wrong with the following query?

```sql
SELECT first_name, email, department, salary, 
RANK() OVER(PARTITION BY department ORDER BY salary DESC)
FROM employees 
WHERE rank = 8
```

【考点 7.5】

## Live Coding Question

### Compute employee salary averages while excluding extreme data points (highest and lowest)

```
| columns   | type    |
|-----------|---------|
| user_id   | integer |
| friend_id | integer |
```

**Users table:** 
UserID
Country
Signup_Date

**Purchases table:** 
UserID
OrderID
Purchase_Date
Order_Total 

【考点 4.1】

```sql
SELECT ROUND(AVG(salary))
FROM employees
WHERE salary NOT IN (
	(SELECT MIN(salary) FROM employees), 
	(SELECT MAX(salary) FROM employees)) 
```

### Return the first name, the department and how much less they make than the highest paid employee in the company of the employees who work in either Asia or Canada

【考点 4.1 + 4.3】

```sql
SELECT first_name, department, salary, 
	(SELECT MAX(salary) FROM employees) - salary 
FROM employees 
WHERE region_id IN 
	(SELECT region_id FROM regions WHERE country IN ('Asia', 'Canada')) 
```

### Return the salaries that appear the most frequently.

【考点 1.6】

```sql
SELECT salary
FROM employees 
GROUP BY salary 
ORDER BY COUNT(*) DESC, salary DESC
LIMIT 1
```

【Bonus point 1】

```sql
SELECT salary 
FROM employees 
GROUP BY salary 
HAVING COUNT(*) >= ALL(SELECT COUNT(*) FROM employees GROUP BY salary) 
ORDER BY salary DESC 
LIMIT 1
```

### Count the number of employees who are underpaid (salary ≤ 100,000), paid well (100,000 < salary < 160,000) and executive (salary ≥ 160,000).

【考点 5.1】

```sql
SELECT 
	CASE 
		WHEN salary < 100000 THEN 'UNDER PAID'
		WHEN salary > 100000 AND salary < 160000 THEN 'PAID WELL'
		WHEN salary > 160000 THEN 'EXECUTIVE'
		ELSE 'UNPAID'
	END AS category, COUNT(*) 
	-- if no alias is provided, then the column name will be "case" 
FROM employees 
GROUP BY 1
```

### Transpose data

![](Untitled%202.png)

Taking into consideration the supply column and the cost_per_unit column, you should be able to tabulate the total cost to import fruits by each season. The result will look something like this:

"Winter" "10072.50"

"Summer" "19623.00"

"All Year" "22688.00"

"Spring" "29930.00"

"Fall" "29035.00"

Write a query that would transpose this data so that the seasons become columns and the total cost for each season fills the first row? 

【考点 5.2】

```sql
SELECT 
	SUM(CASE WHEN season = "winter" THEN total_cost END) AS Winter_total, 
	SUM(CASE WHEN season = 'Summer' THEN total_cost END) AS Summer_total,
	SUM(CASE WHEN season = 'Spring' THEN total_cost END) AS Spring_total,
	SUM(CASE WHEN season = 'Fall' THEN total_cost END) AS FALL_total,
	SUM(CASE WHEN season = 'All Year' THEN total_cost END) AS ALL_YEAR_total
FROM (
SELECT season, SUM(supply * cost_per_unit) total_cost
FROM fruit_imports
GROUP BY season
    ) a
```

### Show every department listed with the total number of employees working in that department and finally on the bottom it shows total for the column and the actual count of employees.

【考点 6.4】

```sql
SELECT department, COUNT(*) 
FROM employees 
GROUP BY department 
UNION ALL 
SELECT 'TOTAL', COUNT(*)
FROM employees 
```

### Write SQL query to get the 2nd highest salary among all employees.

![Untitled](Untitled%203.png)

【考点 4.1】

```sql
SELECT MAX(salary)
FROM employee 
WHERE salary NOT IN (SELECT MAX(salary) FROM employee) 
```

### Write SQL query to find the nth highest salary among all employees.

[https://javarevisited.blogspot.com/2016/01/4-ways-to-find-nth-highest-salary-in.html#axzz7MpIhTjwS](https://javarevisited.blogspot.com/2016/01/4-ways-to-find-nth-highest-salary-in.html#axzz7MpIhTjwS) 

### Write SQL query to find employees who share the same name and email.

![Untitled](Untitled%204.png)

【考点 3.3】

```sql
SELECT name, email
FROM employee
GROUP BY name, email 
HAVING COUNT(*) > 1 
```

### Count the number of employees who are under paid, paid well and executive.

![Untitled](Untitled%205.png)

salary < 100000 -  ‘under paid’ 

salary ≥ 100000 & salary < 160000 - ‘paid well’ 

salary ≥ 160000 - ‘executive’ 

【考点 5.1】

```sql
SELECT 
	CASE 
		WHEN salary < 100000 THEN 'UNDER PAID'
		WHEN salary >= 100000 AND salary < 160000 THEN 'PAID WELL'
		WHEN salary >= 160000 THEN 'EXECUTIVE'
		ELSE 'UNPAID'
		-- It doesn't have to be textual categories. 
		-- We can also put numbers as categories. But they all need to be numbers. 
	END AS category, COUNT(*)
	-- if no alias is provided, then the column name will be "case" 
FROM employees 
GROUP BY 1
```

### Building off previous question, transpose the data output.

![Untitled](Untitled%206.png)

【考点 5.2】

```sql
SELECT SUM(CASE WHEN salary < 100000 THEN 1 END) AS "UNDER PAID", 
	SUM(CASE WHEN salary >= 100000 AND salary < 160000 THEN 1 END) AS "PAID WELL", 
	SUM(CASE WHEN salary > 160000 THEN 1 END) AS "EXECUTIVE"
FROM employees
```

### What is the country with most signed-up users?

**Users table:** 
UserID
Country
Signup_Date

**Purchases table:** 
UserID
OrderID
Purchase_Date
Order_Total 

【考点 1.6】

```sql
SELECT country
FROM users 
GROUP BY country 
ORDER BY COUNT(*) DESC
LIMIT 1 
```

【Bonus point 1】考虑是否有多个 country with the same number of signed-up users

【考点 3.3】

```sql
SELECT country, COUNT(*)
FROM users 
GROUP BY country 
HAVING count(*) >= ALL(SELECT COUNT(*) FROM users GROUP BY country) 
```

### What are the top 10 Games by spend yesterday?

**ad_events**
timestamp (timestamp)
event_id (string)
event_type (string)
game_id (integer)
platform (string)
country (string)
spend (float) 

Using the example data set, what are the top 10 games by spend yesterday?

【考点 2.3】

[https://www.postgresql.org/docs/9.1/functions-datetime.html#FUNCTIONS-DATETIME-CURRENT](https://www.postgresql.org/docs/9.1/functions-datetime.html#FUNCTIONS-DATETIME-CURRENT)

```sql
SELECT game_id 
FROM ad_events
WHERE timestamp = CURRENT_DATE - INTEGER '1'
GROUP BY 1
ORDER BY SUM(spend) DESC
LIMIT 10
```

### Building off the previous question, what % of total spend do the top 10 games represent?

**ad_events**
timestamp (timestamp)
event_id (string)
event_type (string)
game_id (integer)
platform (string)
country (string)
spend (float) 

Building off the previous question, what % of total spend do the top 10 games represent? 

Solution 1:

【考点 8.1】

```sql
WITH numerator AS (SELECT SUM(spend) FROM (SELECT game_id, SUM(spend) AS spend 
	FROM ad_events
	WHERE timestamp = CURRENT_DATE - INTEGER '1'
	GROUP BY 1
	ORDER BY SUM(spend) DESC
	LIMIT 10) a), 
	denominator AS (
		SELECT SUM(spend)
		FROM ad_events
		WHERE timestamp = CURRENT_DATE - INTEGER '1') 
SELECT numerator.sum / denominator.sum
FROM numerator, denominator
```

Solution 2: 

【Bonus point 2】

```sql
SELECT SUM(percentage)
FROM (SELECT ROUND(CAST(salary as decimal) / SUM(salary) OVER() * 100, 5) AS percentage
FROM employees
ORDER BY 1 DESC 
LIMIT 10) a
```

### Building off the previous question, return the top 2 countries by spend for each of the Top 10 games.

**ad_events**
timestamp (timestamp)
event_id (string)
event_type (string)
game_id (integer)
platform (string)
country (string)
spend (float) 

【考点 4.2 + 7.5】

```sql
SELECT game_id, country
FROM (SELECT *, RANK() OVER(PARTITION BY game_id ORDER BY sum DESC)
FROM (SELECT game_id, country, SUM(spend)
FROM ad_events
WHERE game_id IN (SELECT game_id
FROM ad_events
WHERE timestamp = CURRENT_DATE - INTEGER '1'
ORDER BY spend DESC
LIMIT 10) AND timestamp = CURRENT_DATE - INTEGER '1'
GROUP BY game_id, country) a) b 
WHERE rank IN (1,2)
```

### Find the Number of Users That Have Viewed Another User’s Profile and the Number of Users That Have Not Viewed Another User’s Profile.

**dsv1069.users** 
id

**dsv1069.events** 
user_id 
event_id 
event_time 
event_name (has a value 'view_user_profile')

Find the number of users that have viewed another user's profile and the number of users that have not viewed another user's profile. 

【考点 5.1 + 8.1】

```sql
WITH b as 
	(SELECT DISTINCT user_id FROM events 
		WHERE event_name='view_user_profile')
SELECT CASE WHEN b.user_id IS NOT NULL THEN 'viewed'
						ELSE 'not_viewed' END AS category, COUNT(a.id) 
FROM (SELECT DISTINCT id FROM users) a
LEFT JOIN b ON a.id = b.user_id 
GROUP BY 1 
```

```sql
SELECT CASE WHEN b.user_id IS NOT NULL THEN 'viewed'
						ELSE 'not_viewed' END AS category, COUNT(a.id) 
FROM (SELECT DISTINCT id FROM users) a
LEFT JOIN (SELECT DISTINCT user_id FROM events 
WHERE event_name='view_user_profile') b 
ON a.id = b.user_id 
GROUP BY 1 
```

【Bonus point 2】

【考点 3.4 + 6.3】

```sql
~~SELECT CASE WHEN event_name='view_user_profile' THEN 'viewed'
						ELSE 'not_viewed' END AS category, COUNT(DISTINCT users.id)
FROM users
LEFT JOIN events
ON users.id = events.user_id
GROUP BY 1~~
```

```sql
SELECT CASE WHEN event_name='view_user_profile' THEN 'viewed'
						ELSE 'not_viewed' END AS category, COUNT(DISTINCT users.id) 
FROM users
LEFT JOIN events 
ON users.id = events.user_id AND events.event_name = 'view_user_profile'
GROUP BY 1 
```

Count the number of departments with the employee whose first name is Billie and the number of departments who do not have such an employee. 

```sql
SELECT CASE WHEN first_name = 'Billie' THEN 'departments with first_name Billie'
ELSE 'no Billie' END, COUNT(DISTINCT departments.department) 
FROM departments LEFT JOIN employees ON employees.department = departments.department AND first_name = 'Billie'
GROUP BY 1
```

### Return the percentage of users who only visited mobile, only web and both.

![](Untitled%207.png)

【考点 6.3】

```sql
SELECT 
	(COUNT(a.user_id)+COUNT(b.user_id)-COUNT(*))/ ROUND(COUNT(*),2)
FROM (SELECT DISTINCT user_id FROM data_mobile) a 
FULL OUTER JOIN (SELECT DISTINCT user_id FROM data_web) b
	ON a.user_id = b.user_id
```

### A table with users, their country and when they created the account

![](Untitled%208.png)

【考点 7.6】

```sql
SELECT DISTINCT FIRST_VALUE(country) OVER(ORDER BY count(*) DESC), 
	FIRST_VALUE(country) OVER(ORDER BY count(*)) 
FROM head 
GROUP BY country
```

```sql
SELECT DISTINCT country, FIRST_VALUE(user_id) OVER(PARTITION BY country ORDER BY created_at)
	FIRST_VALUE(user_id) OVER(PARTITION BY country ORDER BY created_at DESC)
FROM head 
```

### Get 7-day rolling (preceding) average

| date | sign_ups |

|------------|----------|
| 2018-01-01 | 10 |
| 2018-01-02 | 20 |
| 2018-01-03 | 50 |
| ... | ... |
| 2018-10-01 | 35 |

Task: Write a query to get 7-day rolling (preceding) average of daily sign ups.

【考点 7.3】

```sql
SELECT date, 
AVG(sign_ups) OVER(ORDER BY hire_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)
FROM tbl 
```

【Bonus point 2】

【考点 6.3】

```sql
SELECT b.date, avg(a.signup)
FROM tbl a 
JOIN tbl b ON a.date < b. date and a.date + 6 >= b.date 
GROUP BY b.date 
```

```sql
WITH annual_hires AS (SELECT EXTRACT(YEAR FROM hire_date) yr, COUNT(*) number_of_hires FROM employees
GROUP BY 1 ORDER BY 1)

SELECT a.yr, ROUND(AVG(b.number_of_hires),2)
FROM annual_hires a 
LEFT JOIN annual_hires b ON a.yr >= b.yr and a.yr <= b.yr + 6 
GROUP BY 1 ORDER BY 1
```