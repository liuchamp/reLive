import { useEffect, useRef, useState } from 'react';
import AceEditor from 'react-ace';

// 引入 Ace Editor 的主题和模式
// import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/theme-monokai';

// 可选：引入更多的模式和主题
// import 'ace-builds/src-noconflict/mode-python';
// import 'ace-builds/src-noconflict/theme-github';

import 'ace-builds/src-noconflict/ext-language_tools';

import styles from './index.module.less';
import { useCodeStores, setCode } from '../../stores/codeStore';
import ReactAce from 'react-ace';
import { postData } from '../../services/coder';
import { Position } from '../../services/ov/pos';

const CodeEditor = () => {
    const [readOnly, setReadOnly] = useState(false)

    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const editorRef = useRef<ReactAce | null>(null);

    const list = useCodeStores((state) => state.list)
    const code = useCodeStores((state) => state.code)
    const handleChange = (newCode: string) => {
        console.log(list)
        setCode(newCode);
    };

    const handleContextMenu = (e: { preventDefault: () => void; clientX: number; clientY: number; }) => {
        e.preventDefault();
        setContextMenuPosition({ x: e.clientX, y: e.clientY });
        setContextMenuVisible(true);
    };

    const handleClick = () => {
        setContextMenuVisible(false);
    };

    useEffect(() => {
        if (!editorRef.current || !editorRef.current.editor) {
            return;
        }
        const editor = editorRef.current.editor;
        editor.container.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('click', handleClick);

        return () => {
            editor.container.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('click', handleClick);
        };
    }, []);

    const runCode = () => {
        try {
            console.log(code);
            setReadOnly(!readOnly)
        } catch (e) {
            console.error(e);
        }
    };
    const parserHandle = async () => {
        try {
            if (!editorRef.current || !editorRef.current.editor) {
                return;
            }
            const editor = editorRef.current.editor;
            const selectedCode = editor.getSelectionRange()
            const code = editor.getSelectedText()
            const pos: Position = { x: selectedCode.start.row, y: selectedCode.start.column }
            const data = await postData({ context: code, pos })
            if (!data.data){
                console.log(data)
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className={styles.container}>
            <AceEditor
                ref={editorRef}
                mode="golang"
                theme="monokai"
                name="codeEditor"
                value={code}
                onChange={handleChange}
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    readOnly: readOnly,
                }}
                style={{ width: '100%', height: "75vh" }}
            />
            {contextMenuVisible && (
                <ul className={styles.contextMenu} style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}>
                    <li onClick={parserHandle}>gen code template</li>
                </ul>
            )}
            <button onClick={runCode} style={{ margin: "0 auto", width: "3rem" }}>{readOnly ? 'Parser' : "Edit"}</button>
        </div>
    );
};

export default CodeEditor;
