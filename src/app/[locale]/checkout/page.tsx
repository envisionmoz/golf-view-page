"use client";
import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useLocale } from "next-intl";
import { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../../css/app.css";
import { useFormatter } from "next-intl";

export default function page() {
    const format = useFormatter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Function to handle changes in the textarea
  const handleTextareaChange = (event) => {
    if ((event.target.value = "")) {
      event.target.value = "Nenhum pedido especial";
    } else {
      setSpecialRequests(event.target.value);
    }
  };

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
    const error = validateFirstName(value);
    setFirstName(value);
    setFirstNameError(error);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const error = validateLastName(value);
    setLastName(value);
    setLastNameError(error);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const error = validateEmail(value);
    setEmail(value);
    setEmailError(error);
  };

  const localActive = useLocale();
  //Data submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      emailError ||
      firstNameError ||
      lastNameError
    ) {
      alert("Check your inputs");
    } else {
      try {

        const mybody = {
          guest_name: firstName + " " + lastName,
          guest_email: email,
          guest_phone: phoneNumber,
          apartment: apartment,
          total_price: dbReadyTotalPrice,
          num_guests: guests,
          arrival_date: formattedArrival,
          departure_date: formattedDeparture,
          special_requests: specialRequests,
        };
        console.log(
          mybody
        );

        const res = await fetch(`/${localActive}/api/reservation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            guest_name: firstName + " " + lastName,
            guest_email: email,
            guest_phone: phoneNumber,
            apartment: apartment,
            total_price: dbReadyTotalPrice,
            num_guests: guests,
            arrival_date: formattedArrival,
            departure_date: formattedDeparture,
            special_requests: specialRequests,
          }),
        });

        console.log("here is", res);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCurrency = searchParams.get("currency");
  const [currencyOptions, SetCurrencyOptions] = useState([]);
  const [conversionRates, setConversionRates] = useState({});

  const BASE_URL = `https://v6.exchangerate-api.com/v6/e38d9104cd321369e784a6d0/latest/${selectedCurrency}`;
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const selectedCurrencies = [
          "MZN",
          "USD",
          "EUR",
          "ZAR",
          "CNY",
          "INR",
          "BRL",
        ];
        const filteredOptions = selectedCurrencies.filter(
          (curr) => data.conversion_rates[curr] !== undefined
        );
        SetCurrencyOptions(filteredOptions);
        setConversionRates(data.conversion_rates);
      })
      .catch((error) => console.error("Error fetching currency data:", error));
  }, []);

  const apartment = parseInt(searchParams.get("apartment"));
  const arrival = searchParams.get("arrival");
  const departure = searchParams.get("departure");
  const guests = parseInt(searchParams.get("guests"));
  const totalPrice = searchParams.get("totalPrice");
  const dbReadyTotalPrice = parseInt(totalPrice) * conversionRates["MZN"];
  console.log(totalPrice, dbReadyTotalPrice);
  const convertedTotal = format.number(parseInt(totalPrice), {
    style: "currency",
    currency: selectedCurrency,
  });

  function formatDate(dateString) {
    // Create a new Date object with the date string
    let date = new Date(dateString);

    // Extract year, month, and day from the date object
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    let day = String(date.getDate()).padStart(2, "0");

    // Format the date as YYYY-MM-DD
    let formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }
  const formattedArrival = formatDate(arrival);
  const formattedDeparture = formatDate(departure);
  const handleClick = () => {
    router.back();
  };
  const handleOnChange = (value) => {
    setPhoneNumber(value);
  };
  return (
    <div className="check-out-container">
      <h2>Pagamento</h2>
      <Link href="#" onClick={handleClick} className="back-btn">
        Voltar Para A Reserva
      </Link>
      <div className="check-out-boxes-container">
        <div className="client-box">
          <form id="reservation" onSubmit={handleSubmit}>
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
              <textarea
                placeholder="Explique o seu pedido: hora de chegada, alergia alimentar,etc"
                value={specialRequests}
                onChange={handleTextareaChange}
              />
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
              <p>{convertedTotal}</p>
            </div>
          </div>
          <button form="reservation" type="submit">
            Submeter Reserva
          </button>
        </div>
      </div>
    </div>
  );
}
