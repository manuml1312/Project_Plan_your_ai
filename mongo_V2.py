# Time Taken : 1.30
print('Start')

# Importing Library
import transformers
import pickle
import pandas as pd
import os
from pymongo import MongoClient

# Connecting to Mongodb
client = MongoClient('mongodb+srv://root:iwbM0Q9GVzOmsEF6@cluster0.zovhiec.mongodb.net/?retryWrites=true&w=majority')
mydb=client['NLP'] # Data Base
myc1=mydb['summary'] # Collections 

# Importing DB from Mongodb
project_num = 5 # Project ID Number
test = pd.DataFrame(list(myc1.find({'Project_Id':project_num},{}))) # Importing Data and converting to Pandas Dataframe

#Importing Summarization Model
summarizer = pickle.load(open('summarizer_pipeline.pkl','rb'))

#Function for summarizing 
def output_LI(Input):
    if len(Input.split(' ')) <30:
        return(Input)
    else:
        Max_len = int(len(Input.split(' ')))
        Min_len = int((len(Input.split(' ')))*0.75)
        return(summarizer(Input,max_length = Max_len,min_length = Min_len,length_penalty= 10.0)[0]['summary_text'])

# Summarizing the input data and exporting summary to Mongodb
for row_num in range(test.shape[0]):
    myc1.update_one({'Project_Id':int(project_num),'Question_Id':int(test['Question_Id'][row_num])}, { "$set": {'summary':output_LI(test['User_Answer'][row_num])}})

print('End')