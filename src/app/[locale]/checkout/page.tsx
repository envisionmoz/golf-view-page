"use client";
import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../../css/app.css";
import Currencypage from "../../../components/currency";
import currencyPage from "../../../components/currency";
// {params} : {params: {arrival:string, departure: string, apartment:string, guests:string, totalPrice:string}}
function page() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateFirstName = (value: string) => {
    if (!value) {
      return "Por favor, insira o seu primeiro nome.";
    } else if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(value)) {
      return "Por favor, insira um nome valido.(que contenha apenas letras, e sem espacos em branco.";
    }
    return "";
  };

  
  const validateLastName = (value: string) => {
    if (!value) {
      return "Por favor, insira o seu apelido.";
    } else if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(value)) {
      return "Por favor, insira um apelido valido.(que contenha apenas letras, e sem espacos em branco.";
    }
    return "";
  };

  const validateEmail = (value: string) => {
    if (!value) {
      return "Por favor, insira o seu email.";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      return "Por favor, insira um email válido.";
    }
    return "";
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    setFirstNameError(validateFirstName(value));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    setLastNameError(validateLastName(value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    // Check if the button is disabled
    if (!firstNameError || !lastNameError || !emailError) {
      // Here, you can submit the form data using an API call or any other method
      alert("Form submitted!");
      
      console.log("First Name:", firstName);
      console.log("Last Name:", lastName);
      console.log("Email:", email);

      // Optionally, you can reset the form fields
      setFirstName("");
      setLastName("");
      setEmail("");
    } else {
      console.log("something went wrong")// Do not submit the form if there are errors
    }
  };

  const router = useRouter();
  const searchParams = useSearchParams();

  const apartment = searchParams.get("apartment");
  const arrival = searchParams.get("arrival");
  const departure = searchParams.get("departure");
  const guests = searchParams.get("guests");
  const totalPrice = searchParams.get("totalPrice");

  const handleClick = () => {
    router.back();
  };
  const handleOnChange = (value, country) => {
    // `value` will contain the phone number entered
    // `country` will contain the country code of the selected country
    setPhoneNumber(value);
    console.log(phoneNumber);
  };
  return (
    <div className="check-out-container">
      <h2>Pagamento</h2>
      <Link href="#" onClick={handleClick} className="back-btn">
        Voltar Para A Reserva
      </Link>
      <div className="check-out-boxes-container">
        <div className="client-box">
          <form>
            <div className="client-detail">
              <label>Primeiro Nome *</label>
              <input
                type="text"
                placeholder="Insere o seu primeiro nome"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <span className="error">{firstNameError}</span>
            </div>
            <div className="client-detail">
              <label>Apelido *</label>
              <input
                type="text"
                placeholder="Insere o seu apelido"
                value={lastName}
                onChange={handleLastNameChange}
              />
              <span className="error">{lastNameError}</span>
            </div>
            <div className="client-detail">
              <label>Email *</label>
              <input
                type="email"
                placeholder="Insere o seu email"
                value={email}
                onChange={handleEmailChange}
              />
              <span className="error">{emailError}</span>
            </div>{" "}
            <div className="client-detail">
              <label>Telefone</label>
              <PhoneInput
                inputStyle={{
                  border: "none",
                  background: "none",
                  borderBottom: "1px solid #aeaea4",
                  borderRadius: "0",
                  fontSize: "12px",
                  padding: "0 0 0rem 3rem",
                  width: "100%",
                  height: "2rem",
                }}
                buttonStyle={{
                  border: "none",
                  background: "none",
                  borderBottom: "1px solid #aeaea4",
                  borderRadius: "0",
                }}
                containerStyle={{ height: "2rem" }}
                country={"mz"} // Default to the user's country
                value={phoneNumber}
                onChange={handleOnChange}
                placeholder="Insert your phone number"
              />{" "}
            </div>
            <div className="client-detail">
              <label>Seus pedidos especiais</label>
              <textarea placeholder="Explique o seu pedido: hora de chegada, alergia alimentar,etc" />
            </div>
          </form>
          <div>
            <h3>Metodos De Pagamento</h3>
            <p>Transferencia Directa</p>
            <p>
              Assim que um membro do departamento de reservas da Golf View
              verificar e processar o seu pedido, enviaremos uma confirmação do
              pedido com os detalhes bancários por e-mail.
            </p>
          </div>
        </div>
        <div className="process-container">
          <div className="reserve-info-container">
            <h4>Informacoes da Reserva</h4>
            <div className="reserve-info">
              <div className="info">
                <p>Chegada:</p>
                <p>{arrival}</p>
              </div>
              <div className="info">
                <p>Partida:</p>
                <p>{departure} </p>
              </div>
              <div className="info">
                <p>Apartamento:</p>
                <p>{apartment}</p>
              </div>
            </div>
            <div className="info">
              <p>Hospedes:</p>
              <p>{guests}</p>
            </div>
            <div className="info">
              <p>Preco Total:</p>
              <p>{totalPrice}</p>
            </div>
          </div>
          <button onClick={handleSubmit}>Submeter Reserva</button>
        </div>
      </div>
    </div>
  );
}

export default page;
