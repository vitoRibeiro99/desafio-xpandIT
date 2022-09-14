import React, { useState, useEffect } from "react";
import FamilyQty from "./Components/FamilyQty";
import FormSubmit from "./Components/FormSubmit";

import "./App.css";

function App() {
  // OBJETO UTILIZADO PARA ARMAZENAR TODOS OS DADOS DO FORMULÁRIO QUE SERÃO SUBMETIDOS PARA O EMAIL
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
    BaseValSS: 0,
    VacTwlSS: 0,
    BaseValIRS: 0,
    VacTwlIRS: 0,
    MonthGrossVal: 0,
    MonthNetVal: 0,
    AnualGrossVal: 0,
    AnualNetVal: 0,
    MonthBenefits: 0,
    AnualBenefits: 0,
    AnualCost: 0,
    MonthCost: 0,
    DailyCost: 0,
    formSubmit: false, //VARIÁVEL DO OBJETO QUE CONTROLA O HTML MOSTRADO NO APP.JS (PREENCHIMENTO(FALSE) OU JANELA DE CONFIRMAÇÃO(TRUE))
  });

  // VALORES AUXILIRES PARA CALCULOS DE VALORES NOS USEEFFECT
  const [baseValAux, setBaseValAux] = useState(0);
  const [wsePercAux, setWsePercAux] = useState(25);
  const [wseValAux, setWseValAux] = useState(0);
  const [familyMembersAux, setFamilyMembersAux] = useState(false);
  const [familyQtyAux, setFamilyQtyAux] = useState(1);

  // CÁLCULOS EFETUADOS EM BACK-END INVOCADOS PELOS USEEFFECTs
  useEffect(() => {
    fetch("http://localhost:3001/wseVal/" + baseValAux + "/" + wsePercAux)
      .then((response) => response.json())
      .then((data) => {
        setWseValAux(data);
      });
  }, [baseValAux, wsePercAux]);

  useEffect(() => {
    fetch("http://localhost:3001/vacationsTWL/" + baseValAux + "/" + wseValAux)
      .then((response) => response.json())
      .then((data) => {
        setFormValues({
          ...formValues,
          vacationsTWL: data,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseValAux, wseValAux]);

  useEffect(() => {
    fetch("http://localhost:3001/healthInsurance/" + familyQtyAux)
      .then((response) => response.json())
      .then((data) => {
        setFormValues({
          ...formValues,
          healthInsurance: data,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [familyQtyAux]);

  useEffect(() => {
    if (familyMembersAux) {
      setFamilyQtyAux(1);
    } else {
      setFormValues({
        ...formValues,
        healthInsurance: 30,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [familyMembersAux]);

  // AO PRIMIR SUBMETER
  const handleSubmit = () => {
    // OBJETO RECEBE VALORES AUXILIRES E PASSA PARA A CONFIRMAÇÃO DE FORMULÁRIO
    setFormValues({
      ...formValues,
      baseVal: baseValAux,
      wsePerc: wsePercAux,
      wseVal: wseValAux,
      familyMembers: familyMembersAux,
      familyQty: familyQtyAux,
      formSubmit: !formValues.formSubmit,
    });
  };

  return (
    <div>
      {/* CONDIÇÃO UTILIZADA COM A VARIAVÉL FormSubmit PARA ALTERAR ENTRE JANELA DE (PREENCHIMENTO(FALSE) OU JANELA DE CONFIRMAÇÃO(TRUE) */}
      {formValues.formSubmit ? (
        <FormSubmit formValues={formValues} setFormValues={setFormValues} />
      ) : (
        <div className="App-background">
          <div className="Form">
            <h1 className="Form-title">Collaboration Proposal</h1>
            {/* FORMULÁRIO UTILIZADO COM ATULIZAÇÃO DE VALORES NO onChange DOS INPUTs*/}
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
                  value={baseValAux}
                  onChange={(e) => setBaseValAux(e.target.value)}
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
                  value={wsePercAux}
                  onChange={(e) => setWsePercAux(e.target.value)}
                />
                %
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={wsePercAux}
                  onChange={(e) => setWsePercAux(e.target.value)}
                />
              </div>
              <div className="row">
                <label>WORK SCHEDULE EXEMPTION Value: {wseValAux} €</label>
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
                  checked={familyMembersAux}
                  onChange={(e) => setFamilyMembersAux(e.target.checked)}
                />
                {/* COMPONENT QUE APARECE CONFORME O VALOR DA checkbox */}
                <FamilyQty
                  familyMembers={familyMembersAux}
                  setFamilyQty={setFamilyQtyAux}
                  familyQty={familyQtyAux}
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
