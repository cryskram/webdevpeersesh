import pandas as pd
import os
import json
import requests

df = pd.read_csv("data.csv")

URL = "http://localhost:3000/api/graphql"

for idx, row in df.iterrows():
    name = row["name"]
    email = row["email"]
    usn = row["usn"]
    dept = row["dept"]
    phone = row["phone"]

    query = """
    mutation Mutation($name: String!, $email: String!, $usn: String!, $dept: String!, $phone: String!) {
        addStudent(name: $name, email: $email, usn: $usn, dept: $dept, phone: $phone) {
            id
            name
            phone
            usn
            isPresent
            email
            dept
        }
    }
    """

    variables = {
        "name": name.trim(),
        "email": email,
        "usn": usn,
        "dept": dept,
        "phone": str(phone),
    }

    response = requests.post(
        URL,
        headers={"Content-Type": "application/json"},
        data=json.dumps({"query": query, "variables": variables}),
    )

    if response.status_code == 200:
        print(f"{name} added on database")
    else:
        print(f"{name} failed to be added. Error: {response.text}")
