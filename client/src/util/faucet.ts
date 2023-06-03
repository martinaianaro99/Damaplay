import _ from "../../environment"

export const httpRequest = async (
    url: string | Request,
    options: RequestInit,
    postData: string,
): Promise<string> => {
    const response = await fetch(url, {
        ...options,
        body: postData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }

    return await response.text();
};

export const askFaucet = async (
    address: string,
    tokens: { [denom: string]: number },
): Promise<string | string[]> => {
    try {
        return await askFaucetComsJs(address, tokens);
    } catch (error) {
        return askFaucetIgniteCli(address, tokens);
    }
};

export const askFaucetComsJs = async (
    address: string,
    tokens: { [denom: string]: number },
): Promise<string[]> => {
    const requests = Object.keys(tokens).map((denom) =>
        httpRequest(
            `${process.env.FAUCET_URL}/credit`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            },
            JSON.stringify({ address, denom }),
        )
    );

    return Promise.all(requests);
};

export const askFaucetIgniteCli = async (
    address: string,
    tokens: { [denom: string]: number },
): Promise<string> =>
    httpRequest(
        process.env.FAUCET_URL as string,
        { method: "POST" },
        JSON.stringify({
            address: address,
            coins: Object.entries(tokens).map(([denom, value]) => value + denom),
        }),
    );
