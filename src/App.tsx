import React, { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBounary";

const Button = React.lazy(() => import("remoteApp/Button"))

const App: React.FC = () => {
    return <>
        <h1>Hello, React MicroFE Host App</h1>
        <ErrorBoundary fallback={<h1>Error...</h1>}>
            <Suspense fallback={<div>Loading Button...</div>}>
                <Button onClick={() => console.log('clicked')}>Click me</Button>
            </Suspense>
        </ErrorBoundary>
    </>;
};

export default App;
