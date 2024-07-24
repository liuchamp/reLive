import { useState } from 'react';
import AceEditor from 'react-ace';

// 引入 Ace Editor 的主题和模式
// import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/theme-monokai';

// 可选：引入更多的模式和主题
// import 'ace-builds/src-noconflict/mode-python';
// import 'ace-builds/src-noconflict/theme-github';

const CodeEditor = () => {
    const [code, setCode] = useState(`package main

func main(){
    println("init")
}`);

    const handleChange = (newCode: string) => {
        setCode(newCode);
    };

    const runCode = () => {
        try {
            console.log(code);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <AceEditor
                mode="golang"
                theme="monokai"
                name="codeEditor"
                value={code}
                onChange={handleChange}
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true
                }}
                style={{ width: '100%', height: '300px' }}
            />
            <button onClick={runCode}>Parser</button>
        </div>
    );
};

export default CodeEditor;
