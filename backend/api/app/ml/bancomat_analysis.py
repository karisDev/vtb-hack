import pandas
import numpy

def calculate_distance(lat1, lon1, lat2, lon2):
    return ((lat2 - lat1)**2 + (lon2 - lon1)**2)**0.5
    
def predict_top_5(df, input_lat, input_lon):
    df['distance'] = df.apply(lambda row: calculate_distance(input_lat, input_lon, row['latitude'], row['longitude']), axis=1)
    df_sorted = df.nsmallest(5, 'distance')
    return df_sorted

def main_bancomats(path_to_df: str, cur_location: list) -> list:
    atms_df = pd.read_csv(path_to_df)
    top_5_df = predict_top_5(atms_df, cur_location[0], cur_location[1])
    top_5_df.to_csv('top_5_bancomats.csv')
    result = []
    for i in range(len(top_5_df)):
        sample_dict = {}
        sample_dict['atm_code'] = top_5_df['atm_code'].iloc[i]
        sample_dict['location'] = [top_5_df['latitude'].iloc[i], top_5_df['longitude'].iloc[i]]
        result.append(sample_dict)
    return result

def equation(time, time_in_dept, a_coef):
    return    a_coef * abs(1 - time) + abs(1 - time_in_dept)

    
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

def predict_1_bancomat(dists_time: list) -> int:
    df = pd.read_csv('top_5_bancomats.csv')
    time_list = []
    result_coeffs = []
    for i in range(5):
        dists_time[i]['time_in_dept_norm'] = df['time_in_department'].iloc[i]
        time_list.append(dists_time[i]['time'])
    print(dists_time)
    print(a_coef(time_list))
    time_list_norm = min_max_scaler(time_list)
    for i in range(5):
        result_coeffs.append(equation(time_list_norm[i], dists_time[i]['time_in_dept_norm'], a_coef=a_coef(time_list)))
    max_index = result_coeffs.index(max(result_coeffs))
    print(result_coeffs)
    return dists_time[max_index]['id']
