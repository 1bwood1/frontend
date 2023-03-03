require("dotenv").config();
const fs = require("fs-extra");

// fetch('https://www.hpe.com')
//     .then((response) => response.text())
//     .then((body) => {
//         console.log(body);
//     });

// (async () => {
//   const res = await fetch("https://www.hpe.com");
//   console.log("RES:");
//   console.log("<------------------->");
//   console.log(res);
//   console.log("HEADERS:");
//   console.log("<------------------->");
//   console.log(res.headers);
//   console.log("BODY:");
//   console.log("<------------------->");
//   const body = await res.text();
//   console.log(body);
//   console.log("END BODY:");
//   console.log("<------------------->");
// })();

const iLOIp = process.env.ILO_IP;
console.log("iLO IP:", iLOIp);

try {
  (async () => {
    const res = await fetch(`https://${iLOIp}/redfish/v1`);
    console.log(res);
    console.log(res.headers);
    console.log("BODY:", res.body);
    console.log("<------------------->");
    const json = await res.json();
    console.log("JSON:");
    console.log("<------------------->");
    console.log(json);
    console.log("END JSON:");
    console.log("<------------------->");
  })();
} catch (e) {
  console.log(e.message.ExtendedInfo);
}

const data = { UserName: "Admin", Password: "Adminwtec" };
try {
  (async () => {
    const res = await fetch(
      `https://${iLOIp}/redfish/v1/SessionService/Sessions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log(res);
    console.log(res.headers);
    const xauth = res.headers.get("x-auth-token");
    console.log("x-auth-token:", xauth);
    console.log("BODY:", res.body);
    console.log("<------------------->");
    const json = await res.json();

    console.log(json);

    try {
      (async () => {
        const res = await fetch(`https://${iLOIp}/redfish/v1/Managers`, {
          headers: {
            "x-auth-token": xauth,
          },
        });
        console.log(res);
        console.log(res.headers);
        console.log("***** Here comes the Managers json *****");
        console.log("<------------------->");
        const json = await res.json();

        console.log(json);
      })();
    } catch (e) {
      console.log(e.message.ExtendedInfo);
    }
    try {
      (async () => {
        const res = await fetch(`https://${iLOIp}/redfish/v1/Managers/1`, {
          headers: {
            "x-auth-token": xauth,
          },
        });
        console.log(res);
        console.log(res.headers);
        console.log("Here comes the json");
        console.log("<------------------->");
        const json = await res.json();

        console.log(json);
      })();
    } catch (e) {
      console.log(e.message.ExtendedInfo);
    }
    try {
      (async () => {
        const res = await fetch(
          `https://${iLOIp}/redfish/v1/Managers/1/EthernetInterfaces`,
          {
            headers: {
              "x-auth-token": xauth,
            },
          }
        );
        console.log(res);
        console.log(res.headers);
        console.log("Here comes the json for Manager Network Interfaces");
        console.log("<------------------->");
        const json = await res.json();
        console.log(json);
      })();
    } catch (e) {
      console.log(e.message.ExtendedInfo);
    }
    try {
      (async () => {
        const res = await fetch(
          `https://${iLOIp}/redfish/v1/systems/1/EthernetInterfaces`,
          {
            headers: {
              "x-auth-token": xauth,
            },
          }
        );
        console.log(res);
        console.log(res.headers);
        console.log("Here comes the json for Systems Ethernet Interfaces");
        console.log("<------------------->");
        const json = await res.json();
        console.log(json);
        const { Members } = json;
        for (const member of Members) {
          const { "@odata.id": id } = member;
          try {
            (async () => {
              const res = await fetch(`https://${iLOIp}${id}`, {
                headers: {
                  "x-auth-token": xauth,
                },
              });

              //console.log(res);
              let Interfaces = await res.json();
              console.log(`Here comes the json for Interface ${id}`);
              console.log("<------------------->");
              console.log(Interfaces);
            })();
          } catch (e) {
            console.log(e.message.ExtendedInfo);
          }
        }
      })();
    } catch (e) {
      console.log(e.message.ExtendedInfo);
    }
    try {
      (async () => {
        const res = await fetch(`https://${iLOIp}/redfish/v1/systems`, {
          headers: {
            "x-auth-token": xauth,
          },
        });
        console.log(res);
        console.log(res.headers);
        console.log("Here comes the json data for systems");
        console.log("<------------------->");
        const json = await res.json();
        console.log(json);
        const { Members } = json;
        for (const member of Members) {
          const { "@odata.id": id } = member;
          try {
            (async () => {
              const res = await fetch(`https://${iLOIp}${id}`, {
                headers: {
                  "x-auth-token": xauth,
                },
              });

              //console.log(res);
              let Interfaces = await res.json();
              console.log(`Here comes the json for systems ${id}`);
              console.log("<------------------->");
              console.log(Interfaces);
            })();
          } catch (e) {
            console.log(e.message.ExtendedInfo);
          }
        }
      })();
    } catch (e) {
      console.log(e.message.ExtendedInfo);
    }
  })();
} catch (e) {
  console.log(e.message.ExtendedInfo);
}
