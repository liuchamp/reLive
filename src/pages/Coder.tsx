import CodeEditor from "../components/Coder";
import { Helmet } from 'react-helmet';
import { App } from 'antd';

export default function Coder() {
    return (
        <>
            <Helmet>
                <title>coder</title>
            </Helmet>
            <h1 style={{ textAlign: "center" }}>ase 编程助手</h1>
            <App>
                <CodeEditor />
            </App>
        </>
    );
}
