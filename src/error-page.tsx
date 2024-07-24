import { useRouteError } from "react-router-dom";

export interface RouteError {
    status?: number;
    statusText?: string;
    message?: string;
}

export default function ErrorPage() {
    const error = useRouteError()as RouteError;

    return (
        <div id="error-page" style={{ marginLeft: "10%" }}>
            <h1>Oops!</h1>
            <p style={{ paddingLeft: "1em" }}>Sorry, an unexpected error has occurred.</p>
            <p style={{ paddingLeft: "1em" }}>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}