import axios from "axios";
import * as bodyParser from "body-parser";
import * as express from "express";
import {Request, Response} from "express";

const port = process.env.NODE_PORT || 8080;
const app: express.Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.post("/session", async (req: Request, res: Response) => {
  console.log(`***\n***\n***\n`);
  try {
    const managerResponse = await axios.post("http://localhost:8082/session");
    console.log(`/session MANAGER REPLY: ${JSON.stringify(managerResponse.data)}`);
    const nlgResponse = await axios.post("http://localhost:8083/generate", managerResponse.data);
    console.log(`/session NLG REPLY: ${JSON.stringify(nlgResponse.data)}`);
    res.send(nlgResponse.data);
  } catch (e) {
    console.log(`/session error: ${e.message}`);
  }
});

app.put("/request", async (req: Request, res: Response) => {
  console.log(`***\n***\n***\n`);
  try {
    const nluResponse = await axios.post("http://localhost:8081/parse", req.body);
    console.log(`/request NLU REPLY: ${JSON.stringify(nluResponse.data)}`);

    const managerResponse = await axios.put("http://localhost:8082/request", nluResponse.data);
    console.log(`/request MANAGER REPLY: ${JSON.stringify(managerResponse.data)}`);

    const nlgResponse = await axios.post("http://localhost:8083/generate", managerResponse.data);
    console.log(`/request NLG REPLY: ${JSON.stringify(nlgResponse.data)}`);

    res.send(nlgResponse.data);
  } catch (e) {
    console.log(`/session error: ${e.message}`);
  }
});

app.listen(port, () => {
  /* tslint:disable:no-console */
  console.log(`Example app listening on port ${port}!`);
});
