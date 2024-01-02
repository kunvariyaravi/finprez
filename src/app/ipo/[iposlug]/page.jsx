// "use client"

import Menu from "@/components/Menu/Menu";
import styles from "./singleipo.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";

const getData = async (iposlug) => {
  const res = await fetch(`https://www.finprez.com/api/ipopost/${iposlug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-GB",
    options
  );
  return formattedDate;
};

const ipoPage = async ({ params }) => {
  const { iposlug } = params;

  const data = await getData(iposlug);

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.post}>
        <h1>{data?.title}</h1>
        <div>
          <p className={styles.responsiveParagraph}>
            {data.title} bidding starts from {formatDate(data.opendate)} and
            ends on {formatDate(data.closedate)}. The allotment for the{" "}
            {data.title} is expected to be finalized on{" "}
            {formatDate(data.allotmentdate)}. {data.title} will list on{" "}
            {data.listingat} with tentative listing date fixed as{" "}
            {formatDate(data.listingdate)}. {data.title} price band is set at{" "}
            {data.price} per share. The minimum lot size for an application is{" "}
            {data.lot} Shares. The minimum amount of investment required by
            retail investors is ₹{data.rminamount}.
          </p>
          <h2 className={styles.responsiveHeading}>About {data.company} :-</h2>
          <div className={styles.responsiveParagraph}>{data.description}</div>
          <h2 className={styles.responsiveHeading}>{data.title} Details :-</h2>
          <div className={styles.tableContainer}>
            <table className={`${styles.table} ${styles.responsiveTable}`}>
              <tbody>
                <tr>
                  <td className={styles.tableCell}>Price:-</td>
                  <td className={styles.tableCell}>{data.price}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Lot Size:-</td>
                  <td className={styles.tableCell}>{data.lot}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Listing At:-</td>
                  <td className={styles.tableCell}>{data.listingat}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Total issue of Shares:-</td>
                  <td className={styles.tableCell}>{data.totalissueshares}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Total issue Size:-</td>
                  <td className={styles.tableCell}>{data.totalissuesize}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Fresh issue of Shares:-</td>
                  <td className={styles.tableCell}>{data.freshissueshares}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Fresh issue Size:-</td>
                  <td className={styles.tableCell}>{data.freshissuesize}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>
                    Offer for Sale issue of Shares:-
                  </td>
                  <td className={styles.tableCell}>{data.ofsissueshares}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>
                    Offer for Sale issue Size:-
                  </td>
                  <td className={styles.tableCell}>{data.ofsissuesize}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Face Value:-</td>
                  <td className={styles.tableCell}>
                    ₹{data.facevalue} per Equity Share
                  </td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Retail Quota:-</td>
                  <td className={styles.tableCell}>{data.retailquota}%</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>QIB Quota:-</td>
                  <td className={styles.tableCell}>{data.qibquota}%</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>NII Quota:-</td>
                  <td className={styles.tableCell}>{data.niiquota}%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 className={styles.responsiveHeading}>Important Dates:-</h2>
          <div className={styles.tableContainer}>
            <table className={`${styles.table} ${styles.responsiveTable}`}>
              <tbody>
                <tr>
                  <td className={styles.tableCell}>Open Date:-</td>
                  <td className={styles.tableCell}>
                    {formatDate(data.opendate)}
                  </td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Close Date:-</td>
                  <td className={styles.tableCell}>
                    {formatDate(data.closedate)}
                  </td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Allotment Date:-</td>
                  <td className={styles.tableCell}>
                    {formatDate(data.allotmentdate)}
                  </td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Listing Date:-</td>
                  <td className={styles.tableCell}>
                    {formatDate(data.listingdate)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 className={styles.responsiveHeading}>Financial Information :-</h2>
          <p className={styles.responsiveParagraph}>
            Amount in ₹ {data.amountin}
          </p>
          <div className={styles.tableContainer}>
            <table className={`${styles.table} ${styles.responsiveTable}`}>
              <thead>
                <tr>
                  <th className={styles.tableCell}>Period Ended</th>
                  <th className={styles.tableCell}>{data.t1}</th>
                  <th className={styles.tableCell}>{data.t2}</th>
                  <th className={styles.tableCell}>{data.t3}</th>
                  <th className={styles.tableCell}>{data.t4}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tableCell}>Assets</td>
                  <td className={styles.tableCell}>{data.t1assets}</td>
                  <td className={styles.tableCell}>{data.t2assets}</td>
                  <td className={styles.tableCell}>{data.t3assets}</td>
                  <td className={styles.tableCell}>{data.t4assets}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Revenue</td>
                  <td className={styles.tableCell}>{data.t1revenue}</td>
                  <td className={styles.tableCell}>{data.t2revenue}</td>
                  <td className={styles.tableCell}>{data.t3revenue}</td>
                  <td className={styles.tableCell}>{data.t4revenue}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Profit After Tax</td>
                  <td className={styles.tableCell}>{data.t1pat}</td>
                  <td className={styles.tableCell}>{data.t2pat}</td>
                  <td className={styles.tableCell}>{data.t3pat}</td>
                  <td className={styles.tableCell}>{data.t4pat}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Net Worth</td>
                  <td className={styles.tableCell}>{data.t1nw}</td>
                  <td className={styles.tableCell}>{data.t2nw}</td>
                  <td className={styles.tableCell}>{data.t3nw}</td>
                  <td className={styles.tableCell}>{data.t4nw}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Reserves and Surplus</td>
                  <td className={styles.tableCell}>{data.t1ressur}</td>
                  <td className={styles.tableCell}>{data.t2ressur}</td>
                  <td className={styles.tableCell}>{data.t3ressur}</td>
                  <td className={styles.tableCell}>{data.t4ressur}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Total Borrowing</td>
                  <td className={styles.tableCell}>{data.t1borrowing}</td>
                  <td className={styles.tableCell}>{data.t2borrowing}</td>
                  <td className={styles.tableCell}>{data.t3borrowing}</td>
                  <td className={styles.tableCell}>{data.t4borrowing}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 className={styles.responsiveHeading}>
            {data.title} Lot Information :-
          </h2>
          <div className={styles.tableContainer}>
            <table className={`${styles.table} ${styles.responsiveTable}`}>
              <thead>
                <tr>
                  <th className={styles.tableCell}>Application Type</th>
                  <th className={styles.tableCell}>Lots</th>
                  <th className={styles.tableCell}>Shares</th>
                  <th className={styles.tableCell}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tableCell}>Retail (Minimum)</td>
                  <td className={styles.tableCell}>{data.rminlot}</td>
                  <td className={styles.tableCell}>{data.rminshares}</td>
                  <td className={styles.tableCell}>{data.rminamount}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Retail (Maximum)</td>
                  <td className={styles.tableCell}>{data.rmaxlot}</td>
                  <td className={styles.tableCell}>{data.rmaxshares}</td>
                  <td className={styles.tableCell}>{data.rmaxamount}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>S-HNI (Minimum)</td>
                  <td className={styles.tableCell}>{data.sminlot}</td>
                  <td className={styles.tableCell}>{data.sminshares}</td>
                  <td className={styles.tableCell}>{data.sminamount}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>S-HNI (Maximum)</td>
                  <td className={styles.tableCell}>{data.smaxlot}</td>
                  <td className={styles.tableCell}>{data.smaxshares}</td>
                  <td className={styles.tableCell}>{data.smaxamount}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>B-HNI (Minimum)</td>
                  <td className={styles.tableCell}>{data.bminlot}</td>
                  <td className={styles.tableCell}>{data.bminshares}</td>
                  <td className={styles.tableCell}>{data.bminamount}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 className={styles.responsiveHeading}>
            Key Performance Indicator :-
          </h2>
          <div className={styles.tableContainer}>
            <table className={`${styles.table} ${styles.responsiveTable}`}>
              <tbody>
                <tr>
                  <td className={styles.tableCell}>P/E (x):-</td>
                  <td className={styles.tableCell}>{data.pe}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Market Cap (₹ Cr.):-</td>
                  <td className={styles.tableCell}>{data.mcap}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>ROE:-</td>
                  <td className={styles.tableCell}>{data.roe}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>ROCE:-</td>
                  <td className={styles.tableCell}>{data.roce}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Debt/Equity:-</td>
                  <td className={styles.tableCell}>{data.debttoequity}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>EPS (Rs):-</td>
                  <td className={styles.tableCell}>{data.eps}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>RoNW:-</td>
                  <td className={styles.tableCell}>{data.ronw}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 className={styles.responsiveHeading}>
            {data.title} Subscription Status :-
          </h2>
          <div className={styles.tableContainer}>
            <table className={`${styles.table} ${styles.responsiveTable}`}>
              <thead>
                <tr>
                  <th className={styles.tableCell}>Day</th>
                  <th className={styles.tableCell}>Date</th>
                  <th className={styles.tableCell}>QIB</th>
                  <th className={styles.tableCell}>NII</th>
                  <th className={styles.tableCell}>Retail</th>
                  <th className={styles.tableCell}>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tableCell}>Day 1</td>
                  <td className={styles.tableCell}>{formatDate(data.subdate1)}</td>
                  <td className={styles.tableCell}>{data.subqib1}</td>
                  <td className={styles.tableCell}>{data.subnii1}</td>
                  <td className={styles.tableCell}>{data.subretail1}</td>
                  <td className={styles.tableCell}>{data.subtotal1}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Day 2</td>
                  <td className={styles.tableCell}>{formatDate(data.subdate2)}</td>
                  <td className={styles.tableCell}>{data.subqib2}</td>
                  <td className={styles.tableCell}>{data.subnii2}</td>
                  <td className={styles.tableCell}>{data.subretail2}</td>
                  <td className={styles.tableCell}>{data.subtotal2}</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>Day 3</td>
                  <td className={styles.tableCell}>{formatDate(data.subdate3)}</td>
                  <td className={styles.tableCell}>{data.subqib3}</td>
                  <td className={styles.tableCell}>{data.subnii3}</td>
                  <td className={styles.tableCell}>{data.subretail3}</td>
                  <td className={styles.tableCell}>{data.subtotal3}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 className={styles.responsiveHeading}>IPO Prospectus :-</h2>
          <div className={styles.tableContainer}>
            <table className={`${styles.table} ${styles.responsiveTable}`}>
              <tbody>
                <tr>
                  <td className={styles.tableCell}>{data.title} DRHP:-</td>
                  <td className={styles.tableCell}>Click Here</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>{data.title} RHP:-</td>
                  <td className={styles.tableCell}>Click Here</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 className={styles.responsiveHeading}>
            {data.company} Contact Details :-
          </h2>
          <p className={styles.responsiveParagraph}>
            Address:- {data.contactaddress}
          </p>
          <p className={styles.responsiveParagraph}>
            Phone:- {data.contactphone}
          </p>
          <p className={styles.responsiveParagraph}>
            E-mail:- {data.contactemail}
          </p>
          <p className={styles.responsiveParagraph}>
            Website:- {data.contactwebsite}
          </p>
          <h2>IPO Registrar :-</h2>
          <p className={styles.responsiveParagraph}>
            Address:- {data.registraraddress}
          </p>
          <p className={styles.responsiveParagraph}>
            Phone:- {data.registrarphone}
          </p>
          <p className={styles.responsiveParagraph}>
            E-mail:- {data.registraremail}
          </p>
          <p className={styles.responsiveParagraph}>
            Website:- {data.registrarwebsite}
          </p>
          <h2 className={styles.responsiveParagraph}>{data.company} GMP :-</h2>
          <div>
            <Comments postSlug={iposlug} />
          </div>
        </div>
        </div>
        {/* <Menu /> */}
      </div>
    </div>
  );
};

export default ipoPage;
