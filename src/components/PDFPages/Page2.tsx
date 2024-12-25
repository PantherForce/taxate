
// @ts-nocheck


const Page2 = () => {
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
      marginBottom: "10mm",
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Tax Settings and Customizations</h1>
      </div>

      <div style={styles.section}>
        <p style={styles.boldText}>Country</p>
        <p style={styles.text}>INDIA</p>

        <p style={styles.boldText}>Currency</p>
        <p style={styles.text}>INR</p>
      </div>

      <h2 style={{ ...styles.boldText, fontSize: "20px", marginBottom: "10mm" }}>
        Transaction Preferences
      </h2>

      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>Tax Settings</th>
            <th style={styles.tableCell}>Default</th>
            <th style={styles.tableCell}>Your Preference</th>
          </tr>
        </thead>
        <tbody>
          {[
            {
              label: "Calculation Method",
              defaultValue: "First-in First-out (FIFO)",
              userValue: "First-in First-out (FIFO)",
            },
            {
              label: "Treat Airdrops as Income",
              defaultValue: "Yes",
              userValue: "Yes",
            },
            {
              label: "Treat Other Gains as Capital Gains",
              defaultValue: "No",
              userValue: "No",
            },
            {
              label: "Treat Crypto to Crypto Trades as Taxable",
              defaultValue: "Yes",
              userValue: "Yes",
            },
          ].map((row, index) => (
            <tr key={index} style={styles.tableRow}>
              <td style={styles.tableCell}>{row.label}</td>
              <td style={styles.tableCell}>{row.defaultValue}</td>
              <td style={styles.tableCell}>{row.userValue}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={styles.descriptionText}>
        <strong>Changed from default:</strong> This label indicates settings that
        have been customized from the default recommendations based on your tax
        residence. By changing these settings, your tax calculation may be affected.
        Please review the customized settings carefully to ensure that the tax
        calculations are accurate.
      </p>
    </div>
  );
};

export default Page2;
