"use client"

import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Page() {
  const [receipts, setReceipts] = useState<Array<Receipt>>([]); // Define the type of receipts

  const [amount, setAmount] = useState('');

  const handleIssueReceipt = () => {
    if (amount) {
      const timestamp = new Date().toISOString();
      const transactionId = generateTransactionId();
      const vatValue = calculateVAT(amount);
      const gasFee = calculateGasFee(amount);
      const metadataLink = generateMetadataLink(); // Generate random metadata link

      const receipt: Receipt = {
        amount: `PHP ${amount}`,
        timestamp,
        transactionId,
        vatValue,
        gasFee,
        metadataLink, // Include metadata link
      };

      setReceipts([...receipts, receipt]);

      setAmount('');
    }
  };

  const generateTransactionId = () => {
    // Generate a random hash transaction ID
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let transactionId = '';
    for (let i = 0; i < 10; i++) {
      transactionId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return transactionId;
  };

  const generateMetadataLink = () => {
    // Generate a random Etherscan transaction URL for metadata
    const transactionNumber = Math.floor(Math.random() * 1000000) + 1;
    return `https://etherscan.io/block/${transactionNumber}`;
  };

  const calculateVAT = (amount) => {
    // Calculate VAT value (12% of the transaction amount)
    const vatValue = amount * 0.12;
    return vatValue.toFixed(2);
  };

  const calculateGasFee = (amount) => {
    // Calculate gas fee (0.001% cut from each transaction)
    const gasFee = amount * 0.00001;
    return gasFee.toFixed(2);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Receipt Issuer</h1>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.amount}>
          <label>Amount (PHP):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.issueButton} onClick={handleIssueReceipt}>Issue Receipt</button>
        </div>
      </div>

      {receipts.length > 0 && (
        <div className={styles.tableContainer}>
          <div className={styles.issuedReceipts}>
            <h2>Issued Receipts</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Timestamp</th>
                  <th>Transaction ID</th>
                  <th>VAT Value</th>
                  <th>Gas Fee</th>
                  <th>Metadata Link</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((receipt, index) => (
                  <tr key={index}>
                    <td>{receipt.amount}</td>
                    <td>{receipt.timestamp}</td>
                    <td>{receipt.transactionId}</td>
                    <td>{receipt.vatValue}</td>
                    <td>{receipt.gasFee}</td>
                    <td>
                      <a href={receipt.metadataLink} target="_blank" rel="noopener noreferrer">
                        Metadata
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

interface Receipt {
  amount: string;
  timestamp: string;
  transactionId: string;
  vatValue: string;
  gasFee: string;
  metadataLink: string;
}
