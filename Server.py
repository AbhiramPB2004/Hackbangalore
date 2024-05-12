from fastapi import FastAPI
import uvicorn
import base64
import cv2
import numpy as np
import io
import easyocr
from ultralyticsplus import YOLO
import cv2
from ultralyticsplus import YOLO, render_result
import easyocr
import pandas as pd
from pydantic import BaseModel
from pdf2image import convert_from_bytes
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from pymongo import MongoClient
from pymongo import MongoClient



# Create a MongoDB connection

# Replace <connection_string> with your MongoDB Atlas connection string
client = MongoClient("mongodb+srv://AbhiramPB:CuWwXinfveScSGWN@cluster0.ad4pvsz.mongodb.net")

# Access the database
db = client["test"]

# Access the collection
collection = db["tableData"]

class ImageData(BaseModel):
    base64_string: str

class PersonalInfo(BaseModel):
    firstname: str
    lastname: str
    gender: str
    day: int
    month: int
    year: int
    address: str

origins = [
   "http://localhost:3001"
]
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/test")
async def process_image(p1: PersonalInfo):  
    print(p1.firstname)
    print(p1.lastname)
    print(p1.gender)
    name = p1.firstname 
    gender = p1.gender
    dob = str(p1.day) + "/" + str(p1.month) + "/" + str(p1.year)
    address = p1.address
    # Create a document to insert into the collection
    document = {
        "name": name,
        "gender": gender,
        "dob": dob,
        "address": address
    }
    print(document)
    # Insert the document into the collection
    collection.insert_one(document)
    return {"elements": "elements"}


@app.post("/process_image")
async def process_image(file: UploadFile = File(...)):
    
    
    contents = await file.read()
    images = convert_from_bytes(contents)
    # Resize the image
    
    resized_image = images[0]
    # Read the image using OpenCV
    
    # Resize the image
    resized_image = cv2.resize(np.array(resized_image), (640, 640))
    model = YOLO('foduucom/pan-card-detection')

    # Set model parameters
    model.overrides['conf'] = 0.25  # NMS confidence threshold
    model.overrides['iou'] = 0.45  # NMS IoU threshold
    model.overrides['agnostic_nms'] = False  # NMS class-agnostic
    model.overrides['max_det'] = 1000

    name = ""
    pan_no = ""
    image_path = 'download.jpeg'
    
    # Predict on image
    results = model.predict(resized_image)

    # Extract box coordinates
    boxes = list(results[0].boxes)
    datebol = False
    panbol = False
    namebol = False
    elements = []   
    for i in boxes:
        a = i.xyxy
        b = i.cls
        
        print(b.tolist())
        for j in a:
            if(b[0] == 0):
                name = "surname"
            elif(b[0] == 1):
                name = "date"
                datebol = True
            elif(b[0] == 2):
                name = "name"
                namebol = True
            elif(b[0] == 3):
                name = "pan"
                panbol = True
            
            list_cord = j.tolist()
            x1 = int(list_cord[0])
            x2 = int(list_cord[1])
            y1 = int(list_cord[2])
            y2 = int(list_cord[3])
            
            crop_img = resized_image[x2:y2, x1:y1]
            reader = easyocr.Reader(['en'], gpu=False)
            result = reader.readtext(crop_img)  
            
            for detection in result:
                text = detection[1]
                elements.append(text)
                
            cv2.imwrite(name+".jpg", crop_img)
            
    print(elements)
    
    if(datebol == False or namebol == False or panbol == False):
        return {"status": "model cannot find proper details in the image. Please try again."}
    else:
        return {"status": "authenticated"}
        
    





if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)