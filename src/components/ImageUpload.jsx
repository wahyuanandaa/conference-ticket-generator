import { useState, useRef } from "react"
import iconUpload from "../assets/images/icon-upload.svg"
import iconChange from "../assets/images/icon-change.svg"
import iconRemove from "../assets/images/icon-remove.svg"

export default function ImageUpload({ onImageUpload }) {
  const [previewUrl, setPreviewUrl] = useState("")
  const [error, setError] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = (file) => {
    if (file) {
      if (file.size > 500 * 1024) {
        // 500KB limit
        setError("Ukuran file maksimal 500KB")
        return
      }

      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("Format file harus JPG atau PNG")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result
        setPreviewUrl(result)
        onImageUpload(result)
        setError("")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileChange(file)
    }
  }

  const handleFileInput = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileChange(file)
    }
  }

  const handleRemoveImage = (e) => {
    e.stopPropagation()
    setPreviewUrl("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    onImageUpload("")
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      fileInputRef.current?.click()
    }
  }

  return (
    <div className="form__item form__item--upload">
      <div
        role="button"
        tabIndex={0}
        className={`form__upload ${previewUrl ? "active" : ""} ${
          dragActive ? "drag-active" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        onKeyPress={handleKeyPress}
        aria-label="Upload foto profil"
      >
        <input
          type="file"
          accept="image/jpeg,image/png"
          ref={fileInputRef}
          onChange={handleFileInput}
          style={{ display: "none" }}
          aria-hidden="true"
        />
        <div className="form__input-border"></div>
        <div className="form__upload-avatar">
          {previewUrl ? (
            <img className="form__upload-img" src={previewUrl} alt="avatar" />
          ) : (
            <img className="form__upload-icon" src={iconUpload} alt="upload" />
          )}
        </div>
        <div className="form__upload-actions">
          {previewUrl && (
            <>
              <button
                type="button"
                className="form__upload-button"
                onClick={(e) => {
                  e.stopPropagation()
                  fileInputRef.current?.click()
                }}
                aria-label="Ganti foto"
              >
                <img src={iconChange} alt="change" />
                Change
              </button>
              <button
                type="button"
                className="form__upload-button"
                onClick={handleRemoveImage}
                aria-label="Hapus foto"
              >
                <img src={iconRemove} alt="remove" />
                Remove
              </button>
            </>
          )}
        </div>
        <p className="form__upload-text">
          {dragActive
            ? "Lepaskan untuk upload"
            : "Drag and drop atau klik untuk upload"}
        </p>
      </div>
      {error && (
        <div className="form__error form__error--upload" role="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path
              stroke="#D1D0D5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"
            />
            <path fill="#D1D0D5" d="M8.004 10.462V7.596ZM8 5.57v-.042Z" />
            <path
              stroke="#D1D0D5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.004 10.462V7.596M8 5.569v-.042"
            />
          </svg>
          <p className="form__upload-message">{error}</p>
        </div>
      )}
    </div>
  )
}
