import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";

function Charts() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <div
      className="page--charts"
      onClick={() => {
        console.log(isLoggedIn.data);
      }}
    >
      <h1>Charts</h1>
      <h4>Viewing your data</h4>
      {isLoggedIn.auth ? (
        <div>
          <h1>Profile Data</h1>
          <p>{isLoggedIn.data.first_name}</p>
          <p>{isLoggedIn.data.last_name}</p>
          <p>{isLoggedIn.data.email}</p>
          <p>{isLoggedIn.data.spotify_id}</p>
          <a href="http://localhost:8080/auth/logout">
            <button>Log Out</button>
          </a>
        </div>
      ) : (
        <>
          <p>
            <strong>This page requires authentication.</strong>
          </p>
          <a href="http://localhost:8080/auth/spotify">
            <button>Login</button>
          </a>
        </>
      )}
      <section>
        <p>Selectors</p>
        <div>
          <button>Last 4 Weeks</button>
          <button>6 Months</button>
          <button>All time</button>
        </div>
      </section>
      <section>
        <h2>Top Artists</h2>
        <div>
          <article>
            <h4>Anderson .Paak</h4>
          </article>
          <article>
            <h4>Anderson .Paak</h4>
          </article>
          <article>
            <h4>Anderson .Paak</h4>
          </article>
          <article>
            <h4>Anderson .Paak</h4>
          </article>
          <article>
            <h4>Anderson .Paak</h4>
          </article>
        </div>
        <div>
          <p>charts go here</p>
        </div>
      </section>
    </div>
  );
}

export default Charts;
