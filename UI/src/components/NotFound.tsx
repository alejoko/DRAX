import React from "react";
import { Link } from "react-router-dom";
import { useIntl } from 'react-intl';

export function NotFound() {
  const intl = useIntl();

  return (
    <>
      <div id="button-container">
        <Link to="/">
          <button id="back-button">Home</button>
        </Link>
      </div>
      <br />
      <div >
        <h1>Sorry</h1>
        <span role="img" aria-label="sad emoji">
          😔
        </span>
        <br />
        {intl.formatMessage({id: 'generic-error-page.404.message'})} 
      </div>
    </>
  );
}