
const express = require('express')
const app = express()
const port = 3002

const  clt  = require("dapr-client");
const DaprClient = clt.DaprClient;
const daprHost = "127.0.0.1"; // Dapr Sidecar Host
const daprPort = "3500"; // Dapr Sidecar Port of this Example Server

app.get('/test-invoke', async (req, res) => {
    const client = new DaprClient(daprHost, daprPort);
    var repos = await client.invoker.invoke("service_invoke","test",clt.HttpMethod.GET);
    console.log(`repos is ${repos}`);
    res.send(`repos is ${repos}`)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})