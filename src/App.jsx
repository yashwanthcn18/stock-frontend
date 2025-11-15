import React, { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("https://stock-backend-htxu.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `Give complete and detailed stock or IPO analysis about: ${query}. Include:
- Company overview
- Financials
- IPO price band (if IPO)
- GMP (Grey Market Premium)
- Strengths
- Risks
- Should I buy or avoid
- Final conclusion`
        })
      });

      const data = await response.json();
      console.log("FULL RESPONSE:", data);

      let text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No data found";

      setResult(text);
    } catch (error) {
      console.error("Error:", error);
      setResult("Error fetching data.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Stock & IPO Analyzer (Gemini)</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter stock or IPO name"
        style={{
          padding: 8,
          width: 300,
          border: "1px solid #aaa",
          borderRadius: "4px",
        }}
      />

      <button
        onClick={fetchData}
        style={{
          padding: "8px 16px",
          marginLeft: 10,
          cursor: "pointer",
          border: "1px solid #333",
          borderRadius: "4px",
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      <pre
        style={{
          marginTop: 20,
          whiteSpace: "pre-wrap",
          fontSize: 15,
          lineHeight: 1.5,
        }}
      >
        {result}
      </pre>
    </div>
  );
}
