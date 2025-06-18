import { useState } from "react"
import ImageUpload from "./ImageUpload"

const ErrorIcon = () => (
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
)

export default function Form({ onSubmit, className }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    github: "",
    avatar: ""
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    github: "",
    avatar: ""
  })

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      github: "",
      avatar: ""
    }

    // Validasi nama
    if (!formData.name.trim()) {
      newErrors.name = "Nama tidak boleh kosong"
    }

    // Validasi email
    if (!formData.email) {
      newErrors.email = "Email tidak boleh kosong"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    // Validasi GitHub
    if (!formData.github) {
      newErrors.github = "Username GitHub tidak boleh kosong"
    }

    // Validasi avatar
    if (!formData.avatar) {
      newErrors.avatar = "Silakan upload foto profil"
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error !== "")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    // Hapus error saat user mengetik
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const handleImageUpload = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      avatar: imageUrl
    }))
    setErrors((prev) => ({
      ...prev,
      avatar: ""
    }))
  }

  return (
    <form
      id="form"
      className={`form ${className || ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <ImageUpload onImageUpload={handleImageUpload} />
      {errors.avatar && (
        <div className="form__error form__error--upload" role="alert">
          <ErrorIcon />
          <span>{errors.avatar}</span>
        </div>
      )}

      <div className="form__item">
        <label htmlFor="name" className="form__label">
          Full Name
        </label>
        <div className="form__item-content">
          <input
            type="text"
            id="name"
            name="name"
            className={`form__input ${errors.name ? "error" : ""}`}
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          <div className="form__input-border"></div>
        </div>
        {errors.name && (
          <div className="form__error" id="name-error" role="alert">
            <ErrorIcon />
            <span>{errors.name}</span>
          </div>
        )}
      </div>

      <div className="form__item">
        <label htmlFor="email" className="form__label">
          Email Address
        </label>
        <div className="form__item-content">
          <input
            type="email"
            id="email"
            name="email"
            className={`form__input ${errors.email ? "error" : ""}`}
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <div className="form__input-border"></div>
        </div>
        {errors.email && (
          <div className="form__error" id="email-error" role="alert">
            <ErrorIcon />
            <span>{errors.email}</span>
          </div>
        )}
      </div>

      <div className="form__item">
        <label htmlFor="github" className="form__label">
          GitHub Username
        </label>
        <div className="form__item-content">
          <input
            type="text"
            id="github"
            name="github"
            className={`form__input ${errors.github ? "error" : ""}`}
            placeholder="GitHub Username"
            value={formData.github}
            onChange={handleChange}
            aria-invalid={errors.github ? "true" : "false"}
            aria-describedby={errors.github ? "github-error" : undefined}
          />
          <div className="form__input-border"></div>
        </div>
        {errors.github && (
          <div className="form__error" id="github-error" role="alert">
            <ErrorIcon />
            <span>{errors.github}</span>
          </div>
        )}
      </div>

      <input
        type="submit"
        value="Generate My Ticket"
        className="form__submit"
        aria-label="Generate ticket"
      />
    </form>
  )
}
