import io
import os, sys
import re
import requests
import pytesseract
from PIL import Image, ImageEnhance, ImageFilter
import base64
from flask import request, Flask, json
from flask_cors import CORS, cross_origin
import logging

from google.cloud import vision
from google.cloud.vision import types


api = Flask(__name__)
cors = CORS(api)
client = vision.ImageAnnotatorClient()


logging.basicConfig(level=logging.DEBUG)

def parse_image(image):
    image_string = io.BytesIO(base64.b64decode(image))

    image = types.Image(content=image_string.read())

    response = client.text_detection(image=image)
    texts = response.text_annotations
    descriptions = [text.description for text in texts]
    return descriptions

def get_times(image_content):
    regex = r'(\d{1,2})([.:](\d{1,2}))?[ ]?(am|pm|AM|PM)?'

    title = start_time = end_time = location = None

    for index, word in enumerate(image_content[1:]):
        time = re.findall(regex, word)
        if(len(time) == 1):
            if(not start_time and not end_time):
                # No start or end time
                start_time = time[0].join()

                # Assuming title is before start time
                title = image_content[index - 1]

            if(start_time and not end_time):
                # Only no end Time
                start_time = time[0].join()
                if(index + 1 < len(image_content)):
                    # Assuming location is after end time
                    location = image_content[index + 1]

    return [title, start_time, end_time, location]


@api.route('/api/scrape/ocr', methods=['GET'])
@cross_origin()
def parse_request():
    image = request.json
    image = image["base64"]
    image_content = parse_image(image)

    if len(image_content) <= 1:
        return json.dumps({"error": "Retake Picture"}), 400

    data = get_times(image_content)

    return json.dumps({
        "title": data[0],
        "start_time": data[1],
        "end_time": data[2],
        "location": data[3]
        }), 201


if __name__ == '__main__':
    api.run(host= '0.0.0.0', debug=True)
