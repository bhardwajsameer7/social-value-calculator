import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Preloaded from Excel - this should be imported or fetched
const dataFromExcel = [
  { category: "Community Engagement", outcome: "Resident attending training/workshop", hact: 1500 },
  { category: "Community Engagement", outcome: "Volunteer hours contributed", hact: 20 },
  { category: "Health & Wellbeing", outcome: "Tenant engaged in community activity", hact: 600 },
  { category: "Energy Efficiency", outcome: "Household supported with energy advice", hact: 250 },
  { category: "Housing Improvement", outcome: "Home improvement increasing wellbeing", hact: 4000 }
];

function App() {
  const [conversionRate, setConversionRate] = useState(1.17);

  const [entries, setEntries] = useState([
    createEmptyEntry()
  ]);

  function createEmptyEntry() {
    return {
      category: "",
      outcome: "",
      hact: 0,
      quantity: 0,
      unitValue: 0,
      cost: 0
    };
  }

  const handleChange = (index, field, value) => {
    const updated = [...entries];

    if (field === "category") {
      updated[index].category = value;
      updated[index].outcome = "";
      updated[index].hact = 0;
    } else if (field === "outcome") {
      const hactMatch = dataFromExcel.find(
        (item) => item.category === updated[index].category && item.outcome === value
      );
      updated[index].outcome = value;
      updated[index].hact = hactMatch ? hactMatch.hact : 0;
    } else {
      updated[index][field] = parseFloat(value) || 0;
    }

    setEntries(updated);
  };

  const calculateTotalValue = (entry) => (entry.quantity || 0) * (entry.unitValue || 0);
  const calculateSocialValuePerEuro = (entry) =>
    entry.cost > 0 ? calculateTotalValue(entry) / entry.cost : 0;
  const estimatedEuro = (entry) => entry.hact * conversionRate;

  const totalSocialValue = entries.reduce((sum, e) => sum + calculateTotalValue(e), 0);
  const totalCost = entries.reduce((sum, e) => sum + (e.cost || 0), 0);
  const overallValuePerEuro = totalCost > 0 ? totalSocialValue / totalCost : 0;

  const addEntry = () => {
    setEntries([...entries, createEmptyEntry()]);
  };

  const uniqueCategories = [...new Set(dataFromExcel.map((d) => d.category))];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🌍 Social Value Calculator</h2>

      <div className="mb-3 row align-items-center">
        <label className="col-sm-3 col-form-label fw-bold">Conversion Rate (GBP → EUR):</label>
        <div className="col-sm-3">
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={conversionRate}
            onChange={(e) => setConversionRate(parseFloat(e.target.value) || 1)}
          />
        </div>
      </div>

      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>Category</th>
            <th>Outcome</th>
            <th>HACT Value (£)</th>
            <th>Estimated Value (€)</th>
            <th>Quantity</th>
            <th>Unit Value (€)</th>
            <th>Total Value (€)</th>
            <th>Cost (€)</th>
            <th>Social Value per €1</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => {
            const filteredOutcomes = dataFromExcel.filter(
              (d) => d.category === entry.category
            );
            return (
              <tr key={i}>
                <td>
                  <select
                    className="form-select"
                    value={entry.category}
                    onChange={(e) => handleChange(i, "category", e.target.value)}
                  >
                    <option value="">Select</option>
                    {uniqueCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    className="form-select"
                    value={entry.outcome}
                    onChange={(e) => handleChange(i, "outcome", e.target.value)}
                    disabled={!entry.category}
                  >
                    <option value="">Select</option>
                    {filteredOutcomes.map((d) => (
                      <option key={d.outcome} value={d.outcome}>
                        {d.outcome}
                      </option>
                    ))}
                  </select>
                </td>
                <td>£ {entry.hact.toFixed(2)}</td>
                <td>€ {estimatedEuro(entry).toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    value={entry.quantity}
                    onChange={(e) => handleChange(i, "quantity", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="form-control"
                    value={entry.unitValue}
                    onChange={(e) => handleChange(i, "unitValue", e.target.value)}
                  />
                </td>
                <td>€ {calculateTotalValue(entry).toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="form-control"
                    value={entry.cost}
                    onChange={(e) => handleChange(i, "cost", e.target.value)}
                  />
                </td>
                <td>{calculateSocialValuePerEuro(entry).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className="table-light fw-bold">
          <tr>
            <td colSpan="6">Totals</td>
            <td>€ {totalSocialValue.toFixed(2)}</td>
            <td>€ {totalCost.toFixed(2)}</td>
            <td>{overallValuePerEuro.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <button className="btn btn-primary" onClick={addEntry}>
        ➕ Add New Entry
      </button>

      <div className="mt-4 alert alert-info">
        <p>Overall Social Value: <strong>€ {totalSocialValue.toFixed(2)}</strong></p>
        <p>Overall Cost: <strong>€ {totalCost.toFixed(2)}</strong></p>
        <p>Overall Social Value per €1: <strong>{overallValuePerEuro.toFixed(2)}</strong></p>
      </div>
    </div>
  );
}

export default App;
