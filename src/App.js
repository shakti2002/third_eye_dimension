// src/App.js

import Raeact, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerateImage = async () => {
        setError('');
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/generate-image', {
                prompt: prompt,
            });
            setImage(`data:image/png;base64,${response.data.image}`);
        } catch (error) {
            setError('Error generating image: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1>Image Generator</h1>
            <textarea 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)} 
                placeholder="Enter your prompt here"
                rows="4"
                cols="50"
            />
            <button onClick={handleGenerateImage} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Image'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {image && <img src={image} alt="Generated" style={{ marginTop: '20px', maxWidth: '100%' }} />}
        </div>
    );
};

export default App;




//src/App.js

// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// const App = () => {
//     const [prompt, setPrompt] = useState('');
//     const [image, setImage] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const handleGenerateImage = async () => {
//         setError('');
//         setLoading(true);
//         try {
//             const response = await axios.post('http://127.0.0.1:5000/generate-image', { // Replace with your ngrok URL
//                 prompt: prompt,
//             });
//             setImage(`data:image/png;base64,${response.data.image}`);
//         } catch (error) {
//             setError('Error generating image: ' + error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="App">
//             <h1>Image Generator</h1>
//             <textarea 
//                 value={prompt} 
//                 onChange={(e) => setPrompt(e.target.value)} 
//                 placeholder="Enter your prompt here"
//                 rows="4"
//                 cols="50"
//             />
//             <button onClick={handleGenerateImage} disabled={loading}>
//                 {loading ? 'Generating...' : 'Generate Image'}
//             </button>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {image && <img src={image} alt="Generated" style={{ marginTop: '20px', maxWidth: '100%' }} />}
//         </div>
//     );
// };

// export default App;
 