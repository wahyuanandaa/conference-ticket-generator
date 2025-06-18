import { useState } from "react"
import Form from "./components/Form"
import Ticket from "./components/Ticket"
import "./App.css"

// Import gambar
import logoFull from "./assets/images/logo-full.svg"

function App() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    github: "@",
    avatar: "/assets/images/image-avatar.jpg"
  })
  const [showTicket, setShowTicket] = useState(false)

  const handleFormSubmit = (data) => {
    setUserData(data)
    setShowTicket(true)
  }

  return (
    <div className="arco">
      <div className="arco--line">
        <div className="container">
          <header className="header">
            <img src={logoFull} alt="Logo" className="header__logo" />
          </header>
          <main className="main main--form">
            <h1 className="main__title">
              {!showTicket ? (
                "Your Journey to Coding Conf 2025 Starts Here!"
              ) : (
                <>
                  Congrats,{" "}
                  <span className="main__title--name">{userData.name}</span>!{" "}
                  Your ticket is ready.
                </>
              )}
            </h1>
            <p className="main__description">
              {!showTicket ? (
                "Secure your spot at next year's biggest coding conference."
              ) : (
                <>
                  We've emailed your ticket to{" "}
                  <span className="main__description--name">
                    {userData.email}
                  </span>{" "}
                  and will send updates in the run up to the event.
                </>
              )}
            </p>

            <Form
              onSubmit={handleFormSubmit}
              className={showTicket ? "hidden" : ""}
            />
            {showTicket && <Ticket userData={userData} />}
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
