import React from "react";
import emailjs from "@emailjs/browser";

function FormSubmit(props) {
  const BaseValSS =
    (props.formValues.baseVal - -props.formValues.wseVal) * 0.11;
  const VacTwlSS = props.formValues.vacationsTWL * 0.11;
  const BaseValIRS =
    (props.formValues.baseVal - -props.formValues.wseVal) *
    (props.formValues.irsPerc / 100);
  const VacTwlIRS =
    props.formValues.vacationsTWL * (props.formValues.irsPerc / 100);
  const MonthGrossVal =
    props.formValues.baseVal -
    -props.formValues.wseVal -
    -props.formValues.vacationsTWL -
    -props.formValues.vacationsTWL -
    -props.formValues.otherVal -
    -props.formValues.rwaVal;
  const MonthNetVal =
    MonthGrossVal -
    (BaseValSS + VacTwlSS + VacTwlSS + BaseValIRS + VacTwlIRS + VacTwlIRS);
  const AnualGrossVal = MonthGrossVal * 12;
  const AnualNetVal = MonthNetVal * 12;
  const MonthBenefits =
    props.formValues.comPlafond + props.formValues.healthInsurance;
  const AnualBenefits = MonthBenefits * 12;
  const AnualCost = AnualGrossVal + AnualBenefits;
  const MonthCost = AnualCost / 12;
  const DailyCost = MonthCost / 18;

  const cancelSubmition = () => {
    props.setFormValues({
      ...props.formValues,
      formSubmit: !props.formValues.formSubmit,
    });
  };

  const confirmSubmition = () => {
    emailjs
      .send(
        "service_4joyxdq",
        "template_o9584yr",
        props.formValues,
        "kP_7sChm-LCO_UmEd"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    alert("Colaboration Proposal Submitted");
    props.setFormValues({
      ...props.formValues,
      name: "",
      email: "",
      date: "",
      baseVal: 0,
      wsePerc: 25,
      wseVal: 0,
      irsPerc: 0,
      vacationsTWL: 0,
      christmasTWV: 0,
      otherVal: 0,
      rwaVal: 15,
      comPlafond: 25,
      healthInsurance: 30,
      familyMembers: false,
      familyQty: 1,
      formSubmit: false,
    });
  };

  return (
    <div className="App-background">
      <div className="Form">
        <h1 className="Form-title">Collaboration Proposal Confirmation</h1>
        <h3 className="Form-subtitle">GENERAL</h3>
        <div className="row">
          <label>NAME: {props.formValues.name} </label>
        </div>
        <div className="row">
          <label>EMAIL: {props.formValues.email}</label>
        </div>
        <div className="row">
          <label>COLLABORATION START DATE: {props.formValues.date}</label>
        </div>
        <h3 className="Form-subtitle">FINANCIAL</h3>
        <div className="row">
          <label>BASE VALUE: {props.formValues.baseVal}€</label>
        </div>
        <div className="row">
          <label>WORK SCHEDULE EXEMPTION : {props.formValues.wsePerc}%</label>
        </div>
        <div className="row">
          <label>
            WORK SCHEDULE EXEMPTION Value: {props.formValues.wseVal} €
          </label>
        </div>
        <div className="row">
          <label>IRS TAX : {props.formValues.irsPerc} %</label>
        </div>
        <div className="row">
          <label>VACATIONS TWELFTH: {props.formValues.vacationsTWL} €</label>
        </div>
        {/* christmasTWV */}
        <div className="row">
          <label>CHRISTMAS TWELFTH: {props.formValues.vacationsTWL} €</label>
        </div>
        <div className="row">
          <label>OTHER EXPENSES: {props.formValues.otherVal}€</label>
        </div>
        <div className="row">
          <label>REMOTE WORK ALLOWANCE: {props.formValues.rwaVal}€</label>
        </div>
        <h3 className="Form-subtitle">BENEFITS</h3>
        <div className="row">
          <label>COMMUNICATIONS PLAFOND: {props.formValues.comPlafond}€</label>
        </div>
        <div className="row">
          <label>HEALTH INSURANCE: {props.formValues.healthInsurance}€</label>
        </div>
        <div className="row">
          <label>FAMILY MEMBERS: {props.formValues.familyQty}</label>
        </div>
        <h3 className="Form-subtitle">DEDUCTIONS</h3>
        <div className="row">
          <label>BASE VALUE SOCIAL SECURITY : {BaseValSS}€</label>
        </div>
        <div className="row">
          <label>
            CHRISTMAS ALLOWANCE TWELFTH SOCIAL SECURITY: {VacTwlSS}€
          </label>
        </div>
        <div className="row">
          <label>
            VACATIONS ALLOWANCE TWELFTH SOCIAL SECURITY: {VacTwlSS}€
          </label>
        </div>
        <div className="row">
          <label>BASE VALUE IRS : {BaseValIRS}€</label>
        </div>
        <div className="row">
          <label>CHRISTMAS ALLOWANCE TWELFTH IRS: {VacTwlIRS}€</label>
        </div>
        <div className="row">
          <label>VACATIONS ALLOWANCE TWELFTH IRS: {VacTwlIRS}€</label>
        </div>
        <h3 className="Form-subtitle">VALUES</h3>
        <div className="row">
          <label>MONTHLY GROSS VALUE : {MonthGrossVal}€</label>
        </div>
        <div className="row">
          <label>MONTHLY NET VALUE : {MonthNetVal}€</label>
        </div>
        <div className="row">
          <label>ANNUAL GROSS VALUE: {AnualGrossVal}€ </label>
        </div>
        <div className="row">
          <label>ANNUAL NET VALUE:{AnualNetVal}€</label>
        </div>
        <div className="row">
          <label>MONTHLY BENEFITS: {MonthBenefits}€</label>
        </div>
        <div className="row">
          <label>ANNUAL BENEFITS: {AnualBenefits}€</label>
        </div>
        <h3 className="Form-subtitle">COSTS</h3>
        <div className="row">
          <label>ANNUAL COST: {AnualCost}€</label>
        </div>
        <div className="row">
          <label>MONTHLY COST: {MonthCost}€</label>
        </div>
        <div className="row">
          <label>DAILY COST: {DailyCost}€</label>
        </div>
        <div className="row">
          <button onClick={cancelSubmition}>Cancel</button>
          <button className="confirm" onClick={confirmSubmition}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormSubmit;
