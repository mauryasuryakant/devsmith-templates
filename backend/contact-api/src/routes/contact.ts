import { Router, Request, Response } from "express";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email and message are required.",
    });
  }

  console.log("New contact submission:");
  console.log({
    name,
    email,
    message,
  });

  return res.status(200).json({
    success: true,
    message: "Message received successfully.",
  });
});

export default router;
