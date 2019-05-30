import React from 'react';

const ClearCookiesHelper = () => (
  <>
    <h3 className="redirect-container-subtitle">Learn how to clear cookies by selecting your browser below:</h3>
    <section className="redirect-flex">
      <a
        href="https://support.google.com/accounts/answer/32050?co=GENIE.Platform%3DDesktop&hl=en"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="redirect-icon chrome"></div>
        <h6 className="redirect-title">Chrome</h6>
      </a>
      <a
        href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox"
        rel="noopener noreferrer"
        target="_blank"
      >
         <div className="redirect-icon firefox"></div>
         <h6 className="redirect-title">Firefox</h6>
      </a>
      <a
        href="https://support.microsoft.com/en-gb/help/4027947/windows-delete-cookies"
        rel="noopener noreferrer"
        target="_blank"
      >
         <div className="redirect-icon edge"></div>
         <h6 className="redirect-title">Edge</h6>
      </a>
      <a
        href="https://support.apple.com/en-gb/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
        rel="noopener noreferrer"
        target="_blank"
        // className="redirect-link"
      >
         <div className="redirect-icon safari"></div>
         <h6 className="redirect-title">Safari</h6>                     
      </a>
    </section>
  </>
);

export default ClearCookiesHelper;