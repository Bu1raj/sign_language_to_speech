# sign_language_to_speech

Made with 🖤 by Bhuvanraj T, Kushal J,M Afzal and Rohith U for summer internship 2023.

## Purpose
Our project focuses in recognizing signs in real time video feed and convert the detected signs to English sentences. As of now we detect 10 signs only due to limited dataset size(reason for it is discused below), but we can detect more signs as we grow the dataset.

## About the implementation
### Dataset
We have created our own dataset, which cointains 1200 images classified into 10 classes namely 'deaf', 'food', 'hello', 'help', 'iloveyou', 'internet', 'no', 'okay', 'thanks', and 'yes', these classes represent the signs that we detect. Since we used our own and our friends' images we will not be able to upload the dataset due to security reasons.

### Training Phase
We chose SSD MobileNet V2 model ([Download it](http://download.tensorflow.org/models/object_detection/tf2/20200711/ssd_mobilenet_v2_fpnlite_320x320_coco17_tpu-8.tar.gz)) from the Tensorflow 2 Detection Model Zoo . This model can be trained with minimal GPU requirements, in our case we used a laptop with **NVDIA GeForce RTX 3050 Ti Laptop GPU** to train the model.




To run the finished project,
follow along with this:
https://tensorflow-object-detection-api-tutorial.readthedocs.io/en/latest/install.html

Once done, 
Run everycell in {insert file locaiton here}.

