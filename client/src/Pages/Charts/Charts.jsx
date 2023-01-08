import React from "react";

function Charts() {
  return (
    <div className="page--charts">
      <h1>Charts</h1>
      <h4>Viewing your data</h4>
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
