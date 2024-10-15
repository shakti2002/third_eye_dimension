from flask import Flask, request, jsonify
from diffusers import StableDiffusionPipeline
import torch
import io
from PIL import Image
import base64
from flask_cors import CORS

print(torch.cuda.is_available())  # Should print True if CUDA is available
print(torch.__version__)           # Print the current PyTorch version

app = Flask(__name__)
cors = CORS(app, supports_credentials=True,resources={r"/*": {"origins": "*"}})
# Load the model
model_id1 = "dreamlike-art/dreamlike-diffusion-1.0"
pipe = StableDiffusionPipeline.from_pretrained(model_id1, torch_dtype=torch.float16, use_safetensors=True)
pipe = pipe.to("cpu")



@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.json
    prompt = data.get('prompt')
    
    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400
    
    # Generate the image
    image = pipe(prompt).images[0]
    
    # Convert the image to a format suitable for JSON (Base64 encoding)
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()

    return jsonify({'image': img_str})

if __name__ == '__main__':
    app.run(debug=True)
