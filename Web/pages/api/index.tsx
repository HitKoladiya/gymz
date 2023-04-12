import { NextApiRequest, NextApiResponse } from "next";
import data from "../../data/states.json";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const state: string = req.body.state;
  const Data = data[state as keyof typeof data];
  console.log(Data);

  res.status(200).send(data);
};

export default handler;
