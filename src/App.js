import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


const dataFromExcel = [
    {
        "category": "Community Participation",
        "outcome": "Feeling belonging to neighbourhood",
        "hact": 3799.0
    },
    {
        "category": "Community Participation",
        "outcome": "Improved family relationships",
        "hact": 6572.0
    },
    {
        "category": "Community Participation",
        "outcome": "Improved neighbour relationships",
        "hact": 1400.0
    },
    {
        "category": "Community Participation",
        "outcome": "Member of a social group",
        "hact": 1850.0
    },
    {
        "category": "Community Participation",
        "outcome": "Participation in local decision-making",
        "hact": 3141.0
    },
    {
        "category": "Digital & Inclusion",
        "outcome": "Improved skills/confidence to engage with services",
        "hact": 1300.0
    },
    {
        "category": "Digital & Inclusion",
        "outcome": "Increased digital inclusion",
        "hact": 1420.0
    },
    {
        "category": "Education",
        "outcome": "Advanced qualification achieved",
        "hact": 12685.0
    },
    {
        "category": "Education",
        "outcome": "Entry-level qualification achieved",
        "hact": 4883.0
    },
    {
        "category": "Employment",
        "outcome": "Full-time employment (adult)",
        "hact": 14436.0
    },
    {
        "category": "Employment",
        "outcome": "Full-time employment (young person)",
        "hact": 11391.0
    },
    {
        "category": "Employment",
        "outcome": "Part-time employment",
        "hact": 6804.0
    },
    {
        "category": "Employment",
        "outcome": "Young person engaged in training or work",
        "hact": 8220.0
    },
    {
        "category": "Environment",
        "outcome": "Participation in Best Kept Estate project",
        "hact": 900.0
    },
    {
        "category": "Environment",
        "outcome": "Participation in National Spring Clean",
        "hact": 750.0
    },
    {
        "category": "Environment",
        "outcome": "Participation in gardening or biodiversity project",
        "hact": 1100.0
    },
    {
        "category": "Environment",
        "outcome": "Reduction in anti-social behaviour",
        "hact": 9350.0
    },
    {
        "category": "Events & Engagement",
        "outcome": "Held a coffee morning",
        "hact": 500.0
    },
    {
        "category": "Events & Engagement",
        "outcome": "Held a community meeting",
        "hact": 1600.0
    },
    {
        "category": "Events & Engagement",
        "outcome": "Held a repairs clinic",
        "hact": 1200.0
    },
    {
        "category": "Events & Engagement",
        "outcome": "Organised a community event",
        "hact": 1750.0
    },
    {
        "category": "Events & Engagement",
        "outcome": "Participation in community event",
        "hact": 920.0
    },
    {
        "category": "Events & Engagement",
        "outcome": "Participation in online bingo/competition",
        "hact": 400.0
    },
    {
        "category": "Events & Engagement",
        "outcome": "Participation in online workshop",
        "hact": 600.0
    },
    {
        "category": "Financial & Support",
        "outcome": "Received financial education or advice",
        "hact": 1400.0
    },
    {
        "category": "Financial & Support",
        "outcome": "Supported with cost of living crisis",
        "hact": 1800.0
    },
    {
        "category": "Health & Wellbeing",
        "outcome": "Better management of health conditions",
        "hact": 1974.0
    },
    {
        "category": "Health & Wellbeing",
        "outcome": "Frequent mild exercise",
        "hact": 3753.0
    },
    {
        "category": "Health & Wellbeing",
        "outcome": "Improved confidence",
        "hact": 13080.0
    },
    {
        "category": "Health & Wellbeing",
        "outcome": "Improved mental health",
        "hact": 2320.0
    },
    {
        "category": "Health & Wellbeing",
        "outcome": "Increased physical activity",
        "hact": 3537.0
    },
    {
        "category": "Health & Wellbeing",
        "outcome": "Reduced social isolation",
        "hact": 2440.0
    },
    {
        "category": "Health & Wellbeing",
        "outcome": "Reduction in GP visits",
        "hact": 3537.0
    },
    {
        "category": "Health & Wellbeing",
        "outcome": "Relief from depression/anxiety",
        "hact": 36766.0
    },
    {
        "category": "Housing & Tenancy",
        "outcome": "Accessed support to sustain tenancy",
        "hact": 1650.0
    },
    {
        "category": "Housing & Tenancy",
        "outcome": "Improved housing conditions",
        "hact": 4020.0
    },
    {
        "category": "Housing & Tenancy",
        "outcome": "Reduction in eviction risk",
        "hact": 1492.0
    },
    {
        "category": "Housing & Tenancy",
        "outcome": "Reduction in rent arrears",
        "hact": 822.0
    },
    {
        "category": "Housing & Tenancy",
        "outcome": "Secured stable housing",
        "hact": 6924.0
    },
    {
        "category": "Housing & Tenancy",
        "outcome": "Supported through tenancy issue",
        "hact": 1600.0
    },
    {
        "category": "Housing & Tenancy",
        "outcome": "Improved home energy efficiency",
        "hact": 3249.0
    },
    {
        "category": "Neighbourhood & Community",
        "outcome": "Furnished a community space",
        "hact": 2400.0
    },
    {
        "category": "Neighbourhood & Community",
        "outcome": "Increased civic pride in housing estate",
        "hact": 1250.0
    },
    {
        "category": "Neighbourhood & Community",
        "outcome": "Installed a defibrillator on a scheme",
        "hact": 3200.0
    },
    {
        "category": "Neighbourhood & Community",
        "outcome": "Reduction in crime",
        "hact": 360.0
    },
    {
        "category": "Neighbourhood & Community",
        "outcome": "Secured a community space",
        "hact": 2800.0
    },
    {
        "category": "Resident Leadership",
        "outcome": "Attendance at tenant/resident group",
        "hact": 920.0
    },
    {
        "category": "Resident Leadership",
        "outcome": "Collaborated with other stakeholders to improve the scheme",
        "hact": 1600.0
    },
    {
        "category": "Resident Leadership",
        "outcome": "Joined a local network",
        "hact": 1100.0
    },
    {
        "category": "Resident Leadership",
        "outcome": "Participated in a residents panel",
        "hact": 1700.0
    },
    {
        "category": "Resident Leadership",
        "outcome": "Set up a residents panel",
        "hact": 2000.0
    },
    {
        "category": "Resident Leadership",
        "outcome": "Setting up a residents group",
        "hact": 2200.0
    },
    {
        "category": "Resident Leadership",
        "outcome": "Supplied with community fund grant",
        "hact": 2500.0
    },
    {
        "category": "Resident Leadership",
        "outcome": "Training for a community group",
        "hact": 1800.0
    },
    {
        "category": "Resident Leadership",
        "outcome": "Volunteer hour contributed (per hour)",
        "hact": 1000.0
    },
    {
        "category": "Volunteering",
        "outcome": "Regular volunteering",
        "hact": 12.5
    }
];

