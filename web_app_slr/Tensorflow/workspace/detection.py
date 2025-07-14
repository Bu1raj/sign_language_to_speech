import os
from copy import copy

import cv2
import numpy as np
import tensorflow as tf
from flask import Flask, Response
from flask_cors import CORS
from object_detection.builders import model_builder
from object_detection.utils import config_util, label_map_util
from object_detection.utils import visualization_utils as viz_utils

app = Flask(__name__)
CORS(app)

gpus = tf.config.experimental.list_physical_devices('GPU')
for gpu in gpus:
    tf.config.experimental.set_memory_growth(gpu, True)

# Load pipeline config and build a detection model
configs = config_util.get_configs_from_pipeline_file("slr_vii_internship\models\my_ssd_mobilenet_v2_fpnlite_320x320\pipeline.config")
model_config = configs['model']
detection_model = model_builder.build(model_config=model_config, is_training=False)

# Restore checkpoint
ckpt = tf.compat.v2.train.Checkpoint(model=detection_model)
ckpt.restore(os.path.join("slr_vii_internship\models\my_ssd_mobilenet_v2_fpnlite_320x320", 'ckpt-20')).expect_partial()

@tf.function
def detect_fn(image):
    """Detect objects in image."""

    image, shapes = detection_model.preprocess(image)
    prediction_dict = detection_model.predict(image, shapes)
    detections = detection_model.postprocess(prediction_dict, shapes)

    return detections

category_index = label_map_util.create_category_index_from_labelmap('slr_vii_internship\\annotations\\label_map.pbtxt')

cap = cv2.VideoCapture(0)
unique_labels = []

def generate_frames():
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        image_np = np.array(frame)
        input_tensor = tf.convert_to_tensor(np.expand_dims(image_np, 0), dtype=tf.float32)
        detections = detect_fn(input_tensor)
        
        num_detections = int(detections.pop('num_detections'))
        detections = {key: value[0, :num_detections].numpy()
                      for key, value in detections.items()}
        detections['num_detections'] = num_detections
    
        # detection_classes should be ints.
        detections['detection_classes'] = detections['detection_classes'].astype(np.int64)
    
        label_id_offset = 1
        image_np_with_detections = image_np.copy()
    
        viz_utils.visualize_boxes_and_labels_on_image_array(
                    image_np_with_detections,
                    detections['detection_boxes'],
                    detections['detection_classes']+label_id_offset,
                    detections['detection_scores'],
                    category_index,
                    use_normalized_coordinates=True,
                    max_boxes_to_draw=5,
                    min_score_thresh=.5,
                    agnostic_mode=False)
        
        for i in range(min(5, detections['num_detections'])):
            class_id = int(detections['detection_classes'][i]) + label_id_offset
            score = detections['detection_scores'][i]
            if score > 0.7:
                label = category_index[class_id]['name']
                # Exclude face label
                if label != 'Face' and label not in unique_labels:
                    unique_labels.append(label)
                    print(f'Detected label: {label}, Score: {score}')

    
        ret, buffer = cv2.imencode('.jpg', image_np_with_detections)
        
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/unique_labels')
def unique_labels_f():
    global unique_labels
    temp = copy(unique_labels)
    unique_labels.clear()
    return {'unique_labels': temp}

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
    

# @socketio.on('start_stream')
# def start_stream():
#     global streaming
#     if not streaming:
#         streaming = True
#         thread = threading.Thread(target=generate_frames)
#         thread.start()

# @socketio.on('stop_stream')
# def stop_stream():
#     global streaming
#     streaming = False

# socketio.run(app, host='0.0.0.0', port=5000, debug=True)



