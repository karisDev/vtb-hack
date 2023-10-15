import csv


def load_atms() -> list:
    csv_file = "app/data/atms.csv"
    data_list = []

    with open(csv_file, mode="r") as file:
        csv_reader = csv.DictReader(file)

        for row in csv_reader:
            data_list.append(dict(row))

    for d in data_list:
        d.pop("")

    print(data_list)

    return data_list


def load_departments() -> list:
    csv_file = "app/data/departments.csv"
    data_list = []

    with open(csv_file, mode="r") as file:
        csv_reader = csv.DictReader(file)

        for row in csv_reader:
            data_list.append(dict(row))

    for d in data_list:
        d.pop("")

    return data_list
