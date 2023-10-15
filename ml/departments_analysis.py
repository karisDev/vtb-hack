import numpy as np
import pandas as pd


def load_df(path):
    return pd.read_csv(path, index_col='Unnamed: 0')
    
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def get_new_info(df):

    # Нормализация значений
    def normalize_column(df, column_name):
        max_val = df[column_name].max()
        min_val = df[column_name].min()
        df[column_name] = (df[column_name] - min_val) / (max_val - min_val)
        return df

    df = normalize_column(df, 'time_in_department')
    df = normalize_column(df, 'KPI')
    return df
    
def parse_time(hour):
    if '.' in hour:
        return datetime.time(int(hour.split('.')[0]), int(hour.split('.')[1]))
    elif ':' in hour:
        return datetime.time(int(hour.split(':')[0]), int(hour.split(':')[1]))
        
def filter_open_now(df):
    day_names = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
    today_day_name = day_names[datetime.datetime.now().weekday()]
    #today_day_name = 'чт'
    now = datetime.datetime.now().time()
    #now = datetime.time(12, 0)
    #print(now)
    
    def is_open(row):
        schedule_line = row['scheduleFl']
        
        if today_day_name in ['сб', 'вс'] and 'выходной' in schedule_line:
            return False
        
        if today_day_name in ['пн', 'вт', 'ср', 'чт', 'пт'] and 'пн-пт' in schedule_line:
            weekday_interval = schedule_line.split('пн-пт: ')[1].split(' ')[0]
            start_time, end_time = [parse_time(hour) for hour in weekday_interval.split('-')]
            return start_time <= now <= end_time
        
        if today_day_name == 'сб' and 'сб:' in schedule_line:
            saturday_interval = schedule_line.split('сб: ')[1].split(' ')[0]
            start_time, end_time = [parse_time(hour) for hour in saturday_interval.split('-')]
            return start_time <= now <= end_time
        
        if today_day_name == 'вс' and 'вс:' in schedule_line and 'выходной' not in schedule_line.split('вс:')[1]:
            sunday_interval = schedule_line.split('вс: ')[1].split(' ')[0]
            start_time, end_time = [parse_time(hour) for hour in sunday_interval.split('-')]
            return start_time <= now <= end_time
        
        return False
    
    return df[df.apply(is_open, axis=1)] 

    
def predict_departments(df, cur_location: list, operation: str, is_vip: bool, is_person: bool, is_juridical: bool, is_disabled: bool) -> list:
    
    # Фильтрация по operation
    if operation == 'safe_deposit_box_rental':
        df_filtered = df[df['ibs'] == 1]
    elif operation in ['investments', 'mortgage']:
        df_filtered = df[df['broker'] == 1]
    else:
        df_filtered = df
    
    # Сохраним оригинальный df_filtered для проверки условия с vip
    original_df_filtered = df_filtered.copy()
    
    # Фильтрация по is_vip
    if is_vip:
        df_filtered = df_filtered[(df_filtered['vip_zone'] == 1) | (df_filtered['vip_office'] == 1)]
        # Если после фильтрации по is_vip нет строк, то используем оригинальный df_filtered
        if df_filtered.empty:
            df_filtered = original_df_filtered
    else:
        df_filtered = df_filtered[(df_filtered['vip_zone'] == 0) & (df_filtered['vip_office'] == 0)]
    
    # Фильтрация по is_person
    if is_person:
        df_filtered = df_filtered[df_filtered['person'] == 1]
    
    # Фильтрация по is_juridical
    if is_juridical:
        df_filtered = df_filtered[df_filtered['juridical'] == 1]
    
    # Фильтрация по is_disabled
    if is_disabled:
        df_filtered = df_filtered[df_filtered['ramp'] == 1]

    return df_filtered
    
def calculate_distance(lat1, lon1, lat2, lon2):
    return ((lat2 - lat1)**2 + (lon2 - lon1)**2)**0.5
    
def predict_top_5(df, input_lat, input_lon):
    df['distance'] = df.apply(lambda row: calculate_distance(input_lat, input_lon, row['latitude'], row['longitude']), axis=1)
    df_sorted = df.nsmallest(5, 'distance')
    return df_sorted

def main_departments(path_to_df: str, cur_location: list, operation: str, is_vip: bool, is_person: bool, is_juridical: bool, is_disabled: bool) -> list:
    df = load_df(path_to_df)
    df = get_new_info(df)
    print(df)
    df = filter_open_now(df)
    df = predict_departments(df, cur_location, operation, is_vip, is_person, is_juridical, is_disabled)
    top_5_df = predict_top_5(df, cur_location[0], cur_location[1])
    top_5_df.to_csv('top_5_departments.csv')
    result = []
    for i in range(len(top_5_df)):
        sample_dict = {}
        sample_dict['id'] = top_5_df['biskvit_id'].iloc[i]
        sample_dict['location'] = [top_5_df['latitude'].iloc[i], top_5_df['longitude'].iloc[i]]
        result.append(sample_dict)
    return result


def equation(time, time_in_dept, kpi, a_coef):
    return    a_coef * abs(1 - time) + 5 * abs(1 - time_in_dept) + 1 * kpi

def standard_scaler(lst):
    mean = sum(lst) / len(lst)
    std_dev = (sum([(x - mean) ** 2 for x in lst]) / len(lst)) ** 0.5
    return [(x - mean) / std_dev for x in lst]
    
def min_max_scaler(lst):
    min_val = min(lst)
    max_val = max(lst)
    if max_val == min_val:
        return [0.5 for _ in lst]
    return [(x - min_val) / (max_val - min_val) for x in lst]
    
def a_coef(lst):
    min_val = min(lst)
    max_val = max(lst)
    return max_val // min_val * 1.5

def predict_1_department(dists_time: list) -> int:
    df = pd.read_csv('top_5_departments.csv')
    time_list = []
    result_coeffs = []
    for i in range(5):
        dists_time[i]['time_in_dept_norm'] = df['time_in_department'].iloc[i]
        dists_time[i]['kpi_norm'] = df['KPI'].iloc[i]
        time_list.append(dists_time[i]['time'])

    time_list_norm = min_max_scaler(time_list)
    for i in range(5):
        result_coeffs.append(equation(time_list_norm[i], dists_time[i]['time_in_dept_norm'], dists_time[i]['kpi_norm'], a_coef=a_coef(time_list)))
    max_index = result_coeffs.index(max(result_coeffs))

    #print(result_coeffs)
    #print(dists_time)
    return dists_time[max_index]['id']
