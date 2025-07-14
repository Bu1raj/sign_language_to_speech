import cv2
import numpy as np
import tensorflow as tf
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests for communication with the frontend

# Load TensorFlow model
model = tf.saved_model.load("D:\slr_vii_internship\Tensorflow\workspace\slr_vii_internship\exported-models\my_model\saved_model")

@tf.function
def detect_fn(image):
    image, shapes = model.preprocess(image)
    prediction_dict = model.predict(image, shapes)
    detections = model.postprocess(prediction_dict, shapes)
    return detections

@app.route('/detect', methods=['POST'])
def detect():
    file = request.files['frame']
    img_array = np.frombuffer(file.read(), np.uint8)
    frame = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    
    # Preprocess frame
    input_tensor = tf.convert_to_tensor(np.expand_dims(frame, 0), dtype=tf.float32)
    detections = detect_fn(input_tensor)

    # Process detections and send results
    detection_classes = detections['detection_classes'][0].numpy().astype(int).tolist()
    detection_scores = detections['detection_scores'][0].numpy().tolist()
    detection_boxes = detections['detection_boxes'][0].numpy().tolist()

    return jsonify({
        "classes": detection_classes,
        "scores": detection_scores,
        "boxes": detection_boxes
    })

if __name__ == '__main__':
    app.run(debug=True)
