import React, { Suspense } from "react";

const Button = React.lazy(() => import("remoteApp/Button"))

const App: React.FC = () => {
    return <>
        <h1>Hello, React MicroFE Host App</h1>
        <Suspense fallback={<div>Loading Button...</div>}>
            <Button onClick={() => console.log('clicked')}>Click me</Button>
        </Suspense>
    </>;
};

export default App;
