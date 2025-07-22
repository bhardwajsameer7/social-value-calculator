import React, { useState } from "react";
import "./App.css";

function App() {
  const [activities, setActivities] = useState([
    {
      activity: "Resident attending training/workshop",
      quantity: 0,
      unitValue: 1500,
      cost: 1000,
    },
    {
      activity: "Volunteer hours contributed",
      quantity: 0,
      unitValue: 20,
      cost: 5,
    },
    {
      activity: "Tenant engaged in community activity",
      quantity: 0,
      unitValue: 600,
      cost: 300,
    },
    {
      activity: "Household supported with energy advice",
      quantity: 0,
      unitValue: 250,
      cost: 150,
    },
    {
      activity: "Home improvement increasing wellbeing",
      quantity: 0,
      unitValue: 4000,
      cost: 2000,
    },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...activities];
    updated[index][field] = parseFloat(value) || 0;
    setActivities(updated);
  };

  const calculateTotalValue = (activity) =>
    (activity.quantity || 0) * (activity.unitValue || 0);

  const calculateSocialValuePerEuro = (activity) => {
    const total = calculateTotalValue(activity);
    return activity.cost > 0 ? total / activity.cost : 0;
  };

  const totalSocialValue = activities.reduce(
    (sum, a) => sum + calculateTotalValue(a),
    0
  );
  const totalCost = activities.reduce((sum, a) => sum + (a.cost || 0), 0);
  const overallValuePerEuro =
    totalCost > 0 ? totalSocialValue / totalCost : 0;

  return (
    <div className="App">
      <h2>Social Value Calculator</h2>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Quantity</th>
            <th>Unit Value (€)</th>
            <th>Total Value (€)</th>
            <th>Cost (€)</th>
            <th>Social Value per €1</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, i) => (
            <tr key={activity.activity}>
              <td>{activity.activity}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={activity.quantity}
                  onChange={(e) =>
                    handleChange(i, "quantity", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={activity.unitValue}
                  onChange={(e) =>
                    handleChange(i, "unitValue", e.target.value)
                  }
                />
              </td>
              <td>{calculateTotalValue(activity).toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={activity.cost}
                  onChange={(e) => handleChange(i, "cost", e.target.value)}
                />
              </td>
              <td>{calculateSocialValuePerEuro(activity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">
              <strong>Totals</strong>
            </td>
            <td>
              <strong>{totalSocialValue.toFixed(2)} €</strong>
            </td>
            <td>
              <strong>{totalCost.toFixed(2)} €</strong>
            </td>
            <td>
              <strong>{overallValuePerEuro.toFixed(2)}</strong>
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="summary">
        <p>
          Overall Social Value: <strong>{totalSocialValue.toFixed(2)} €</strong>
        </p>
        <p>
          Overall Cost: <strong>{totalCost.toFixed(2)} €</strong>
        </p>
        <p>
          Overall Social Value per €1:{" "}
          <strong>{overallValuePerEuro.toFixed(2)}</strong>
        </p>
      </div>
    </div>
  );
}

export default App;
