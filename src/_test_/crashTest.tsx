function CrashTests() {
    throw new Error("Error de prueba para ErrorBoundary");
    return <div />;
}

export default CrashTests;