function App() {
  const [conversionRate, setConversionRate] = useState(1.17);
  const [entries, setEntries] = useState([createEmptyEntry()]);

  function createEmptyEntry() {
    return {
      category: "",
      outcome: "",
      hact: 0,
      units: 0,
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
      updated[index][field] = parseInt(value) || 0;
    }

    setEntries(updated);
  };

  const estimatedEuro = (entry) => entry.hact * conversionRate;
  const totalValue = (entry) => entry.units * estimatedEuro(entry);
  const socialValuePerEuro = (entry) => entry.cost > 0 ? totalValue(entry) / entry.cost : 0;

  const totalSocialValue = entries.reduce((sum, e) => sum + totalValue(e), 0);
  const totalCost = entries.reduce((sum, e) => sum + (e.cost || 0), 0);
  const overallValuePerEuro = totalCost > 0 ? totalSocialValue / totalCost : 0;

  const addEntry = () => setEntries([...entries, createEmptyEntry()]);

  const removeEntry = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
  };

  const uniqueCategories = [...new Set(dataFromExcel.map((d) => d.category))];

  return (
    <div className="container-fluid mt-4 px-5">
      <h2 className="mb-4">🌍 Social Value Calculator (UK Model)</h2>

      <div className="mb-3 row align-items-center">
        <label className="col-sm-4 col-form-label fw-bold">
          Conversion Rate (GBP → EUR):
        </label>
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
            <th>HACT Value per Unit in (£)</th>
            <th>HACT Value per Unit in (€)</th>
            <th>Units</th>
            <th>Total Value (€)</th>
            <th>Cost Invested (€)</th>
            <th>Social Value per €1</th>
            <th>Action</th>
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
                <td>£ {entry.hact.toFixed(4)}</td>
                <td>€ {estimatedEuro(entry).toFixed(4)}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    value={entry.units}
                    onChange={(e) => handleChange(i, "units", e.target.value)}
                  />
                </td>
                <td>€ {totalValue(entry).toFixed(4)}</td>
               <td>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="form-control"
                    value={entry.cost}
                    onChange={(e) =>
                      handleChange(i, "cost", e.target.value.replace(/^0+(?=\d)/, "").replace(/[^\d]/g, ""))
                    }
                    placeholder="0"
                  />
                </td>
                <td>{socialValuePerEuro(entry).toFixed(4)}</td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeEntry(i)}
                    disabled={entries.length === 1}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className="table-light fw-bold">
          <tr>
            <td colSpan="5">Totals</td>
            <td>€ {totalSocialValue.toFixed(4)}</td>
            <td>€ {totalCost.toFixed(4)}</td>
            <td>{overallValuePerEuro.toFixed(4)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      <button className="btn btn-primary" onClick={addEntry}>
        ➕ Add New Entry
      </button>

      <div className="mt-4 alert alert-info">
        <p>Overall Social Value: <strong>€ {totalSocialValue.toFixed(4)}</strong></p>
        <p>Overall Cost: <strong>€ {totalCost.toFixed(4)}</strong></p>
        <p>Overall Social Value per €1: <strong>{overallValuePerEuro.toFixed(4)}</strong></p>
      </div>
    </div>
  );
}

export default App;