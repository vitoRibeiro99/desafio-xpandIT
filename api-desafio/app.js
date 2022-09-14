const express = require("express");
const app = express();
const port = 3001;

app.get("/wseVal/:baseVal/:wsePerc", (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    let result = (
      (parseFloat(req.params.baseVal) * parseFloat(req.params.wsePerc)) /
      100
    ).toFixed(2);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.get("/vacationsTWL/:baseVal/:wseVal", (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    let result = (
      (parseFloat(req.params.baseVal) - -parseFloat(req.params.wseVal)) /
      12
    ).toFixed(2);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.get("/healthInsurance/:familyQty", (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    let result = (parseFloat(req.params.familyQty) * 30).toFixed(2);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});
// 2nd page
app.get("/BaseValSS/:baseVal/:wseVal", (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    let result =
      (parseFloat(req.params.baseVal) + parseFloat(req.params.wseVal)) * 0.11;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.get("/VacTwlSS/:vacationsTWL", (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    let result = parseFloat(req.params.vacationsTWL) * 0.11;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.get("/BaseValIRS/:baseVal/:wseVal/:irsPerc", (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    let result =
      (req.params.baseVal - -req.params.wseVal) * (req.params.irsPerc / 100);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.get("/VacTwlIRS/:vacationsTWL/:irsPerc", (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    let result = req.params.vacationsTWL * (req.params.irsPerc / 100);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.get(
  "/MonthGrossVal/:baseVal/:wseVal/:vacationsTWL/:otherVal/:rwaVal",
  (req, res) => {
    try {
      res.header("Access-Control-Allow-Origin", "*");
      let result =
        req.params.baseVal -
        -req.params.wseVal -
        -req.params.vacationsTWL -
        -req.params.vacationsTWL -
        -req.params.otherVal -
        -req.params.rwaVal;
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

app.get(
  "/MonthNetVal/:MonthGrossVal/:BaseValSS/:VacTwlSS/:BaseValIRS/:VacTwlIRS",
  (req, res) => {
    try {
      res.header("Access-Control-Allow-Origin", "*");
      let result =
        req.params.MonthGrossVal -
        (req.params.BaseValSS +
          req.params.VacTwlSS +
          req.params.VacTwlSS +
          req.params.BaseValIRS +
          req.params.VacTwlIRS +
          req.params.VacTwlIRS);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

app.get("/AnualGrossVal/:MonthGrossVal", (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    let result = req.params.MonthGrossVal * 12;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.get("/AnualNetVal/:MonthNetVal", (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    let result = req.params.MonthNetVal * 12;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.get("/MonthBenefits/:comPlafond/:healthInsurance", (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    let result = req.params.comPlafond + req.params.healthInsurance;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.get("/AnualBenefits/:MonthBenefits", (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    let result = req.params.MonthBenefits * 12;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.get("/AnualCost/:AnualGrossVal/:AnualBenefits", (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    let result = req.params.AnualGrossVal + req.params.AnualBenefits;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.get("/MonthCost/:AnualCost", (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    let result = req.params.AnualCost / 12;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.get("/DailyCost/:MonthCost", (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    let result = req.params.MonthCost / 18;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
