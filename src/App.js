import React, { useState, useEffect } from "react";
import FamilyQty from "./Components/FamilyQty";
import FormSubmit from "./Components/FormSubmit";
import "./App.css";

function App() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    date: "",
    baseVal: 0,
    wsePerc: 25,
    wseVal: 0,
    irsPerc: 0,
    vacationsTWL: 0,
    otherVal: 0,
    rwaVal: 15,
    comPlafond: 25,
    healthInsurance: 30,
    familyMembers: false,
    familyQty: 1,
    formSubmit: false,
  });
  const [baseVal, setBaseVal] = useState(0);
  const [wsePerc, setWsePerc] = useState(25);
  const [wseVal, setWseVal] = useState(0);
  const [familyMembers, setFamilyMembers] = useState(false);
  const [familyQty, setFamilyQty] = useState(1);

  useEffect(() => {
    // setFormValues({
    //   ...formValues,
    //   wseVal:
    //     (parseFloat(baseVal) * parseFloat(wsePerc)) / 100,
    // });
    setWseVal((parseFloat(baseVal) * parseFloat(wsePerc)) / 100);
  }, [baseVal, wsePerc]);

  useEffect(() => {
    setFormValues({
      ...formValues,
      vacationsTWL: (parseFloat(baseVal) - -parseFloat(wseVal)) / 12,
    });
  }, [baseVal, wseVal]);

  useEffect(() => {
    setFormValues({
      ...formValues,
      healthInsurance: familyQty * 30,
    });
  }, [familyQty]);

  useEffect(() => {
    if (familyMembers) {
      // setFormValues({
      //   ...formValues,
      //   familyQty: 1,
      // });
      setFamilyQty(1);
    } else {
      setFormValues({
        ...formValues,
        healthInsurance: 30,
      });
    }
  }, [familyMembers]);

  const handleSubmit = (event) => {
    setFormValues({
      ...formValues,
      baseVal: baseVal,
      wsePerc: wsePerc,
      wseVal: wseVal,
      familyMembers: familyMembers,
      familyQty: familyQty,
      formSubmit: !formValues.formSubmit,
    });
  };

  return (
    <div>
      {formValues.formSubmit ? (
        <FormSubmit formValues={formValues} setFormValues={setFormValues} />
      ) : (
        <div className="App-background">
          <div className="Form">
            <h1 className="Form-title">Collaboration Proposal</h1>
            <form onSubmit={handleSubmit}>
              <h3 className="Form-subtitle">GENERAL</h3>
              <input
                type="text"
                className="Form-text"
                placeholder="Insert your name"
                value={formValues.name}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    name: e.target.value,
                  })
                }
                required
              />
              <input
                type="email"
                className="Form-text"
                placeholder="Insert your email address"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    email: e.target.value,
                  })
                }
                required
              />
              <div className="row">
                <label>COLLABORATION START DATE:</label>
                <input
                  type="date"
                  value={formValues.date}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      date: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <h3 className="Form-subtitle">FINANCIAL</h3>
              <div className="row">
                <label>BASE VALUE:</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  size="10"
                  value={baseVal}
                  onChange={
                    (e) => setBaseVal(e.target.value)
                    // setFormValues({
                    //   ...formValues,
                    //   baseVal: e.target.value,
                    // })
                  }
                />
                €
              </div>
              <div className="row">
                <label>WORK SCHEDULE EXEMPTION :</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  size="3"
                  value={wsePerc}
                  onChange={
                    (e) => setWsePerc(e.target.value)
                    // setFormValues({
                    //   ...formValues,
                    //   wsePerc: e.target.value,
                    // })
                  }
                />
                %
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={wsePerc}
                  onChange={
                    (e) => setWsePerc(e.target.value)
                    // setFormValues({
                    //   ...formValues,
                    //   wsePerc: e.target.value,
                    // })
                  }
                />
              </div>
              <div className="row">
                <label>WORK SCHEDULE EXEMPTION Value: {wseVal} €</label>
              </div>
              <div className="row">
                <label>IRS TAX :</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  size="3"
                  value={formValues.irsPerc}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      irsPerc: e.target.value,
                    })
                  }
                />
                %
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formValues.irsPerc}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      irsPerc: e.target.value,
                    })
                  }
                />
              </div>
              <div className="row">
                <label>VACATIONS TWELFTH: {formValues.vacationsTWL} €</label>
              </div>
              {/* christmasTWV */}
              <div className="row">
                <label>CHRISTMAS TWELFTH: {formValues.vacationsTWL} €</label>
              </div>
              <div className="row">
                <label>OTHER EXPENSES:</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  size="10"
                  value={formValues.otherVal}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      otherVal: e.target.value,
                    })
                  }
                />
                €
              </div>
              <div className="row">
                <label>REMOTE WORK ALLOWANCE:</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  size="10"
                  value={formValues.rwaVal}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      rwaVal: e.target.value,
                    })
                  }
                />
                €
              </div>
              <h3 className="Form-subtitle">BENEFITS</h3>
              <div className="row">
                <label>COMMUNICATIONS PLAFOND:</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  size="10"
                  value={formValues.comPlafond}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      comPlafond: e.target.value,
                    })
                  }
                />
                €
              </div>
              <div className="row">
                <label>HEALTH INSURANCE:</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  size="10"
                  value={formValues.healthInsurance}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      healthInsurance: e.target.value,
                    })
                  }
                />
                €
              </div>
              <div className="row">
                <label>FAMILY MEMBERS:</label>
                <input
                  type="checkbox"
                  checked={familyMembers}
                  onChange={
                    (e) => setFamilyMembers(e.target.checked)
                    // setFormValues({
                    //   ...formValues,
                    //   familyMembers: e.target.checked,
                    // })
                  }
                />
                <FamilyQty
                  familyMembers={familyMembers}
                  setFamilyQty={setFamilyQty}
                  familyQty={familyQty}
                  // formValues={formValues}
                  // setFormValues={setFormValues}
                />
              </div>
              <div className="row-submit">
                <input type="submit" value="Submit Proposal" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
