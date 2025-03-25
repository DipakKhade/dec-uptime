import { verifyToken } from "@clerk/backend";
import type { NextFunction, Request, Response } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    console.log(req.headers);
    const bearerToken = req.headers.authorization;
    const token = bearerToken!.split(" ")[1];

    if (!token) {
      return Response.json(
        { error: "Token not found. User must sign in." },
        { status: 401 },
      );
    }

    const verifiedToken = await verifyToken(token, {
      jwtKey: process.env.CLERK_JWT_KEY,
      authorizedParties: ["http://localhost:3000"],
    });
    req.userId = verifiedToken.sub;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Token not verified." });
  }
};
