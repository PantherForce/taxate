
// @ts-nocheck
const name = window.localStorage.getItem("name");



const Page1 = () => {
  const styles = {
    container: {
      width: "100%",       height: "580mm", 
      margin: "5mm", 
      padding: "5mm",
      border: "1px solid black", 
      boxSizing: "border-box",
    },
    header: {
      marginBottom: "15mm",
    },
    headerTitle: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    headerSubtitle: {
      fontSize: "10px",
      textAlign: "right",
    },
    section: {
      marginBottom: "15mm",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10mm",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "15mm",
    },
    tableHeader: {
      backgroundColor: "#f0f0f0",
    },
    tableCell: {
      border: "1px solid #dcdcdc",
      padding: "5mm",
      fontSize: "12px",
    },
    notes: {
      fontSize: "12px",
    },
    list: {
      listStyleType: "decimal",
      marginLeft: "10mm",
    },
    listItem: {
      marginBottom: "5mm",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Complete Tax Report</h1>
        <div style={styles.headerSubtitle}>
          <p>Report Generated On: 7-August-2024, 7:46:55 PM UTC</p>
          <p>Calculation Method: First-in First-out (FIFO)</p>
        </div>
      </div>

      <div style={styles.grid}>
        <div>
          <p>
            <span style={{ fontWeight: "bold" }}>Name:</span> {name}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Period:</span> Financial Year
            2024-2025
          </p>
        </div>
        <div>
          <p>
            <span style={{ fontWeight: "bold" }}>Currency:</span> INR
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Country:</span> INDIA
          </p>
        </div>
      </div>

      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10mm" }}>
        Contents of the report
      </h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>No.</th>
            <th style={styles.tableCell}>Description</th>
          </tr>
        </thead>
        <tbody>
          {[
            "Capital Gains Summary",
            "Summary of Income from Crypto Derivatives",
            "Other Income and Expense Summary",
            "Asset wise Profit and Loss for the year",
            "Schedule VDA Report",
            "Capital Gains Transactions",
            "Schedule VDA - Derivatives",
            "Crypto Derivatives Transactions",
            "Other Income Transactions",
            "Data Sources",
          ].map((item, index) => (
            <tr key={index}>
              <td style={styles.tableCell}>{index + 1}</td>
              <td style={styles.tableCell}>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.notes}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "5mm" }}>
          Notes and Disclaimers
        </h2>
        <ol style={styles.list}>
          <li style={styles.listItem}>All values and prices are in INR.</li>
          <li style={styles.listItem}>
            Calculations of profit and loss are as per First In First Out (FIFO)
            method of accounting.
          </li>
          <li style={styles.listItem}>
            Trading between cryptocurrencies is treated as a taxable event as per
            Income Tax Act, 1961.
          </li>
          <li style={styles.listItem}>
            Market prices are computed as per the Current Market Price at the time
            of disposal unless price is provided by the trading platform or it is
            manually overridden.
          </li>
          <li style={styles.listItem}>
            Computation of turnover for Futures Income is as per Income Tax Act read
            with Guidance Note on Tax Audit by the Institute of Chartered Accountants
            of India.
          </li>
          <li style={styles.listItem}>
            Treatment of Income or Loss on account of valuation of stock under
            section 37 of Income Tax Act, 1961 does not form part of this report.
          </li>
          <li style={styles.listItem}>
            Tax-payer may be required to maintain books of accounts under Section 44AA
            and get them audited under Section 44AB of Income Tax Act, 1961, if
            applicable.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Page1;
