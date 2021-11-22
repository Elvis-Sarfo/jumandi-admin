import React, {useState} from 'react'
import './style.css';

const ImagePicker = ({ onImageChanged }) => {

  const [imageURL, setImageURL] = useState(null);
  const [data, setData] = useState(null);

  const handleFileChange = (event) => {
    const { files } = event.target;

    if (files && files[0]) {
      setData(files[0]);
      setImageURL(URL.createObjectURL(files[0]))
      onImageChanged(files[0]);

    }
  }

  const handleClearClick = () => {
    setData(null);
    setImageURL(null)
  }

  return (
    <div>

      <input
        className='imagepicker-input'
        type="file"
        accept="image/*"
        capture="camera"
        onChange={handleFileChange}
      />

      <div
        className='imagepicker-preview'
        style={imageURL ? {backgroundImage: `url(${imageURL})`} : null}
        // onClick={this.handlePreviewClick}
      >
        {!data &&
          <label className='imagepicker-label' htmlFor="car">
            Click to select image
          </label>
        }

      </div>

      <button className='image-clear-btn' type='button' onClick={handleClearClick}>
        Clear
      </button>

    </div>
  )
}

export default ImagePicker
