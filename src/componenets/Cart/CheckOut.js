import { useRef, useState } from "react";
import classes from "./CheckOut.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true,
      });

      
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();


  const confirmHandler = (event) => {
    event.preventDefault();

    const eneteredName = nameInputRef.current.value;
    const eneteredStreet = streetInputRef.current.value;
    const eneteredPostal = postalInputRef.current.value;
    const eneteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(eneteredName);
    const enteredStreetIsValid = !isEmpty(eneteredStreet);
    const enteredPostalIsValid = isFiveChars(eneteredPostal);
    const enteredCityIsValid = !isEmpty(eneteredCity);

    setFormInputsValidity ({
        name : enteredNameIsValid,
        street : enteredStreetIsValid,
        city : enteredCityIsValid,
        postal : enteredCityIsValid
     });



    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

     
    if (!formIsValid) {
      return;
    }

    props.onConfirm ({
        name : eneteredName,
        street : eneteredStreet,
        postal : eneteredPostal,
        city : eneteredCity
    });
  };

  const nameClassControl = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
  const streetClassControl = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`;
  const postalClassControl = `${classes.control} ${formInputsValidity.postal ? '' : classes.invalid}`;
  const cityClassControl = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClassControl}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please Enter correct name</p>}
      </div>
      <div className={streetClassControl}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please Enter correct street name</p>}

      </div>
      <div className={postalClassControl}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postal && <p>Please Enter correct postla Code(5 chars)</p>}

      </div>
      <div className={cityClassControl}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please Enter correct city</p>}

      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClick}>
          Cancel
        </button>
        <button className={classes.submit} type="submit" >Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
