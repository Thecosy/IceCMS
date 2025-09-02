async function requestAltchaChallengeResult() {
    const response = await fetch('/captcha/altcha');
    const altchaResponseJson = await response.json();
    const { challenge, salt, algorithm ,maxnumber} = altchaResponseJson;

    const { promise } = window['altcha-lib'].solveChallenge(challenge, salt, algorithm, maxnumber);

    const result = await promise;

    const payload = btoa(
        JSON.stringify({
            ...altchaResponseJson,
            ...result,
        })
    )
    return payload;
}