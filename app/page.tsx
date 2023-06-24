"use client"

import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Page() {
  const [receipts, setReceipts] = useState<Array<Receipt>>([]); // Define the type of receipts

  const [amount, setAmount] = useState('');
  const [isUploadDocument, setIsUploadDocument] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [documentFile, setDocumentFile] = useState('');

  const handleIssueReceipt = () => {
    if (amount) {
      const timestamp = new Date().toISOString();
      const transactionId = generateTransactionId();
      const vatValue = calculateVAT(amount);
      const gasFee = calculateGasFee(amount);

      const receipt: Receipt = {
        amount: `PHP ${amount}`,
        timestamp,
        transactionId,
        isUploadDocument,
        documentType,
        documentFile,
        vatValue,
        gasFee,
      };

      setReceipts([...receipts, receipt]);

      setAmount('');
      setIsUploadDocument(false);
      setDocumentType('');
      setDocumentFile('');
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
    // Generate a random website URL for metadata
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let metadataLink = '';
    for (let i = 0; i < 10; i++) {
      metadataLink += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `https://example.com/${metadataLink}`;
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const fileType = file ? file.type.split('/')[1] : '';
    const reader = new FileReader();

    reader.onload = () => {
      const documentData = reader.result;
      setDocumentFile(documentData);
      setDocumentType(fileType);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
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

  const shortenDocumentHash = (hash) => {
    if (hash) {
      const shortenedHash = `${hash.slice(0, 4)}...${hash.slice(-4)}`;
      return shortenedHash;
    }
    return '';
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

        <div className={styles.optionContainer}>
          <div className={styles.issueReceipt}>
            <label>
              <input
                type="radio"
                value="receipt"
                checked={!isUploadDocument}
                onChange={() => setIsUploadDocument(false)}
              />
              Issue Receipt
            </label>
          </div>

          <div className={styles.uploadDocument}>
            <label>
              <input
                type="radio"
                value="document"
                checked={isUploadDocument}
                onChange={() => setIsUploadDocument(true)}
              />
              Issue Upload Digital Document
            </label>
          </div>
        </div>

        {isUploadDocument && (
          <div className={styles.documentContainer}>
            <div className={styles.selectDocument}>
              <label>Select Document:</label>
              <input type="file" accept=".pdf,.png" onChange={handleDocumentUpload} />
            </div>
          </div>
        )}

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
                  <th>Document Type</th>
                  <th>Document Hash</th>
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
                    <td>{receipt.documentType}</td>
                    <td>{shortenDocumentHash(receipt.documentFile)}</td>
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
  isUploadDocument: boolean;
  documentType: string;
  documentFile: string;
  vatValue: string;
  gasFee: string;
}