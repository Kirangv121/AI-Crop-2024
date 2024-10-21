import tensorflow as tf

# Load your pre-trained model (ensure you have the .h5 model file path)
model = tf.keras.models.load_model('path_to_your_model.h5')

# Function to preprocess the image and make predictions
def predict_disease(image):
    img = tf.image.decode_image(image, channels=3)
    img = tf.image.resize(img, (224, 224))  # Resize the image to match model input
    img = tf.expand_dims(img, 0)  # Add batch dimension
    predictions = model.predict(img)
    return predictions
from flask import Flask, request, jsonify
from ai_model import predict_disease

app = Flask(__name__)

# Endpoint for image prediction
@app.route('/predict', methods=['POST'])
def predict():
    # Read the uploaded image
    image = request.files['image'].read()

    # Pass the image to the TensorFlow model for prediction
    result = predict_disease(image)

    # Return the prediction as a JSON response
    return jsonify({'prediction': result.tolist()})

if __name__ == '__main__':
    app.run(port=5001)
