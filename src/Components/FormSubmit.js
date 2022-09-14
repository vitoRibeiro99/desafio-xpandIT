import React, { useEffect } from "react";
import emailjs from "@emailjs/browser";

function FormSubmit(props) {
  const BaseValSSAux =
    (props.formValues.baseVal - -props.formValues.wseVal) * 0.11;
  const VacTwlSSAux = props.formValues.vacationsTWL * 0.11;
  const BaseValIRSAux =
    (props.formValues.baseVal - -props.formValues.wseVal) *
    (props.formValues.irsPerc / 100);
  const VacTwlIRSAux =
    props.formValues.vacationsTWL * (props.formValues.irsPerc / 100);
  const MonthGrossValAux =
    props.formValues.baseVal -
    -props.formValues.wseVal -
    -props.formValues.vacationsTWL -
    -props.formValues.vacationsTWL -
    -props.formValues.otherVal -
    -props.formValues.rwaVal;
  const MonthNetValAux =
    MonthGrossValAux -
    (BaseValSSAux +
      VacTwlSSAux +
      VacTwlSSAux +
      BaseValIRSAux +
      VacTwlIRSAux +
      VacTwlIRSAux);
  const AnualGrossValAux = MonthGrossValAux * 12;
  const AnualNetValAux = MonthNetValAux * 12;
  const MonthBenefitsAux =
    props.formValues.comPlafond + props.formValues.healthInsurance;
  const AnualBenefitsAux = MonthBenefitsAux * 12;
  const AnualCostAux = AnualGrossValAux + AnualBenefitsAux;
  const MonthCostAux = AnualCostAux / 12;
  const DailyCostAux = MonthCostAux / 18;

  useEffect(() => {
    props.setFormValues({
      ...props.formValues,
      BaseValSS: BaseValSSAux,
      VacTwlSS: VacTwlSSAux,
      BaseValIRS: BaseValIRSAux,
      VacTwlIRS: VacTwlIRSAux,
      MonthGrossVal: MonthGrossValAux,
      MonthNetVal: MonthNetValAux,
      AnualGrossVal: AnualGrossValAux,
      AnualNetVal: AnualNetValAux,
      MonthBenefits: MonthBenefitsAux,
      AnualBenefits: AnualBenefitsAux,
      AnualCost: AnualCostAux,
      MonthCost: MonthCostAux,
      DailyCost: DailyCostAux,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DailyCostAux]);

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
      formSubmit: !props.formValues.formSubmit,
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
          <label>
            BASE VALUE SOCIAL SECURITY : {props.formValues.BaseValSS}€
          </label>
        </div>
        <div className="row">
          <label>
            CHRISTMAS ALLOWANCE TWELFTH SOCIAL SECURITY:
            {props.formValues.VacTwlSS}€
          </label>
        </div>
        <div className="row">
          <label>
            VACATIONS ALLOWANCE TWELFTH SOCIAL SECURITY:
            {props.formValues.VacTwlSS}€
          </label>
        </div>
        <div className="row">
          <label>BASE VALUE IRS : {props.formValues.BaseValIRS}€</label>
        </div>
        <div className="row">
          <label>
            CHRISTMAS ALLOWANCE TWELFTH IRS: {props.formValues.VacTwlIRS}€
          </label>
        </div>
        <div className="row">
          <label>
            VACATIONS ALLOWANCE TWELFTH IRS: {props.formValues.VacTwlIRS}€
          </label>
        </div>
        <h3 className="Form-subtitle">VALUES</h3>
        <div className="row">
          <label>MONTHLY GROSS VALUE : {props.formValues.MonthGrossVal}€</label>
        </div>
        <div className="row">
          <label>MONTHLY NET VALUE : {props.formValues.MonthNetVal}€</label>
        </div>
        <div className="row">
          <label>ANNUAL GROSS VALUE: {props.formValues.AnualGrossVal}€ </label>
        </div>
        <div className="row">
          <label>ANNUAL NET VALUE:{props.formValues.AnualNetVal}€</label>
        </div>
        <div className="row">
          <label>MONTHLY BENEFITS: {props.formValues.MonthBenefits}€</label>
        </div>
        <div className="row">
          <label>ANNUAL BENEFITS: {props.formValues.AnualBenefits}€</label>
        </div>
        <h3 className="Form-subtitle">COSTS</h3>
        <div className="row">
          <label>ANNUAL COST: {props.formValues.AnualCost}€</label>
        </div>
        <div className="row">
          <label>MONTHLY COST: {props.formValues.MonthCost}€</label>
        </div>
        <div className="row">
          <label>DAILY COST: {props.formValues.DailyCost}€</label>
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
