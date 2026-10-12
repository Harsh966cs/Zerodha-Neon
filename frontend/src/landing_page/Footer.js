import React from "react";

const Footer = () => {
  return (
    <div className="container " style={{ justifyContent: "space-between" }}>
      <div className="container row">
        <div className="col-4">
          <img src="media/logo.svg" style={{ width: "16rem" }} />
          <br></br>
          <p style={{ fontSize: "12px" }}>
            <br></br>© 2010 - 2026, Zerodha Broking Ltd.<br></br>All rights
            reserved.
          </p>
          <nr></nr>
          <div>
            <span>
              <i className="fa fa-facebook-square" aria-hidden="true"></i>&nbsp;
            </span>
            <span>
              {" "}
              <i className="fa fa-instagram" aria-hidden="true"></i>&nbsp;{" "}
            </span>
            <span>
              {" "}
              <i className="fa fa-youtube-play" aria-hidden="true"></i>{" "}
            </span>
          </div>
          <br></br>
          <div>
            <span>
              <i className="fa fa-telegram" aria-hidden="true"></i>{" "}
            </span>
            <span>
              {" "}
              <i className="fa fa-whatsapp" aria-hidden="true"></i>
            </span>
          </div>
          <br></br>
          <div style={{display:"flex"}}>
            {" "}
            <img src="media/googlePlayBadge.svg" style={{ width: "5rem" }} />&nbsp;
            <img src="media/appstoreBadge.svg"  style={{width:"5rem",height:"1.5rem"}}/>
          </div>
        </div>
        <div className="col-2">
          <ul className="list-style" style={{ listStyleType: "none" }}>
            <li className="nav-head">Account</li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/open-account/"
              >
                Open demat account
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/open-account/minor/"
              >
                Minor demat account
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/open-account/nri/"
              >
                NRI demat account
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/open-account/huf/"
              >
                HUF demat account
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/commodities/"
              >
                Commodity
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/dematerialise/"
              >
                Dematerialisation
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/fund-transfer/"
              >
                Fund transfer
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/mtf/"
              >
                MTF
              </a>
            </li>
          </ul>
        </div>
        <div className="col-2">
          <ul className="list-style" style={{ listStyleType: "none" }}>
            <li className="nav-head">Support</li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/contact/"
              >
                Contact us
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://support.zerodha.com"
              >
                Support portal
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://support.zerodha.com/category/your-zerodha-account/your-profile/ticket-creation/articles/how-do-i-create-a-ticket-at-zerodha"
              >
                How to file a complaint?
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://support.zerodha.com/category/your-zerodha-account/your-profile/ticket-creation/articles/track-complaints-or-tickets"
              >
                Status of your complaints
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/marketintel/bulletin/"
              >
                Bulletin
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/marketintel/circulars/"
              >
                Circular
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/z-connect/"
              >
                Z-Connect blog
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/resources/"
              >
                Downloads
              </a>
            </li>
          </ul>
        </div>
        <div className="col-2">
          <ul className="list-style" style={{ listStyleType: "none" }}>
            <li className="nav-head">Company</li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/about/"
              >
                About
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/about/philosophy/"
              >
                Philosophy
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/media/"
              >
                Press &amp; media
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://careers.zerodha.com/"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/cares/"
              >
                Zerodha Cares (CSR)
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.tech/"
              >
                Zerodha.tech
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/open-source/"
              >
                Open source
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/refer/"
              >
                Referral program
              </a>
            </li>
          </ul>
        </div>
        <div className="col-2">
          <ul className="list-style" style={{ listStyleType: "none" }}>
            <li className="nav-head">Quick links</li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/ipo/"
              >
                Upcoming IPOs
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/charges/"
              >
                Brokerage charges
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/marketintel/holiday-calendar/"
              >
                Market holidays
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/markets/calendar/"
              >
                Economic calendar
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/calculators/"
              >
                Calculators
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/markets/stocks/"
              >
                Markets
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/markets/sector/"
              >
                Sectors
              </a>
            </li>
            <li>
              <a
                style={{ color: "#9b9b9b", textDecoration: "none" }}
                href="https://zerodha.com/market/giftnifty/"
              >
                Gift Nifty
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container">
        <p style={{ fontSize: "10.4px", color: "#716f6f" }}>
          Zerodha Broking Ltd.: Member of NSE, BSE, MCX & MSEI – SEBI
          Registration no.: INZ000031633 CDSL/NSDL: Depository services through
          Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019
          Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars
          Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru -
          560078, Karnataka, India. For any complaints pertaining to securities
          broking please write to complaints@zerodha.com, for DP related to
          dp@zerodha.com. Please ensure you carefully read the Risk Disclosure
          Document as prescribed by SEBI | ICF
        </p>
        <p style={{ fontSize: "10.4px", color: "#716f6f" }}>
          Procedure to file a complaint on SEBI SCORES: Register on SCORES
          portal. Mandatory details for filing complaints on SCORES: Name, PAN,
          Address, Mobile Number, E-mail ID. Benefits: Effective Communication,
          Speedy redressal of the grievances<br></br>
          <br></br>Smart Online Dispute Resolution | Grievances Redressal
          Mechanism<br></br>
          <br></br>
          Investments in securities market are subject to market risks; read all
          the related documents carefully before investing.
        </p>
        <p style={{ fontSize: "10.4px", color: "#716f6f" }}>
          Attention investors: 1) Stock brokers can accept securities as margins
          from clients only by way of pledge in the depository system w.e.f
          September 01, 2020. 2) Update your e-mail and phone number with your
          stock broker / depository participant and receive OTP directly from
          depository on your e-mail and/or mobile number to create pledge. 3)
          Check your securities / MF / bonds in the consolidated account
          statement issued by NSDL/CDSL every month.<br></br>
          <br></br>
          India's largest broker based on networth as per NSE. NSE broker
          factsheet
        </p>
        <br></br>
        <p style={{ fontSize: "10.4px", color: "#716f6f" }}>
          "Prevent unauthorised transactions in your account. Update your mobile
          numbers/email IDs with your stock brokers/depository participants.
          Receive information of your transactions directly from
          Exchange/Depositories on your mobile/email at the end of the day.
          Issued in the interest of investors. KYC is one time exercise while
          dealing in securities markets - once KYC is done through a SEBI
          registered intermediary (broker, DP, Mutual Fund etc.), you need not
          undergo the same process again when you approach another
          intermediary." Dear Investor, if you are subscribing to an IPO, there
          is no need to issue a cheque. Please write the Bank account number and
          sign the IPO application form to authorize your bank to make payment
          in case of allotment. In case of non allotment the funds will remain
          in your bank account. As a business we don't give stock tips, and have
          not authorized anyone to trade on behalf of others. If you find anyone
          claiming to be part of Zerodha and offering such services, please
          create a ticket here.<br></br>
          <br></br>
          *Customers availing insurance advisory services offered by Ditto
          (Tacterial Consulting Private Limited | IRDAI Registered Corporate
          Agent (Composite) License No CA0738) will not have access to the
          exchange investor grievance redressal forum, SEBI SCORES/ODR, or
          arbitration mechanism for such products. <br></br>
          <br></br>
          Fixed deposit products offered on this platform are third-party
          products (TPP) and are not Exchange traded products. These are offered
          through Blostem Fintech Private Limited. Zerodha Broking Limited (SEBI
          Registration No.: INZ000031633) is acting solely as a distributor for
          these products. Any disputes arising with respect to such distribution
          activity will not have access to SEBI SCORES/ODR, Exchange Investor
          Grievance Redressal Forum, or Arbitration mechanism. Fixed deposits
          are regulated by the Reserve Bank of India (RBI).
        </p>
      </div>
      <div className=" row">
        <ul
          style={{
            listStyleType: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            textDecoration: "none",
            marginBlockStart: "1rem",
            marginBlockEnd: "1rem",
            paddingInlineStart: "40px",
          }}
        >
          <li style={{ marginRight: "20px", display: "inline" }}>
            <a
              style={{ color: "#9b9b9b", textDecoration: "none" }}
              rel="nofollow"
              href="https://nseindia.com"
            >
              NSE
            </a>
          </li>
          <li style={{ marginRight: "20px", display: "inline" }}>
            <a
              style={{ color: "#9b9b9b", textDecoration: "none" }}
              rel="nofollow"
              href="https://www.bseindia.com/"
            >
              BSE
            </a>
          </li>
          <li style={{ marginRight: "20px", display: "inline" }}>
            <a
              style={{ color: "#9b9b9b", textDecoration: "none" }}
              rel="nofollow"
              href="https://www.mcxindia.com/"
            >
              MCX
            </a>
          </li>
          <li style={{ marginRight: "20px", display: "inline" }}>
            <a
              style={{ color: "#9b9b9b", textDecoration: "none" }}
              rel="nofollow"
              href="https://mseindia.com/"
            >
              MSEI
            </a>
          </li>
          <li style={{ marginRight: "20px", display: "inline" }}>
            <a
              style={{ color: "#9b9b9b", textDecoration: "none" }}
              href="https://zerodha.com/terms-and-conditions/"
            >
              Terms &amp; conditions
            </a>
          </li>
          <li style={{ marginRight: "20px", display: "inline" }}>
            <a
              style={{ color: "#9b9b9b", textDecoration: "none" }}
              href="https://zerodha.com/policies-and-procedures/"
            >
              Policies &amp; procedures
            </a>
          </li>
          <li style={{ marginRight: "20px", display: "inline" }}>
            <a
              style={{ color: "#9b9b9b", textDecoration: "none" }}
              href="https://zerodha.com/privacy-policy/"
            >
              Privacy policy
            </a>
          </li>
          <li style={{ marginRight: "20px", display: "inline" }}>
            <a
              style={{ color: "#9b9b9b", textDecoration: "none" }}
              href="https://zerodha.com/disclosure/"
            >
              Disclosure
            </a>
          </li>
          <li style={{ marginRight: "20px", display: "inline" }}>
            <a
              style={{ color: "#9b9b9b", textDecoration: "none" }}
              href="https://zerodha.com/investor-attention/"
            >
              For investor's attention
            </a>
          </li>
          <li style={{ marginRight: "20px", display: "inline" }}>
            <a
              style={{ color: "#9b9b9b", textDecoration: "none" }}
              href="https://zerodha.com/tos/investor-charter/"
            >
              Investor charter
            </a>
          </li>
          <li style={{ marginRight: "20px", display: "inline" }}>
            <a
              style={{ color: "#9b9b9b", textDecoration: "none" }}
              href="https://zerodha.com/sitemap/"
            >
              Sitemap
            </a>
          </li>
        </ul>
        
      </div>
    </div>
  );
};

export default Footer;
