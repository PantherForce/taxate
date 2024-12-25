// @ts-nocheck

const Page4 = () => {
  const styles = {
    container: {
      width: "100%", 
      height: "280mm", 
      margin: "5mm", 
      padding: "5mm", 
      border: "1px solid black",
      boxSizing: "border-box", 
      display: "flex",
      flexDirection: "column",
    },
    header: {
      marginBottom: "6mm",
    },
    headerTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "5mm", 
    },
    section: {
      marginBottom: "10mm", 
    },
    table: {
      width: "100%", 
      borderCollapse: "collapse",
      tableLayout: "fixed", 
      marginBottom: "10mm", 
    },
    tableHeader: {
      backgroundColor: "#e3f2fd",
    },
    tableCell: {
      border: "1px solid #dcdcdc",
      padding: "4mm", 
      fontSize: "12px",
      textAlign: "left",
      wordBreak: "break-word", 
    },
    tableRow: {
      textAlign: "left",
    },
    text: {
      fontSize: "12px",
    },
    boldText: {
      fontWeight: "bold",
    },
    descriptionText: {
      color: "#4b4b4b",
      fontSize: "12px",
    },
    list: {
      marginLeft: "15px", 
      marginBottom: "6mm", 
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Summary of Income from Crypto Derivatives</h1>
      </div>

      <p style={styles.text}>
        Summary of Realised PnL, Interest Expenses, Interest Income etc. on Crypto Futures and Options.
      </p>

      <h2 style={styles.boldText}>Crypto Futures</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>Description</th>
            <th style={styles.tableCell}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {[
            {
              label: "Total Realised Futures Profit during the year",
              value: "₹13,079.5",
              description: "(Cumulative profits from all futures trades during the year)",
            },
            {
              label: "Total Realised Futures Losses during the year",
              value: "₹862.02",
              description: "(Cumulative losses from all futures trades during the year)",
            },
            {
              label: "Net Gains from Futures",
              value: "₹12,217.48",
              description: "",
            },
            {
              label: "Total Futures Turnover during the year",
              value: "₹13,941.52",
              description: "(Futures turnover computed for Business Income as per ICAI Guidance Note)",
            },
          ].map((row, index) => (
            <tr key={index} style={styles.tableRow}>
              <td style={styles.tableCell}>
                <span style={styles.boldText}>{row.label}</span>
                {row.description && <p style={styles.descriptionText}>{row.description}</p>}
              </td>
              <td style={styles.tableCell}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={styles.boldText}>Crypto Options</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>Description</th>
            <th style={styles.tableCell}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {[
            {
              label: "Total Realised Options Profit during the year",
              value: "₹8,712",
              description: "(Cumulative profits from all options trades during the year)",
            },
            {
              label: "Total Realised Options Losses during the year",
              value: "₹8,629.95",
              description: "(Cumulative losses from all options trades during the year)",
            },
            {
              label: "Net Gains from Options",
              value: "₹82.05",
              description: "",
            },
            {
              label: "Total Options Turnover during the year",
              value: "₹17,341.95",
              description: "(Options turnover computed for Business Income as per ICAI Guidance Note)",
            },
          ].map((row, index) => (
            <tr key={index} style={styles.tableRow}>
              <td style={styles.tableCell}>
                <span style={styles.boldText}>{row.label}</span>
                {row.description && <p style={styles.descriptionText}>{row.description}</p>}
              </td>
              <td style={styles.tableCell}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={styles.boldText}>Self Filing Tips</h2>
      <ul style={styles.list}>
        <li style={styles.text}>
          Tax treatment of Crypto Derivatives Income is different from that of spot, P2P, and margin market
          transactions. It can likely be disclosed as Income from PGBP (Business Income).
        </li>
        <li style={styles.text}>
          Currently, there is no guidance on treatment of Crypto derivatives. However, Stock and Commodity
          derivatives are specifically considered as Business Income and are eligible for deduction for expenses,
          set-off of, and carry-forward of losses as per Income Tax Act, 1961. A similar view may be taken with
          respect to crypto derivatives, on advice by a qualified Tax expert.
        </li>
        <li style={styles.text}>Tax-payer may be required to maintain books of accounts when declaring Income under PGBP (Business Income).</li>
        <li style={styles.text}>Income tax audit may be required if the Turnover exceeds Income Tax audit threshold.</li>
        <li style={styles.text}>
          Please consult your tax advisor before filing Income under PGBP (Business Income).
        </li>
        <li style={styles.text}>
          As Crypto derivatives do not involve transfer of crypto, on advice from a qualified tax expert, a
          position may be adopted that crypto derivatives are not required to be disclosed in Schedule VDA in the
          income tax return.
        </li>
      </ul>
    </div>
  );
};

export default Page4;
