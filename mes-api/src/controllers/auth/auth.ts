// Imports
import { Request, Response } from "express";
import { useState } from 'react';
import { InitiateAuthCommand, CognitoIdentityProviderClient, RespondToAuthChallengeCommand, InitiateAuthCommandInput } from '@aws-sdk/client-cognito-identity-provider';
import dotenv from "dotenv";

dotenv.config();

const _region: string = process.env.AWS_REGION || "";
const _clientId: string = process.env.COGNITO_CLIENT_ID || "";

const _cognitoClient: CognitoIdentityProviderClient = new CognitoIdentityProviderClient({
    region: _region
});

export const signInUser = async (req: Request, res: Response) => {
    try {
        let { username, password } = req.body;

        if (!username) {
            return res.status(400).json({
                error: "No email provided"
            });
        } else if (!password) {
            return res.status(400).json({
                error: "No password provided"
            });
        }

        const authCommand: InitiateAuthCommandInput = {
            AuthFlow: "USER_PASSWORD_AUTH",
            AuthParameters: {
                USERNAME: username,
                PASSWORD: password,
            },
            ClientId: _clientId,
        };

        const command = new InitiateAuthCommand(authCommand);
        const cognitoResponse = await _cognitoClient.send(command);

        return res.status(200).json(cognitoResponse.AuthenticationResult);

    } catch (error: any) {
        return res.status(400).json({
            error: error.message
        });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        let refreshToken = req.body["RefreshToken"];

        if (!refreshToken) {
            return res.status(400).json({
                error: "No refresh token provided"
            });
        }

        const refreshCommand: InitiateAuthCommandInput = {
            AuthFlow: "REFRESH_TOKEN_AUTH",
            AuthParameters: {
                "REFRESH_TOKEN": refreshToken
            },
            ClientId: _clientId,
        }

        let command = new InitiateAuthCommand(refreshCommand);
        let refreshResponse = await _cognitoClient.send(command);

        return res.status(200).json(refreshResponse.AuthenticationResult)
    } catch (error: any) {
        return res.status(400).json({
            error: error.message
        });
    }
}

export const signOutUser = async (req: Request, res: Response) => {

}