// @ts-nocheck


const Page3 = () => {
  const styles = {
    container: {
      width: "100%", // Ensure full width is used
      height: "280mm", // A4 size height
      margin: "5mm", // Reduced margin to avoid overflow
      padding: "5mm", // Reduced padding to fit content within the page
      border: "1px solid black",
      boxSizing: "border-box", // Include padding and border in width/height calculation
      display: "flex",
      flexDirection: "column",
    },
    header: {
      marginBottom: "10mm",
    },
    headerTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "1mm", // Space below header title
    },
    section: {
      marginBottom: "4mm", // Margin for each section
    },
    table: {
      width: "100%", // Table spans full width
      borderCollapse: "collapse",
      tableLayout: "fixed", // Fixed table layout
      marginBottom: "10mm", // Margin below table
    },
    tableHeader: {
      backgroundColor: "#e3f2fd",
    },
    tableCell: {
      border: "1px solid #dcdcdc",
      padding: "4mm", // Reduced padding to prevent overflow
      fontSize: "12px",
      textAlign: "left",
      wordBreak: "break-word", // Ensure long words break appropriately
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
      marginLeft: "15px", // Indentation for list items
      marginBottom: "6mm", // Space below the list
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Summary of Capital Gains</h1>
      </div>

      <p style={styles.boldText}>Capital Gains</p>
      <p style={styles.text}>
        Summary of profit and loss from crypto transfers during the year 2023-24. This section includes the income from
        trades done in the Spot, P2P, and Margin markets.
      </p>

      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>Capital Gains</th>
            <th style={styles.tableCell}></th>
          </tr>
        </thead>
        <tbody>
          {[
            {
              label: "Number of Transfers",
              value: "4",
              description: "(Total number of capital gains applicable crypto transfers during the year)",
            },
            {
              label: "Sale Consideration",
              value: "₹39,969.35",
              description:
                "(Total sale consideration received during the year from transfer of capital gains applicable crypto assets)",
            },
            {
              label: "Cost of Acquisition",
              value: "₹34,984",
              description: "(Total cost incurred to purchase these crypto assets)",
            },
            {
              label: "Taxable Capital Gains before losses and expenses",
              value: "₹4,985.35",
              description:
                "(As per the tax law in India, only crypto profits are taxed without allowing any deduction or set-off for losses and expenses)",
            },
            {
              label: "Losses",
              value: "₹0",
              description:
                "(Gross loss from all capital gains applicable crypto transfers during the year - This is a loss which cannot be off-set in the tax return)",
            },
          ].map((row, index) => (
            <tr key={index} style={styles.tableRow}>
              <td style={styles.tableCell}>
                <span style={styles.boldText}>{row.label}</span>
                <p style={styles.descriptionText}>{row.description}</p>
              </td>
              <td style={styles.tableCell}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={styles.boldText}>TDS deducted by exchanges</p>
      <p style={styles.text}>
        Total amount of TDS deducted by various exchanges in India and amount liable to TDS but whose details were not
        found.
      </p>

      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>Source name</th>
            <th style={styles.tableCell}>Custom name</th>
            <th style={styles.tableCell}>TDS Deducted</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.tableCell}>taxate</td>
            <td style={styles.tableCell}>Custom File-1</td>
            <td style={styles.tableCell}>₹11.13</td>
          </tr>
        </tbody>
      </table>

      <p style={styles.text}>Sale value for which TDS details were not found</p>
      <p style={styles.descriptionText}>No records available.</p>

      <p style={styles.boldText}>Self Filing Tips</p>
      <ul style={styles.list}>
        <li style={styles.text}>No set-off of any loss is allowed (Even within the same coin/pair).</li>
        <li style={styles.text}>Tax on capital gains will be at 30% plus surcharge and 4% cess.</li>
        <li style={styles.text}>If there is a loss, it cannot be carried forward to future years.</li>
        <li style={styles.text}>TDS can be claimed in the Income Tax Return.</li>
        <li style={styles.text}>
          Capital Gains from VDAs are to be disclosed in Schedule VDA of Income Tax Return.
        </li>
      </ul>
    </div>
  );
};

export default Page3;
