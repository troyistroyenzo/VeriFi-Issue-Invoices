import { useState } from 'react';
import styles from '../styles/Home.module.css';


interface Receipt {
  amount: string;
  timestamp: string;
  transactionId: string;
  vatValue: string;
  gasFee: string;
  metadataLink: string;
  nameOfCompany: string;
  fullName: string;
  corporation: string;
  location: string;
  vatRegistrationId: string;
  min: string;
  sn: string;
  csr: string;
  items: string[];
  discount: string;
  amountDue: string;
  changeDue: string;
  netVatable: string;
  netVatExemptSale: string;
  zeroRatedSales: string;
  vat: string;
  supplierInfo: string;
}


const InvoiceIssuer = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [overallPrice, setOverallPrice] = useState(0);
  const [amount, setAmount] = useState('');
  const [lightboxReceipt, setLightboxReceipt] = useState<Receipt | null>(null);


  const handleIssueReceipt = () => {
    if (amount) {
      const timestamp = new Date().toISOString();
      const transactionId = generateTransactionId();
      const vatValue = calculateVAT(parseFloat(amount));
      const gasFee = calculateGasFee(parseFloat(amount));
      const metadataLink = generateMetadataLink();

      const receipt: Receipt = {
        amount: `PHP ${amount}`,
        timestamp,
        transactionId,
        vatValue,
        gasFee,
        metadataLink,
        nameOfCompany: generateRandomName(),
        fullName: generateRandomName(),
        corporation: generateRandomOption(['Corporation', 'Company']),
        location: generateRandomLocation(),
        vatRegistrationId: generateRandomNumber(10),
        min: generateRandomNumber(6),
        sn: generateRandomNumber(6),
        csr: generateRandomNumber(6),
        items: generateRandomItems(1, 3),
        discount: generateRandomDiscount(),
        amountDue: generateRandomAmount(),
        changeDue: generateRandomAmount(),
        netVatable: generateRandomAmount(),
        netVatExemptSale: generateRandomAmount(),
        zeroRatedSales: generateRandomAmount(),
        vat: generateRandomAmount(),
        supplierInfo: generateRandomSupplierInfo(),
      };

      setReceipts([...receipts, receipt]);

      setAmount('');
    }
  };

  const generateTransactionId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let transactionId = '';
    for (let i = 0; i < 10; i++) {
      transactionId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return transactionId;
  };

  const generateMetadataLink = () => {
    const transactionNumber = Math.floor(Math.random() * 1000000) + 1;
    return `https://etherscan.io/block/${transactionNumber}`;
  };

  const calculateVAT = (amount: number) => {
    const vatValue = amount * 0.12;
    return vatValue.toFixed(2);
  };

  const calculateGasFee = (amount: number) => {
    const gasFee = amount * 0.00001;
    return gasFee.toFixed(2);
  };

  const generateRandomName = () => {
    const names = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis'];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  };

  const generateRandomOption = (options: string[]) => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };

  const generateRandomLocation = () => {
    const locations = ['New York', 'London', 'Paris', 'Tokyo'];
    const randomIndex = Math.floor(Math.random() * locations.length);
    return locations[randomIndex];
  };

  const generateRandomNumber = (length: number) => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const generateRandomItems = (minCount: number, maxCount: number) => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
    const count = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
    const randomItems = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * items.length);
      randomItems.push(items[randomIndex]);
    }
    return randomItems;
  };

  const generateRandomDiscount = () => {
    const discount = Math.floor(Math.random() * 6) + 1;
    return `${discount}%`;
  };

  const generateRandomAmount = () => {
    const amount = (Math.random() * 10000).toFixed(2);
    return `PHP ${amount}`;
  };

  const generateRandomSupplierInfo = () => {
    const suppliers = [
      'Supplier A',
      'Supplier B',
      'Supplier C',
      'Supplier D',
      'Supplier E',
    ];
    const randomIndex = Math.floor(Math.random() * suppliers.length);
    return suppliers[randomIndex];
  };


  const openLightbox = (receipt: Receipt) => {
    setLightboxReceipt(receipt);
  };

  const closeLightbox = () => {
    setLightboxReceipt(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Invoice Minting</h1>
      </div>
      <div className={styles.formContainer}>
      
        <div className={styles.amount}>
          <label>Amount (PHP):</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.issueButton} onClick={handleIssueReceipt}>
            Issue Receipt
          </button>
        </div>
      </div>

      <div className={styles.header}>
        <h2>Issued Receipts</h2>
      </div>
      {receipts.length > 0 && (
      <div className={styles.tableContainer}>
        <div className={styles.issuedReceipts}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>More Details</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((receipt, index) => (
                <tr key={index}>
                  <td>{receipt.transactionId}</td>
                  <td>{receipt.timestamp}</td>
                  <td>{receipt.amount}</td>
                  <td>
                    <button onClick={() => openLightbox(receipt)}>View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}


      {lightboxReceipt && (
        <div className={styles.overlay}>
          <div className={styles.lightbox}>
            <div className={styles.closeButton} onClick={closeLightbox}>
              X
            </div>
            <div className={styles.content}>
              <h2>Receipt Details</h2>
              <div>
                <strong>Transaction ID:</strong> {lightboxReceipt.transactionId}
              </div>
              <div>
                <strong>Date:</strong> {lightboxReceipt.timestamp}
              </div>
              <div>
                <strong>Name of Company:</strong> {lightboxReceipt.nameOfCompany}
              </div>
              <div>
                <strong>Full Name:</strong> {lightboxReceipt.fullName}
              </div>
              <div>
                <strong>Corporation / Company:</strong> {lightboxReceipt.corporation}
              </div>
              <div>
                <strong>Location:</strong> {lightboxReceipt.location}
              </div>
              <div>
                <strong>VAT Registration ID:</strong> {lightboxReceipt.vatRegistrationId}
              </div>
              <div>
                <strong>MIN:</strong> {lightboxReceipt.min}
              </div>
              <div>
                <strong>S/N:</strong> {lightboxReceipt.sn}
              </div>
              <div>
                <strong>CSR:</strong> {lightboxReceipt.csr}
              </div>
              {lightboxReceipt.items && (
                <div>
                  <strong>List Of Item(s):</strong>
                  <ul>
                    {lightboxReceipt.items.map((items, index) => (
                      <li key={index}>{items}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <strong>Discounts:</strong> {lightboxReceipt.discount}
              </div>
              <div>
                <strong>Amount Due:</strong> {lightboxReceipt.amountDue}
              </div>
              <div>
                <strong>Change Due:</strong> {lightboxReceipt.changeDue}
              </div>
              <div>
                <strong>Net Vatable:</strong> {lightboxReceipt.netVatable}
              </div>
              <div>
                <strong>Net VAT Exempt Sale:</strong> {lightboxReceipt.netVatExemptSale}
              </div>
              <div>
                <strong>Zero Rated Sales:</strong> {lightboxReceipt.zeroRatedSales}
              </div>
              <div>
                <strong>VAT:</strong> {lightboxReceipt.vat}
              </div>
              <div>
                <strong>Supplier Info:</strong> {lightboxReceipt.supplierInfo}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceIssuer;
