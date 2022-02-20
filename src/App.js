import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const [stats, setStats] = useState({});
  const { pathname } = useLocation();
  const collectionName = pathname.split("/")[1];
  const isShort = pathname.split("/")[2];

  useEffect(() => {
    fetch(`https://api.opensea.io/api/v1/collection/${collectionName}/stats`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setStats(data.stats);
        // console.log(data.stats);
      })
      .catch(function () {
        console.log("Err");
      });
  }, [collectionName]);

  const shortList = [
    "total_volume",
    "total_sales",
    "total_supply",
    "floor_price",
    "num_owners",
    "average_price",
  ];

  return (
    <>
      {Object.keys(stats).map(
        (o) =>
          (isShort && !shortList.includes(o)) || (
            <div
              key={o}
              style={{
                width: "100%",
                textAlign: "center",
                margin: "0.5em",
                position: "relative",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  width: "50%",
                  textAlign: "right",
                }}
              >
                {o
                  .split("_")
                  .map((o) => o.charAt(0).toUpperCase() + o.slice(1))
                  .join(" ")}
                :{" "}
              </div>
              <div
                style={{
                  display: "inline-block",
                  width: "50%",
                  textAlign: "left",
                }}
              >
                <span style={{ marginLeft: "10px" }}>
                  {stats[o].toFixed(4)}
                </span>
              </div>
            </div>
          )
      )}
    </>
  );
}

export default App;
