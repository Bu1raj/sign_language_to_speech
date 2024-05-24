# sign_language_to_text

Made with 🖤 by Bhuvanraj T, Kushal J,Mohammed Afzal and Rohith Uppada for summer internship 2023.

## Purpose
Our project focuses in recognizing signs in real time video feed and convert the detected signs to English sentences. As of now we detect 10 signs only due to limited dataset size(reason for it is discused below), but we can detect more signs as we grow the dataset.


## About the implementation
### Dataset
We have created our own dataset, which cointains 1200 images classified into 10 classes namely 'deaf', 'food', 'hello', 'help', 'iloveyou', 'internet', 'no', 'okay', 'thanks', and 'yes', these classes represent the signs that we detect. Since we used our own and our friends' images we will not be able to upload the dataset due to security reasons.

### Training Phase
We chose SSD MobileNet V2 model ([Download it](http://download.tensorflow.org/models/object_detection/tf2/20200711/ssd_mobilenet_v2_fpnlite_320x320_coco17_tpu-8.tar.gz)) from the Tensorflow 2 Detection Model Zoo. This model can be trained with minimal GPU requirements, in our case we used a laptop with **NVDIA GeForce RTX 3050 Ti Laptop GPU** to train the model. We have trained the model for 15000 steps and with a batch size of 8, you can refer the [pipeline.config](https://github.com/Bu1raj/sign_language_to_speech/blob/main/models/my_ssd_mobilenet_v2_fpnlite_320x320/pipeline.config) file for further details. 


## What you need to do
In order to run the model and perform the detection, you can simply download the latest checkpoint from [here](https://github.com/Bu1raj/sign_language_to_speech/tree/main/models/my_ssd_mobilenet_v2_fpnlite_320x320) and then open the [detection_code.iypnb](https://github.com/Bu1raj/sign_language_to_speech/blob/main/detection_code.ipynb) in jupyter notebook/google colab then follow these steps..............
> [!NOTE] 
> The following steps might not be required for everyone, but following along will not harm
1. Install tensorflow using `pip install tensorflow=2.5.0`
2. Install object-detection package using `pip install objection-detection`





