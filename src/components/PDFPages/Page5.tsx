
// @ts-nocheck

const Page5 = () => {
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
      marginBottom: "10mm", 
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Summary of Other Incomes</h1>
      </div>

      <p style={styles.text}>
        Summary of Income from Airdrops, Rewards, Staking Income and receipt of any other Income.
      </p>

      <h2 style={styles.boldText}>Other Incomes</h2>
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
              label: "Airdrops Income",
              value: "₹11,192.56",
            },
            {
              label: "Rewards received",
              value: "₹1,319.54",
            },
            {
              label: "Staking Income",
              value: "₹886.65",
            },
            {
              label: "Salary Income",
              value: "₹16,326.45",
            },
            {
              label: "Consultancy Income",
              value: "₹87,515",
            },
            {
              label: "Mining Income",
              value: "₹25,414.1",
            },
            {
              label: "Profit on Borrow",
              value: "₹0",
            },
            {
              label: "Funding interest",
              value: "₹8.77",
            },
            {
              label: "Total",
              value: "₹1,42,663.07",
              description: "(Total of all incomes mentioned above)",
            },
          ].map((row, index) => (
            <tr key={index} style={styles.tableRow}>
              <td style={styles.tableCell}>
                <span style={styles.boldText}>{row.label}</span>
              </td>
              <td style={styles.tableCell}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={styles.boldText}>
        Summary of Other Expenses, Gifts, and Donations Given
      </h2>
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
              label: "Brokerage fee",
              value: "₹388.98",
            },
            {
              label: "Derivatives brokerage fee",
              value: "₹440.79",
            },
            {
              label: "Margin fee",
              value: "-",
            },
            {
              label: "Loss on borrow",
              value: "-",
            },
            {
              label: "Funding fee",
              value: "₹17.31",
            },
            {
              label: "Mining expense fee",
              value: "-",
            },
            {
              label: "Donation fee",
              value: "-",
            },
            {
              label: "Consultancy expense fee",
              value: "-",
            },
          ].map((row, index) => (
            <tr key={index} style={styles.tableRow}>
              <td style={styles.tableCell}>
                <span style={styles.boldText}>{row.label}</span>
              </td>
              <td style={styles.tableCell}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page5;
