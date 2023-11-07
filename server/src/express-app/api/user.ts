/* eslint-disable @typescript-eslint/no-explicit-any */
import bodyParser from "body-parser";
import { Router } from "express";
import { Webhook } from "svix";



const userRouter = Router();

userRouter.post("/webhook", bodyParser.raw({ type: "application/json" }), async function(req, res) {
    try {
        const payloadString = req.body.toString();
        const svixHeaders = req.headers;

        if (!process.env.CLERK_WEBHOOK_SECRET_KEY) {
            res.status(400).json({
                success: false,
                message: "Clerk Webhook Secret Key not found",
            });

            return;
        }
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
        const evt = wh.verify(payloadString, svixHeaders as any) as any;
        const { id } = evt.data as { id: number };
        // Handle the webhook
        const eventType = evt.type;
        if (eventType === "user.created") {
            console.log(`User ${id} was ${eventType}`);
        }
        res.status(200).json({
            success: true,
            message: "Webhook received",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "There was an error in receiving details from Clerk Webhook",
        });
    }
});

export { userRouter };
